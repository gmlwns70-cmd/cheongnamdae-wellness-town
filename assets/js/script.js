(() => {
  const cfg = window.WELLNESS_CONFIG || {};
  document.querySelectorAll('[data-phone-text]').forEach(el => el.textContent = cfg.phoneDisplay || '전화 문의');
  document.querySelectorAll('[data-phone-link]').forEach(el => el.href = cfg.phoneLink || '#');
  document.querySelectorAll('[data-address]').forEach(el => el.textContent = cfg.address || '주소 준비 중');
  document.querySelectorAll('[data-hours]').forEach(el => el.textContent = cfg.hours || '운영시간 문의');
  document.querySelectorAll('[data-price]').forEach(el => el.textContent = cfg.price || '이용요금 문의');
  const links = { kakao: cfg.kakaoUrl, reserve: cfg.reservationUrl, place: cfg.naverPlaceUrl, instagram: cfg.instagramUrl, youtube: cfg.youtubeUrl };
  Object.entries(links).forEach(([key, url]) => {
    document.querySelectorAll(`[data-link="${key}"]`).forEach(el => {
      if (url) el.href = url;
      else { el.classList.add('is-disabled'); el.addEventListener('click', e => { e.preventDefault(); alert('해당 연결 주소는 준비 중입니다. 전화로 문의해 주세요.'); }); }
    });
  });

  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.querySelector('.site-nav');
  menuBtn?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('.site-nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  }), { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();
