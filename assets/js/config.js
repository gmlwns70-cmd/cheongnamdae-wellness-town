/* 청남대웰니스타운 링크/연락처 설정 파일
   수정 위치: 예약, 지도, SNS, 후기 링크가 확정되면 아래 값만 바꾸세요.
   빈 문자열("")은 아직 연결하지 않는 항목입니다.
   정적 사이트이므로 필요하면 window.SITE_RUNTIME_OVERRIDES에 같은 키를 넣어 런타임 덮어쓰기를 할 수 있습니다.
*/
const SITE_RUNTIME_OVERRIDES = window.SITE_RUNTIME_OVERRIDES || {};
const NAVER_REVIEW_URL = "https://m.place.naver.com/my/checkin";
const GOOGLE_REVIEW_URL = "https://g.page/r/CctFkN-78iVREBM/review";
const GOOGLE_FORM_ROLLBACK_URL = "https://forms.gle/XAQvZZRyChFnyE5C9";

const KAKAO_CHANNEL_URL = SITE_RUNTIME_OVERRIDES.KAKAO_CHANNEL_URL || "http://pf.kakao.com/_eWZSX";
const KAKAO_CHANNEL_CHAT_URL = SITE_RUNTIME_OVERRIDES.KAKAO_CHANNEL_CHAT_URL || "http://pf.kakao.com/_eWZSX/chat";
const KAKAO_BOOKING_URL = SITE_RUNTIME_OVERRIDES.KAKAO_BOOKING_URL || "";
const KAKAO_GROUP_INQUIRY_URL = SITE_RUNTIME_OVERRIDES.KAKAO_GROUP_INQUIRY_URL || KAKAO_CHANNEL_CHAT_URL;
const RESERVATION_PHONE = SITE_RUNTIME_OVERRIDES.RESERVATION_PHONE || "010-4924-3435";

window.NAVER_REVIEW_URL = NAVER_REVIEW_URL;
window.GOOGLE_REVIEW_URL = GOOGLE_REVIEW_URL;

window.SITE_CONFIG = {
  brandName: "청남대 웰니스타운",
  tagline: "청남대 인근 숲 휴식과 온열 체험",

  links: {
    reservationHub: "reservation-management.html",
    booking: "reservation-management.html",
    googleFormRollback: GOOGLE_FORM_ROLLBACK_URL,
    reviewPage: "review.html",
    naverReview: NAVER_REVIEW_URL,
    googleReview: GOOGLE_REVIEW_URL,
    smartPlace: "https://map.naver.com/p/search/%EC%B2%AD%EB%82%A8%EB%8C%80%20%EC%9B%B0%EB%8B%88%EC%8A%A4%ED%83%80%EC%9A%B4",
    smartStore: "https://smartstore.naver.com/kfood_wild_ginseng",
    kakaoChannel: KAKAO_CHANNEL_URL,
    kakaoChannelChat: KAKAO_CHANNEL_CHAT_URL,
    kakaoBooking: KAKAO_BOOKING_URL,
    kakaoGroupInquiry: KAKAO_GROUP_INQUIRY_URL,
    naverMap: "https://map.naver.com/p/search/%EC%B6%A9%EC%B2%AD%EB%B6%81%EB%8F%84%20%EC%B2%AD%EC%A3%BC%EC%8B%9C%20%EC%83%81%EB%8B%B9%EA%B5%AC%20%EB%AC%B8%EC%9D%98%EB%A9%B4%20%EB%AF%B8%EC%B2%9C%EB%A6%AC%20638-1",
    kakaoMap: "https://map.kakao.com/link/search/%EC%B6%A9%EC%B2%AD%EB%B6%81%EB%8F%84%20%EC%B2%AD%EC%A3%BC%EC%8B%9C%20%EC%83%81%EB%8B%B9%EA%B5%AC%20%EB%AC%B8%EC%9D%98%EB%A9%B4%20%EB%AF%B8%EC%B2%9C%EB%A6%AC%20638-1",
    instagram: "https://instagram.com/forest_sauna_munui",
    youtube: "https://youtube.com/@dongwoosansam",
    naverBlog: "https://blog.naver.com/linkfactory70",
    phone: RESERVATION_PHONE,
    sms: RESERVATION_PHONE,
    email: "gmlwns70@gmail.com"
  },

  business: {
    companyName: "청남대 웰니스타운",
    owner: "조동우",
    businessNumber: "233-88-01155",
    address: "충청북도 청주시 상당구 문의면 미천리 638-1",
    hours: "매일 09:00~21:00",
    closedDays: "휴무일 없음",
    parking: "주차 가능",
    reservationPolicy: "카카오톡 상담 우선 · 정형상품은 카카오 예약하기 운영 · 카카오톡이 어려우시면 전화 예약 도움 제공",
    reservationAssistanceNote: "카카오톡이 어려우시면 전화로 예약을 도와드립니다.",
    operatorNotice: "청남대 관광권역에 위치한 민간 운영 웰니스 체험시설입니다."
  }
};

