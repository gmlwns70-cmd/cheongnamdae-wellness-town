# 청남대웰니스타운 홈페이지

GitHub Pages에 바로 올릴 수 있는 정적 홈페이지입니다. 서버, 워드프레스, 데이터베이스를 사용하지 않습니다.

## 파일 구조

```text
cheongnamdae-wellness-town/
├── index.html
├── 404.html
├── privacy.html
├── favicon.png
├── robots.txt
├── sitemap.xml
├── README.md
└── assets/
    ├── css/style.css
    ├── js/config.js
    ├── js/script.js
    └── images/
        ├── hero-wellness.jpg
        ├── logo.webp
        ├── barrel-interior.webp
        ├── barrel-lounge.webp
        ├── heater-room.webp
        ├── view-flowers.webp
        ├── forest-experience.webp
        └── forest-guide.webp
```

## 가장 먼저 수정할 곳

`assets/js/config.js`에서 예약, 지도, SNS 링크를 바꿉니다.

```js
links: {
  booking: "",    // 예약 페이지
  googleForm: "", // 문의 폼
  smartPlace: "https://map.naver.com/p/search/청남대%20웰니스타운",
  smartPlaceBooking: "https://map.naver.com/p/search/청남대%20웰니스타운",
  smartStore: "https://smartstore.naver.com/kfood_wild_ginseng",
  kakao: "",      // 카카오톡 채널
  naverMap: "주소 검색 링크",
  kakaoMap: "주소 검색 링크",
  instagram: "https://instagram.com/forest_sauna_munui",
  youtube: "https://youtube.com/@dongwoosansam",
  naverBlog: "https://blog.naver.com/gmlwns70",
  phone: "010-4924-3435",
  sms: "010-4924-3435",
  email: "gmlwns70@gmail.com"
}
```

확정되지 않은 링크는 비워두세요. 버튼은 자동으로 준비 중 상태가 됩니다.

## 문구 수정

`index.html`에서 `수정 위치` 주석을 찾고 문장만 바꾸면 됩니다.

주의:
- 확인되지 않은 주소, 전화번호, 운영시간은 쓰지 마세요.
- 의료 효능, 질병 치료를 단정하는 표현은 쓰지 마세요.
- 개인정보 문구는 운영 전 최종 검토가 필요합니다.

## 개인정보 처리방침

`privacy.html`은 초안입니다. 실제 예약 폼, 카카오톡 문의, 전화/문자 접수 방식에 맞춰 보관 기간과 세부 문구를 확정해야 합니다.

## 이미지 교체

이미지는 `assets/images/`에 있습니다.

- 첫 화면 배경: `hero-wellness.jpg`
- 로고: `logo.webp`
- 소개 이미지: `barrel-interior.webp`
- 현장 사진: `barrel-lounge.webp`, `heater-room.webp`, `view-flowers.webp`, `forest-experience.webp`, `forest-guide.webp`
- 파비콘: `favicon.png`

같은 파일명으로 덮어쓰면 HTML을 고치지 않아도 됩니다.

## 프로그램 추가

`index.html`의 `program-grid` 안에 아래 블록을 복사해 추가합니다.

```html
<article class="program-item" data-reveal>
  <span>04</span>
  <h3>새 프로그램명</h3>
  <p>짧은 설명을 입력하세요.</p>
</article>
```

## GitHub Pages 배포

1. GitHub에서 `cheongnamdae-wellness-town` 저장소를 만듭니다.
2. 이 폴더 안의 파일을 저장소 루트에 업로드합니다.
3. `Settings` → `Pages`로 이동합니다.
4. `Deploy from a branch`를 선택합니다.
5. Branch는 `main`, Folder는 `/root`로 설정합니다.
6. 생성된 Pages 주소로 접속해 모바일과 버튼 링크를 확인합니다.

`.nojekyll` 파일은 GitHub Pages가 정적 파일을 그대로 배포하도록 두는 파일입니다. 삭제하지 마세요.

## 배포 전 확인

- `config.js`에 스마트플레이스, 지도, SNS, 블로그 링크 입력
- `index.html`의 임시 문구 확인
- `sitemap.xml`, `robots.txt`, `canonical`, `og:url`을 실제 주소로 변경
- `privacy.html`의 개인정보 보관 기간 검토
- 모바일에서 글자와 버튼이 겹치지 않는지 확인
- 의료적 표현, 과장 표현, 미확정 정보가 없는지 확인

## 아직 필요한 자료

- 정확한 네이버/카카오 장소 링크
- 준비물 및 안전 안내
- 개인정보 보관 기간

## 선택으로 추가할 자료

- 카카오톡 채널
- 예약 링크 또는 문의 폼
