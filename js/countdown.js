// IPE Board Exam Live Countdown & Daily Study Goal Engine
window.IPE_COUNTDOWN = (function() {
  // Target IPE Exam Date (TS & AP Senior Inter Public Examinations typically commence 1st week of March)
  // Default: March 1, 2027, 09:00:00 AM IST
  const DEFAULT_EXAM_DATE = '2027-03-01T09:00:00+05:30';
  const DEFAULT_DAILY_TARGET = 20;

  let timerInterval = null;
  let isBannerCollapsed = false;

  function getExamDate() {
    try {
      const saved = localStorage.getItem('ipe_exam_target_date');
      if (saved) return new Date(saved);
    } catch (e) {}
    return new Date(DEFAULT_EXAM_DATE);
  }

  function setExamDate(dateStr) {
    try {
      localStorage.setItem('ipe_exam_target_date', dateStr);
      updateUI();
    } catch (e) {}
  }

  function getDailyTarget() {
    try {
      const target = parseInt(localStorage.getItem('ipe_daily_target'), 10);
      if (!isNaN(target) && target > 0) return target;
    } catch (e) {}
    return DEFAULT_DAILY_TARGET;
  }

  function setDailyTarget(num) {
    try {
      localStorage.setItem('ipe_daily_target', Math.max(5, Math.min(100, num)));
      updateUI();
    } catch (e) {}
  }

  function getTodayString() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  }

  function getDailyCount() {
    try {
      const today = getTodayString();
      const savedDate = localStorage.getItem('ipe_daily_date');
      if (savedDate !== today) {
        localStorage.setItem('ipe_daily_date', today);
        localStorage.setItem('ipe_daily_count', '0');
        return 0;
      }
      return parseInt(localStorage.getItem('ipe_daily_count') || '0', 10);
    } catch (e) {
      return 0;
    }
  }

  function incrementDailyProgress(delta = 1) {
    try {
      const today = getTodayString();
      const savedDate = localStorage.getItem('ipe_daily_date');
      let current = 0;
      if (savedDate === today) {
        current = parseInt(localStorage.getItem('ipe_daily_count') || '0', 10);
      } else {
        localStorage.setItem('ipe_daily_date', today);
      }
      current += delta;
      localStorage.setItem('ipe_daily_count', String(current));

      const target = getDailyTarget();
      if (current === target && typeof window.IPE_GAME !== 'undefined' && window.IPE_GAME.showXPToast) {
        window.IPE_GAME.showXPToast(30, '🎯 Daily Goal Achieved! 30 XP Added');
      }

      updateUI();
    } catch (e) {}
  }

  function calculateTimeRemaining() {
    const target = getExamDate();
    const now = new Date();
    const diff = target.getTime() - now.getTime();

    if (diff <= 0) {
      return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    return { total: diff, days, hours, minutes, seconds, isPast: false };
  }

  function toggleCollapse() {
    isBannerCollapsed = !isBannerCollapsed;
    try {
      localStorage.setItem('ipe_countdown_collapsed', isBannerCollapsed ? 'true' : 'false');
    } catch (e) {}
    updateUI();
  }

  function updateUI() {
    if (typeof document === 'undefined') return;

    const remaining = calculateTimeRemaining();
    const dailyCount = getDailyCount();
    const dailyTarget = getDailyTarget();
    const percent = Math.min(100, Math.round((dailyCount / dailyTarget) * 100));

    // Update Banner elements if present
    const daysEl = document.getElementById('countdown-days');
    const hoursEl = document.getElementById('countdown-hours');
    const minsEl = document.getElementById('countdown-mins');
    const secsEl = document.getElementById('countdown-secs');

    if (daysEl) daysEl.textContent = String(remaining.days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(remaining.hours).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(remaining.minutes).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(remaining.seconds).padStart(2, '0');

    // Update Daily Goal Progress Ring
    const goalTextEl = document.getElementById('daily-goal-text');
    const goalRingEl = document.getElementById('daily-goal-ring-fill');
    const goalPctEl = document.getElementById('daily-goal-pct');

    if (goalTextEl) {
      goalTextEl.textContent = `${dailyCount} / ${dailyTarget} Qs`;
    }
    if (goalPctEl) {
      goalPctEl.textContent = `${percent}%`;
    }
    if (goalRingEl) {
      // Circle radius 20, perimeter 2 * pi * 20 = 125.66
      const circumference = 125.66;
      const offset = circumference - (percent / 100) * circumference;
      goalRingEl.style.strokeDashoffset = offset;
    }

    const bannerContainer = document.getElementById('countdown-goal-banner');
    if (bannerContainer) {
      bannerContainer.classList.toggle('collapsed', isBannerCollapsed);
    }
  }

  function init() {
    try {
      isBannerCollapsed = localStorage.getItem('ipe_countdown_collapsed') === 'true';
    } catch (e) {}

    updateUI();

    if (timerInterval) clearInterval(timerInterval);
    if (typeof setInterval !== 'undefined') {
      timerInterval = setInterval(updateUI, 1000);
    }
  }

  return {
    init: init,
    updateUI: updateUI,
    incrementDailyProgress: incrementDailyProgress,
    getDailyCount: getDailyCount,
    getDailyTarget: getDailyTarget,
    setDailyTarget: setDailyTarget,
    calculateTimeRemaining: calculateTimeRemaining,
    toggleCollapse: toggleCollapse,
    setExamDate: setExamDate
  };
})();
