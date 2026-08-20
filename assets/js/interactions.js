/*
  프로그램 카드 아코디언, 부드러운 스크롤, 갤러리 라이트박스를 담당합니다.
  화면은 renderAll()로 계속 다시 그려지므로, 개별 요소가 아니라
  document 전체에 이벤트를 위임(delegation)해서 항상 동작하도록 만들었습니다.
*/
(function () {
  function toggleProgramCard(header) {
    const panel = document.getElementById(header.getAttribute("aria-controls"));
    if (!panel) return;
    const expanded = header.getAttribute("aria-expanded") === "true";
    header.setAttribute("aria-expanded", String(!expanded));
    panel.hidden = expanded;
    header.closest(".program-card")?.classList.toggle("is-open", !expanded);
  }

  function smoothScrollTo(id) {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // ----- 라이트박스 -----
  let lightboxEl = null;
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
        <p class="lightbox-caption"></p>
      </div>`;
    document.body.appendChild(lightboxEl);
    return lightboxEl;
  }

  function openLightbox(index) {
    const gallery = (window.siteContent && window.siteContent.gallery) || [];
    if (!gallery.length) return;
    const el = buildLightbox();
    lightboxIndex = (index + gallery.length) % gallery.length;
    updateLightbox();
    el.hidden = false;
    document.body.classList.add("lightbox-open");
  }

  function updateLightbox() {
    const gallery = (window.siteContent && window.siteContent.gallery) || [];
    const item = gallery[lightboxIndex];
    if (!lightboxEl || !item) return;
    const img = lightboxEl.querySelector(".lightbox-img");
    const caption = lightboxEl.querySelector(".lightbox-caption");
    img.src = item.image;
    img.alt = item.caption;
    caption.textContent = item.caption;
  }

  function closeLightbox() {
    if (!lightboxEl) return;
    lightboxEl.hidden = true;
    document.body.classList.remove("lightbox-open");
  }

  function stepLightbox(delta) {
    const gallery = (window.siteContent && window.siteContent.gallery) || [];
    if (!gallery.length) return;
    lightboxIndex = (lightboxIndex + delta + gallery.length) % gallery.length;
    updateLightbox();
  }

  document.addEventListener("click", (event) => {
    const programHeader = event.target.closest(".program-card-header");
    if (programHeader) {
      toggleProgramCard(programHeader);
      return;
    }

    const scrollTrigger = event.target.closest("[data-scroll]");
    if (scrollTrigger) {
      event.preventDefault();
      smoothScrollTo(scrollTrigger.getAttribute("data-scroll"));
      return;
    }

    const lightboxOpen = event.target.closest("[data-lightbox-open]");
    if (lightboxOpen) {
      openLightbox(Number(lightboxOpen.getAttribute("data-lightbox-open")));
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
    if (!lightboxEl || lightboxEl.hidden) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") stepLightbox(-1);
    if (event.key === "ArrowRight") stepLightbox(1);
  });
})();
