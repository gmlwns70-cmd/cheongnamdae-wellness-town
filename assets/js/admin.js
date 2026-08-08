// 관리자 메뉴 기능
(function() {
  const adminToggle = document.querySelector('.admin-toggle');
  const adminMenu = document.getElementById('adminMenu');
  const adminClose = document.querySelector('.admin-close');
  const adminLinks = document.querySelectorAll('.admin-link');

  if (adminToggle && adminMenu) {
    // 메뉴 열기
    adminToggle.addEventListener('click', () => {
      adminMenu.classList.add('is-open');
      adminToggle.setAttribute('aria-expanded', 'true');
    });

    // 메뉴 닫기
    adminClose.addEventListener('click', () => {
      adminMenu.classList.remove('is-open');
      adminToggle.setAttribute('aria-expanded', 'false');
    });

    // 링크 클릭 시 기본 동작 처리
    adminLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const editType = link.dataset.edit;
        handleAdminEdit(editType);
      });
    });

    // 외부 클릭 시 메뉴 닫기
    document.addEventListener('click', (e) => {
      if (!adminMenu.contains(e.target) && !adminToggle.contains(e.target)) {
        adminMenu.classList.remove('is-open');
        adminToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 관리 기능 핸들러
  function handleAdminEdit(editType) {
    const editActions = {
      'company-name': () => {
        const newName = prompt('새로운 회사명을 입력하세요:', '청남대 웰니스타운');
        if (newName) {
          document.querySelectorAll('[data-company-name]').forEach(el => {
            el.textContent = newName;
          });
          alert('회사명이 업데이트되었습니다. (실제 저장은 개발 필요)');
        }
      },
      'phone': () => {
        const newPhone = prompt('새로운 연락처를 입력하세요:', '010-4924-3435');
        if (newPhone) {
          document.querySelectorAll('[data-phone-text]').forEach(el => {
            el.textContent = newPhone;
          });
          alert('연락처가 업데이트되었습니다. (실제 저장은 개발 필요)');
        }
      },
      'address': () => {
        const newAddress = prompt('새로운 주소를 입력하세요:', '충청북도 청주시 상당구 문의면 미천리 638-1');
        if (newAddress) {
          document.querySelectorAll('[data-address]').forEach(el => {
            el.textContent = newAddress;
          });
          alert('주소가 업데이트되었습니다. (실제 저장은 개발 필요)');
        }
      },
      'hours': () => {
        const newHours = prompt('새로운 운영시간을 입력하세요:', '매일 09:00~21:00');
        if (newHours) {
          document.querySelectorAll('[data-hours]').forEach(el => {
            el.textContent = newHours;
          });
          alert('운영시간이 업데이트되었습니다. (실제 저장은 개발 필요)');
        }
      },
      'hero-title': () => {
        alert('제목 수정 기능 (개발 예정)');
      },
      'hero-description': () => {
        alert('설명 수정 기능 (개발 예정)');
      },
      'pricing': () => {
        alert('요금 수정 기능 (개발 예정)');
      },
      'programs': () => {
        alert('프로그램 수정 기능 (개발 예정)');
      },
      'event-title': () => {
        alert('이벤트 제목 수정 기능 (개발 예정)');
      },
      'event-period': () => {
        alert('이벤트 기간 수정 기능 (개발 예정)');
      },
      'event-benefits': () => {
        alert('이벤트 혜택 수정 기능 (개발 예정)');
      },
      'booking-url': () => {
        alert('예약폼 URL 수정 기능 (개발 예정)');
      },
      'social-links': () => {
        alert('SNS 링크 수정 기능 (개발 예정)');
      },
      'map-links': () => {
        alert('지도 링크 수정 기능 (개발 예정)');
      },
      'gallery-upload': () => {
        alert('사진 업로드 기능 (개발 예정)');
      },
      'gallery-order': () => {
        alert('사진 순서 변경 기능 (개발 예정)');
      }
    };

    if (editActions[editType]) {
      editActions[editType]();
    }
  }
})();