(function enhanceConversionExperience() {
  const style = document.createElement("style");
  style.textContent = `
    .trust-strip { background: #fff; border-bottom: 1px solid rgba(24,61,43,.18); }
    .trust-strip__inner { width: min(1120px, calc(100% - 32px)); margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); }
    .trust-strip__item { padding: 18px 14px; text-align: center; border-right: 1px solid rgba(24,61,43,.12); }
    .trust-strip__item:last-child { border-right: 0; }
    .trust-strip__item strong { display: block; color: #183d2b; font-size: 16px; }
    .trust-strip__item span { color: #68675e; font-size: 13px; }
    .quick-faq { width: min(1120px, calc(100% - 32px)); margin: 0 auto; padding: 80px 0; }
    .quick-faq h2 { margin: 0 0 24px; color: #0f291d; font-family: "Noto Serif KR", serif; font-size: clamp(30px, 5vw, 48px); }
    .quick-faq details { border-top: 1px solid rgba(24,61,43,.18); padding: 18px 0; }
    .quick-faq details:last-child { border-bottom: 1px solid rgba(24,61,43,.18); }
    .quick-faq summary { cursor: pointer; font-weight: 800; color: #183d2b; }
    .quick-faq p { margin: 12px 0 0; color: #68675e; }
    .review-home-section { background: #fbf7ed; }
    .review-home-panel { width: min(1120px, calc(100% - 32px)); margin: 0 auto; padding: 72px 0; display: grid; grid-template-columns: 1fr auto; gap: 28px; align-items: center; border-top: 1px solid rgba(24,61,43,.18); }
    .review-home-panel h2 { margin: 0; color: #0f291d; font-family: "Noto Serif KR", serif; font-size: clamp(28px, 4.6vw, 46px); line-height: 1.18; }
    .review-home-panel p { max-width: 680px; margin: 14px 0 0; color: #68675e; font-size: 17px; }
    .review-home-panel .button { min-width: 190px; }
    .footer-links a[data-review-link] { color: #f5dfb6; font-weight: 900; }
    .mobile-action-dock { display: none; }
    @media (max-width: 720px) {
      body { padding-bottom: 82px; }
      .trust-strip__inner { grid-template-columns: repeat(2, 1fr); }
      .trust-strip__item:nth-child(2) { border-right: 0; }
      .trust-strip__item:nth-child(-n+2) { border-bottom: 1px solid rgba(24,61,43,.12); }
      .review-home-panel { grid-template-columns: 1fr; padding: 54px 0; }
      .review-home-panel .button { width: 100%; min-height: 54px; }
      .mobile-action-dock { position: fixed; z-index: 90; left: 0; right: 0; bottom: 0; display: grid; grid-template-columns: repeat(var(--dock-columns, 3), 1fr); gap: 8px; padding: 10px 10px calc(10px + env(safe-area-inset-bottom)); background: rgba(251,247,237,.97); border-top: 1px solid rgba(24,61,43,.18); backdrop-filter: blur(14px); }
      .mobile-action-dock a { min-height: 54px; display: flex; align-items: center; justify-content: center; border-radius: 8px; font-weight: 900; font-size: 14px; text-align: center; }
      .mobile-action-dock__talk { background: #d9b883; color: #0f291d; }
      .mobile-action-dock__booking { background: #fff; color: #183d2b; border: 1px solid rgba(24,61,43,.2); }
      .mobile-action-dock__call { background: #183d2b; color: #fff; }
    }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
    }
  `;
  document.head.appendChild(style);

  const toLinkAttrs = (href) => (/^https?:\/\//.test(href) ? ' target="_blank" rel="noopener noreferrer"' : '');

  document.addEventListener("DOMContentLoaded", function () {
    const reviewPage = window.SITE_CONFIG.links.reviewPage || "review.html";
    const lead = document.querySelector(".hero .lead");
    if (lead) {
      lead.textContent = "청남대와 대청호 여행길에 숲 휴식, 온열 체험, 직원 도움 예약을 한 번에 안내합니다.";
    }

    const primaryChat = document.querySelector('[data-link="kakaoChannelChat"]');
    if (primaryChat) primaryChat.textContent = "카카오톡으로 예약·상담";

    const nav = document.querySelector(".site-nav");
    if (nav && !nav.querySelector('[href="review.html"]')) {
      const reviewNavLink = document.createElement("a");
      reviewNavLink.href = reviewPage;
      reviewNavLink.textContent = "후기 남기기";
      nav.appendChild(reviewNavLink);
    }

    const hero = document.querySelector(".hero");
    if (hero && !document.querySelector(".trust-strip")) {
      const trustStrip = document.createElement("section");
      trustStrip.className = "trust-strip";
      trustStrip.setAttribute("aria-label", "방문 핵심 정보");
      trustStrip.innerHTML = `
        <div class="trust-strip__inner">
          <div class="trust-strip__item"><strong>직원 도움 예약</strong><span>카카오톡·전화로 바로 상담</span></div>
          <div class="trust-strip__item"><strong>개인 예약 분리</strong><span>정형상품은 카카오 예약하기 운영</span></div>
          <div class="trust-strip__item"><strong>매일 운영</strong><span>09:00~21:00 안내</span></div>
          <div class="trust-strip__item"><strong>주차 가능</strong><span>가족·소규모·단체 문의</span></div>
        </div>`;
      hero.insertAdjacentElement("afterend", trustStrip);
    }

    const contact = document.querySelector("#contact");
    if (contact && !document.querySelector("#faq")) {
      const faq = document.createElement("section");
      faq.id = "faq";
      faq.className = "section section-alt";
      faq.innerHTML = `
        <div class="quick-faq">
          <p class="section-kicker">FAQ</p>
          <h2>예약 전 자주 묻는 질문</h2>
          <details><summary>예약은 어떻게 하나요?</summary><p>개인·가족 예약은 카카오 예약하기를, 단체·맞춤 문의는 카카오채널 1:1 상담을 우선 안내합니다. 카카오톡이 어려우시면 전화로 예약을 도와드립니다.</p></details>
          <details><summary>이용 가능한 시간은 언제인가요?</summary><p>매일 09:00~21:00 운영하며, 09~12시·12~15시·15~18시·18~21시 기준으로 상담 후 예약을 확정합니다.</p></details>
          <details><summary>단체나 기관 방문도 가능한가요?</summary><p>파크골프 동호회, 기업 워크숍, 공공기관 연수, 여행사 문의는 직원이 일정과 인원을 확인한 뒤 별도 상담으로 안내합니다.</p></details>
          <details><summary>찜질복과 수건은 어떻게 준비하나요?</summary><p>이용 전 안내 메시지나 전화 상담으로 준비물과 현장 안내를 다시 안내해 드립니다.</p></details>
        </div>`;
      contact.insertAdjacentElement("beforebegin", faq);
    }

    if (contact && !document.querySelector("#visit-review")) {
      const reviewSection = document.createElement("section");
      reviewSection.id = "visit-review";
      reviewSection.className = "review-home-section";
      reviewSection.setAttribute("aria-label", "방문 후기 남기기");
      reviewSection.innerHTML = `
        <div class="review-home-panel" data-reveal>
          <div>
            <p class="section-kicker">VISIT REVIEW</p>
            <h2>오늘의 힐링은 어떠셨나요?</h2>
            <p>솔직한 방문 경험을 들려주세요. 고객님의 의견은 서비스 개선에 소중하게 활용됩니다.</p>
          </div>
          <a class="button button-dark" href="${reviewPage}" aria-label="청남대 웰니스타운 방문 후기 남기기">방문 후기 남기기</a>
        </div>`;
      contact.insertAdjacentElement("beforebegin", reviewSection);
    }

    const footerLinks = document.querySelector(".footer-links");
    if (footerLinks && !footerLinks.querySelector("[data-review-link]")) {
      const reviewFooterLink = document.createElement("a");
      reviewFooterLink.href = reviewPage;
      reviewFooterLink.textContent = "방문 후기 남기기";
      reviewFooterLink.setAttribute("data-review-link", "true");
      footerLinks.insertBefore(reviewFooterLink, footerLinks.firstChild);
    }

    if (!document.querySelector(".mobile-action-dock")) {
      const dockActions = [];
      if (window.SITE_CONFIG.links.kakaoChannelChat) {
        dockActions.push(`<a class="mobile-action-dock__talk" href="${window.SITE_CONFIG.links.kakaoChannelChat}" data-link="kakaoChannelChat" data-analytics-event="reservation_kakao_chat_click" aria-label="카카오톡으로 예약 및 상담하기"${toLinkAttrs(window.SITE_CONFIG.links.kakaoChannelChat)}>카카오 상담</a>`);
      }
      if (window.SITE_CONFIG.links.kakaoBooking) {
        dockActions.push(`<a class="mobile-action-dock__booking" href="${window.SITE_CONFIG.links.kakaoBooking}" data-link="kakaoBooking" data-analytics-event="reservation_kakao_booking_click" aria-label="카카오 예약하기에서 날짜와 가격 보기"${toLinkAttrs(window.SITE_CONFIG.links.kakaoBooking)}>날짜·가격</a>`);
      }
      if (window.SITE_CONFIG.links.phone) {
        const normalizedPhone = window.SITE_CONFIG.links.phone.replace(/[^\d+]/g, "");
        dockActions.push(`<a class="mobile-action-dock__call" href="tel:${normalizedPhone}" data-link="phone" data-analytics-event="reservation_phone_click" aria-label="전화로 예약 도움받기">전화 도움</a>`);
      }

      if (dockActions.length) {
        const dock = document.createElement("nav");
        dock.className = "mobile-action-dock";
        dock.setAttribute("aria-label", "모바일 예약 빠른 메뉴");
        dock.style.setProperty("--dock-columns", String(dockActions.length));
        dock.innerHTML = dockActions.join("");
        document.body.appendChild(dock);
      }
    }
  });
})();
