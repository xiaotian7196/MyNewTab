/* =========================================================
   Homepage — 类 Google 搜索页 · Liquid Glass 风格
   纯原生 HTML + CSS + JS，无任何依赖
   ========================================================= */
(() => {
  'use strict';

  /* ---------------------------------------------------------
     1. 搜索引擎定义
     --------------------------------------------------------- */
  const ENGINES = [
    {
      id: 'google', name: 'Google', host: 'google.com', hint: 'google.com',
      search: 'https://www.google.com/search?q=%s',
      images: 'https://www.google.com/search?tbm=isch&q=%s'
    },
    {
      id: 'baidu', name: '百度', host: 'baidu.com', hint: 'baidu.com',
      search: 'https://www.baidu.com/s?wd=%s',
      images: 'https://image.baidu.com/search/index?tn=baiduimage&word=%s'
    },
    {
      id: 'bing', name: '必应', host: 'bing.com', hint: 'bing.com',
      search: 'https://www.bing.com/search?q=%s',
      images: 'https://www.bing.com/images/search?q=%s'
    },
    {
      id: 'duckduckgo', name: 'DuckDuckGo', host: 'duckduckgo.com', hint: 'duckduckgo.com',
      search: 'https://duckduckgo.com/?q=%s',
      images: 'https://duckduckgo.com/?iax=images&ia=images&q=%s'
    },
    {
      id: 'sogou', name: '搜狗', host: 'sogou.com', hint: 'sogou.com',
      search: 'https://www.sogou.com/web?query=%s',
      images: 'https://pic.sogou.com/pics?query=%s'
    },
    {
      id: 'so360', name: '360 搜索', host: 'so.com', hint: 'so.com',
      search: 'https://www.so.com/s?q=%s',
      images: 'https://image.so.com/i?q=%s'
    },
    {
      id: 'zhihu', name: '知乎', host: 'zhihu.com', hint: 'zhihu.com',
      search: 'https://www.zhihu.com/search?type=content&q=%s',
      images: null
    },
    {
      id: 'github', name: 'GitHub', host: 'github.com', hint: 'github.com',
      search: 'https://github.com/search?q=%s',
      images: null
    }
  ];

  /* ---------------------------------------------------------
     2. 默认快捷网址 / 应用面板
     --------------------------------------------------------- */
  const DEFAULT_LINKS = [
    { name: '知乎', url: 'https://www.zhihu.com' },
    { name: '哔哩哔哩', url: 'https://www.bilibili.com' },
    { name: 'GitHub', url: 'https://github.com' },
    { name: '微博', url: 'https://weibo.com' },
    { name: '淘宝', url: 'https://www.taobao.com' },
    { name: '豆瓣', url: 'https://www.douban.com' },
    { name: '百度网盘', url: 'https://pan.baidu.com' },
    { name: '小红书', url: 'https://www.xiaohongshu.com' }
  ];

  /* ---------------------------------------------------------
     2.1 页脚小挂件的数据（每日一言 / 今天吃什么）
     --------------------------------------------------------- */
  const QUOTES = {
    'zh-CN': [
      '慢慢来，比较快。',
      '先把今天过好，明天自然有明天的办法。',
      '想做的事，今天做一点也算数。',
      '不必事事完美，先让它存在。',
      '休息不是偷懒，是续航。',
      '你已经在路上了。',
      '把复杂的事拆小，就不那么吓人。',
      '好心情也是生产力。',
      '少想一点，多做一点。',
      '允许自己慢一点。'
    ],
    'zh-TW': [
      '慢慢來，比較快。',
      '先把今天過好，明天自然有明天的辦法。',
      '想做的事，今天做一點也算數。',
      '不必事事完美，先讓它存在。',
      '休息不是偷懶，是續航。',
      '你已經在路上了。',
      '把複雜的事拆小，就不那麼嚇人。',
      '好心情也是生產力。',
      '少想一點，多做一點。',
      '允許自己慢一點。'
    ],
    en: [
      'Slow is smooth, smooth is fast.',
      'Do a little today — that still counts.',
      'Done is better than perfect.',
      'Rest is part of the work.',
      'You are already on your way.',
      'Small steps still move the line.',
      'Fewer thoughts, more doing.',
      'A good mood is a productivity tool.',
      'Let it be imperfect and real.',
      'It is fine to go slowly.'
    ]
  };

  const FOODS = {
    'zh-CN': [
      '麻辣烫', '兰州拉面', '黄焖鸡米饭', '沙县小吃', '火锅', '寿司', '炸鸡', '螺蛳粉',
      '盖浇饭', '饺子', '烤肉', '蛋炒饭', '煲仔饭', '米线', '汉堡', '披萨'
    ],
    'zh-TW': [
      '麻辣燙', '牛肉麵', '滷肉飯', '小火鍋', '壽司', '炸雞', '水餃', '燒臘飯',
      '蚵仔煎', '義大利麵', '咖哩飯', '鹽酥雞', '便當', '拉麵', '漢堡', '披薩'
    ],
    en: [
      'Ramen', 'Dumplings', 'Tacos', 'Sushi', 'Pizza', 'Burgers', 'Curry', 'Pad Thai',
      'Fried chicken', 'Pho', 'Bibimbap', 'Burrito', 'Noodles', 'Pasta', 'Hot pot', 'Kebab'
    ]
  };

  /* ---------------------------------------------------------
     3. 多语言
     --------------------------------------------------------- */
  const I18N = {
    'zh-CN': {
      'top.theme': '切换深色 / 浅色',
      'lang.label': '界面语言',
      'search.engine': '选择搜索引擎', 'search.placeholder': '搜索或输入网址',
      'search.placeholderImage': '搜索图片', 'search.go': '搜索', 'search.image': '以图搜图',
      'search.mic': '语音搜索',
      'search.history': '历史记录', 'search.openUrl': '打开该网址',
      'search.inEngine': '在 %s 中搜索',
      'links.title': '快捷网址', 'links.edit': '编辑', 'links.done': '完成',
      'links.add': '添加快捷网址', 'links.remove': '移除 %s', 'links.empty': '还没有快捷网址',
      'settings.title': '设置', 'settings.theme': '主题', 'settings.themeDark': '深色',
      'settings.themeLight': '浅色', 'settings.themeSystem': '跟随系统',
      'settings.engine': '默认搜索引擎',
      'settings.font': '字体', 'font.default': '默认', 'font.rounded': '圆润',
      'font.serif': '衬线', 'font.mono': '等宽',
      'settings.display': '显示', 'settings.showLinks': '快捷网址栏',
      'settings.footer': '左下角文字',
      'settings.background': '背景', 'settings.bgPick': '选择图片',
      'settings.bgClear': '清除背景', 'settings.bgDim': '淡化',
      'settings.opacity': '面板透明度', 'settings.opacitySearch': '搜索面板',
      'settings.opacityLinks': '快捷网址栏',
      'settings.resetLinks': '恢复默认快捷网址',
      'settings.clearHistory': '清空搜索历史',
      'dialog.addTitle': '添加快捷网址', 'dialog.editTitle': '编辑快捷网址',
      'dialog.name': '名称', 'dialog.url': '网址',
      'dialog.namePlaceholder': '例如：知乎', 'dialog.urlPlaceholder': '例如：zhihu.com',
      'dialog.cancel': '取消', 'dialog.save': '保存',
      'footer.note': '安静地做一个网络入口。', 'footer.credit': '风格参考',
      'footer.modeNote': '默认文案', 'footer.modeQuote': '每日一言', 'footer.modeFood': '今天吃什么',
      'footer.foodPrefix': '今天吃：', 'footer.reroll': '换一个',
      'footer.privacy': '隐私权', 'footer.terms': '条款', 'footer.settings': '设置',
      'toast.added': '已添加快捷网址', 'toast.saved': '已保存', 'toast.removed': '已移除该快捷网址',
      'toast.resetLinks': '已恢复默认快捷网址', 'toast.cleared': '已清空搜索历史',
      'toast.theme': '主题已更新', 'toast.lang': '界面语言已切换',
      'toast.engine': '已切换到 %s', 'toast.nameRequired': '请输入名称',
      'toast.urlRequired': '请输入网址', 'toast.urlInvalid': '网址格式不正确，请检查后重试',
      'toast.micUnsupported': '当前浏览器不支持语音搜索', 'toast.micError': '无法使用麦克风',
      'toast.noImage': '%s 暂不支持以图搜图', 'toast.reordered': '已调整顺序',
      'toast.bgSet': '已设为背景', 'toast.bgCleared': '已清除背景',
      'toast.bgTooBig': '图片太大存不下，换一张小一点的', 'toast.bgFailed': '读不到这张图片，换一张试试'
    },
    'zh-TW': {
      'top.theme': '切換深色 / 淺色',
      'lang.label': '介面語言',
      'search.engine': '選擇搜尋引擎', 'search.placeholder': '搜尋或輸入網址',
      'search.placeholderImage': '搜尋圖片', 'search.go': '搜尋', 'search.image': '以圖搜圖',
      'search.mic': '語音搜尋',
      'search.history': '歷史記錄', 'search.openUrl': '開啟這個網址',
      'search.inEngine': '在 %s 中搜尋',
      'links.title': '捷徑', 'links.edit': '編輯', 'links.done': '完成',
      'links.add': '新增捷徑', 'links.remove': '移除 %s', 'links.empty': '還沒有捷徑',
      'settings.title': '設定', 'settings.theme': '主題', 'settings.themeDark': '深色',
      'settings.themeLight': '淺色', 'settings.themeSystem': '跟隨系統',
      'settings.engine': '預設搜尋引擎',
      'settings.font': '字型', 'font.default': '預設', 'font.rounded': '圓潤',
      'font.serif': '襯線', 'font.mono': '等寬',
      'settings.display': '顯示', 'settings.showLinks': '捷徑列',
      'settings.footer': '左下角文字',
      'settings.background': '背景', 'settings.bgPick': '選擇圖片',
      'settings.bgClear': '清除背景', 'settings.bgDim': '淡化',
      'settings.opacity': '面板透明度', 'settings.opacitySearch': '搜尋面板',
      'settings.opacityLinks': '捷徑列',
      'settings.resetLinks': '還原預設捷徑',
      'settings.clearHistory': '清除搜尋記錄',
      'dialog.addTitle': '新增捷徑', 'dialog.editTitle': '編輯捷徑',
      'dialog.name': '名稱', 'dialog.url': '網址',
      'dialog.namePlaceholder': '例如：PChome', 'dialog.urlPlaceholder': '例如：pchome.com.tw',
      'dialog.cancel': '取消', 'dialog.save': '儲存',
      'footer.note': '安靜地做一個網路入口。', 'footer.credit': '風格參考',
      'footer.modeNote': '預設文字', 'footer.modeQuote': '每日一句', 'footer.modeFood': '今天吃什麼',
      'footer.foodPrefix': '今天吃：', 'footer.reroll': '換一個',
      'footer.privacy': '隱私權', 'footer.terms': '條款', 'footer.settings': '設定',
      'toast.added': '已新增捷徑', 'toast.saved': '已儲存', 'toast.removed': '已移除該捷徑',
      'toast.resetLinks': '已還原預設捷徑', 'toast.cleared': '已清除搜尋記錄',
      'toast.theme': '主題已更新', 'toast.lang': '介面語言已切換',
      'toast.engine': '已切換至 %s', 'toast.nameRequired': '請輸入名稱',
      'toast.urlRequired': '請輸入網址', 'toast.urlInvalid': '網址格式不正確，請檢查後再試',
      'toast.micUnsupported': '目前的瀏覽器不支援語音搜尋', 'toast.micError': '無法使用麥克風',
      'toast.noImage': '%s 尚未支援以圖搜圖', 'toast.reordered': '已調整順序',
      'toast.bgSet': '已設為背景', 'toast.bgCleared': '已清除背景',
      'toast.bgTooBig': '圖片太大存不下，換一張小一點的', 'toast.bgFailed': '讀不到這張圖片，換一張試試'
    },
    en: {
      'top.theme': 'Toggle dark / light',
      'lang.label': 'Language',
      'search.engine': 'Choose a search engine', 'search.placeholder': 'Search or type a URL',
      'search.placeholderImage': 'Search images', 'search.go': 'Search', 'search.image': 'Search by image',
      'search.mic': 'Search by voice',
      'search.history': 'History', 'search.openUrl': 'Open this URL',
      'search.inEngine': 'Search %s for this',
      'links.title': 'Shortcuts', 'links.edit': 'Edit', 'links.done': 'Done',
      'links.add': 'Add shortcut', 'links.remove': 'Remove %s', 'links.empty': 'No shortcuts yet',
      'settings.title': 'Settings', 'settings.theme': 'Theme', 'settings.themeDark': 'Dark',
      'settings.themeLight': 'Light', 'settings.themeSystem': 'System',
      'settings.engine': 'Default search engine',
      'settings.font': 'Font', 'font.default': 'Default', 'font.rounded': 'Rounded',
      'font.serif': 'Serif', 'font.mono': 'Mono',
      'settings.display': 'Display', 'settings.showLinks': 'Shortcuts bar',
      'settings.footer': 'Footer text',
      'settings.background': 'Background', 'settings.bgPick': 'Choose image',
      'settings.bgClear': 'Clear background', 'settings.bgDim': 'Dim',
      'settings.opacity': 'Panel opacity', 'settings.opacitySearch': 'Search panel',
      'settings.opacityLinks': 'Shortcuts panel',
      'settings.resetLinks': 'Restore default shortcuts',
      'settings.clearHistory': 'Clear search history',
      'dialog.addTitle': 'Add shortcut', 'dialog.editTitle': 'Edit shortcut',
      'dialog.name': 'Name', 'dialog.url': 'URL',
      'dialog.namePlaceholder': 'e.g. Wikipedia', 'dialog.urlPlaceholder': 'e.g. wikipedia.org',
      'dialog.cancel': 'Cancel', 'dialog.save': 'Save',
      'footer.note': 'A quiet doorway to the internet.', 'footer.credit': 'Style reference',
      'footer.modeNote': 'Default text', 'footer.modeQuote': 'Daily quote', 'footer.modeFood': 'What to eat',
      'footer.foodPrefix': 'Today: ', 'footer.reroll': 'Pick another',
      'footer.privacy': 'Privacy', 'footer.terms': 'Terms', 'footer.settings': 'Settings',
      'toast.added': 'Shortcut added', 'toast.saved': 'Saved', 'toast.removed': 'Shortcut removed',
      'toast.resetLinks': 'Default shortcuts restored', 'toast.cleared': 'Search history cleared',
      'toast.theme': 'Theme updated', 'toast.lang': 'Language changed',
      'toast.engine': 'Switched to %s', 'toast.nameRequired': 'Please enter a name',
      'toast.urlRequired': 'Please enter a URL', 'toast.urlInvalid': 'That URL does not look right',
      'toast.micUnsupported': 'Voice search is not supported in this browser',
      'toast.micError': 'Microphone unavailable',
      'toast.noImage': '%s does not support image search',
      'toast.reordered': 'Order updated',
      'toast.bgSet': 'Background image set', 'toast.bgCleared': 'Background cleared',
      'toast.bgTooBig': 'That image is too large to store — try a smaller one',
      'toast.bgFailed': 'Could not read that image'
    }
  };

  const TILE_COLORS = ['#0071e3', '#ff3b30', '#ff9500', '#34c759', '#af52de', '#00c7be', '#ff2d55', '#5856d6'];

  /* ---------------------------------------------------------
     4. 状态与持久化
     --------------------------------------------------------- */
  const KEY = {
    theme: 'hp.theme', engine: 'hp.engine', links: 'hp.links', history: 'hp.history',
    lang: 'hp.lang', showLinks: 'hp.showLinks', bg: 'hp.bg', bgDim: 'hp.bgDim',
    footerMode: 'hp.footerMode', font: 'hp.font',
    opacitySearch: 'hp.opacitySearch', opacityLinks: 'hp.opacityLinks'
  };

  const store = {
    get(key, fallback) {
      try {
        const raw = localStorage.getItem(key);
        return raw === null ? fallback : JSON.parse(raw);
      } catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); return true; }
      catch { return false; }
    }
  };

  /** 读一个 0–100 的百分比设置；没设过返回 null（表示跟随默认值） */
  function readPercent(key) {
    const raw = store.get(key, null);
    if (raw === null) return null;
    const value = Number(raw);
    return Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : null;
  }

  const storedDim = Number(store.get(KEY.bgDim, 45));

  const state = {
    theme: store.get(KEY.theme, 'system'),
    lang: store.get(KEY.lang, detectLang()),
    engineId: store.get(KEY.engine, 'google'),
    links: sanitizeLinks(store.get(KEY.links, null)) || DEFAULT_LINKS.map((l) => ({ ...l })),
    history: Array.isArray(store.get(KEY.history, [])) ? store.get(KEY.history, []).slice(0, 20) : [],
    showLinks: store.get(KEY.showLinks, true) !== false,
    bg: typeof store.get(KEY.bg, '') === 'string' ? store.get(KEY.bg, '') : '',
    bgDim: Number.isFinite(storedDim) ? Math.min(85, Math.max(0, storedDim)) : 45,
    footerMode: ['note', 'quote', 'food'].includes(store.get(KEY.footerMode, 'note'))
      ? store.get(KEY.footerMode, 'note') : 'note',
    font: ['default', 'rounded', 'serif', 'mono'].includes(store.get(KEY.font, 'default'))
      ? store.get(KEY.font, 'default') : 'default',
    opacitySearch: readPercent(KEY.opacitySearch),
    opacityLinks: readPercent(KEY.opacityLinks),
    foodRoll: 0,
    editing: false,
    images: false,
    activeSuggest: -1,
    editingIndex: -1,
    dragIndex: -1
  };

  function detectLang() {
    const nav = (navigator.language || 'zh-CN').toLowerCase();
    if (nav.startsWith('zh-tw') || nav.startsWith('zh-hk') || nav.startsWith('zh-hant')) return 'zh-TW';
    if (nav.startsWith('zh')) return 'zh-CN';
    return 'en';
  }

  const t = (key, ...args) => {
    const dict = I18N[state.lang] || I18N['zh-CN'];
    let out = dict[key] != null ? dict[key] : (I18N['zh-CN'][key] || key);
    args.forEach((arg) => { out = out.replace('%s', arg); });
    return out;
  };

  const engine = () => ENGINES.find((e) => e.id === state.engineId) || ENGINES[0];

  /* ---------------------------------------------------------
     5. DOM 引用
     --------------------------------------------------------- */
  const $ = (id) => document.getElementById(id);
  const el = {
    root: document.documentElement,
    form: $('searchForm'), input: $('searchInput'), field: $('searchField'), suggest: $('suggestBox'),
    engineBtn: $('engineBtn'), engineMenu: $('engineMenu'),
    engineLogo: $('engineLogo'), engineName: $('engineName'),
    imageBtn: $('imageBtn'), micBtn: $('micBtn'), goBtn: $('goBtn'),
    linksBar: $('linksBar'), linksList: $('linksList'), editLinksBtn: $('editLinksBtn'), addLinkBtn: $('addLinkBtn'),
    themeBtn: $('themeBtn'), settingsBtnBottom: $('settingsBtnBottom'), settingsPanel: $('settingsPanel'),
    langSeg: $('langSeg'), fontSelect: $('fontSelect'),
    themeSeg: $('themeSeg'), engineSelect: $('engineSelect'),
    showLinksSwitch: $('showLinksSwitch'), footerMode: $('footerMode'), footerNote: $('footerNote'),
    bgPickBtn: $('bgPickBtn'), bgClearBtn: $('bgClearBtn'), bgFile: $('bgFile'),
    bgDimRow: $('bgDimRow'), bgDim: $('bgDim'), bgDimOut: $('bgDimOut'),
    opacitySearch: $('opacitySearch'), opacityLinks: $('opacityLinks'),
    opacitySearchOut: $('opacitySearchOut'), opacityLinksOut: $('opacityLinksOut'),
    resetLinksBtn: $('resetLinksBtn'), clearHistoryBtn: $('clearHistoryBtn'),
    toast: $('toast'), currentYear: $('currentYear'),
    modal: $('linkModal'), linkForm: $('linkForm'), linkName: $('linkName'), linkUrl: $('linkUrl'),
    linkError: $('linkError'), linkModalTitle: $('linkModalTitle')
  };
  const linksPanel = el.linksBar.querySelector('.shortcuts-panel');

  /* ---------------------------------------------------------
     6. 工具函数
     --------------------------------------------------------- */
  function sanitizeLinks(value) {
    if (!Array.isArray(value)) return null;
    const out = value
      .filter((item) => item && typeof item.name === 'string' && typeof item.url === 'string')
      .map((item) => ({ name: item.name.slice(0, 24), url: item.url }))
      .slice(0, 40);
    return out.length ? out : null;
  }

  function hostOf(url) {
    try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return ''; }
  }

  /** 把输入框里的一串文字变成合法 URL；不像网址时返回 null。 */
  function normalizeUrl(raw) {
    const v = String(raw || '').trim();
    if (!v || /\s/.test(v)) return null;
    if (/^[a-z][a-z0-9+.-]*:\/\//i.test(v)) {
      try { return new URL(v).href; } catch { return null; }
    }
    if (/^(localhost|(\d{1,3}\.){3}\d{1,3})(:\d+)?([/?#].*)?$/i.test(v)) return 'http://' + v;
    if (/^[^\s/?#@]+\.[a-z]{2,}(:\d+)?([/?#].*)?$/i.test(v)) {
      try { return new URL('https://' + v).href; } catch { return null; }
    }
    return null;
  }

  const prettyUrl = (url) => String(url).replace(/^https?:\/\//i, '').replace(/\/$/, '');

  function colorFor(text) {
    let hash = 0;
    for (let i = 0; i < text.length; i++) hash = (hash * 31 + text.charCodeAt(i)) % 100000;
    return TILE_COLORS[hash % TILE_COLORS.length];
  }

  function letterTile(label) {
    const tile = document.createElement('span');
    tile.className = 'tile';
    tile.style.setProperty('--tile', colorFor(label));
    tile.textContent = (label || '?').trim().charAt(0).toUpperCase() || '?';
    return tile;
  }

  /** 站点图标：favicon 服务 → 备用服务 → 首字母色块。
      加载成功时加 .is-loaded 让它淡入（CSS 里默认 opacity: 0），
      这样不会出现"先一排空方块、图标再突然蹦出来"。 */
  function iconNode(host, label, className) {
    const wrap = document.createElement('span');
    wrap.className = className;
    if (!host) { wrap.appendChild(letterTile(label)); return wrap; }

    const img = document.createElement('img');
    img.alt = '';
    img.referrerPolicy = 'no-referrer';

    // 先挂监听再设 src：缓存命中的图片也可能立刻触发 load
    img.addEventListener('load', () => img.classList.add('is-loaded'), { once: true });

    let attempt = 0;
    img.addEventListener('error', () => {
      attempt += 1;
      if (attempt === 1) {
        img.src = 'https://icons.duckduckgo.com/ip3/' + host + '.ico';
      } else {
        // 两个服务都失败：换成首字母色块
        img.remove();
        wrap.appendChild(letterTile(label));
      }
    });

    img.src = 'https://www.google.com/s2/favicons?domain=' + encodeURIComponent(host) + '&sz=64';

    wrap.appendChild(img);
    return wrap;
  }

  let toastTimer = 0;
  function toast(message) {
    el.toast.textContent = message;
    el.toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { el.toast.hidden = true; }, 2200);
  }

  function openUrl(url, newTab) {
    if (newTab) window.open(url, '_blank', 'noopener');
    else window.location.href = url;
  }

  /* ---------------------------------------------------------
     7. 主题 / 字体
     实际把值写进 DOM 的是 preload.js 里的 HP.*（首屏同步脚本），
     这里只负责状态、界面同步和切换逻辑，两边的规则只有一份。
     --------------------------------------------------------- */
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const HP = window.HP;

  const resolvedTheme = () => HP.resolvedTheme(state.theme);

  function applyTheme() {
    HP.applyTheme(state.theme);

    el.themeSeg.querySelectorAll('button').forEach((btn) => {
      btn.setAttribute('aria-checked', String(btn.dataset.themeValue === state.theme));
    });

    applyBackground(); // 自定义背景的薄纱颜色跟随主题
  }

  function setTheme(value, notify) {
    state.theme = value;
    store.set(KEY.theme, value);
    applyTheme();
    if (notify) toast(t('toast.theme'));
  }
  media.addEventListener('change', () => { if (state.theme === 'system') applyTheme(); });

  /* ---------- 页面字体 ---------- */
  function applyFont() {
    HP.applyFont(state.font);
    el.fontSelect.value = state.font;
  }

  el.fontSelect.addEventListener('change', () => {
    state.font = el.fontSelect.value;
    store.set(KEY.font, state.font);
    applyFont();
  });

  /* ---------------------------------------------------------
     8. 多语言
     --------------------------------------------------------- */
  function applyI18n() {
    el.root.lang = state.lang;

    document.querySelectorAll('[data-i18n]').forEach((node) => {
      const value = t(node.dataset.i18n);
      if (value) node.textContent = value;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((node) => {
      node.placeholder = t(node.dataset.i18nPlaceholder);
    });
    document.querySelectorAll('[data-i18n-title]').forEach((node) => {
      node.title = t(node.dataset.i18nTitle);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach((node) => {
      node.setAttribute('aria-label', t(node.dataset.i18nAria));
    });

    el.langSeg.querySelectorAll('button[data-lang]').forEach((btn) => {
      btn.setAttribute('aria-checked', String(btn.dataset.lang === state.lang));
    });

    el.editLinksBtn.textContent = state.editing ? t('links.done') : t('links.edit');
    renderFooterNote();
  }

  function setLang(lang) {
    if (!I18N[lang] || lang === state.lang) return;
    state.lang = lang;
    store.set(KEY.lang, lang);
    applyI18n();
    renderEngine();
    renderLinks();
    updateImageMode();
    toast(t('toast.lang'));
  }

  /* ---------------------------------------------------------
     9. 搜索引擎切换器
     --------------------------------------------------------- */
  function renderEngine() {
    const current = engine();
    el.engineName.textContent = current.name;
    el.engineLogo.textContent = '';
    el.engineLogo.appendChild(iconNode(current.host, current.name, 'engine__icon-wrap'));

    el.engineMenu.textContent = '';
    ENGINES.forEach((item) => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'engine__item';
      btn.setAttribute('role', 'option');
      btn.setAttribute('aria-selected', String(item.id === state.engineId));

      btn.appendChild(iconNode(item.host, item.name, 'engine__logo'));

      const label = document.createElement('span');
      label.className = 'label';
      label.textContent = item.name;
      btn.appendChild(label);

      const hint = document.createElement('span');
      hint.className = 'hint';
      hint.textContent = item.hint;
      btn.appendChild(hint);

      const check = document.createElement('span');
      check.className = 'check';
      check.innerHTML = '<svg viewBox="0 0 24 24" width="17" height="17"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4Z" fill="currentColor"/></svg>';
      btn.appendChild(check);

      btn.addEventListener('click', () => { setEngine(item.id); closeEngineMenu(); });

      li.appendChild(btn);
      el.engineMenu.appendChild(li);
    });

    el.engineSelect.value = state.engineId;
  }

  function setEngine(id, notify = true) {
    const next = ENGINES.find((e) => e.id === id);
    if (!next || next.id === state.engineId) { if (next) renderEngine(); return; }
    state.engineId = next.id;
    store.set(KEY.engine, next.id);
    renderEngine();
    if (notify) toast(t('toast.engine', next.name));
  }

  const engineMenuOpen = () => !el.engineMenu.hidden;

  function openEngineMenu() {
    el.engineMenu.hidden = false;
    el.engineBtn.setAttribute('aria-expanded', 'true');
    const selected = el.engineMenu.querySelector('[aria-selected="true"]');
    if (selected) selected.focus();
  }
  function closeEngineMenu() {
    el.engineMenu.hidden = true;
    el.engineBtn.setAttribute('aria-expanded', 'false');
  }

  el.engineBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    engineMenuOpen() ? closeEngineMenu() : openEngineMenu();
  });

  el.engineMenu.addEventListener('keydown', (event) => {
    const items = [...el.engineMenu.querySelectorAll('.engine__item')];
    const index = items.indexOf(document.activeElement);
    if (event.key === 'ArrowDown') { event.preventDefault(); items[(index + 1) % items.length].focus(); }
    else if (event.key === 'ArrowUp') { event.preventDefault(); items[(index - 1 + items.length) % items.length].focus(); }
    else if (event.key === 'Escape') { event.preventDefault(); closeEngineMenu(); el.engineBtn.focus(); }
    else if (event.key === 'Tab') { closeEngineMenu(); }
  });

  /* ---------------------------------------------------------
     10. 搜索建议（历史记录 + 直接打开网址）
     --------------------------------------------------------- */
  function buildSuggestions(query) {
    const list = [];
    const direct = query ? normalizeUrl(query) : null;
    if (direct) list.push({ type: 'url', text: direct, label: t('search.openUrl') });

    const keyword = query ? query.toLowerCase() : '';
    state.history
      .filter((item) => !keyword || item.toLowerCase().includes(keyword))
      .slice(0, 7)
      .forEach((item) => list.push({ type: 'history', text: item, label: t('search.history') }));

    if (query && !direct) list.push({ type: 'search', text: query, label: t('search.inEngine', engine().name) });
    return list;
  }

  function renderSuggestions() {
    const query = el.input.value.trim();
    const list = buildSuggestions(query);
    if (!list.length) { hideSuggestions(); return; }

    el.suggest.textContent = '';
    list.forEach((item, index) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'suggest__item' + (index === state.activeSuggest ? ' is-active' : '');
      btn.setAttribute('role', 'option');

      const icon = document.createElement('span');
      icon.innerHTML = item.type === 'url'
        ? '<svg viewBox="0 0 24 24" width="18" height="18"><path d="M3.9 12a3.1 3.1 0 0 1 3.1-3.1h4V7H7a5 5 0 0 0 0 10h4v-1.9H7A3.1 3.1 0 0 1 3.9 12ZM8 13h8v-2H8v2Zm9-6h-4v1.9h4a3.1 3.1 0 0 1 0 6.2h-4V17h4a5 5 0 0 0 0-10Z" fill="currentColor"/></svg>'
        : item.type === 'search'
          ? '<svg viewBox="0 0 24 24" width="18" height="18"><path d="M10.5 4a6.5 6.5 0 1 0 4 11.6l4.4 4.4 1.4-1.4-4.4-4.4A6.5 6.5 0 0 0 10.5 4Zm0 2a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z" fill="currentColor"/></svg>'
          : '<svg viewBox="0 0 24 24" width="18" height="18"><path d="M13 3a9 9 0 0 0-9 9H1l4 4 4-4H6a7 7 0 1 1 2 4.9l-1.4 1.4A9 9 0 1 0 13 3Zm-1 5v5l4 2 .8-1.4-3.3-1.6V8Z" fill="currentColor"/></svg>';
      btn.appendChild(icon.firstChild);

      const text = document.createElement('span');
      text.className = 'text';
      text.textContent = item.type === 'url' ? prettyUrl(item.text) : item.text;
      btn.appendChild(text);

      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = item.label;
      btn.appendChild(tag);

      btn.addEventListener('mousedown', (event) => { event.preventDefault(); chooseSuggest(index); });
      el.suggest.appendChild(btn);
    });

    el.suggest.hidden = false;
    el.input.setAttribute('aria-expanded', 'true');
  }

  function hideSuggestions() {
    el.suggest.hidden = true;
    el.suggest.textContent = '';
    el.input.setAttribute('aria-expanded', 'false');
    state.activeSuggest = -1;
  }

  function chooseSuggest(index) {
    const item = buildSuggestions(el.input.value.trim())[index];
    if (!item) return;
    hideSuggestions();
    if (item.type === 'url') openUrl(item.text, false);
    else runSearch(item.text, {});
  }

  /* ---------------------------------------------------------
     11. 搜索
     --------------------------------------------------------- */
  function engineUrl(query, images) {
    const current = engine();
    const template = images && current.images ? current.images : current.search;
    return template.replace('%s', encodeURIComponent(query));
  }

  function remember(query) {
    const value = query.trim();
    if (!value) return;
    state.history = [value, ...state.history.filter((item) => item !== value)].slice(0, 20);
    store.set(KEY.history, state.history);
  }

  function runSearch(query, options) {
    const value = String(query || '').trim();
    const opts = options || {};
    if (!value) { el.input.focus(); return; }

    const direct = normalizeUrl(value);
    if (direct) { openUrl(direct, opts.newTab); return; }

    remember(value);
    openUrl(engineUrl(value, state.images), opts.newTab);
  }

  el.form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (state.activeSuggest >= 0) { chooseSuggest(state.activeSuggest); return; }
    runSearch(el.input.value, {});
  });

  // Ctrl / Cmd + 点击放大镜 = 新标签页搜索
  el.goBtn.addEventListener('click', (event) => {
    if (event.ctrlKey || event.metaKey) {
      event.preventDefault();
      runSearch(el.input.value, { newTab: true });
    }
  });

  el.input.addEventListener('input', () => {
    state.activeSuggest = -1;
    renderSuggestions();
  });
  el.input.addEventListener('focus', renderSuggestions);

  el.input.addEventListener('keydown', (event) => {
    const open = !el.suggest.hidden;
    if (event.key === 'ArrowDown' && open) {
      event.preventDefault();
      state.activeSuggest = (state.activeSuggest + 1) % el.suggest.children.length;
      renderSuggestions();
    } else if (event.key === 'ArrowUp' && open) {
      event.preventDefault();
      const total = el.suggest.children.length;
      state.activeSuggest = (state.activeSuggest - 1 + total) % total;
      renderSuggestions();
    } else if (event.key === 'Escape') {
      if (open) { event.preventDefault(); hideSuggestions(); }
      if (engineMenuOpen()) closeEngineMenu();
    }
  });

  document.addEventListener('click', (event) => {
    if (!el.field.contains(event.target)) hideSuggestions();
  });

  /* ---------- 以图搜图 ---------- */
  function updateImageMode() {
    el.imageBtn.setAttribute('aria-pressed', String(state.images));
    el.input.placeholder = state.images ? t('search.placeholderImage') : t('search.placeholder');
  }

  el.imageBtn.addEventListener('click', () => {
    const current = engine();
    if (!current.images) { toast(t('toast.noImage', current.name)); return; }
    state.images = !state.images;
    updateImageMode();
    el.input.focus();
  });

  /* ---------- 语音搜索 ---------- */
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  el.micBtn.addEventListener('click', () => {
    if (!SpeechRecognition) { toast(t('toast.micUnsupported')); return; }
    const recognition = new SpeechRecognition();
    recognition.lang = state.lang === 'en' ? 'en-US' : state.lang;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    el.micBtn.setAttribute('aria-pressed', 'true');
    recognition.addEventListener('result', (event) => {
      const transcript = event.results[0][0].transcript;
      el.input.value = transcript;
      runSearch(transcript, {});
    });
    recognition.addEventListener('error', () => toast(t('toast.micError')));
    recognition.addEventListener('end', () => el.micBtn.setAttribute('aria-pressed', 'false'));
    try { recognition.start(); } catch { el.micBtn.setAttribute('aria-pressed', 'false'); }
  });

  /* ---------------------------------------------------------
     12. 快捷网址栏
     --------------------------------------------------------- */
  function renderLinks() {
    el.linksList.textContent = '';
    linksPanel.classList.toggle('is-editing', state.editing);

    if (!state.links.length) {
      const empty = document.createElement('p');
      empty.className = 'suggest__empty';
      empty.textContent = t('links.empty');
      el.linksList.appendChild(empty);
      return;
    }

    state.links.forEach((link, index) => {
      const chip = document.createElement('a');
      chip.className = 'chip';
      chip.href = link.url;
      chip.dataset.index = String(index);
      chip.draggable = state.editing;
      chip.title = link.name + ' · ' + prettyUrl(link.url);

      chip.appendChild(iconNode(hostOf(link.url), link.name, 'chip__icon'));

      const name = document.createElement('span');
      name.className = 'chip__name';
      name.textContent = link.name;
      chip.appendChild(name);

      if (state.editing) {
        const remove = document.createElement('button');
        remove.type = 'button';
        remove.className = 'chip__remove';
        remove.setAttribute('aria-label', t('links.remove', link.name));
        remove.title = t('links.remove', link.name);
        remove.innerHTML = '<svg viewBox="0 0 24 24" width="13" height="13"><path d="M18.3 5.7 12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3l6.3 6.3 6.3-6.3Z" fill="currentColor"/></svg>';
        remove.addEventListener('click', (event) => {
          event.preventDefault();
          event.stopPropagation();
          removeLink(index);
        });
        chip.appendChild(remove);

        chip.addEventListener('click', (event) => { event.preventDefault(); });
        chip.addEventListener('dblclick', (event) => {
          event.preventDefault();
          openLinkModal('edit', index);
        });
        attachDrag(chip, index);
      }

      el.linksList.appendChild(chip);
    });

    if (state.editing) {
      const add = document.createElement('button');
      add.type = 'button';
      add.className = 'chip chip--add';
      add.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
      const addLabel = document.createElement('span');
      addLabel.textContent = t('links.add');
      add.appendChild(addLabel);
      add.addEventListener('click', () => openLinkModal('add'));
      el.linksList.appendChild(add);
    }
  }

  function attachDrag(chip, index) {
    chip.addEventListener('dragstart', (event) => {
      state.dragIndex = index;
      chip.classList.add('is-dragging');
      event.dataTransfer.effectAllowed = 'move';
      try { event.dataTransfer.setData('text/plain', String(index)); } catch { /* 忽略 */ }
    });
    chip.addEventListener('dragend', () => {
      chip.classList.remove('is-dragging');
      el.linksList.querySelectorAll('.chip').forEach((node) => node.classList.remove('is-over'));
    });
    chip.addEventListener('dragover', (event) => {
      event.preventDefault();
      chip.classList.add('is-over');
    });
    chip.addEventListener('dragleave', () => chip.classList.remove('is-over'));
    chip.addEventListener('drop', (event) => {
      event.preventDefault();
      chip.classList.remove('is-over');
      const from = state.dragIndex;
      if (from < 0 || from === index) return;
      const [moved] = state.links.splice(from, 1);
      state.links.splice(index, 0, moved);
      persistLinks();
      renderLinks();
      toast(t('toast.reordered'));
    });
  }

  const persistLinks = () => store.set(KEY.links, state.links);

  function removeLink(index) {
    state.links.splice(index, 1);
    persistLinks();
    renderLinks();
    toast(t('toast.removed'));
  }

  el.editLinksBtn.addEventListener('click', () => {
    state.editing = !state.editing;
    applyI18n();
    renderLinks();
  });
  el.addLinkBtn.addEventListener('click', () => openLinkModal('add'));

  /* ---------------------------------------------------------
     13. 添加 / 编辑 对话框
     --------------------------------------------------------- */
  function openLinkModal(mode, index) {
    state.editingIndex = mode === 'edit' ? index : -1;
    el.linkModalTitle.textContent = mode === 'edit' ? t('dialog.editTitle') : t('dialog.addTitle');
    el.linkError.hidden = true;
    if (mode === 'edit' && state.links[index]) {
      el.linkName.value = state.links[index].name;
      el.linkUrl.value = prettyUrl(state.links[index].url);
    } else {
      el.linkForm.reset();
    }
    el.modal.hidden = false;
    el.linkName.focus();
  }

  function closeLinkModal() {
    el.modal.hidden = true;
    state.editingIndex = -1;
  }

  el.modal.addEventListener('click', (event) => {
    if (event.target.closest('[data-close]')) closeLinkModal();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !el.modal.hidden) closeLinkModal();
    if (event.key === '/' && document.activeElement !== el.input &&
        !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName) && el.modal.hidden) {
      event.preventDefault();
      el.input.focus();
    }
  });

  el.linkForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = el.linkName.value.trim();
    const url = normalizeUrl(el.linkUrl.value);

    if (!name) { showLinkError(t('toast.nameRequired')); return; }
    if (!el.linkUrl.value.trim()) { showLinkError(t('toast.urlRequired')); return; }
    if (!url) { showLinkError(t('toast.urlInvalid')); return; }

    if (state.editingIndex >= 0) {
      state.links[state.editingIndex] = { name, url };
      toast(t('toast.saved'));
    } else {
      state.links.push({ name, url });
      toast(t('toast.added'));
    }
    persistLinks();
    closeLinkModal();
    renderLinks();
  });

  function showLinkError(message) {
    el.linkError.textContent = message;
    el.linkError.hidden = false;
  }

  /* ---------------------------------------------------------
     14. 显示选项与自定义背景
     --------------------------------------------------------- */
  function applyLinksVisibility() {
    el.linksBar.hidden = !state.showLinks;
    el.showLinksSwitch.setAttribute('aria-checked', String(state.showLinks));
  }

  /** 一年中的第几天：让「每日一言 / 今天吃什么」每天自动换一次 */
  function dayOfYear() {
    const now = new Date();
    return Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
  }

  function renderFooterNote() {
    const mode = state.footerMode;
    el.footerMode.value = mode;
    el.footerNote.disabled = mode !== 'food';
    el.footerNote.title = '';

    if (mode === 'quote') {
      const list = QUOTES[state.lang] || QUOTES['zh-CN'];
      el.footerNote.textContent = list[dayOfYear() % list.length];
    } else if (mode === 'food') {
      const list = FOODS[state.lang] || FOODS['zh-CN'];
      el.footerNote.textContent = t('footer.foodPrefix') + list[(dayOfYear() + state.foodRoll) % list.length];
      el.footerNote.title = t('footer.reroll');
    } else {
      el.footerNote.textContent = t('footer.note');
    }
  }

  el.footerMode.addEventListener('change', () => {
    state.footerMode = el.footerMode.value;
    store.set(KEY.footerMode, state.footerMode);
    renderFooterNote();
  });

  // 「今天吃什么」点一下换一个
  el.footerNote.addEventListener('click', () => {
    if (state.footerMode !== 'food') return;
    state.foodRoll += 1;
    renderFooterNote();
  });

  function applyBackground() {
    HP.applyBackground(state.bg, state.bgDim);

    el.bgClearBtn.hidden = !state.bg;
    el.bgDimRow.hidden = !state.bg;
    el.bgDim.value = String(state.bgDim);
    el.bgDimOut.textContent = state.bgDim + '%';
    applyOpacity(); // 有背景图时面板默认更实一些
  }

  /** 面板不透明度：没手调过就跟随默认值（有背景图时 75%，否则 60%） */
  function applyOpacity() {
    const fallback = state.bg ? 75 : 60;
    const card = state.opacitySearch === null ? fallback : state.opacitySearch;
    const panel = state.opacityLinks === null ? fallback : state.opacityLinks;

    HP.applyOpacity(card, panel);

    el.opacitySearch.value = String(card);
    el.opacityLinks.value = String(panel);
    el.opacitySearchOut.textContent = card + '%';
    el.opacityLinksOut.textContent = panel + '%';
  }

  el.opacitySearch.addEventListener('input', () => {
    state.opacitySearch = Number(el.opacitySearch.value);
    store.set(KEY.opacitySearch, state.opacitySearch);
    applyOpacity();
  });

  el.opacityLinks.addEventListener('input', () => {
    state.opacityLinks = Number(el.opacityLinks.value);
    store.set(KEY.opacityLinks, state.opacityLinks);
    applyOpacity();
  });

  /** 读本地图片 → 缩到 1920px → 转 JPEG，避免超出 localStorage 容量 */
  function setBackgroundFromFile(file) {
    if (!file || !/^image\//.test(file.type)) { toast(t('toast.bgFailed')); return; }

    const reader = new FileReader();
    reader.addEventListener('error', () => toast(t('toast.bgFailed')));
    reader.addEventListener('load', () => {
      const img = new Image();
      img.addEventListener('error', () => toast(t('toast.bgFailed')));
      img.addEventListener('load', () => {
        const max = 1920;
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const width = Math.max(1, Math.round(img.width * scale));
        const height = Math.max(1, Math.round(img.height * scale));

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = resolvedTheme() === 'light' ? '#ffffff' : '#09090b';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        const data = canvas.toDataURL('image/jpeg', 0.85);
        if (!store.set(KEY.bg, data)) { toast(t('toast.bgTooBig')); return; }

        state.bg = data;
        applyBackground();
        toast(t('toast.bgSet'));
      });
      img.src = String(reader.result);
    });
    reader.readAsDataURL(file);
  }

  el.showLinksSwitch.addEventListener('click', () => {
    state.showLinks = !state.showLinks;
    store.set(KEY.showLinks, state.showLinks);
    applyLinksVisibility();
  });

  el.bgPickBtn.addEventListener('click', () => el.bgFile.click());

  el.bgFile.addEventListener('change', () => {
    const file = el.bgFile.files && el.bgFile.files[0];
    if (file) setBackgroundFromFile(file);
    el.bgFile.value = '';
  });

  el.bgClearBtn.addEventListener('click', () => {
    state.bg = '';
    store.set(KEY.bg, '');
    applyBackground();
    toast(t('toast.bgCleared'));
  });

  el.bgDim.addEventListener('input', () => {
    state.bgDim = Number(el.bgDim.value);
    store.set(KEY.bgDim, state.bgDim);
    el.bgDimOut.textContent = state.bgDim + '%';
    applyBackground();
  });

  // 直接把图片拖到页面上也能设成背景
  document.addEventListener('dragover', (event) => {
    if (event.dataTransfer && [...event.dataTransfer.types].includes('Files')) event.preventDefault();
  });
  document.addEventListener('drop', (event) => {
    const files = event.dataTransfer && event.dataTransfer.files;
    if (!files || !files.length) return;
    event.preventDefault();
    setBackgroundFromFile(files[0]);
  });

  /* ---------------------------------------------------------
     15. 设置面板
     --------------------------------------------------------- */
  function renderEngineSelect() {
    ENGINES.forEach((item) => {
      const option = document.createElement('option');
      option.value = item.id;
      option.textContent = item.name;
      el.engineSelect.appendChild(option);
    });
    el.engineSelect.value = state.engineId;
  }

  function togglePanel(panel, trigger) {
    const willOpen = panel.hidden;
    panel.hidden = !willOpen;
    trigger.setAttribute('aria-expanded', String(willOpen));
  }

  el.settingsBtnBottom.addEventListener('click', (event) => {
    event.stopPropagation();
    togglePanel(el.settingsPanel, el.settingsBtnBottom);
  });

  document.addEventListener('click', (event) => {
    if (el.settingsPanel.hidden) return;
    if (el.settingsPanel.contains(event.target)) return;
    if (el.settingsBtnBottom.contains(event.target)) return;
    el.settingsPanel.hidden = true;
    el.settingsBtnBottom.setAttribute('aria-expanded', 'false');
  });

  el.themeSeg.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-theme-value]');
    if (btn) setTheme(btn.dataset.themeValue, true);
  });

  el.themeBtn.addEventListener('click', () => {
    setTheme(resolvedTheme() === 'dark' ? 'light' : 'dark', true);
  });

  el.engineSelect.addEventListener('change', () => setEngine(el.engineSelect.value));

  el.resetLinksBtn.addEventListener('click', () => {
    state.links = DEFAULT_LINKS.map((link) => ({ ...link }));
    persistLinks();
    renderLinks();
    toast(t('toast.resetLinks'));
  });

  el.clearHistoryBtn.addEventListener('click', () => {
    state.history = [];
    store.set(KEY.history, []);
    hideSuggestions();
    toast(t('toast.cleared'));
  });

  el.langSeg.addEventListener('click', (event) => {
    const btn = event.target.closest('button[data-lang]');
    if (btn) setLang(btn.dataset.lang);
  });

  /* ---------------------------------------------------------
     15. 初始化
     --------------------------------------------------------- */
  function init() {
    applyTheme();
    applyFont();
    applyI18n();
    renderEngine();
    renderEngineSelect();
    renderLinks();
    updateImageMode();
    applyLinksVisibility();
    applyBackground();
    applyOpacity();
    if (el.currentYear) el.currentYear.textContent = String(new Date().getFullYear());
  }

  init();
})();
