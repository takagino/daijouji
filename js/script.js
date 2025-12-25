document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.js-hamburger');
  const body = document.body;

  if (!hamburger) return;

  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';

    // 状態を反転
    hamburger.setAttribute('aria-expanded', !expanded);
    body.classList.toggle('is-open');

    // スクリーンリーダー用のラベル切り替え
    hamburger.setAttribute(
      'aria-label',
      expanded ? 'メニューを開く' : 'メニューを閉じる'
    );
  });

  // タブレットサイズ以上にリサイズされたらメニューを閉じる（念のための処理）
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      // ブレイクポイントに合わせて調整
      body.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
});

let resizeTimer;
window.addEventListener('resize', () => {
  // リサイズが始まったらクラスを付与
  document.body.classList.add('is-resizing');

  // タイマーをクリアして、リサイズが止まるまで待機
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // リサイズ停止から400ms後にクラスを削除
    document.body.classList.remove('is-resizing');
  }, 400);
});
