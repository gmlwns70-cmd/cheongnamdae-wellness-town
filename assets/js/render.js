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

  const normalizePhone = (value) => (value || "").replace(/[^\d+]/g, "");

  function renderHero() {
    const el = document.getElementById("hero");
    if (!el) return;
    const c = window.siteContent;
    const kakaoUrl = c.links.kakaoChannel || "#kakao-channel-url";
    el.innerHTML = `
      <div class="hero-inner">
        <img class="hero-logo" src="${esc(c.hero.logo)}" alt="${esc(c.hero.title)} 로고">
        <p class="hero-eyebrow">CHEONGNAMDAE WELLNESS TOWN</p>
        <h1 class="hero-title">${esc(c.hero.title)}</h1>
        <p class="hero-subtitle">${esc(c.hero.subtitle)}</p>
        <p class="hero-badge">${esc(c.hero.badge)}</p>
        <div class="hero-actions">
          <a class="hero-btn hero-btn-primary" href="${esc(kakaoUrl)}" data-link="kakaoChannel">💬 카카오채널로 예약하기</a>
          <a class="hero-btn hero-btn-secondary" href="tel:${normalizePhone(c.business.phone)}" data-link="phone">📞 예약 전화</a>
          <a class="hero-btn hero-btn-outline" href="#programs" data-scroll="programs">🌿 체험 프로그램 보기</a>
        </div>
      </div>`;
  }

  function renderPrograms() {
    const el = document.getElementById("program-cards");
    if (!el) return;
    const programs = window.siteContent.programs || [];
    el.innerHTML = programs
      .map((p, i) => {
        const panelId = `program-panel-${p.id || i}`;
        const featureItems = (p.features || []).map((f) => `<li>${esc(f)}</li>`).join("");
        const prepItems = (p.prep || []).map((f) => `<li>${esc(f)}</li>`).join("");
        const galleryImgs = (p.gallery || [])
          .map((src) => `<img src="${esc(src)}" alt="${esc(p.name)} 관련 사진" loading="lazy">`)
          .join("");
        return `
      <article class="program-card${p.isTodo ? " program-card-todo" : ""}">
        <button class="program-card-header" type="button" aria-expanded="false" aria-controls="${panelId}">
          <img class="program-card-thumb" src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy">
          <span class="program-card-heading">
            <span class="program-card-badge">${esc(p.badge)}</span>
            <span class="program-card-name">${esc(p.name)}</span>
            <span class="program-card-summary">${esc(p.summary)}</span>
          </span>
          <span class="program-card-toggle" aria-hidden="true">자세히 보기 <i>▾</i></span>
        </button>
        <div class="program-card-panel" id="${panelId}" hidden>
          ${p.isTodo ? `<!-- TODO: ${esc(p.note)} -->\n          <p class="program-todo-note">⚠️ ${esc(p.note)}</p>` : ""}
          <dl class="program-card-meta">
            <div><dt>소요시간</dt><dd>${esc(p.duration)}</dd></div>
            <div><dt>가격</dt><dd>${esc(p.price)}</dd></div>
            <div><dt>추천 대상</dt><dd>${esc(p.target)}</dd></div>
          </dl>
          <h4>체험 내용</h4>
          <ul class="program-card-list">${featureItems}</ul>
          <h4>준비물</h4>
          <ul class="program-card-list">${prepItems}</ul>
          <div class="program-card-gallery">${galleryImgs}</div>
        </div>
      </article>`;
      })
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

  function renderVisitInfo() {
    const el = document.getElementById("visit-info-cards");
    if (!el) return;
    const v = window.siteContent.visitInfo;
    const partsHtml = v.parts.map((p) => `<li><strong>${esc(p.name)}</strong><span>${esc(p.time)}</span></li>`).join("");
    el.innerHTML = `
      <article class="info-card">
        <h3>📍 오시는 길</h3>
        <p>${esc(v.address)}</p>
        <div class="info-card-links">
          <a class="info-card-link" href="${esc(v.naverMapUrl)}" target="_blank" rel="noopener noreferrer">네이버지도</a>
          <a class="info-card-link" href="${esc(v.kakaoMapUrl)}" target="_blank" rel="noopener noreferrer">카카오맵</a>
        </div>
      </article>
      <article class="info-card">
        <h3>⏰ 운영시간</h3>
        <p>${esc(v.hours)}</p>
        <p class="info-card-sub">${esc(v.parking)}</p>
      </article>
      <article class="info-card">
        <h3>🎫 4부제 예약 시간</h3>
        <ul class="info-card-parts">${partsHtml}</ul>
      </article>`;
  }

  function renderFooter() {
    const c = window.siteContent;
    const kakaoUrl = c.links.kakaoChannel || "#kakao-channel-url";

    const actionsEl = document.getElementById("footer-actions");
    if (actionsEl) {
      actionsEl.innerHTML = `
        <a class="hero-btn hero-btn-primary" href="${esc(kakaoUrl)}" data-link="kakaoChannel">💬 카카오채널 예약</a>
        <a class="hero-btn hero-btn-secondary" href="tel:${normalizePhone(c.business.phone)}" data-link="phone">📞 전화 문의</a>
        <a class="hero-btn hero-btn-outline" href="sms:${normalizePhone(c.business.smsPhone)}" data-link="sms">✉️ 문자 문의</a>`;
    }

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
    renderVisitInfo();
    renderFooter();
    document.dispatchEvent(new CustomEvent("site:rendered"));
  }

  window.renderAll = renderAll;
  document.addEventListener("DOMContentLoaded", renderAll);
})();
