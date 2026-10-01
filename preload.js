/* =========================================================
   preload.js —— 首屏启动脚本
   在 <head> 里同步执行（不加 defer），所以浏览器第一次绘制之前，
   就已经把保存在 localStorage 里的外观设置写进 <html> 了：
   主题 / 字体 / 自定义背景 / 面板透明度。

   没有它的话，页面会先按 CSS 的默认值（60% 不透明度、跟随系统主题）
   画一帧，等 app.js 跑起来才跳到你设置的值，也就是"闪一下"。

   app.js 负责状态与界面同步，实际写 DOM 的动作都走这里的 HP.*，
   这样两边的规则只有一份。
   ========================================================= */
(function () {
  'use strict';

  var root = document.documentElement;
  var media = window.matchMedia('(prefers-color-scheme: dark)');

  // 有了这个 class，CSS 才敢把快捷网址栏先藏起来（等图标加载完再放）
  root.classList.add('js');

  /** 读取 JSON 格式的 localStorage 值 */
  function read(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (error) {
      return fallback;
    }
  }

  /** system → 按系统偏好解析成 light / dark */
  function resolvedTheme(preference) {
    if (preference === 'light' || preference === 'dark') return preference;
    return media.matches ? 'dark' : 'light';
  }

  var HP = {
    read: read,
    resolvedTheme: resolvedTheme,

    applyTheme: function (preference) {
      var resolved = resolvedTheme(preference);
      root.setAttribute('data-theme', resolved);
      root.setAttribute('data-theme-preference', preference);
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', resolved === 'light' ? '#f5f5f7' : '#09090b');
    },

    applyFont: function (font) {
      root.setAttribute('data-font', font || 'default');
    },

    applyBackground: function (bg, dim) {
      var has = !!bg;
      root.classList.toggle('has-user-bg', has);
      if (has) root.style.setProperty('--user-bg', 'url("' + bg + '")');
      else root.style.removeProperty('--user-bg');

      var alpha = Number(dim);
      if (!isFinite(alpha)) alpha = 45;
      alpha = Math.min(85, Math.max(0, alpha)) / 100;
      var light = resolvedTheme(root.getAttribute('data-theme-preference')) === 'light';
      root.style.setProperty('--bg-veil',
        (light ? 'rgba(255, 255, 255, ' : 'rgba(0, 0, 0, ') + alpha + ')');
    },

    /** card / panel 为 0–100 的数字；同时写百分比和无单位两份变量 */
    applyOpacity: function (card, panel) {
      root.style.setProperty('--card-a1', card + '%');
      root.style.setProperty('--panel-a1', panel + '%');
      root.style.setProperty('--card-n', String(card / 100));
      root.style.setProperty('--panel-n', String(panel / 100));
    }
  };

  window.HP = HP;

  /* ---------- 首次绘制之前：把已保存的外观全部写上 ---------- */
  var theme = read('hp.theme', 'system');
  HP.applyTheme(theme);
  HP.applyFont(read('hp.font', 'default'));

  var bg = read('hp.bg', '');
  HP.applyBackground(bg, read('hp.bgDim', 45));

  // 没手动调过透明度时：有背景图 75%，否则 60%（与 app.js 的 applyOpacity 一致）
  var fallback = bg ? 75 : 60;
  var card = read('hp.opacitySearch', null);
  var panel = read('hp.opacityLinks', null);
  HP.applyOpacity(card === null ? fallback : card, panel === null ? fallback : panel);
})();
