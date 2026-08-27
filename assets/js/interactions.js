/*
  체험 프로그램 상세 모달, 부드러운 스크롤, 갤러리 라이트박스를 담당합니다.
  화면은 renderAll()로 계속 다시 그려지므로, 개별 요소가 아니라
  document 전체에 이벤트를 위임(delegation)해서 항상 동작하도록 만들었습니다.
*/
(function () {
  const esc = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (ch) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[ch]));

  // ----- 체험 프로그램 상세 모달 (넷플릭스 카드 클릭 시) -----
  let programModalEl = null;

  function buildProgramModal() {
    if (programModalEl) return programModalEl;
    programModalEl = document.createElement("div");
    programModalEl.className = "program-modal";
    programModalEl.hidden = true;
    programModalEl.innerHTML = `
      <div class="program-modal-backdrop" data-program-close></div>
      <div class="program-modal-panel" role="dialog" aria-modal="true">
        <button type="button" class="program-modal-close" data-program-close aria-label="닫기">×</button>
        <div class="program-modal-body"></div>
      </div>`;
    document.body.appendChild(programModalEl);
    return programModalEl;
  }

  function openProgramModal(index) {
    const programs = (window.siteContent && window.siteContent.programs) || [];
    const p = programs[index];
    if (!p) return;
    const el = buildProgramModal();
    const featureItems = (p.features || []).map((f) => `<li>${esc(f)}</li>`).join("");
    const prepItems = (p.prep || []).map((f) => `<li>${esc(f)}</li>`).join("");
    const images = [p.image, ...(p.gallery || [])].filter((src, i, arr) => src && arr.indexOf(src) === i);
    const galleryImgs = images.map((src) => `<img src="${esc(src)}" alt="${esc(p.name)} 관련 사진" loading="lazy">`).join("");
    const galleryClass = images.length > 1 ? "program-modal-gallery program-modal-gallery-fan" : "program-modal-gallery";
    el.querySelector(".program-modal-body").innerHTML = `
      ${images.length ? `<div class="${galleryClass}">${galleryImgs}</div>` : ""}
      <div class="program-modal-content">
        <h3 class="program-modal-name">${esc(p.name)}</h3>
        <p class="program-modal-summary">${esc(p.summary)}</p>
        ${p.isTodo ? `<!-- TODO: ${esc(p.note)} -->\n        <p class="program-todo-note">⚠️ ${esc(p.note)}</p>` : ""}
        ${p.duration ? `<p class="program-modal-duration">⏱ 소요시간: ${esc(p.duration)}</p>` : ""}
        ${p.features && p.features.length ? `<h4>체험 내용</h4><ul class="program-card-list">${featureItems}</ul>` : ""}
        ${p.price ? `<h4>체험비</h4><p class="program-modal-price">${esc(p.price)}</p>` : ""}
        ${p.prep && p.prep.length ? `<h4>준비물</h4><ul class="program-card-list">${prepItems}</ul>` : ""}
        ${p.note && !p.isTodo ? `<h4>기타</h4><p class="program-modal-note-text">${esc(p.note)}</p>` : ""}
      </div>`;
    el.hidden = false;
    el.querySelector(".program-modal-panel").scrollTop = 0;
    document.body.classList.add("program-modal-open");
  }

  function closeProgramModal() {
    if (!programModalEl) return;
    programModalEl.hidden = true;
    document.body.classList.remove("program-modal-open");
  }

  function smoothScrollTo(id) {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // ----- 이미지 확대보기 (라이트박스) -----
  let lightboxEl = null;
  let lightboxImages = [];
  let lightboxIndex = 0;

  function buildLightbox() {
    if (lightboxEl) return lightboxEl;
    lightboxEl = document.createElement("div");
    lightboxEl.className = "lightbox";
    lightboxEl.setAttribute("role", "dialog");
    lightboxEl.setAttribute("aria-modal", "true");
    lightboxEl.hidden = true;
    lightboxEl.innerHTML = `
      <div class="lightbox-backdrop" data-lightbox-close></div>
      <div class="lightbox-body">
        <button type="button" class="lightbox-close" data-lightbox-close aria-label="닫기">×</button>
        <button type="button" class="lightbox-nav lightbox-prev" data-lightbox-prev aria-label="이전 사진">‹</button>
        <img class="lightbox-img" alt="">
        <button type="button" class="lightbox-nav lightbox-next" data-lightbox-next aria-label="다음 사진">›</button>
      </div>`;
    document.body.appendChild(lightboxEl);
    return lightboxEl;
  }

  function openLightbox(images, startIndex) {
    if (!images || !images.length) return;
    const el = buildLightbox();
    lightboxImages = images;
    lightboxIndex = (startIndex + images.length) % images.length;
    updateLightbox();
    el.querySelectorAll(".lightbox-nav").forEach((btn) => {
      btn.hidden = lightboxImages.length < 2;
    });
    el.hidden = false;
    document.body.classList.add("lightbox-open");
  }

  function updateLightbox() {
    if (!lightboxEl || !lightboxImages.length) return;
    const img = lightboxEl.querySelector(".lightbox-img");
    img.src = lightboxImages[lightboxIndex];
    img.alt = "";
  }

  function closeLightbox() {
    if (!lightboxEl) return;
    lightboxEl.hidden = true;
    document.body.classList.remove("lightbox-open");
  }

  function stepLightbox(delta) {
    if (!lightboxImages.length) return;
    lightboxIndex = (lightboxIndex + delta + lightboxImages.length) % lightboxImages.length;
    updateLightbox();
  }

  document.addEventListener("click", (event) => {
    const programOpen = event.target.closest("[data-program-open]");
    if (programOpen) {
      openProgramModal(Number(programOpen.getAttribute("data-program-open")));
      return;
    }

    if (event.target.closest("[data-program-close]")) {
      closeProgramModal();
      return;
    }

    const scrollTrigger = event.target.closest("[data-scroll]");
    if (scrollTrigger) {
      event.preventDefault();
      smoothScrollTo(scrollTrigger.getAttribute("data-scroll"));
      return;
    }

    const galleryImg = event.target.closest(".program-modal-gallery img");
    if (galleryImg) {
      const gallery = galleryImg.closest(".program-modal-gallery");
      const imgs = Array.from(gallery.querySelectorAll("img"));
      const images = imgs.map((img) => img.getAttribute("src"));
      openLightbox(images, imgs.indexOf(galleryImg));
      return;
    }

    if (event.target.closest("[data-lightbox-close]")) {
      closeLightbox();
      return;
    }

    if (event.target.closest("[data-lightbox-prev]")) {
      stepLightbox(-1);
      return;
    }

    if (event.target.closest("[data-lightbox-next]")) {
      stepLightbox(1);
      return;
    }
  });

  document.addEventListener("keydown", (event) => {
    if (lightboxEl && !lightboxEl.hidden) {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") stepLightbox(-1);
      if (event.key === "ArrowRight") stepLightbox(1);
      return;
    }
    if (event.key === "Escape" && programModalEl && !programModalEl.hidden) {
      closeProgramModal();
    }
  });
})();
