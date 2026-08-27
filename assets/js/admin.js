/*
  관리자 편집기 (⚙️ 아이콘)
  - 별도 로그인 없이, ⚙️ 아이콘을 아는 관리자만 접근합니다.
  - 입력값을 바꾸면 siteContent 객체가 즉시 바뀌고, renderAll()로 미리보기에 바로 반영됩니다.
  - 체험 프로그램 카드는 자유롭게 추가·삭제·순서변경할 수 있습니다.
  - "변경사항 다운로드" 버튼을 누르면 site-content-YYYYMMDD.json 파일이 저장됩니다.
  - 그 JSON 파일을 클로드코드에 붙여넣고 "이 내용으로 사이트에 반영해줘"라고 요청하면
    assets/js/site-content.js 파일이 실제로 수정되어 사이트에 영구 반영됩니다.
*/
(function () {
  const getPath = (obj, path) =>
    path.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);

  const setPath = (obj, path, value) => {
    const keys = path.split(".");
    const last = keys.pop();
    const target = keys.reduce((o, k) => o[k], obj);
    target[last] = value;
  };

  const escAttr = (value) => String(value ?? "").replace(/"/g, "&quot;");
  const escHtml = (value) => String(value ?? "").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  function field(label, path, opts = {}) {
    const value = getPath(window.siteContent, path);
    if (opts.textarea) {
      const text = Array.isArray(value) ? value.join("\n") : value ?? "";
      return `<label class="admin-field">
        <span>${label}</span>
        <textarea data-path="${path}" data-transform="${opts.transform || ""}" rows="${opts.rows || 3}">${escHtml(text)}</textarea>
      </label>`;
    }
    if (opts.checkbox) {
      return `<label class="admin-field admin-field-checkbox">
        <input type="checkbox" data-path="${path}" ${value ? "checked" : ""}>
        <span>${label}</span>
      </label>`;
    }
    return `<label class="admin-field">
      <span>${label}</span>
      <input type="${opts.type || "text"}" data-path="${path}" value="${escAttr(value ?? "")}">
    </label>`;
  }

  function makeDefaultProgram() {
    return {
      id: `program-${Date.now()}`,
      badge: "",
      isTodo: true,
      name: "새 체험 프로그램",
      summary: "",
      duration: "",
      price: "",
      target: "",
      image: "",
      features: [],
      prep: [],
      gallery: [],
      note: ""
    };
  }

  function programSection(index, total) {
    const p = window.siteContent.programs[index];
    return `
      <details class="admin-subsection" data-program-index="${index}">
        <summary>${index + 1}. ${escHtml(p.name || "(제목 없음)")}${p.isTodo ? " (준비중)" : ""}</summary>
        <div class="admin-row-actions admin-program-actions">
          <button type="button" data-program-up ${index === 0 ? "disabled" : ""}>▲ 위로</button>
          <button type="button" data-program-down ${index === total - 1 ? "disabled" : ""}>▼ 아래로</button>
          <button type="button" class="admin-row-remove" data-program-remove>이 카드 삭제</button>
        </div>
        <div class="admin-field-grid">
          ${field("프로그램명", `programs.${index}.name`)}
          ${field("한 줄 요약", `programs.${index}.summary`)}
          ${field("소요시간", `programs.${index}.duration`)}
          ${field("체험비", `programs.${index}.price`)}
          ${field("대표 이미지 파일명 (assets/images/...)", `programs.${index}.image`)}
        </div>
        ${field("체험 내용 (줄바꿈으로 구분, 줄을 자유롭게 추가·삭제하세요)", `programs.${index}.features`, { textarea: true, transform: "lines", rows: 4 })}
        ${field("준비물 (줄바꿈으로 구분, 줄을 자유롭게 추가·삭제하세요)", `programs.${index}.prep`, { textarea: true, transform: "lines", rows: 2 })}
        ${field("상세페이지 이미지 파일명 (줄바꿈으로 구분, 대표 이미지 포함 여러 장 자유롭게 추가·삭제하세요)", `programs.${index}.gallery`, { textarea: true, transform: "lines", rows: 2 })}
        ${field("기타 안내 문구", `programs.${index}.note`, { textarea: true, rows: 2 })}
        ${field("준비중(TODO) 카드로 표시", `programs.${index}.isTodo`, { checkbox: true })}
      </details>`;
  }

  function getOpenPrograms(container) {
    const list = window.siteContent.programs || [];
    const openSet = new Set();
    container.querySelectorAll("[data-program-index]").forEach((el) => {
      if (el.open) {
        const program = list[Number(el.dataset.programIndex)];
        if (program) openSet.add(program);
      }
    });
    return openSet;
  }

  function renderPrograms(openSet) {
    const container = document.getElementById("admin-programs-rows");
    if (!container) return;
    const list = window.siteContent.programs || [];
    container.innerHTML =
      list.map((_, i) => programSection(i, list.length)).join("") +
      `<button type="button" class="admin-add-btn" data-add-program>+ 체험 프로그램 카드 추가</button>`;
    if (openSet) {
      container.querySelectorAll("[data-program-index]").forEach((el) => {
        const program = list[Number(el.dataset.programIndex)];
        if (openSet.has(program)) el.open = true;
      });
    }
  }

  function buildModal() {
    const modal = document.createElement("div");
    modal.id = "adminEditor";
    modal.className = "admin-editor";
    modal.hidden = true;
    modal.innerHTML = `
      <div class="admin-editor-backdrop" data-admin-close></div>
      <div class="admin-editor-panel" role="dialog" aria-modal="true" aria-label="관리자 편집기">
        <header class="admin-editor-header">
          <h2>⚙️ 관리자 편집기</h2>
          <button type="button" class="admin-editor-close" data-admin-close aria-label="편집기 닫기">×</button>
        </header>
        <p class="admin-editor-guide">
          아래 항목의 값을 바꾸면 뒤 화면에 <strong>바로</strong> 반영됩니다(미리보기).
          체험 프로그램 카드는 자유롭게 추가·삭제·순서변경할 수 있습니다.
          다 수정하셨으면 맨 아래 <strong>"변경사항 다운로드"</strong> 버튼을 눌러 파일을 저장한 뒤,
          그 파일 내용을 <strong>클로드코드(Claude Code)</strong>에 붙여넣고
          <strong>"이 내용으로 사이트에 반영해줘"</strong>라고 요청해 주세요. 그러면 실제 사이트에 반영됩니다.
        </p>

        <div class="admin-editor-body">
          <details class="admin-section" open>
            <summary>1. 기본 정보</summary>
            <div class="admin-field-grid">
              ${field("회사명", "business.companyName")}
              ${field("대표자", "business.owner")}
              ${field("사업자등록번호", "business.businessNumber")}
              ${field("예약 전화번호", "business.phone")}
              ${field("문자 상담 번호", "business.smsPhone")}
              ${field("이메일", "business.email")}
              ${field("주소", "business.address")}
              ${field("운영시간", "business.hours")}
              ${field("주차 안내", "business.parking")}
            </div>
          </details>

          <details class="admin-section">
            <summary>2. 콘텐츠 (첫 화면 제목 · 체험 프로그램)</summary>
            <h4 class="admin-group-title">첫 화면</h4>
            <div class="admin-field-grid">
              ${field("메인 제목", "hero.title")}
            </div>

            <h4 class="admin-group-title">체험 프로그램</h4>
            <p class="admin-section-help">카드를 자유롭게 추가·삭제하거나 순서를 바꿀 수 있습니다.</p>
            <div class="admin-list" id="admin-programs-rows"></div>
          </details>

          <details class="admin-section">
            <summary>3. 외부 채널 링크</summary>
            <div class="admin-field-grid">
              ${field("스마트플레이스 URL", "links.smartPlace")}
              ${field("스마트스토어 URL", "links.smartStore")}
              ${field("YouTube URL", "links.youtube")}
              ${field("Instagram URL", "links.instagram")}
              ${field("네이버블로그 URL", "links.naverBlog")}
            </div>
          </details>
        </div>

        <footer class="admin-editor-footer">
          <p class="admin-editor-guide admin-editor-guide-bottom">
            📥 <strong>변경사항 다운로드</strong>를 누르면 오늘 날짜의 JSON 파일이 저장됩니다.
            그 파일을 클로드코드 채팅창에 붙여넣고 "이 내용으로 사이트에 반영해줘"라고만 말씀하시면 됩니다.
          </p>
          <button type="button" class="admin-download-btn" id="adminDownloadBtn">📥 변경사항 다운로드</button>
        </footer>
      </div>`;
    document.body.appendChild(modal);
    return modal;
  }

  function downloadJson() {
    const now = new Date();
    const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
    const blob = new Blob([JSON.stringify(window.siteContent, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `site-content-${stamp}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const modal = buildModal();
    renderPrograms();

    const toggle = document.getElementById("adminToggle");
    const openModal = () => {
      modal.hidden = false;
      document.body.classList.add("admin-editor-open");
    };
    const closeModal = () => {
      modal.hidden = true;
      document.body.classList.remove("admin-editor-open");
    };

    toggle?.addEventListener("click", openModal);
    modal.addEventListener("click", (event) => {
      if (event.target.closest("[data-admin-close]")) closeModal();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !modal.hidden) closeModal();
    });

    modal.addEventListener("input", (event) => {
      const target = event.target;
      if (target.matches("[data-path]")) {
        const path = target.getAttribute("data-path");
        let value = target.value;
        if (target.type === "checkbox") {
          value = target.checked;
        } else if (target.tagName === "TEXTAREA" && target.dataset.transform === "lines") {
          value = value.split("\n").map((s) => s.trim()).filter(Boolean);
        } else if (target.type === "number") {
          value = Number(value) || 0;
        }
        setPath(window.siteContent, path, value);
        window.renderAll();
      }
    });

    modal.addEventListener("change", (event) => {
      if (event.target.matches('[data-path][type="checkbox"]')) {
        modal.dispatchEvent(new Event("input", { bubbles: true }));
      }
    });

    modal.addEventListener("click", (event) => {
      const programsContainer = document.getElementById("admin-programs-rows");

      const addProgramBtn = event.target.closest("[data-add-program]");
      if (addProgramBtn) {
        const openSet = getOpenPrograms(programsContainer);
        const newProgram = makeDefaultProgram();
        window.siteContent.programs.push(newProgram);
        openSet.add(newProgram);
        renderPrograms(openSet);
        window.renderAll();
        return;
      }

      const removeBtn = event.target.closest("[data-program-remove]");
      if (removeBtn) {
        if (window.siteContent.programs.length <= 1) {
          alert("체험 프로그램 카드는 최소 1개 이상 있어야 합니다.");
          return;
        }
        if (!confirm("이 체험 프로그램 카드를 삭제할까요?")) return;
        const openSet = getOpenPrograms(programsContainer);
        const index = Number(removeBtn.closest("[data-program-index]").dataset.programIndex);
        const [removed] = window.siteContent.programs.splice(index, 1);
        openSet.delete(removed);
        renderPrograms(openSet);
        window.renderAll();
        return;
      }

      const upBtn = event.target.closest("[data-program-up]");
      const downBtn = event.target.closest("[data-program-down]");
      if (upBtn || downBtn) {
        const openSet = getOpenPrograms(programsContainer);
        const index = Number((upBtn || downBtn).closest("[data-program-index]").dataset.programIndex);
        const delta = upBtn ? -1 : 1;
        const list = window.siteContent.programs;
        const swapIndex = index + delta;
        if (swapIndex >= 0 && swapIndex < list.length) {
          [list[index], list[swapIndex]] = [list[swapIndex], list[index]];
          renderPrograms(openSet);
          window.renderAll();
        }
      }
    });

    document.getElementById("adminDownloadBtn")?.addEventListener("click", downloadJson);
  });
})();
