/*
  siteContent 객체를 실제 화면 HTML로 그려주는 렌더링 함수 모음입니다.
  값이 바뀌면(관리자 편집기 포함) renderAll()을 다시 호출해 화면을 새로고침 없이 갱신합니다.
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

  function renderHero() {
    const el = document.getElementById("hero");
    if (!el) return;
    const c = window.siteContent;
    el.innerHTML = `
      <div class="hero-inner">
        <p class="hero-eyebrow">CHEONGNAMDAE WELLNESS TOWN</p>
        <h1 class="hero-title">${esc(c.hero.title)}</h1>
      </div>`;
  }

  function renderPrograms() {
    const el = document.getElementById("program-cards");
    if (!el) return;
    const programs = window.siteContent.programs || [];
    el.innerHTML = programs
      .map(
        (p, i) => `
      <button type="button" class="program-tile${p.isTodo ? " program-tile-todo" : ""}" data-program-open="${i}" aria-label="${esc(p.name)} 자세히 보기">
        <img class="program-tile-img" src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy">
        <span class="program-tile-overlay" aria-hidden="true"></span>
        <span class="program-tile-badge">${esc(p.badge)}</span>
        <span class="program-tile-body">
          <span class="program-tile-name">${esc(p.name)}</span>
          <span class="program-tile-summary">${esc(p.summary)}</span>
        </span>
      </button>`
      )
      .join("");
  }

  function renderGallery() {
    const el = document.getElementById("gallery-grid");
    if (!el) return;
    const items = window.siteContent.gallery || [];
    el.innerHTML = items
      .map(
        (item, i) => `
      <figure class="gallery-item" data-index="${i}">
        <button type="button" class="gallery-item-btn" data-lightbox-open="${i}" aria-label="${esc(item.caption)} 사진 크게 보기">
          <img src="${esc(item.image)}" alt="${esc(item.caption)}" loading="lazy">
        </button>
        <figcaption>${esc(item.caption)}</figcaption>
      </figure>`
      )
      .join("");
  }

  function renderFooter() {
    const c = window.siteContent;

    const channelsEl = document.getElementById("footer-channels");
    if (channelsEl) {
      const channels = [
        { label: "스마트플레이스", href: c.links.smartPlace },
        { label: "스마트스토어", href: c.links.smartStore },
        { label: "YouTube", href: c.links.youtube },
        { label: "Instagram", href: c.links.instagram },
        { label: "네이버블로그", href: c.links.naverBlog }
      ];
      channelsEl.innerHTML = channels
        .map((ch) =>
          ch.href
            ? `<a href="${esc(ch.href)}" target="_blank" rel="noopener noreferrer">${esc(ch.label)}</a>`
            : `<span class="is-disabled">${esc(ch.label)} 준비중</span>`
        )
        .join("");
    }

    const bizEl = document.getElementById("footer-business");
    if (bizEl) {
      bizEl.innerHTML = `
        <strong>${esc(c.business.companyName)}</strong>
        <p>대표자: ${esc(c.business.owner)} · 사업자등록번호: ${esc(c.business.businessNumber)}</p>
        <p>전화: ${esc(c.business.phone)} · 이메일: ${esc(c.business.email)}</p>
        <p>주소: ${esc(c.business.address)}</p>
        <a class="footer-privacy-link" href="${esc(c.links.privacyUrl)}">개인정보 처리방침</a>`;
    }
  }

  function renderMeta() {
    const c = window.siteContent.meta;
    if (c.title) document.title = c.title;
    const descTag = document.querySelector('meta[name="description"]');
    if (descTag && c.description) descTag.setAttribute("content", c.description);
  }

  function renderAll() {
    renderMeta();
    renderHero();
    renderPrograms();
    renderGallery();
    renderFooter();
    document.dispatchEvent(new CustomEvent("site:rendered"));
  }

  window.renderAll = renderAll;
  document.addEventListener("DOMContentLoaded", renderAll);
})();
