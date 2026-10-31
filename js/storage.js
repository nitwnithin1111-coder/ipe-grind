// Storage Manager for IPE GRIND using localStorage with Firestore Cloud Bridge
window.IPE_STORAGE = (function() {
  const KEYS = {
    MASTERED: 'ipe_mastered_ids',
    REVISE: 'ipe_revise_ids',
    BOOKMARKS: 'ipe_bookmark_ids',
    XP: 'ipe_total_xp',
    STREAK: 'ipe_streak_data',
    THEME: 'ipe_active_theme',
    BADGES: 'ipe_unlocked_badges',
    LAST_FEED_FILTER: 'ipe_last_filter',
    USER: 'ipe_user_profile'
  };

  function safeGet(key, defaultVal) {
    try {
      const val = localStorage.getItem(key);
      return val ? JSON.parse(val) : defaultVal;
    } catch (e) {
      console.warn('Storage read failed for', key, e);
      return defaultVal;
    }
  }

  function safeSet(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
      // Notify Cloud Database sync engine
      if (window.IPE_DB && window.IPE_DB.triggerSave) {
        window.IPE_DB.triggerSave();
      }
    } catch (e) {
      console.warn('Storage write failed for', key, e);
    }
  }

  return {
    // Mastered ("Got it" ✅)
    getMastered: function() {
      return new Set(safeGet(KEYS.MASTERED, []));
    },
    toggleMastered: function(id) {
      const set = this.getMastered();
      let added = false;
      if (set.has(id)) {
        set.delete(id);
      } else {
        set.add(id);
        added = true;
      }
      safeSet(KEYS.MASTERED, Array.from(set));
      return added;
    },
    isMastered: function(id) {
      return this.getMastered().has(id);
    },

    // Revise Again (🔁)
    getRevise: function() {
      return new Set(safeGet(KEYS.REVISE, []));
    },
    toggleRevise: function(id) {
      const set = this.getRevise();
      let added = false;
      if (set.has(id)) {
        set.delete(id);
      } else {
        set.add(id);
        added = true;
      }
      safeSet(KEYS.REVISE, Array.from(set));
      return added;
    },
    isRevise: function(id) {
      return this.getRevise().has(id);
    },

    // Bookmarks (⭐)
    getBookmarks: function() {
      return new Set(safeGet(KEYS.BOOKMARKS, []));
    },
    toggleBookmark: function(id) {
      const set = this.getBookmarks();
      let added = false;
      if (set.has(id)) {
        set.delete(id);
      } else {
        set.add(id);
        added = true;
      }
      safeSet(KEYS.BOOKMARKS, Array.from(set));
      return added;
    },
    isBookmarked: function(id) {
      return this.getBookmarks().has(id);
    },

    // XP Points
    getXP: function() {
      return safeGet(KEYS.XP, 0);
    },
    addXP: function(pts) {
      const current = this.getXP();
      const updated = current + pts;
      safeSet(KEYS.XP, updated);
      return updated;
    },

    // Daily Streak Tracker
    getStreakData: function() {
      return safeGet(KEYS.STREAK, { current: 1, lastDate: null, highest: 1 });
    },
    updateStreak: function() {
      const data = this.getStreakData();
      const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
      
      if (!data.lastDate) {
        data.current = 1;
        data.lastDate = today;
        data.highest = 1;
        safeSet(KEYS.STREAK, data);
        return { streak: 1, isNewDay: true };
      }

      if (data.lastDate === today) {
        return { streak: data.current, isNewDay: false };
      }

      const last = new Date(data.lastDate);
      const now = new Date(today);
      const diffDays = Math.round((now - last) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        data.current += 1;
        if (data.current > data.highest) data.highest = data.current;
      } else if (diffDays > 1) {
        data.current = 1;
      }
      data.lastDate = today;
      safeSet(KEYS.STREAK, data);
      return { streak: data.current, isNewDay: true };
    },

    // Theme Preference
    getTheme: function() {
      return safeGet(KEYS.THEME, 'dark');
    },
    setTheme: function(theme) {
      safeSet(KEYS.THEME, theme);
    },

    // Badges Unlocked
    getBadges: function() {
      return new Set(safeGet(KEYS.BADGES, ['welcome_aspirant']));
    },
    unlockBadge: function(badgeKey) {
      const badges = this.getBadges();
      if (!badges.has(badgeKey)) {
        badges.add(badgeKey);
        safeSet(KEYS.BADGES, Array.from(badges));
        return true;
      }
      return false;
    },

    // User Profile (Login & Mobile Guest)
    getUser: function() {
      return safeGet(KEYS.USER, {
        name: 'Guest Aspirant',
        email: '',
        mobile: '',
        targetAim: '60/60 Topper',
        isGuest: true,
        joinedAt: Date.now()
      });
    },
    setUser: function(userObj) {
      safeSet(KEYS.USER, userObj);
    },
    logoutUser: function() {
      safeSet(KEYS.USER, {
        name: 'Guest Aspirant',
        email: '',
        mobile: '',
        targetAim: '60/60 Topper',
        isGuest: true,
        joinedAt: Date.now()
      });
    },

    // Calculate Chapter Progress
    getChapterProgress: function(chapterId) {
      const chapter = window.IPE_DATA && window.IPE_DATA.chapters && window.IPE_DATA.chapters[chapterId];
      if (!chapter || !chapter.questions || chapter.questions.length === 0) return { mastered: 0, total: 0, percent: 0 };
      const masteredSet = this.getMastered();
      let masteredCount = 0;
      chapter.questions.forEach(q => {
        if (masteredSet.has(q.id)) masteredCount++;
      });
      return {
        mastered: masteredCount,
        total: chapter.questions.length,
        percent: Math.round((masteredCount / chapter.questions.length) * 100)
      };
    }
  };
})();
