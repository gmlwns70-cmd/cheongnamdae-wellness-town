const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8');

const indexHtml = read('index.html');
const reservationHtml = read('reservation-management.html');
const configSource = read('assets/js/config.js');
const scriptSource = read('assets/js/script.js');

const makeContext = () => {
  const noop = () => {};
  const documentStub = {
    head: { appendChild: noop },
    body: { appendChild: noop },
    createElement: () => ({ style: {}, setAttribute: noop, appendChild: noop, innerHTML: '', className: '' }),
    addEventListener: noop,
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null
  };

  const windowStub = {
    SITE_RUNTIME_OVERRIDES: {},
    addEventListener: noop,
    dispatchEvent: noop,
    dataLayer: []
  };

  return {
    window: windowStub,
    document: documentStub,
    CustomEvent: function CustomEvent(name, init) {
      this.name = name;
      this.detail = init?.detail;
    },
    console
  };
};

const context = makeContext();
vm.createContext(context);
vm.runInContext(configSource, context);
vm.runInContext(scriptSource, context);

const hooks = context.window.__SITE_TEST_HOOKS__;
assert.ok(hooks, 'test hooks should be exposed');

assert.equal(hooks.normalizePhone('010-4924-3435'), '01049243435');
assert.equal(hooks.isExternalLink('http://pf.kakao.com/_eWZSX/chat'), true);
assert.equal(hooks.isExternalLink('tel:01049243435'), false);

const status = hooks.getReservationConfigStatus(context.window.SITE_CONFIG);
assert.ok(status.missingKeys.includes('KAKAO_BOOKING_URL'), 'booking URL should be flagged when unset');
assert.equal(status.hasChat, true, 'chat link should be configured');
assert.equal(status.hasPhone, true, 'phone should be configured');

[
  '카카오톡으로 예약·상담',
  '예약 가능한 날짜·가격 보기',
  '단체·기관 예약 문의',
  '전화로 예약 도움받기'
].forEach((label) => {
  assert.ok(indexHtml.includes(label), `index should include ${label}`);
  assert.ok(reservationHtml.includes(label), `reservation page should include ${label}`);
});

[
  'reservation_kakao_chat_click',
  'reservation_kakao_booking_click',
  'reservation_group_inquiry_click',
  'reservation_phone_click'
].forEach((eventName) => {
  assert.ok(scriptSource.includes(eventName), `script should include analytics event ${eventName}`);
});

assert.ok(configSource.includes('KAKAO_CHANNEL_URL'), 'config should include Kakao channel key');
assert.ok(configSource.includes('KAKAO_CHANNEL_CHAT_URL'), 'config should include Kakao channel chat key');
assert.ok(configSource.includes('KAKAO_BOOKING_URL'), 'config should include Kakao booking key');
assert.ok(configSource.includes('KAKAO_GROUP_INQUIRY_URL'), 'config should include group inquiry key');
assert.ok(configSource.includes('RESERVATION_PHONE'), 'config should include phone key');

console.log('reservation flow tests passed');
