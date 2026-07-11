(() => {
  const c = window.SITE_CONFIG || {};
  document.querySelectorAll('[data-link="phone"]').forEach(a => a.href = c.phoneHref || '#');
  document.querySelectorAll('[data-link="reservation"]').forEach(a => a.href = c.reservationUrl || '#contact');
  document.querySelectorAll('[data-link="kakao"]').forEach(a => a.href = c.kakaoUrl || '#contact');
  document.querySelectorAll('[data-link="map"]').forEach(a => { a.href = c.mapUrl || '#'; a.target = '_blank'; a.rel = 'noopener'; });
  document.querySelectorAll('[data-text="phone"]').forEach(el => el.textContent = c.phoneDisplay || '');
  document.querySelectorAll('[data-text="address"]').forEach(el => el.textContent = c.address || '');
  document.querySelectorAll('[data-text="hours"]').forEach(el => el.textContent = c.hours || '');
  document.querySelectorAll('[data-text="email"]').forEach(el => el.textContent = c.email || '');
  const btn = document.querySelector('.menu-btn'); const nav = document.querySelector('.nav');
  if (btn && nav) btn.addEventListener('click', () => { const open = nav.classList.toggle('open'); btn.setAttribute('aria-expanded', open); });
  document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => nav?.classList.remove('open')));
  const io = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('show')), { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();
