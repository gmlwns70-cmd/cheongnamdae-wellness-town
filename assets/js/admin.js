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
      // ===== 기본 정보 =====
      'company-name': () => {
        const newName = prompt('새로운 회사명을 입력하세요:', '청남대 웰니스타운');
        if (newName) {
          document.querySelectorAll('[data-company-name]').forEach(el => {
            el.textContent = newName;
          });
          showNotification('회사명이 업데이트되었습니다.');
        }
      },
      'phone': () => {
        const newPhone = prompt('새로운 연락처를 입력하세요:', '010-4924-3435');
        if (newPhone) {
          document.querySelectorAll('[data-phone-text]').forEach(el => {
            el.textContent = newPhone;
          });
          document.querySelectorAll('a[href^="tel:"]').forEach(el => {
            el.href = 'tel:' + newPhone.replace(/[^\d+]/g, '');
          });
          showNotification('연락처가 업데이트되었습니다.');
        }
      },
      'address': () => {
        const newAddress = prompt('새로운 주소를 입력하세요:', '충청북도 청주시 상당구 문의면 미천리 638-1');
        if (newAddress) {
          document.querySelectorAll('[data-address]').forEach(el => {
            el.textContent = newAddress;
          });
          showNotification('주소가 업데이트되었습니다.');
        }
      },
      'hours': () => {
        const newHours = prompt('새로운 운영시간을 입력하세요:', '매일 09:00~21:00');
        if (newHours) {
          document.querySelectorAll('[data-hours]').forEach(el => {
            el.textContent = newHours;
          });
          showNotification('운영시간이 업데이트되었습니다.');
        }
      },

      // ===== 콘텐츠 관리 =====
      'hero-title': () => {
        const newTitle = prompt('새로운 제목을 입력하세요:', '청남대 웰니스타운');
        if (newTitle) {
          document.querySelectorAll('.hero h1[data-brand-name]').forEach(el => {
            el.textContent = newTitle;
          });
          showNotification('제목이 업데이트되었습니다.');
        }
      },
      'hero-description': () => {
        const newDesc = prompt('새로운 설명을 입력하세요:', '편백 향과 배럴 찜질을 중심으로 쉬어가는 체험 공간입니다.');
        if (newDesc) {
          document.querySelectorAll('.hero .lead').forEach(el => {
            el.textContent = newDesc;
          });
          showNotification('설명이 업데이트되었습니다.');
        }
      },
      'pricing': () => {
        showPricingModal();
      },
      'programs': () => {
        showProgramsModal();
      },

      // ===== 이벤트 관리 =====
      'event-title': () => {
        const newTitle = prompt('새로운 이벤트 제목을 입력하세요:', '개업 기념 이벤트');
        if (newTitle) {
          document.querySelectorAll('.event-promo h2').forEach(el => {
            el.textContent = newTitle;
          });
          showNotification('이벤트 제목이 업데이트되었습니다.');
        }
      },
      'event-period': () => {
        const newPeriod = prompt('새로운 이벤트 기간을 입력하세요:', '9월 말까지');
        if (newPeriod) {
          document.querySelectorAll('.event-period').forEach(el => {
            el.textContent = newPeriod;
          });
          showNotification('이벤트 기간이 업데이트되었습니다.');
        }
      },
      'event-benefits': () => {
        showEventBenefitsModal();
      },

      // ===== 외부 링크 관리 =====
      'booking-url': () => {
        const newUrl = prompt('새로운 예약폼 URL을 입력하세요:', 'https://forms.gle/XAQvZZRyChFnyE5C9');
        if (newUrl) {
          document.querySelectorAll('a[data-link="booking"]').forEach(el => {
            el.href = newUrl;
          });
          showNotification('예약폼 URL이 업데이트되었습니다.');
        }
      },
      'social-links': () => {
        showSocialLinksModal();
      },
      'map-links': () => {
        const newMapUrl = prompt('새로운 지도 URL을 입력하세요:');
        if (newMapUrl) {
          document.querySelectorAll('a[data-link="directions"]').forEach(el => {
            el.href = newMapUrl;
          });
          showNotification('지도 링크가 업데이트되었습니다.');
        }
      },

      // ===== 갤러리 관리 =====
      'gallery-upload': () => {
        showGalleryUploadModal();
      },
      'gallery-order': () => {
        showGalleryOrderModal();
      }
    };

    if (editActions[editType]) {
      editActions[editType]();
    }
  }

  // ===== 모달 함수들 =====

  // 요금 수정 모달
  function showPricingModal() {
    const priceItems = document.querySelectorAll('.price-list div');
    let pricingData = {};
    
    priceItems.forEach(item => {
      const dt = item.querySelector('dt')?.textContent;
      const dd = item.querySelector('dd')?.textContent;
      if (dt) pricingData[dt] = dd;
    });

    const itemToEdit = prompt('수정할 항목을 선택하세요 (예: 2인, 3인, 요금명):', '2인');
    if (itemToEdit) {
      const newPrice = prompt(`${itemToEdit}의 새로운 가격을 입력하세요:`, pricingData[itemToEdit] || '');
      if (newPrice) {
        document.querySelectorAll('.price-list div').forEach(item => {
          if (item.querySelector('dt')?.textContent === itemToEdit) {
            const dd = item.querySelector('dd');
            if (dd) dd.textContent = newPrice;
          }
        });
        showNotification('요금이 업데이트되었습니다.');
      }
    }
  }

  // 프로그램 수정 모달
  function showProgramsModal() {
    const programs = document.querySelectorAll('.program-item h3');
    const programList = Array.from(programs).map((p, i) => `${i+1}. ${p.textContent}`).join('\n');
    
    alert(`현재 프로그램:\n${programList}\n\n프로그램 수정을 위해 개발 팀에 문의하세요.`);
  }

  // 이벤트 혜택 수정 모달
  function showEventBenefitsModal() {
    const benefits = document.querySelectorAll('.event-benefits article');
    const benefitList = Array.from(benefits).map((b, i) => {
      const strong = b.querySelector('strong')?.textContent;
      const p = b.querySelector('p')?.textContent;
      return `${i+1}. ${strong}: ${p}`;
    }).join('\n\n');

    const benefitIndex = prompt('수정할 혜택 번호를 선택하세요 (1-4):', '1');
    if (benefitIndex && benefitIndex >= 1 && benefitIndex <= 4) {
      const idx = parseInt(benefitIndex) - 1;
      const article = benefits[idx];
      
      const newBenefit = prompt('새로운 혜택을 입력하세요:', article?.querySelector('strong')?.textContent);
      if (newBenefit) {
        const strong = article?.querySelector('strong');
        if (strong) strong.textContent = newBenefit;
        showNotification('이벤트 혜택이 업데이트되었습니다.');
      }
    }
  }

  // SNS 링크 수정 모달
  function showSocialLinksModal() {
    const channels = ['인스타그램', '유튜브', '네이버블로그'];
    const selectedChannel = prompt(`SNS 채널을 선택하세요:\n1. 인스타그램\n2. 유튜브\n3. 네이버블로그\n\n번호를 입력하세요:`, '1');
    
    if (selectedChannel && selectedChannel >= 1 && selectedChannel <= 3) {
      const idx = parseInt(selectedChannel) - 1;
      const linkType = ['instagram', 'youtube', 'naverBlog'][idx];
      const channelName = channels[idx];
      
      const newUrl = prompt(`새로운 ${channelName} URL을 입력하세요:`);
      if (newUrl) {
        document.querySelectorAll(`a[data-link="${linkType}"]`).forEach(el => {
          el.href = newUrl;
        });
        showNotification(`${channelName} 링크가 업데이트되었습니다.`);
      }
    }
  }

  // 갤러리 업로드 모달
  function showGalleryUploadModal() {
    const imageUrl = prompt('새로운 이미지 URL을 입력하세요:');
    const imageCaption = prompt('이미지 설명을 입력하세요:', '새로운 사진');
    
    if (imageUrl) {
      const galleryGrid = document.querySelector('.gallery-grid');
      if (galleryGrid) {
        const newFigure = document.createElement('figure');
        newFigure.className = 'gallery-item';
        newFigure.setAttribute('data-reveal', '');
        newFigure.innerHTML = `
          <img src="${imageUrl}" alt="${imageCaption}">
          <figcaption>${imageCaption}</figcaption>
        `;
        galleryGrid.appendChild(newFigure);
        showNotification('새로운 사진이 갤러리에 추가되었습니다.');
      }
    }
  }

  // 갤러리 순서 변경 모달
  function showGalleryOrderModal() {
    const galleryItems = document.querySelectorAll('.gallery-item figcaption');
    const itemList = Array.from(galleryItems).map((item, i) => `${i+1}. ${item.textContent}`).join('\n');
    
    alert(`현재 갤러리 항목:\n${itemList}\n\n갤러리 순서 변경은 드래그 기능으로 개발 예정입니다.`);
  }

  // 알림 메시지 표시
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #183d2b;
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      font-weight: 600;
      z-index: 1000;
      animation: slideInUp 300ms ease both;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOutDown 300ms ease both';
      setTimeout(() => notification.remove(), 300);
    }, 2500);
  }

  // 애니메이션 스타일 추가
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @keyframes slideOutDown {
      from {
        opacity: 1;
        transform: translateY(0);
      }
      to {
        opacity: 0;
        transform: translateY(20px);
      }
    }
  `;
  document.head.appendChild(style);
})();
