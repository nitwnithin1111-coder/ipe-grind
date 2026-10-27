// Gamification, Streaks, Badges, Confetti & Sound Effects for IPE GRIND
window.IPE_GAME = (function() {
  const BADGE_DEFS = [
    { id: 'welcome_aspirant', name: 'IPE Grind Starter', icon: '🎓', desc: 'Started preparing for TS Inter 2nd Year exams!' },
    { id: 'century_club', name: 'Century Club', icon: '💯', desc: 'Crossed 100 XP points!' },
    { id: 'waves_master', name: 'Waves Master', icon: '🌊', desc: 'Mastered 20+ questions in Waves.' },
    { id: 'solid_state_pro', name: 'Solid State Pro', icon: '💎', desc: 'Mastered 20+ questions in Solid State.' },
    { id: 'quiz_champ', name: 'Quiz Whiz', icon: '⚡', desc: 'Scored 8+ out of 10 in Rapid Fire Quiz.' },
    { id: 'streak_3', name: 'On Fire', icon: '🔥', desc: 'Maintained a 3-day study streak.' },
    { id: 'night_owl', name: 'Night Owl', icon: '🦉', desc: 'Practicing after 9:00 PM.' },
    { id: 'early_bird', name: 'Early Bird', icon: '🌅', desc: 'Practicing before 7:00 AM.' },
    { id: 'revision_hero', name: 'Revision Hero', icon: '🔁', desc: 'Marked 10+ questions for quick revision.' }
  ];

  // Zero-dependency pure canvas confetti
  function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const root = document.getElementById('app-root') || document.body;
    canvas.width = root.clientWidth || window.innerWidth;
    canvas.height = root.clientHeight || window.innerHeight;

    const pieces = [];
    const colors = ['#38bdf8', '#818cf8', '#34d399', '#facc15', '#f43f5e', '#a855f7'];

    for (let i = 0; i < 70; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.4,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 6,
        vy: Math.random() * 4 + 2,
        rot: Math.random() * 360,
        vrot: (Math.random() - 0.5) * 10
      });
    }

    let frame = 0;
    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vrot;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      });

      frame++;
      if (frame < 90) {
        requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    requestAnimationFrame(render);
  }

  // Floating XP toast
  function showXPToast(pts, label) {
    const toast = document.createElement('div');
    toast.className = 'xp-toast';
    toast.textContent = `+${pts} XP ${label || '⚡'}`;
    const root = document.getElementById('app-root');
    if (root) {
      root.appendChild(toast);
      setTimeout(() => toast.remove(), 1300);
    }
  }

  // Check and unlock badges automatically
  function checkBadges() {
    const storage = window.IPE_STORAGE;
    const xp = storage.getXP();
    const streak = storage.getStreakData().current;
    const mastered = storage.getMastered();
    const revise = storage.getRevise();
    const hour = new Date().getHours();

    const newlyUnlocked = [];

    // Century Club
    if (xp >= 100 && storage.unlockBadge('century_club')) {
      newlyUnlocked.push('Century Club (100+ XP)');
    }

    // Streak
    if (streak >= 3 && storage.unlockBadge('streak_3')) {
      newlyUnlocked.push('On Fire (3-Day Streak)');
    }

    // Night Owl & Early Bird
    if (hour >= 21 && storage.unlockBadge('night_owl')) {
      newlyUnlocked.push('Night Owl (Late Night Grind)');
    }
    if (hour < 7 && storage.unlockBadge('early_bird')) {
      newlyUnlocked.push('Early Bird (Dawn Study)');
    }

    // Revision Hero
    if (revise.size >= 10 && storage.unlockBadge('revision_hero')) {
      newlyUnlocked.push('Revision Hero');
    }

    // Chapter Mastery
    const wavesProgress = storage.getChapterProgress('phy-ch01');
    if (wavesProgress.mastered >= 20 && storage.unlockBadge('waves_master')) {
      newlyUnlocked.push('Waves Master');
    }

    const solidProgress = storage.getChapterProgress('chem-ch01');
    if (solidProgress.mastered >= 20 && storage.unlockBadge('solid_state_pro')) {
      newlyUnlocked.push('Solid State Pro');
    }

    if (newlyUnlocked.length > 0) {
      launchConfetti();
      showXPToast(25, `🏅 Badge Unlocked!`);
    }
  }

  return {
    getBadgeDefs: () => BADGE_DEFS,
    launchConfetti: launchConfetti,
    showXPToast: showXPToast,
    checkBadges: checkBadges,

    // Award XP helper
    awardXP: function(amount, reason) {
      const newXP = window.IPE_STORAGE.addXP(amount);
      showXPToast(amount, reason);
      const xpPill = document.getElementById('header-xp-val');
      if (xpPill) xpPill.textContent = newXP;
      checkBadges();
      return newXP;
    }
  };
})();
