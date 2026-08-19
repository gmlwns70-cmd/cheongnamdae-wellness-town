const config = window.SITE_CONFIG || {};
const links = config.links || {};

const setText = (selector, text) => {
  document.querySelectorAll(selector).forEach((node) => {
    node.textContent = text;
  });
};

const normalizePhone = (value) => (value || "").replace(/[^\d+]/g, "");
const isExternalLink = (value) => /^https?:\/\//.test(value || "");

const setHidden = (node, hidden) => {
  node.hidden = hidden;
  if (hidden) {
    node.setAttribute("aria-hidden", "true");
    node.setAttribute("tabindex", "-1");
  } else {
    node.removeAttribute("aria-hidden");
    node.removeAttribute("tabindex");
  }
};

const applyLink = (selector, value, options = {}) => {
  const { fallbackText, hideIfMissing = false } = options;

  document.querySelectorAll(selector).forEach((node) => {
    if (value) {
      node.href = value;
      node.classList.remove("is-disabled");
      node.removeAttribute("aria-disabled");
      setHidden(node, false);
      if (isExternalLink(value)) {
        node.target = "_blank";
        node.rel = "noopener noreferrer";
      } else {
        node.removeAttribute("target");
        node.removeAttribute("rel");
      }
      return;
    }

    if (hideIfMissing) {
      setHidden(node, true);
      const group = node.closest("[data-action-group-item]");
      if (group) setHidden(group, true);
      return;
    }

    node.href = "#pending-info";
    node.classList.add("is-disabled");
    node.setAttribute("aria-disabled", "true");
    node.removeAttribute("target");
    node.removeAttribute("rel");
    if (fallbackText) node.textContent = fallbackText;
  });
};

const getReservationConfigStatus = (siteConfig = config) => {
  const siteLinks = siteConfig.links || {};
  const missingKeys = [];
  if (!siteLinks.kakaoChannel) missingKeys.push("KAKAO_CHANNEL_URL");
  if (!siteLinks.kakaoChannelChat) missingKeys.push("KAKAO_CHANNEL_CHAT_URL");
  if (!siteLinks.kakaoBooking) missingKeys.push("KAKAO_BOOKING_URL");
  if (!siteLinks.kakaoGroupInquiry) missingKeys.push("KAKAO_GROUP_INQUIRY_URL");
  if (!siteLinks.phone) missingKeys.push("RESERVATION_PHONE");
  return {
    missingKeys,
    hasBooking: Boolean(siteLinks.kakaoBooking),
    hasPhone: Boolean(siteLinks.phone),
    hasChat: Boolean(siteLinks.kakaoChannelChat)
  };
};

const emitAnalyticsEvent = (eventName, payload = {}) => {
  if (!eventName) return;

  const detail = { eventName, payload };
  window.dispatchEvent(new CustomEvent("site:analytics", { detail }));

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: eventName, ...payload });
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, payload);
  }

  if (typeof window.SITE_ANALYTICS?.track === "function") {
    window.SITE_ANALYTICS.track(eventName, payload);
  }
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
  setText("[data-phone-text]", links.phone || "추후 입력 필요");
  setText("[data-assistance-note]", config.business?.reservationAssistanceNote || "카카오톡이 어려우시면 전화로 예약을 도와드립니다.");
  setText("[data-operator-notice]", config.business?.operatorNotice || "민간 운영 웰니스 체험시설입니다.");

  applyLink("[data-link='reservationHub']", links.reservationHub || links.booking, { fallbackText: "예약 안내 준비 중" });
  applyLink("[data-link='booking']", links.booking || links.reservationHub, { fallbackText: "예약 안내 준비 중" });
  applyLink("[data-link='smartPlace']", links.smartPlace, { fallbackText: "스마트플레이스 준비 중" });
  applyLink("[data-link='smartStore']", links.smartStore, { fallbackText: "스마트스토어 준비 중" });
  applyLink("[data-link='kakaoChannel']", links.kakaoChannel, { hideIfMissing: true });
  applyLink("[data-link='kakaoChannelChat']", links.kakaoChannelChat, { hideIfMissing: true });
  applyLink("[data-link='kakaoBooking']", links.kakaoBooking, { hideIfMissing: true });
  applyLink("[data-link='kakaoGroupInquiry']", links.kakaoGroupInquiry || links.kakaoChannelChat, { hideIfMissing: true });
  applyLink("[data-link='naverMap']", links.naverMap || links.kakaoMap, { fallbackText: "지도 링크 준비 중" });
  applyLink("[data-link='kakaoMap']", links.kakaoMap || links.naverMap, { fallbackText: "지도 링크 준비 중" });
  applyLink("[data-link='instagram']", links.instagram, { fallbackText: "Instagram 준비 중" });
  applyLink("[data-link='youtube']", links.youtube, { fallbackText: "YouTube 준비 중" });
  applyLink("[data-link='naverBlog']", links.naverBlog, { fallbackText: "네이버블로그 준비 중" });

  const phoneHref = links.phone ? `tel:${normalizePhone(links.phone)}` : "";
  const smsHref = links.sms ? `sms:${normalizePhone(links.sms)}` : "";
  const emailHref = links.email ? `mailto:${links.email}` : "";
  applyLink("[data-link='phone']", phoneHref, { hideIfMissing: true, fallbackText: "전화번호 입력 필요" });
  applyLink("[data-link='sms']", smsHref, { hideIfMissing: true, fallbackText: "문자번호 입력 필요" });
  applyLink("[data-link='email']", emailHref, { fallbackText: "이메일 입력 필요" });
};

const initReservationMenu = () => {
  document.querySelectorAll(".site-nav a").forEach((link) => {
    if (link.textContent.trim() === "예약·상담") {
      link.href = "reservation-management.html";
    }
  });
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

const initAnalyticsBindings = () => {
  document.querySelectorAll("[data-analytics-event]").forEach((node) => {
    node.addEventListener("click", () => {
      emitAnalyticsEvent(node.dataset.analyticsEvent, {
        location: node.dataset.analyticsLocation || "site"
      });
    });
  });
};

const initReservationStatus = () => {
  const status = getReservationConfigStatus();
  document.querySelectorAll("[data-config-alert]").forEach((node) => {
    if (!status.missingKeys.length) {
      setHidden(node, true);
      return;
    }

    setHidden(node, false);
    node.innerHTML = `
      <strong>운영자 설정 필요</strong>
      <p>아래 값이 비어 있는 항목은 버튼을 숨겨 두었습니다.</p>
      <ul>${status.missingKeys.map((key) => `<li>${key}</li>`).join("")}</ul>`;
  });
};

window.__SITE_TEST_HOOKS__ = {
  normalizePhone,
  isExternalLink,
  getReservationConfigStatus
};

document.addEventListener("DOMContentLoaded", () => {
  initConfigBindings();
  initReservationMenu();
  initNavigation();
  initReveal();
  initAnalyticsBindings();
  initReservationStatus();
});
