// Main Application Controller for IPE GRIND
window.IPE_APP = (function() {
  let activeTab = 'feed';
  let activeGlobalSubject = 'all'; // 'all' | 'physics' | 'chemistry'
  let activeChapterSubject = 'all';
  let deferredInstallPrompt = null;

  // Performance: Lazy Loading State for Tabs
  const initializedTabs = {
    feed: false,
    chapters: false,
    quiz: false,
    formulas: false,
    saved: false
  };

  // Initialize App on DOM Ready
  function init() {
    initTheme();
    initStreakAndXP();
    initServiceWorker();
    setupEventListeners();
    initSearchDebounce();

    // High Performance: Initialize Feed first. Other tabs lazy load on demand
    window.IPE_FEED.init();
    initializedTabs.feed = true;

    updateStatsUI();
    updateUserProfileUI();

    // Restore saved global subject
    const savedSubj = localStorage.getItem('ipe_global_subject') || 'all';
    setGlobalSubject(savedSubj);

    // Check badges
    window.IPE_GAME.checkBadges();

    // Initialize Flagship Features: Countdown, Audio, Commute, Simulators, Mock Exam
    if (window.IPE_COUNTDOWN && window.IPE_COUNTDOWN.init) window.IPE_COUNTDOWN.init();
    if (window.IPE_COMMUTE && window.IPE_COMMUTE.init) window.IPE_COMMUTE.init();
    if (window.IPE_SIMULATORS && window.IPE_SIMULATORS.init) window.IPE_SIMULATORS.init();
    if (window.IPE_MOCK && window.IPE_MOCK.init) window.IPE_MOCK.init();
    if (window.IPE_AMBIENT && window.IPE_AMBIENT.init) window.IPE_AMBIENT.init();
    // Phase 3 Modules: Google Auth, Cloud Database & Concept Explorer
    if (window.IPE_AUTH && window.IPE_AUTH.init) window.IPE_AUTH.init();
    if (window.IPE_DB && window.IPE_DB.init) window.IPE_DB.init();
    if (window.IPE_CONCEPTS && window.IPE_CONCEPTS.init) window.IPE_CONCEPTS.init();

  }

  // Debounced Search (300ms)
  function initSearchDebounce() {
    const searchInput = document.getElementById('modal-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        window.IPE_FEED.setSearchQuery(e.target.value);
      });
    }
  }

  // Theme Management
  function initTheme() {
    const savedTheme = window.IPE_STORAGE.getTheme();
    applyTheme(savedTheme);
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    window.IPE_STORAGE.setTheme(theme);
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
    const drawerThemeIcon = document.getElementById('drawer-theme-icon');
    if (drawerThemeIcon) {
      drawerThemeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }

  function toggleTheme() {
    const current = window.IPE_STORAGE.getTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  }

  function toggleSideDrawer(open) {
    const drawer = document.getElementById('side-drawer');
    const backdrop = document.getElementById('side-drawer-backdrop');
    if (!drawer || !backdrop) return;
    const shouldOpen = open !== undefined ? open : !drawer.classList.contains('open');
    if (shouldOpen) {
      drawer.classList.add('open');
      backdrop.classList.add('open');
    } else {
      drawer.classList.remove('open');
      backdrop.classList.remove('open');
    }
  }

  // Streak & XP Initializer
  function initStreakAndXP() {
    const streakResult = window.IPE_STORAGE.updateStreak();
    if (streakResult.isNewDay) {
      window.IPE_GAME.showXPToast(15, '🔥 Daily Streak Active!');
    }
    updateStatsUI();
  }

  function updateStatsUI() {
    const streakData = window.IPE_STORAGE.getStreakData();
    const xp = window.IPE_STORAGE.getXP();

    const streakEl = document.getElementById('header-streak-val');
    if (streakEl) streakEl.textContent = `${streakData.current}d`;

    const xpEl = document.getElementById('header-xp-val');
    if (xpEl) xpEl.textContent = `${xp}`;

    const profileStreak = document.getElementById('profile-streak-val');
    if (profileStreak) profileStreak.textContent = `${streakData.current}d`;

    const profileXp = document.getElementById('profile-xp-val');
    if (profileXp) profileXp.textContent = `${xp}`;

    // Update chapter progress rings only if chapters tab has been loaded
    if (initializedTabs.chapters) {
      renderChaptersGrid();
    }
  }

  // Service Worker & PWA Install
  function initServiceWorker() {
    if ('serviceWorker' in navigator && (window.location.protocol === 'http:' || window.location.protocol === 'https:')) {
      navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('IPE Grind SW registered:', reg.scope))
        .catch(err => console.warn('SW registration skipped:', err));
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredInstallPrompt = e;
      const pwaBanner = document.getElementById('pwa-install-banner');
      if (pwaBanner) pwaBanner.style.display = 'flex';
    });
  }

  // Tab Navigation Router (with Performance Lazy-Loading & Skeleton Screens)
  function switchTab(tabName) {
    activeTab = tabName;

    // Toggle active classes on sections
    const sections = document.querySelectorAll('.view-section');
    sections.forEach(sec => {
      sec.classList.remove('active');
    });

    const targetSec = document.getElementById(`section-${tabName}`);
    if (targetSec) targetSec.classList.add('active');

    // Toggle active nav buttons
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName);
    });

    // Lazy load tab on first activation with skeleton loader
    if (tabName === 'chapters') {
      if (!initializedTabs.chapters) {
        showTabSkeleton('chapters');
        setTimeout(() => {
          renderChaptersGrid();
          initializedTabs.chapters = true;
        }, 30);
      }
    } else if (tabName === 'formulas') {
      if (!initializedTabs.formulas) {
        showTabSkeleton('formulas');
        setTimeout(() => {
          if (window.IPE_FLASHCARDS) window.IPE_FLASHCARDS.init();
          initializedTabs.formulas = true;
        }, 30);
      }
    } else if (tabName === 'saved') {
      if (!initializedTabs.saved) {
        renderSavedView();
        initializedTabs.saved = true;
      }
    } else if (tabName === 'feed') {
      if (!initializedTabs.feed) {
        window.IPE_FEED.init();
        initializedTabs.feed = true;
      }
    }
  }

  function showTabSkeleton(tab) {
    if (tab === 'chapters') {
      const gPhy = document.getElementById('physics-chapters-grid');
      if (gPhy && !initializedTabs.chapters) {
        gPhy.innerHTML = `
          <div class="skeleton-card"><div class="skeleton-line title"></div><div class="skeleton-line"></div></div>
          <div class="skeleton-card"><div class="skeleton-line title"></div><div class="skeleton-line"></div></div>
        `;
      }
    } else if (tab === 'formulas') {
      const fcContent = document.getElementById('flashcards-view-content');
      if (fcContent && !initializedTabs.formulas) {
        fcContent.innerHTML = `
          <div class="skeleton-card" style="min-height: 280px;"><div class="skeleton-line title"></div><div class="skeleton-line btn"></div></div>
        `;
      }
    }
  }

  // Update Chapter UI visibility and summary card without triggering full app resync
  function updateChapterViewVisibility(s) {
    const phyPicker = document.getElementById('ch-picker-physics');
    const chemPicker = document.getElementById('ch-picker-chemistry');
    if (phyPicker) phyPicker.classList.toggle('active-physics', s === 'physics');
    if (chemPicker) chemPicker.classList.toggle('active-chemistry', s === 'chemistry');

    ['physics', 'chemistry', 'all'].forEach(subKey => {
      const pill = document.getElementById(`ch-pill-${subKey}`);
      if (pill) pill.classList.toggle('active', subKey === s);
    });

    const phyGroup = document.getElementById('group-physics-chapters');
    const chemGroup = document.getElementById('group-chemistry-chapters');
    if (phyGroup) {
      phyGroup.style.display = (s === 'physics' || s === 'all') ? 'block' : 'none';
    }
    if (chemGroup) {
      chemGroup.style.display = (s === 'chemistry' || s === 'all') ? 'block' : 'none';
    }

    renderSubjectSummaryCard(s);
  }

  // Update Compact Subject Summary Card
  let lastPhyMastered = 0, lastPhyTotal = 188;
  let lastChemMastered = 0, lastChemTotal = 174;

  function renderSubjectSummaryCard(subj) {
    const summaryEl = document.getElementById('chapters-summary-card');
    if (!summaryEl) return;
    const s = subj || activeGlobalSubject;

    let title = '';
    let countText = '';
    let solvedText = '';
    let pct = 0;

    if (s === 'physics') {
      title = 'Physics Syllabus';
      countText = '16 Chapters Ready';
      solvedText = `${lastPhyMastered}/${lastPhyTotal} solved`;
      pct = Math.round((lastPhyMastered / lastPhyTotal) * 100) || 0;
    } else if (s === 'chemistry') {
      title = 'Chemistry Syllabus';
      countText = '15 Chapters Ready';
      solvedText = `${lastChemMastered}/${lastChemTotal} solved`;
      pct = Math.round((lastChemMastered / lastChemTotal) * 100) || 0;
    } else {
      const totalM = lastPhyMastered + lastChemMastered;
      const totalQ = lastPhyTotal + lastChemTotal;
      title = 'Full IPE Syllabus';
      countText = '31 Chapters Ready';
      solvedText = `${totalM}/${totalQ} solved`;
      pct = Math.round((totalM / totalQ) * 100) || 0;
    }

    summaryEl.innerHTML = `
      <div class="summary-card-inner">
        <div class="summary-left">
          <span class="summary-badge">${title}</span>
          <span class="summary-subtitle">${countText}</span>
        </div>
        <div class="summary-right">
          <span class="summary-solved-count">${solvedText}</span>
          <span class="summary-pct-badge">${pct}%</span>
        </div>
      </div>
    `;
  }

  // Global Unified Subject Switcher (Synchronizes Chapters, Flashcards, Feed across the whole app)
  function setGlobalSubject(subject) {
    const s = (subject || 'all').toLowerCase();
    activeGlobalSubject = s;
    activeChapterSubject = s;

    // 1. Update Header Subject Bar Pills
    ['all', 'physics', 'chemistry'].forEach(subKey => {
      const pill = document.getElementById(`global-sub-${subKey}`);
      if (pill) pill.classList.toggle('active', subKey === s);
    });

    // 2. Update Chapters Tab Pickers & Filter Pills
    updateChapterViewVisibility(s);

    // 3. Synchronize Flashcards Engine
    if (window.IPE_FLASHCARDS && typeof window.IPE_FLASHCARDS.setSubject === 'function') {
      window.IPE_FLASHCARDS.setSubject(s);
    }

    // 4. Synchronize Feed Filtering
    if (window.IPE_FEED && typeof window.IPE_FEED.setFilter === 'function') {
      window.IPE_FEED.setFilter({ subject: s, chapterId: 'all' });
    }

    // 5. Save Preference
    try {
      localStorage.setItem('ipe_global_subject', s);
    } catch(e) {}
  }

  // Alias for backward compatibility
  function setChapterSubject(subject) {
    setGlobalSubject(subject);
  }

  function openChapterFormulas(chapterId) {
    if (window.IPE_FLASHCARDS) {
      window.IPE_FLASHCARDS.selectChapter(chapterId);
      switchTab('formulas');
    }
  }

  // Render Chapters Grid with Part Grouping and Flat 1px Design System
  function renderChaptersGrid() {
    const phyContainer = document.getElementById('physics-chapters-grid');
    const chemContainer = document.getElementById('chemistry-chapters-grid');
    if (!phyContainer || !chemContainer || !window.IPE_DATA || !window.IPE_DATA.manifest) return;

    const manifest = window.IPE_DATA.manifest;

    let phyTotalMastered = 0;
    let phyTotalQuestions = 0;
    let chemTotalMastered = 0;
    let chemTotalQuestions = 0;

    function buildChapterItem(ch, subject) {
      const isLoaded = ch.loaded !== false;
      const progress = isLoaded ? window.IPE_STORAGE.getChapterProgress(ch.id) : { mastered: 0, total: 0, percent: 0 };
      const chData = window.IPE_DATA.chapters[ch.id];
      const actualCount = chData && chData.questions ? chData.questions.length : (ch.questionCount || 10);
      const solvedCount = progress.total > 0 ? progress.total : actualCount;
      const solvedCaption = `${progress.mastered}/${solvedCount} solved`;

      if (subject === 'Physics') {
        phyTotalMastered += progress.mastered;
        phyTotalQuestions += solvedCount;
      } else {
        chemTotalMastered += progress.mastered;
        chemTotalQuestions += solvedCount;
      }

      return `
        <div class="chapter-card-item" onclick="window.IPE_APP.selectChapter('${ch.id}', ${isLoaded})">
          <div class="ch-card-header">
            <div class="ch-title-wrap">
              <span class="ch-num-caption">${subject} • Ch ${ch.num}</span>
              <h4 class="ch-card-name">${ch.name}</h4>
            </div>
            <span class="ch-weight-chip">${ch.ipeWeightage || '4M'}</span>
          </div>

          <div class="ch-card-meta">
            <span class="ch-solved-caption">${solvedCaption}</span>
            <div style="display: flex; gap: 4px;">
              ${ch.id === 'phy-ch01' ? '<button class="ch-formula-btn" style="color: #38bdf8; border-color: rgba(56,189,248,0.4);" onclick="event.stopPropagation(); window.IPE_SIMULATORS.openModal(\'sonometer\');" title="Simulate Sonometer"><span>🧪 Lab</span></button>' : ''}
              ${ch.id === 'phy-ch06' ? '<button class="ch-formula-btn" style="color: #38bdf8; border-color: rgba(56,189,248,0.4);" onclick="event.stopPropagation(); window.IPE_SIMULATORS.openModal(\'potentiometer\');" title="Simulate Potentiometer"><span>🧪 Lab</span></button>' : ''}
              ${ch.id === 'chem-ch03' ? '<button class="ch-formula-btn" style="color: #38bdf8; border-color: rgba(56,189,248,0.4);" onclick="event.stopPropagation(); window.IPE_SIMULATORS.openModal(\'nernst\');" title="Simulate Daniell Cell"><span>🧪 Lab</span></button>' : ''}
              ${ch.id === 'chem-ch04' ? '<button class="ch-formula-btn" style="color: #38bdf8; border-color: rgba(56,189,248,0.4);" onclick="event.stopPropagation(); window.IPE_SIMULATORS.openModal(\'kinetics\');" title="Simulate Kinetics"><span>🧪 Lab</span></button>' : ''}
              <button class="ch-formula-btn" onclick="event.stopPropagation(); window.IPE_APP.openChapterFormulas('${ch.id}')" title="Formulas">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10M6 10h10"/></svg>
                <span>Formulas</span>
              </button>
            </div>
          </div>

          <div class="ch-progress-row">
            <div class="ch-progress-track">
              <div class="ch-progress-fill" style="width: ${progress.percent || 0}%;"></div>
            </div>
            <svg class="ch-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </div>
        </div>
      `;
    }

    const phyPart1 = manifest.physics.filter(ch => ch.num <= 8);
    const phyPart2 = manifest.physics.filter(ch => ch.num > 8);

    const chemPart1 = manifest.chemistry.filter(ch => ch.num <= 7);
    const chemPart2 = manifest.chemistry.filter(ch => ch.num > 7);

    phyContainer.innerHTML = `
      <div class="part-section-header">Part I • Chapters 1–8</div>
      <div class="part-chapters-list">${phyPart1.map(ch => buildChapterItem(ch, 'Physics')).join('')}</div>
      <div class="part-section-header" style="margin-top: 14px;">Part II • Chapters 9–16</div>
      <div class="part-chapters-list">${phyPart2.map(ch => buildChapterItem(ch, 'Physics')).join('')}</div>
    `;

    chemContainer.innerHTML = `
      <div class="part-section-header">Part I • Chapters 1–7</div>
      <div class="part-chapters-list">${chemPart1.map(ch => buildChapterItem(ch, 'Chemistry')).join('')}</div>
      <div class="part-section-header" style="margin-top: 14px;">Part II • Chapters 8–15</div>
      <div class="part-chapters-list">${chemPart2.map(ch => buildChapterItem(ch, 'Chemistry')).join('')}</div>
    `;

    lastPhyMastered = phyTotalMastered;
    lastPhyTotal = phyTotalQuestions || 188;
    lastChemMastered = chemTotalMastered;
    lastChemTotal = chemTotalQuestions || 174;

    // Update subject card progress indicators for backward compatibility
    const phyBadge = document.getElementById('physics-chapters-count-badge');
    if (phyBadge) {
      phyBadge.innerHTML = `<span class="status-indicator phy"></span> 16 Chapters Ready • ${phyTotalMastered}/${lastPhyTotal} Solved`;
    }
    const chemBadge = document.getElementById('chemistry-chapters-count-badge');
    if (chemBadge) {
      chemBadge.innerHTML = `<span class="status-indicator chem"></span> 15 Chapters Ready • ${chemTotalMastered}/${lastChemTotal} Solved`;
    }

    // Ensure active view reflects activeGlobalSubject without triggering global re-sync
    updateChapterViewVisibility(activeGlobalSubject);
  }

  // Select Chapter from Grid to Jump into Feed with optional Marks filter
  function selectChapter(chapterId, isLoaded, marksType) {
    if (!isLoaded) {
      alert('This chapter is being loaded! You can practice the unlocked chapters now.');
      return;
    }

    const type = marksType || 'all';
    window.IPE_FEED.setFilter({ chapterId: chapterId, subject: 'all', type: type });

    // Update marks pill active state
    const marksBar = document.querySelector('.feed-marks-filter-bar');
    if (marksBar) {
      marksBar.querySelectorAll('.marks-pill').forEach(b => b.classList.remove('active'));
      const activePill = marksBar.querySelector(`[data-type="${type}"]`);
      if (activePill) activePill.classList.add('active');
    }

    switchTab('feed');
  }

  // Render Formulas & Flashcards View
  function renderFormulasView() {
    if (window.IPE_FLASHCARDS) {
      window.IPE_FLASHCARDS.render();
    }
  }

  // Render Saved View (Bookmarked + Revise Again)
  let savedSubTab = 'bookmarked';
  function renderSavedView() {
    const container = document.getElementById('saved-questions-list');
    if (!container) return;

    // Use all loaded questions across full syllabus, not just filtered activeQuestions!
    const all = window.IPE_FEED.getAllLoadedQuestions ? window.IPE_FEED.getAllLoadedQuestions() : window.IPE_FEED.getQuestions();
    const idSet = (savedSubTab === 'bookmarked') ? window.IPE_STORAGE.getBookmarks() : window.IPE_STORAGE.getRevise();

    const matched = all.filter(q => idSet.has(q.id));

    if (matched.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon-wrap">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
          </div>
          <h3>No ${savedSubTab === 'bookmarked' ? 'Bookmarked' : 'Revision'} Questions</h3>
          <p>Tap the ${savedSubTab === 'bookmarked' ? 'Save' : 'Revise'} button on any question card while studying.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = matched.map(q => `
      <div class="saved-item-card" onclick="window.IPE_APP.jumpToQuestion('${q.id}')">
        <div class="saved-card-content">
          <div class="saved-chip-row">
            <span class="ch-weight-chip">${q.subject}</span>
            <span class="ch-weight-chip" style="background: var(--bg-surface);">${q.type}</span>
          </div>
          <div class="saved-question-text">${q.question}</div>
        </div>
        <svg class="saved-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </div>
    `).join('');
  }

  function setSavedSubTab(subTab) {
    savedSubTab = subTab;
    document.querySelectorAll('.saved-tab-btn').forEach(b => {
      b.classList.remove('active');
      if (b.getAttribute('data-sub') === subTab) b.classList.add('active');
    });
    renderSavedView();
  }

  function jumpToQuestion(qId) {
    if (window.IPE_FEED && typeof window.IPE_FEED.jumpToQuestion === 'function') {
      window.IPE_FEED.jumpToQuestion(qId);
    }
    switchTab('feed');
  }

  // Setup Global Event Listeners & Modals
  function setupEventListeners() {
    // Bottom navigation clicks
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        if (tab) switchTab(tab);
      });
    });

    // Theme toggle button
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

    // Search & Filter modal triggers
    const filterBtn = document.getElementById('open-filter-btn');
    if (filterBtn) filterBtn.addEventListener('click', openFilterModal);

    // Badges modal trigger
    const badgesPill = document.getElementById('header-badges-pill');
    if (badgesPill) badgesPill.addEventListener('click', openBadgesModal);

    // Question of the Day trigger
    const qotdBtn = document.getElementById('header-qotd-btn');
    if (qotdBtn) qotdBtn.addEventListener('click', openQOTDModal);

    // Search input live filtering
    const searchInput = document.getElementById('modal-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        window.IPE_FEED.setFilter({ searchQuery: e.target.value });
      });
    }
  }

  // Modals Management
  function openFilterModal() {
    const modal = document.getElementById('filter-modal');
    if (modal) if (window.IPE_AUTH && window.IPE_AUTH.updateAuthUI) window.IPE_AUTH.updateAuthUI();
    modal.classList.add('open');
  }

  function closeFilterModal() {
    const modal = document.getElementById('filter-modal');
    if (modal) modal.classList.remove('open');
  }

  function openBadgesModal() {
    const modal = document.getElementById('badges-modal');
    const container = document.getElementById('badges-grid-container');
    if (!modal || !container) return;

    const defs = window.IPE_GAME.getBadgeDefs();
    const unlocked = window.IPE_STORAGE.getBadges();

    container.innerHTML = defs.map(b => {
      const isUnlocked = unlocked.has(b.id);
      return `
        <div class="badge-item ${isUnlocked ? 'unlocked' : ''}">
          <span class="badge-icon">${b.icon}</span>
          <span class="badge-name">${b.name}</span>
          <span style="font-size: 0.65rem; color: var(--text-dim); line-height: 1.2;">${b.desc}</span>
        </div>
      `;
    }).join('');

    modal.classList.add('open');
  }

  function closeBadgesModal() {
    const modal = document.getElementById('badges-modal');
    if (modal) modal.classList.remove('open');
  }

  function openQOTDModal() {
    const modal = document.getElementById('qotd-modal');
    const container = document.getElementById('qotd-card-content');
    if (!modal || !container) return;

    const all = window.IPE_FEED.getQuestions();
    const importantOnes = all.filter(q => q.important);
    const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % importantOnes.length;
    const qotd = importantOnes[dayIndex] || all[0];

    container.innerHTML = `
      <div style="background: var(--bg-card-subtle); padding: 14px; border-radius: var(--radius-md); border-left: 3px solid #f59e0b; margin-bottom: 12px;">
        <span class="chip chip-imp" style="margin-bottom: 6px;">⭐ Question of the Day</span>
        <div style="font-weight: 800; font-size: 1rem; margin-top: 4px;">${qotd.question}</div>
      </div>
      <button class="btn-primary" onclick="window.IPE_APP.closeQOTDModal(); window.IPE_APP.jumpToQuestion('${qotd.id}')">
        Practice This Question ➔
      </button>
    `;

    modal.classList.add('open');
  }

  function closeQOTDModal() {
    const modal = document.getElementById('qotd-modal');
    if (modal) modal.classList.remove('open');
  }

  // Student Profile & Mobile Auth Management
  function updateUserProfileUI() {
    const user = window.IPE_STORAGE.getUser();
    const nameEl = document.getElementById('header-user-name');
    if (nameEl) {
      nameEl.textContent = user.isGuest ? 'Guest' : (user.name.split(' ')[0] || 'Aspirant');
    }
  }

  function openAuthModal() {
    const modal = document.getElementById('modal-auth');
    if (!modal) return;
    const user = window.IPE_STORAGE.getUser();

    const nameInput = document.getElementById('auth-input-name');
    const mobileInput = document.getElementById('auth-input-mobile');
    const aimSelect = document.getElementById('auth-select-aim');
    const statusNote = document.getElementById('auth-status-note');

    if (nameInput) nameInput.value = user.isGuest ? '' : user.name;
    if (mobileInput) mobileInput.value = user.mobile || '';
    if (aimSelect) aimSelect.value = user.targetAim || '60/60 Topper';

    if (statusNote) {
      if (user.isGuest) {
        statusNote.innerHTML = '<span style="color: var(--text-dim);">Currently practicing as <strong>Guest</strong>. Enter details below to save your target board score!</span>';
      } else {
        statusNote.innerHTML = `<span style="color: #34d399;">✓ Logged in as <strong>${user.name}</strong> (${user.mobile || 'Registered'})</span>`;
      }
    }

    modal.classList.add('open');
  }

  function closeAuthModal() {
    const modal = document.getElementById('modal-auth');
    if (modal) modal.classList.remove('open');
  }

  function saveUserProfile(event) {
    if (event) event.preventDefault();
    const nameInput = document.getElementById('auth-input-name');
    const mobileInput = document.getElementById('auth-input-mobile');
    const aimSelect = document.getElementById('auth-select-aim');

    const name = nameInput ? nameInput.value.trim() : '';
    const mobile = mobileInput ? mobileInput.value.trim() : '';
    const aim = aimSelect ? aimSelect.value : '60/60 Topper';

    if (!name) {
      alert('Please enter your Name or Nickname');
      if (nameInput) nameInput.focus();
      return;
    }

    if (mobile && !/^\d{10}$/.test(mobile)) {
      alert('Please enter a valid 10-digit mobile number');
      if (mobileInput) mobileInput.focus();
      return;
    }

    const wasGuest = window.IPE_STORAGE.getUser().isGuest;
    window.IPE_STORAGE.setUser({
      name: name,
      mobile: mobile,
      targetAim: aim,
      isGuest: false,
      joinedAt: Date.now()
    });

    if (wasGuest) {
      window.IPE_STORAGE.addXP(25);
      window.IPE_GAME.showXPToast(25, `🎉 Welcome, ${name}!`);
    } else {
      window.IPE_GAME.showXPToast(10, '✓ Profile Updated!');
    }

    updateUserProfileUI();
    updateStatsUI();
    closeAuthModal();
  }

  function loginAsGuest() {
    window.IPE_STORAGE.logoutUser();
    updateUserProfileUI();
    closeAuthModal();
    window.IPE_GAME.showXPToast(5, '👤 Practicing as Guest');
  }

  function openProfileModal() {
    openAuthModal();
  }

  function closeProfileModal() {
    closeAuthModal();
  }

  function openChapterFilterModal() {
    const modal = document.getElementById('chapter-filter-modal');
    const container = document.getElementById('chapter-filter-list');
    if (!modal || !container || !window.IPE_DATA || !window.IPE_DATA.manifest) return;

    let html = `
      <button class="vcard-action-btn" style="text-align: left; justify-content: flex-start; padding: 0 12px; min-height: 40px;" onclick="window.IPE_FEED.setFilter({ chapterId: 'all' }); window.IPE_APP.closeChapterFilterModal();">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10M6 10h10"/></svg>
        <span>All Chapters (Full Syllabus)</span>
      </button>
    `;

    html += '<div style="font-size: 11px; font-weight: 700; color: var(--accent-text); margin: 10px 0 4px; padding-left: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Physics (16 Chapters)</div>';
    window.IPE_DATA.manifest.physics.forEach(ch => {
      html += `
        <button class="vcard-action-btn" style="text-align: left; justify-content: flex-start; padding: 0 12px; min-height: 40px;" onclick="window.IPE_FEED.setFilter({ chapterId: '${ch.id}' }); window.IPE_APP.closeChapterFilterModal();">
          <span>Ch ${ch.num}: ${ch.name}</span>
        </button>
      `;
    });

    html += '<div style="font-size: 11px; font-weight: 700; color: var(--accent-text); margin: 10px 0 4px; padding-left: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Chemistry (15 Chapters)</div>';
    window.IPE_DATA.manifest.chemistry.forEach(ch => {
      html += `
        <button class="vcard-action-btn" style="text-align: left; justify-content: flex-start; padding: 0 12px; min-height: 40px;" onclick="window.IPE_FEED.setFilter({ chapterId: '${ch.id}' }); window.IPE_APP.closeChapterFilterModal();">
          <span>Ch ${ch.num}: ${ch.name}</span>
        </button>
      `;
    });

    container.innerHTML = html;
    modal.classList.add('open');
  }

  function closeChapterFilterModal() {
    const modal = document.getElementById('chapter-filter-modal');
    if (modal) modal.classList.remove('open');
  }

  // PWA Mobile Download & Installation Handler
  function installPWA() {
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      deferredInstallPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          window.IPE_GAME.showXPToast(25, '🎉 App Installed Successfully!');
          const btn = document.getElementById('pwa-download-btn');
          if (btn) btn.style.display = 'none';
        }
        deferredInstallPrompt = null;
      });
    } else {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
      if (isStandalone) {
        alert('IPE Grind is already installed and running as an app on your device!');
        return;
      }
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      if (isIOS) {
        alert('To Install IPE Grind on iPhone/iPad:\n1. Tap the Share button (square with arrow) at the bottom.\n2. Tap "Add to Home Screen" (+).\nNow IPE Grind is installed on your phone home screen!');
      } else {
        alert('To Install IPE Grind on Android / Chrome:\n1. Tap the three dots (⋮) menu in the top-right.\n2. Tap "Install app" or "Add to Home screen".\nNow IPE Grind is installed and works 100% offline!');
      }
    }
  }


  // Official Blueprint & PYQ Trends Controller
  let activeBlueprintTab = 'blueprint';
  let activeWeightageSubject = 'physics';

  function openBlueprintModal(initialTab) {
    const modal = document.getElementById('blueprint-modal');
    if (!modal) return;
    if (initialTab) {
      setBlueprintTab(initialTab);
    }
    modal.classList.add('open');
    if (window.IPE_RENDER_MATH) {
      window.IPE_RENDER_MATH(modal);
    } else if (window.renderMathInElement) {
      try {
        window.renderMathInElement(modal, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false }
          ],
          throwOnError: false
        });
      } catch (e) {}
    }
  }

  function closeBlueprintModal() {
    const modal = document.getElementById("blueprint-modal");
    if (modal) modal.classList.remove("open");
  }

  function setBlueprintTab(tabName) {
    activeBlueprintTab = tabName;
    document.querySelectorAll('.bp-tab-pill').forEach(pill => {
      pill.classList.toggle('active', pill.getAttribute('data-tab') === tabName);
    });
    document.querySelectorAll('.bp-tab-content').forEach(content => {
      content.classList.toggle('active', content.getAttribute('data-tab') === tabName);
    });
  }

  function setWeightageSubject(subj) {
    activeWeightageSubject = subj;
    document.querySelectorAll('.bp-weightage-pill').forEach(pill => {
      pill.classList.toggle('active', pill.getAttribute('data-subj') === subj);
    });
    const phyTable = document.getElementById('bp-physics-table-wrap');
    const chemTable = document.getElementById('bp-chemistry-table-wrap');
    if (phyTable) phyTable.style.display = subj === 'physics' ? 'block' : 'none';
    if (chemTable) chemTable.style.display = subj === 'chemistry' ? 'block' : 'none';
  }

  return {
    init: init,
    switchTab: switchTab,
    toggleTheme: toggleTheme,
    updateStatsUI: updateStatsUI,
    setGlobalSubject: setGlobalSubject,
    setChapterSubject: setGlobalSubject,
    setFormulaSubject: setGlobalSubject,
    selectChapter: selectChapter,
    setSavedSubTab: setSavedSubTab,
    jumpToQuestion: jumpToQuestion,
    openFilterModal: openFilterModal,
    closeFilterModal: closeFilterModal,
    openChapterFilterModal: openChapterFilterModal,
    closeChapterFilterModal: closeChapterFilterModal,
    openProfileModal: openProfileModal,
    closeProfileModal: closeProfileModal,
    openBadgesModal: openBadgesModal,
    closeBadgesModal: closeBadgesModal,
    openQOTDModal: openQOTDModal,
    closeQOTDModal: closeQOTDModal,
    openChapterFormulas: openChapterFormulas,
    openAuthModal: openAuthModal,
    closeAuthModal: closeAuthModal,
    saveUserProfile: saveUserProfile,
    loginAsGuest: loginAsGuest,
    updateUserProfileUI: updateUserProfileUI,
    installPWA: installPWA,
    openBlueprintModal: openBlueprintModal,
    closeBlueprintModal: closeBlueprintModal,
    setBlueprintTab: setBlueprintTab,
    setWeightageSubject: setWeightageSubject
  };
})();

// Robust application startup (handles already-loaded DOM / PWA / Service Worker states)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => window.IPE_APP.init());
} else {
  window.IPE_APP.init();
}
