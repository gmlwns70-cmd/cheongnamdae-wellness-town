/* 청남대웰니스타운 링크/연락처 설정 파일
   수정 위치: 예약, 지도, SNS 링크가 확정되면 아래 값만 바꾸세요.
   빈 문자열("")은 아직 연결하지 않는 항목입니다.
*/
window.SITE_CONFIG = {
  brandName: "청남대 웰니스타운",
  tagline: "청남대 인근 편백 배럴 찜질과 숲 휴식",

  links: {
    booking: "https://forms.gle/XAQvZZRyChFnyE5C9",
    googleForm: "https://forms.gle/XAQvZZRyChFnyE5C9",
    smartPlace: "https://map.naver.com/p/search/%EC%B2%AD%EB%82%A8%EB%8C%80%20%EC%9B%B0%EB%8B%88%EC%8A%A4%ED%83%80%EC%9A%B4",
    smartPlaceBooking: "https://forms.gle/XAQvZZRyChFnyE5C9",
    smartStore: "https://smartstore.naver.com/kfood_wild_ginseng",
    kakao: "", // 추후 입력 필요: 카카오톡 채널 URL
    naverMap: "https://map.naver.com/p/search/%EC%B6%A9%EC%B2%AD%EB%B6%81%EB%8F%84%20%EC%B2%AD%EC%A3%BC%EC%8B%9C%20%EC%83%81%EB%8B%B9%EA%B5%AC%20%EB%AC%B8%EC%9D%98%EB%A9%B4%20%EB%AF%B8%EC%B2%9C%EB%A6%AC%20638-1",
    kakaoMap: "https://map.kakao.com/link/search/%EC%B6%A9%EC%B2%AD%EB%B6%81%EB%8F%84%20%EC%B2%AD%EC%A3%BC%EC%8B%9C%20%EC%83%81%EB%8B%B9%EA%B5%AC%20%EB%AC%B8%EC%9D%98%EB%A9%B4%20%EB%AF%B8%EC%B2%9C%EB%A6%AC%20638-1",
    instagram: "https://instagram.com/forest_sauna_munui",
    youtube: "https://youtube.com/@dongwoosansam",
    naverBlog: "https://blog.naver.com/linkfactory70",
    phone: "010-4924-3435",
    sms: "010-4924-3435",
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
    reservationPolicy: "4부제 예약 가능: 09:00~12:00 / 12:00~15:00 / 15:00~18:00 / 18:00~21:00 · 예약금 없음"
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
    .mobile-action-dock { display: none; }
    @media (max-width: 720px) {
      body { padding-bottom: 72px; }
      .trust-strip__inner { grid-template-columns: repeat(2, 1fr); }
      .trust-strip__item:nth-child(2) { border-right: 0; }
      .trust-strip__item:nth-child(-n+2) { border-bottom: 1px solid rgba(24,61,43,.12); }
      .mobile-action-dock { position: fixed; z-index: 90; left: 0; right: 0; bottom: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; padding: 10px 12px calc(10px + env(safe-area-inset-bottom)); background: rgba(251,247,237,.97); border-top: 1px solid rgba(24,61,43,.18); backdrop-filter: blur(14px); }
      .mobile-action-dock a { min-height: 48px; display: flex; align-items: center; justify-content: center; border-radius: 8px; font-weight: 900; }
      .mobile-action-dock__book { background: #d9b883; color: #0f291d; }
      .mobile-action-dock__call { background: #183d2b; color: #fff; }
    }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
    }
  `;
  document.head.appendChild(style);

  document.addEventListener("DOMContentLoaded", function () {
    const lead = document.querySelector(".hero .lead");
    if (lead) {
      lead.textContent = "청남대와 대청호 여행길에 편백 향, 배럴 찜질, 숲의 여유를 함께 경험해 보세요.";
    }

    const primaryBooking = document.querySelector('.hero [data-link="booking"]');
    if (primaryBooking) primaryBooking.textContent = "체험 예약하기";

    const hero = document.querySelector(".hero");
    if (hero && !document.querySelector(".trust-strip")) {
      const trustStrip = document.createElement("section");
      trustStrip.className = "trust-strip";
      trustStrip.setAttribute("aria-label", "방문 핵심 정보");
      trustStrip.innerHTML = `
        <div class="trust-strip__inner">
          <div class="trust-strip__item"><strong>청남대 인근</strong><span>문의면 자연 속 체험 공간</span></div>
          <div class="trust-strip__item"><strong>매일 운영</strong><span>09:00~21:00</span></div>
          <div class="trust-strip__item"><strong>4부제 예약</strong><span>원하는 시간대 선택</span></div>
          <div class="trust-strip__item"><strong>주차 가능</strong><span>가족·소규모 모임 문의</span></div>
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
          <h2>방문 전 자주 묻는 질문</h2>
          <details><summary>예약은 어떻게 하나요?</summary><p>홈페이지 예약폼을 작성하거나 전화·문자로 문의할 수 있습니다. 예약금은 받지 않습니다.</p></details>
          <details><summary>이용 가능한 시간은 언제인가요?</summary><p>매일 09:00~21:00 운영하며, 09~12시·12~15시·15~18시·18~21시의 4부제로 예약할 수 있습니다.</p></details>
          <details><summary>찜질복과 수건을 준비해야 하나요?</summary><p>직접 준비할 수 있으며, 현장 대여료는 5,000원으로 안내되어 있습니다.</p></details>
          <details><summary>가족이나 소규모 단체도 가능한가요?</summary><p>가족, 지인, 소규모 모임은 예약 전에 인원과 희망 시간을 문의해 주세요.</p></details>
        </div>`;
      contact.insertAdjacentElement("beforebegin", faq);
    }

    if (!document.querySelector(".mobile-action-dock")) {
      const dock = document.createElement("nav");
      dock.className = "mobile-action-dock";
      dock.setAttribute("aria-label", "모바일 빠른 문의");
      dock.innerHTML = `
        <a class="mobile-action-dock__book" href="${window.SITE_CONFIG.links.booking}">체험 예약</a>
        <a class="mobile-action-dock__call" href="tel:${window.SITE_CONFIG.links.phone.replace(/-/g, "")}">전화 문의</a>`;
      document.body.appendChild(dock);
    }
  });
})();