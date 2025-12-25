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
});
