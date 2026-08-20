/*
  관리자 편집기 (⚙️ 아이콘)
  - 별도 로그인 없이, ⚙️ 아이콘을 아는 관리자만 접근합니다.
  - 입력값을 바꾸면 siteContent 객체가 즉시 바뀌고, renderAll()로 미리보기에 바로 반영됩니다.
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

  function programSection(index) {
    const p = window.siteContent.programs[index];
    return `
      <details class="admin-subsection">
        <summary>${index + 1}. ${escHtml(p.name)}${p.isTodo ? " (준비중)" : ""}</summary>
        <div class="admin-field-grid">
          ${field("프로그램명", `programs.${index}.name`)}
          ${field("배지 (예: 대표 체험, 신규)", `programs.${index}.badge`)}
          ${field("한 줄 요약", `programs.${index}.summary`)}
          ${field("소요시간", `programs.${index}.duration`)}
          ${field("가격 안내 문구", `programs.${index}.price`)}
          ${field("추천 대상", `programs.${index}.target`)}
          ${field("대표 이미지 파일명 (assets/images/...)", `programs.${index}.image`)}
        </div>
        ${field("체험 내용 (줄바꿈으로 구분)", `programs.${index}.features`, { textarea: true, transform: "lines", rows: 4 })}
        ${field("준비물 (줄바꿈으로 구분)", `programs.${index}.prep`, { textarea: true, transform: "lines", rows: 2 })}
        ${field("체험 갤러리 이미지 파일명 (줄바꿈으로 구분)", `programs.${index}.gallery`, { textarea: true, transform: "lines", rows: 2 })}
        ${field("준비중(TODO) 카드로 표시", `programs.${index}.isTodo`, { checkbox: true })}
        ${field("개발 메모 / TODO 안내 문구", `programs.${index}.note`, { textarea: true, rows: 2 })}
      </details>`;
  }

  const LIST_SECTIONS = {
    "pricing.rentals": {
      containerId: "admin-rentals-rows",
      fields: [
        { key: "name", label: "대여용품 이름" },
        { key: "price", label: "가격(원)", type: "number" }
      ],
      makeDefault: () => ({ name: "", price: 0 })
    },
    "pricing.treats": {
      containerId: "admin-treats-rows",
      fields: [
        { key: "name", label: "즐길거리 이름" },
        { key: "price", label: "가격(원)", type: "number" }
      ],
      makeDefault: () => ({ name: "", price: 0 })
    },
    gallery: {
      containerId: "admin-gallery-rows",
      fields: [
        { key: "image", label: "이미지 파일명 (assets/images/...)" },
        { key: "caption", label: "사진 설명" }
      ],
      reorder: true,
      makeDefault: () => ({ image: "assets/images/", caption: "" })
    }
  };

  function renderRepeatable(listPath) {
    const cfg = LIST_SECTIONS[listPath];
    const container = document.getElementById(cfg.containerId);
    if (!container) return;
    const list = getPath(window.siteContent, listPath) || [];
    container.innerHTML =
      list
        .map(
          (item, idx) => `
      <div class="admin-row" data-list="${listPath}" data-index="${idx}">
        ${cfg.fields
          .map(
            (f) => `
          <label class="admin-field admin-field-inline">
            <span>${f.label}</span>
            <input type="${f.type || "text"}" data-row-field="${f.key}" value="${escAttr(item[f.key] ?? "")}">
          </label>`
          )
          .join("")}
        <span class="admin-row-actions">
          ${cfg.reorder ? `<button type="button" data-row-up ${idx === 0 ? "disabled" : ""}>▲</button><button type="button" data-row-down ${idx === list.length - 1 ? "disabled" : ""}>▼</button>` : ""}
          <button type="button" class="admin-row-remove" data-row-remove>삭제</button>
        </span>
      </div>`
        )
        .join("") +
      `<button type="button" class="admin-add-btn" data-add-list="${listPath}">+ 항목 추가</button>`;
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
            <summary>2. 콘텐츠 (히어로 · 이벤트 · 체험 프로그램)</summary>
            <h4 class="admin-group-title">히어로 영역</h4>
            <div class="admin-field-grid">
              ${field("메인 제목", "hero.title")}
              ${field("운영정보 배지 문구", "hero.badge")}
            </div>
            ${field("한 줄 소개", "hero.subtitle", { textarea: true, rows: 2 })}

            <h4 class="admin-group-title">이벤트 배너</h4>
            <div class="admin-field-grid">
              ${field("이벤트 제목", "event.title")}
              ${field("이벤트 기간", "event.period")}
              ${field("이벤트 이미지 파일명", "event.image")}
            </div>
            ${field("이벤트 혜택 설명", "event.benefit", { textarea: true, rows: 2 })}

            <h4 class="admin-group-title">체험 프로그램 4종</h4>
            ${[0, 1, 2, 3].map(programSection).join("")}
          </details>

          <details class="admin-section">
            <summary>3. 요금 정보</summary>
            <div class="admin-field-grid">
              ${field("2인 요금(원)", "pricing.basePlans.0.price", { type: "number" })}
              ${field("3인 요금(원)", "pricing.basePlans.1.price", { type: "number" })}
              ${field("4인 요금(원)", "pricing.basePlans.2.price", { type: "number" })}
              ${field("추가 1인 요금(원)", "pricing.extraPersonPrice", { type: "number" })}
            </div>
            ${field("예약금 안내 문구", "pricing.depositNote", { textarea: true, rows: 2 })}
            <h4 class="admin-group-title">대여용품</h4>
            <div class="admin-list" id="admin-rentals-rows"></div>
            <h4 class="admin-group-title">즐길거리</h4>
            <div class="admin-list" id="admin-treats-rows"></div>
          </details>

          <details class="admin-section">
            <summary>4. 외부 링크</summary>
            <div class="admin-field-grid">
              ${field("카카오채널 URL", "links.kakaoChannel")}
              ${field("예약폼 URL", "links.bookingForm")}
              ${field("스마트플레이스 URL", "links.smartPlace")}
              ${field("스마트스토어 URL", "links.smartStore")}
              ${field("YouTube URL", "links.youtube")}
              ${field("Instagram URL", "links.instagram")}
              ${field("네이버블로그 URL", "links.naverBlog")}
              ${field("네이버지도 링크", "visitInfo.naverMapUrl")}
              ${field("카카오맵 링크", "visitInfo.kakaoMapUrl")}
            </div>
          </details>

          <details class="admin-section">
            <summary>5. 대표 사진 갤러리</summary>
            <p class="admin-section-help">이미 assets/images 폴더에 올려둔 사진의 파일명을 입력하세요. ▲▼ 버튼으로 순서를 바꿀 수 있습니다.</p>
            <div class="admin-list" id="admin-gallery-rows"></div>
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
    Object.keys(LIST_SECTIONS).forEach(renderRepeatable);

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
        return;
      }
      if (target.matches("[data-row-field]")) {
        const row = target.closest(".admin-row");
        const listPath = row.dataset.list;
        const idx = Number(row.dataset.index);
        const key = target.dataset.rowField;
        let value = target.value;
        if (target.type === "number") value = Number(value) || 0;
        getPath(window.siteContent, listPath)[idx][key] = value;
        window.renderAll();
      }
    });

    modal.addEventListener("change", (event) => {
      if (event.target.matches('[data-path][type="checkbox"]')) {
        modal.dispatchEvent(new Event("input", { bubbles: true }));
      }
    });

    modal.addEventListener("click", (event) => {
      const removeBtn = event.target.closest("[data-row-remove]");
      if (removeBtn) {
        const row = removeBtn.closest(".admin-row");
        const listPath = row.dataset.list;
        getPath(window.siteContent, listPath).splice(Number(row.dataset.index), 1);
        renderRepeatable(listPath);
        window.renderAll();
        return;
      }

      const upBtn = event.target.closest("[data-row-up]");
      const downBtn = event.target.closest("[data-row-down]");
      if (upBtn || downBtn) {
        const row = (upBtn || downBtn).closest(".admin-row");
        const listPath = row.dataset.list;
        const idx = Number(row.dataset.index);
        const delta = upBtn ? -1 : 1;
        const list = getPath(window.siteContent, listPath);
        const swapIdx = idx + delta;
        if (swapIdx >= 0 && swapIdx < list.length) {
          [list[idx], list[swapIdx]] = [list[swapIdx], list[idx]];
          renderRepeatable(listPath);
          window.renderAll();
        }
        return;
      }

      const addBtn = event.target.closest("[data-add-list]");
      if (addBtn) {
        const listPath = addBtn.getAttribute("data-add-list");
        const cfg = LIST_SECTIONS[listPath];
        getPath(window.siteContent, listPath).push(cfg.makeDefault());
        renderRepeatable(listPath);
        window.renderAll();
      }
    });

    document.getElementById("adminDownloadBtn")?.addEventListener("click", downloadJson);
  });
})();
