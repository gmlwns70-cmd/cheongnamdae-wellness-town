const config = window.SITE_CONFIG || {};
const links = config.links || {};

const setText = (selector, text) => {
  document.querySelectorAll(selector).forEach((node) => {
    node.textContent = text;
  });
};

const normalizePhone = (value) => (value || "").replace(/[^\d+]/g, "");

const applyLink = (selector, value, fallbackText) => {
  document.querySelectorAll(selector).forEach((node) => {
    if (value) {
      node.href = value;
      node.classList.remove("is-disabled");
      node.removeAttribute("aria-disabled");
    } else {
      node.href = "#pending-info";
      node.classList.add("is-disabled");
      node.setAttribute("aria-disabled", "true");
      if (fallbackText) node.textContent = fallbackText;
    }
  });
};

const initConfigBindings = () => {
  setText("[data-brand-name]", config.brandName || "청남대웰니스타운");
  setText("[data-tagline]", config.tagline || "편백 향이 머무는 힐링 공간");
  setText("[data-address]", config.business?.address || "추후 입력 필요");
  setText("[data-hours]", config.business?.hours || "추후 입력 필요");
  setText("[data-closed-days]", config.business?.closedDays || "추후 입력 필요");
  setText("[data-parking]", config.business?.parking || "추후 입력 필요");
  setText("[data-policy]", config.business?.reservationPolicy || "추후 입력 필요");
  setText("[data-company-name]", config.business?.companyName || config.brandName || "청남대웰니스타운");
  setText("[data-owner]", config.business?.owner || "추후 입력 필요");
  setText("[data-business-number]", config.business?.businessNumber || "추후 입력 필요");
  setText("[data-email-text]", links.email || "추후 입력 필요");

  applyLink("[data-link='booking']", links.booking || links.googleForm, "예약 링크 준비 중");
  applyLink("[data-link='kakao']", links.kakao, "카카오톡 준비 중");
  applyLink("[data-link='naverMap']", links.naverMap || links.kakaoMap, "지도 링크 준비 중");
  applyLink("[data-link='instagram']", links.instagram, "Instagram 준비 중");
  applyLink("[data-link='youtube']", links.youtube, "YouTube 준비 중");

  const phoneHref = links.phone ? `tel:${normalizePhone(links.phone)}` : "";
  const smsHref = links.sms ? `sms:${normalizePhone(links.sms)}` : "";
  const emailHref = links.email ? `mailto:${links.email}` : "";
  applyLink("[data-link='phone']", phoneHref, "전화번호 입력 필요");
  applyLink("[data-link='sms']", smsHref, "문자번호 입력 필요");
  applyLink("[data-link='email']", emailHref, "이메일 입력 필요");
  setText("[data-phone-text]", links.phone || "추후 입력 필요");
};

const initNavigation = () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("is-open", !expanded);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    });
  });
};

const initReveal = () => {
  const nodes = document.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window)) {
    nodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  nodes.forEach((node) => observer.observe(node));
};

document.addEventListener("DOMContentLoaded", () => {
  initConfigBindings();
  initNavigation();
  initReveal();
});
