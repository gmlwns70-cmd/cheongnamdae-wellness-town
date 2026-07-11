(() => {
  const cfg = window.SITE_CONFIG || {};
  const digits = (cfg.phone || '').replace(/\D/g, '');
  document.querySelectorAll('[data-link]').forEach(el => {
    const key = el.dataset.link;
    let value = cfg[key];
    if (key === 'phone' && digits) value = `tel:${digits}`;
    if (value && value !== '#') el.href = value;
    else if (key !== 'phone') { el.addEventListener('click', e => { e.preventDefault(); alert('연결 주소를 준비 중입니다. config.js에 실제 링크를 입력해 주세요.'); }); }
  });
  document.querySelectorAll('[data-text]').forEach(el => {
    const value = cfg[el.dataset.text];
    if (value) el.textContent = value;
  });
  document.getElementById('year').textContent = new Date().getFullYear();
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); toggle?.setAttribute('aria-expanded','false'); }));
  const io = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);} }), {threshold:.13});
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();
