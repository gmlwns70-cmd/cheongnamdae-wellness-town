(() => {
  const cfg = window.SITE_CONFIG || {};
  const digits = (cfg.phone || "").replace(/\D/g, "");
  document.querySelectorAll("[data-phone-text]").forEach(el => el.textContent = cfg.phone || "전화 문의");
  document.querySelectorAll("[data-phone-link]").forEach(el => {
    el.href = digits ? `tel:${digits}` : "#";
    if (!digits) el.classList.add("is-disabled");
  });
  document.querySelectorAll("[data-address]").forEach(el => el.textContent = cfg.address || "주소 추후 입력");
  document.querySelectorAll("[data-hours]").forEach(el => el.textContent = cfg.hours || "사전 예약제");
  document.querySelectorAll("[data-price]").forEach(el => el.textContent = cfg.price || "상담 안내");
  document.querySelectorAll("[data-link]").forEach(el => {
    const key = el.dataset.link;
    const url = cfg[key];
    if (url) {
      el.href = url;
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    } else if (el.getAttribute("href") === "#") {
      el.classList.add("is-disabled");
      el.addEventListener("click", event => {
        event.preventDefault();
        alert("연결 주소가 아직 등록되지 않았습니다. 전화로 문의해 주세요.");
      });
    }
  });
  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector(".site-nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.textContent = open ? "✕" : "☰";
    });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      nav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.textContent = "☰";
    }));
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
  const topBtn = document.querySelector(".float-btn.top");
  if (topBtn) {
    topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    window.addEventListener("scroll", () => topBtn.classList.toggle("show", window.scrollY > 600));
  }
})();
