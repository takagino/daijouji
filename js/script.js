document.addEventListener('DOMContentLoaded', () => {
  let resizeTimer;

  const hamburger = document.querySelector('.js-hamburger');
  const gnav = document.querySelector('.gnav');
  const body = document.body;

  if (!hamburger) return;

  const closeMenu = () => {
    body.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'メニューを開く');
  };

  const toggleMenu = () => {
    const isOpen = body.classList.contains('is-open');
    if (isOpen) {
      closeMenu();
    } else {
      body.classList.add('is-open');
      hamburger.setAttribute('aria-expanded', 'true');
      hamburger.setAttribute('aria-label', 'メニューを閉じる');
    }
  };

  gnav.addEventListener('click', closeMenu);
  hamburger.addEventListener('click', toggleMenu);

  // タブレットサイズ以上にリサイズされたらメニューを閉じる（念のための処理）
  window.addEventListener('resize', () => {
    document.body.classList.add('is-resizing');

    // タイマーをクリアして、リサイズが止まるまで待機
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // リサイズ停止から400ms後にクラスを削除
      document.body.classList.remove('is-resizing');
    }, 400);

    if (window.innerWidth >= 768) {
      // ブレイクポイントに合わせて調整
      body.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  const mapNames = document.querySelectorAll('.guide__map-name');

  mapNames.forEach((name) => {
    name.addEventListener('click', () => {
      // 隣り合う .guide__map-info を取得
      const info = name.nextElementSibling;
      if (info && info.classList.contains('guide__map-info')) {
        info.classList.add('is-active');
        body.classList.add('popup-open');
      }
    });
  });

  // 全ての .guide__map-info に対して閉じる処理を設定
  const mapInfos = document.querySelectorAll('.guide__map-info');
  mapInfos.forEach((info) => {
    const closeBtn = info.querySelector('.popup__close');

    // 閉じるボタンをクリック
    closeBtn.addEventListener('click', () => {
      info.classList.remove('is-active');
      body.classList.remove('popup-open');
    });

    // 背景（黒い部分）をクリックしても閉じる
    info.addEventListener('click', (e) => {
      if (e.target === info) {
        info.classList.remove('is-active');
        body.classList.remove('popup-open');
      }
    });
  });
});
