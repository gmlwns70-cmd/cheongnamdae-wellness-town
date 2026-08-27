/*
  청남대 웰니스타운 홈페이지 콘텐츠 데이터
  이 파일 하나에 홈페이지에 보이는 모든 글자/가격/링크/사진 목록이 들어 있습니다.
  ⚙️ 관리자 편집기에서 값을 바꾸고 "변경사항 다운로드"를 누르면
  이 객체와 같은 구조의 JSON 파일이 저장됩니다.
*/
window.siteContent = {
  meta: {
    title: "청남대웰니스타운 | 편백 배럴 찜질 체험",
    description: "청남대 웰니스산양삼주 담그기 체험타운은 충청북도 청주시 상당구 문의면산양삼주 담그기 체험에 위치한 편백 배럴 찜질 체험 공간입니다. 운영시간은 매일 09:00~21:00입니다."
  },

  business: {
    companyName: "청남대 웰니스타운",
    owner: "조동우",
    businessNumber: "233-88-01155",
    phone: "010-4924-3435",
    smsPhone: "010-4924-3435",
    email: "gmlwns70@gmail.com",
    address: "충청북도 청주시 상당구 문의면 미천리 638-1",
    hours: "매일 09:00~21:00",
    parking: "주차 가능(무료)"
  },

  hero: {
    logo: "assets/images/logo.webp",
    title: "청남대 웰니스타운",
    subtitle: "편백 향과 배럴 찜질을 중심으로 쉬어가는 체험 공간",
    badge: "매일 09:00~21:00 · 4부제 예약 · 주차 가능"
  },

  event: {
    title: "[10회권 구매 혜택]",
    period: "9월 말까지",
    benefit: "편백 피톤치드 체험권 10회 구매 시, 체험권 쿠폰 2매 추가 증정",
    image: "체험쿠폰이미지.jpg"
  },

  summaryCards: [
    {
      title: "편백 피톤치드 치유",
      desc: "은은한 편백나무 향과 숲속 맑은 공기 속에서 쉬어가는 체험입니다.",
      image: "assets/images/barrel-lounge.webp"
    },
    {
      title: "배럴 찜질방 휴식",
      desc: "둥근 목재 배럴 공간에서 온열 휴식을 즐기는 대표 체험입니다.",
      image: "assets/images/heater-room.webp"
    },
    {
      title: "가족 친화적 휴식",
      desc: "가족, 지인, 중장년 방문객이 편안하게 머물 수 있는 공간입니다.",
      image: "assets/images/view-flowers.webp"
    }
  ],

  programs: [
    {
      id: "hinoki",
      badge: "대표 체험",
      isTodo: false,
      name: "편백 피톤치드 치유체험",
      summary: "편백 향 가득한 배럴 찜질로 몸과 마음을 쉬어가는 대표 체험입니다.",
      duration: "약 3시간",
      price: "2인 40,000원, 3인 50,000원, 4인 60,000원, 추가인원 15,000원, 체험 예약시간은 1부(9시~12시), 2부(12시~15시), 3부(15시~18시), 4부(18시~21시)",
      target: "",
      image: "assets/images/barrel-lounge.webp",
      features: [
        "편백나무 소재의 배럴 찜질 공간에서 온열 휴식",
        "은은한 편백 향과 함께하는 실내 힐링 라운지",
        "따뜻한 내부 난로 공간에서 몸을 데우는 시간"
      ],
      prep: ["편한 복장", "찜질복·수건(미지참 시 현장 대여 5,000원)"],
      gallery: [
        "assets/images/barrel-lounge.webp",
        "assets/images/heater-room.webp",
        "assets/images/barrel-interior.webp"
      ],
      note: ""
    },
    {
      id: "forest",
      badge: "자연 체험",
      isTodo: false,
      name: "트래킹, 피톤치드 산책로",
      summary: "트래킹, 산책로를 따라 걷는 완만한 숲길 힐링 코스입니다.",
      duration: "약 1시간",
      price: "별도 체험비는 없습니다.",
      target: "걷기 편한 신발 착용을 권장합니다",
      image: "assets/images/mountain-view.webp",
      features: [
        "청남대 인근 대통령 산책로를 따라 걷는 숲길 코스",
        "피톤치드 가득한 숲에서 맑은 공기를 마시는 시간",
        "완만한 경사로 남녀노소 편안하게 걸을 수 있는 코스"
      ],
      prep: ["편한 신발", "물, 모자(계절에 따라 준비)"],
      gallery: [],
      note: ""
    },
    {
      id: "sansam-dig",
      badge: "신규",
      isTodo: true,
      name: "산양삼 캐기 체험",
      summary: "농장 대표와 함께하는 산양삼 캐기 체험입니다.",
      duration: "TODO: 소요시간 입력",
      price: "1인 10,000원 / 5~6년근, 2뿌리",
      target: "",
      image: "assets/images/forest-experience.webp",
      features: [],
      prep: ["TODO: 준비물을 입력해 주세요."],
      gallery: [],
      /* TODO: 산양삼 캐기 체험 소요시간, 대표 이미지 입력 */
      note: "TODO: 산양삼 캐기 체험 소요시간, 대표 이미지 입력"
    },
    {
      id: "sansam-wine",
      badge: "신규",
      isTodo: true,
      name: "산양삼주 담그기 체험",
      summary: "직접 산양삼주를 담가보는 체험입니다.",
      duration: "TODO: 소요시간 입력",
      price: "1인 15,000원/375ml, 1병",
            target: "",
      image: "assets/images/sansam-wine-making.jpg",
      features: [],
      prep: [],
      gallery: [],
      /* TODO: 산양삼주 담그기 체험 소요시간, 대표 이미지 입력 */
      note: "TODO: 산양삼주 담그기 체험 소요시간, 대표 이미지 입력"
    }
  ],

  pricing: {
    title: "이용요금",
    depositNote: "예약금 없이 현장 결제로 부담 없이 이용하실 수 있습니다.",
    basePlans: [
      { label: "2인 기준", price: 40000 },
      { label: "3인 기준", price: 50000 },
      { label: "4인 기준", price: 60000 }
    ],
    extraPersonLabel: "추가 1인",
    extraPersonPrice: 15000,
    rentals: [{ name: "찜질복·수건 대여", price: 5000 }],
    treats: [
      { name: "산삼식혜", price: 5000 },
      { name: "산삼꿀차", price: 5000 },
      { name: "산삼미숫가루", price: 5000 },
      { name: "산삼동동주", price: 10000 },
      { name: "컵라면", price: 4000 },
      { name: "구운계란", price: 2000 }
    ]
  },

   gallery: [],

  visitInfo: {
    parts: [
      { name: "1부", time: "09:00 ~ 12:00" },
      { name: "2부", time: "12:00 ~ 15:00" },
      { name: "3부", time: "15:00 ~ 18:00" },
      { name: "4부", time: "18:00 ~ 21:00" }
    ],
    address: "충청북도 청주시 상당구 문의면 미천리 638-1",
    hours: "매일 09:00~21:00",
    parking: "주차 가능(무료)",
    naverMapUrl: "https://map.naver.com/p/search/%EC%B6%A9%EC%B2%AD%EB%B6%81%EB%8F%84%20%EC%B2%AD%EC%A3%BC%EC%8B%9C%20%EC%83%81%EB%8B%B9%EA%B5%AC%20%EB%AC%B8%EC%9D%98%EB%A9%B4%20%EB%AF%B8%EC%B2%9C%EB%A6%AC%20638-1",
    kakaoMapUrl: "https://map.kakao.com/link/search/%EC%B6%A9%EC%B2%AD%EB%B6%81%EB%8F%84%20%EC%B2%AD%EC%A3%BC%EC%8B%9C%20%EC%83%81%EB%8B%B9%EA%B5%AC%20%EB%AC%B8%EC%9D%98%EB%A9%B4%20%EB%AF%B8%EC%B2%9C%EB%A6%AC%20638-1"
  },

  links: {
    kakaoChannel: "#kakao-channel-url",
    bookingForm: "https://forms.gle/XAQvZZRyChFnyE5C9",
    smartPlace: "https://map.naver.com/p/search/%EC%B2%AD%EB%82%A8%EB%8C%80%20%EC%9B%B0%EB%8B%88%EC%8A%A4%ED%83%80%EC%9A%B4",
    smartStore: "https://smartstore.naver.com/kfood_wild_ginseng",
    youtube: "https://youtube.com/@dongwoosansam",
    instagram: "https://instagram.com/forest_sauna_munui",
    naverBlog: "https://blog.naver.com/linkfactory70",
    privacyUrl: "privacy.html"
  }
};
