// Rapid-Fire 10-Question Timed Quiz Engine
window.IPE_QUIZ = (function() {
  let quizQuestions = [];
  let currentIndex = 0;
  let score = 0;
  let timerInterval = null;
  let timeLeft = 15;
  const TIME_PER_QUESTION = 15;
  let answersLog = [];

  function pickRandomQuestions(count) {
    let all = [];
    const chapters = window.IPE_DATA && window.IPE_DATA.chapters ? window.IPE_DATA.chapters : {};
    Object.keys(chapters).forEach(k => {
      const ch = chapters[k];
      if (ch && ch.questions) {
        ch.questions.forEach(q => all.push({ ...q, chapterName: ch.chapter, chapterId: ch.id }));
      }
    });
    // Prefer MCQs and VSAQs for rapid fire quiz
    const pool = all.filter(q => q.type === 'MCQ' || q.type === 'VSAQ');
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }

  function startTimer() {
    clearInterval(timerInterval);
    timeLeft = TIME_PER_QUESTION;
    updateTimerUI();

    timerInterval = setInterval(() => {
      timeLeft--;
      updateTimerUI();
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        handleTimeUp();
      }
    }, 1000);
  }

  function updateTimerUI() {
    const bar = document.getElementById('quiz-timer-fill');
    if (bar) {
      const pct = (timeLeft / TIME_PER_QUESTION) * 100;
      bar.style.width = `${pct}%`;
    }
  }

  function handleTimeUp() {
    const q = quizQuestions[currentIndex];
    answersLog.push({
      question: q,
      selected: null,
      isCorrect: false,
      reason: 'Time expired'
    });
    showInstantReview(false, 'Time expired!');
  }

  function renderCurrentQuestion() {
    const container = document.getElementById('quiz-game-container');
    if (!container) return;

    if (currentIndex >= quizQuestions.length) {
      renderSummary();
      return;
    }

    const q = quizQuestions[currentIndex];
    startTimer();

    // Check if it has MCQ options, otherwise provide True/False or Reveal option
    let optionsMarkup = '';
    if (q.type === 'MCQ' && q.options && q.options.length > 0) {
      optionsMarkup = `
        <div class="mcq-options-grid">
          ${q.options.map((opt, idx) => `
            <div class="mcq-option-item" onclick="window.IPE_QUIZ.handleAnswer(${idx})">
              <span>${opt}</span>
            </div>
          `).join('')}
        </div>
      `;
    } else {
      optionsMarkup = `
        <div style="margin-top: 16px; display: flex; flex-direction: column; gap: 8px;">
          <button class="btn-primary" style="background: var(--state-success); width: 100%; min-height: 44px;" onclick="window.IPE_QUIZ.revealAndSelfScore(true)">
            I Knew This (Mark Correct)
          </button>
          <button class="btn-primary" style="background: var(--bg-surface); border: 1px solid var(--border); color: var(--text-primary); width: 100%; min-height: 44px;" onclick="window.IPE_QUIZ.revealAndSelfScore(false)">
            Need Revision (Mark Incorrect)
          </button>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="quiz-timer-bar-wrap">
        <div class="quiz-timer-bar-fill" id="quiz-timer-fill"></div>
      </div>
      <div class="quiz-question-counter">Question ${currentIndex + 1} of ${quizQuestions.length}</div>
      <div class="quiz-question-box">
        <div>${q.question}</div>
      </div>
      <div id="quiz-options-area">
        ${optionsMarkup}
      </div>
      <div id="quiz-instant-feedback" style="margin-top: 14px; display: none;"></div>
    `;

    if (window.renderMathInElement) {
      window.renderMathInElement(container, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false }
        ],
        throwOnError: false
      });
    }
  }

  function showInstantReview(isCorrect, feedbackMsg) {
    clearInterval(timerInterval);
    const feedbackBox = document.getElementById('quiz-instant-feedback');
    const optionsArea = document.getElementById('quiz-options-area');
    if (!feedbackBox) return;

    if (optionsArea) {
      const items = optionsArea.querySelectorAll('.mcq-option-item');
      items.forEach(el => el.style.pointerEvents = 'none');
    }

    const q = quizQuestions[currentIndex];
    feedbackBox.style.display = 'block';
    feedbackBox.innerHTML = `
      <div style="padding: 12px; border-radius: var(--radius-sm); background: ${isCorrect ? 'var(--state-success-subtle)' : 'var(--state-danger-subtle)'}; border: 1px solid ${isCorrect ? 'var(--state-success)' : 'var(--state-danger)'};">
        <div style="font-weight: 600; color: ${isCorrect ? 'var(--state-success)' : 'var(--state-danger)'}; margin-bottom: 6px;">
          ${isCorrect ? 'Correct!' : 'Incorrect / Missed'}
        </div>
        <div style="font-size: var(--text-body); line-height: 1.5; color: var(--text-primary);">${q.answer}</div>
      </div>
      <button class="btn-primary" style="margin-top: 14px; width: 100%; min-height: 44px;" onclick="window.IPE_QUIZ.nextQuestion()">
        ${currentIndex + 1 >= quizQuestions.length ? 'See Final Score' : 'Next Question'}
      </button>
    `;

    if (window.renderMathInElement) {
      window.renderMathInElement(feedbackBox, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false }
        ],
        throwOnError: false
      });
    }
  }

  function renderSummary() {
    clearInterval(timerInterval);
    const container = document.getElementById('quiz-game-container');
    if (!container) return;

    const total = quizQuestions.length;
    const earnedXP = score * 5 + 50; // base 50 XP + 5 XP per right answer
    window.IPE_GAME.awardXP(earnedXP, 'Quiz Complete');

    if (score >= 8) {
      window.IPE_STORAGE.unlockBadge('quiz_champ');
      window.IPE_GAME.launchConfetti();
    }

    container.innerHTML = `
      <div class="quiz-summary-card" style="background: var(--bg-surface); border: 1px solid var(--border); border-radius: var(--radius); padding: var(--space-4); text-align: center;">
        <h2 style="font-size: var(--text-heading); font-weight: 600; margin-bottom: 8px;">Rapid-Fire Completed!</h2>
        <div class="quiz-score-badge" style="font-size: 28px; font-weight: 700; color: var(--accent-text); margin-bottom: 8px;">${score} / ${total}</div>
        <p style="color: var(--text-secondary); font-size: var(--text-body); margin-bottom: 12px;">
          ${score >= 8 ? 'Brilliant! You are board exam ready.' : score >= 5 ? 'Good work! Quick revision will make it perfect.' : 'Keep practicing! You will get better each time.'}
        </p>
        <div class="stat-pill xp" style="font-size: var(--text-caption); margin: 0 auto 16px; display: inline-block;">
          +${earnedXP} XP Earned
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn-primary" style="flex: 1; min-height: 44px;" onclick="window.IPE_QUIZ.startQuiz()">Play Again</button>
          <button class="btn-primary" style="flex: 1; min-height: 44px; background: var(--bg-subtle); border: 1px solid var(--border); color: var(--text-primary);" onclick="window.IPE_APP.switchTab('feed')">Back to Feed</button>
        </div>

        <div style="margin-top: 24px; text-align: left;">
          <h4 style="font-size: var(--text-body); font-weight: 600; margin-bottom: 8px;">Question Review:</h4>
          ${answersLog.map((log, i) => `
            <div style="padding: 10px; border-radius: var(--radius-sm); background: var(--bg-subtle); margin-bottom: 8px; border-left: 3px solid ${log.isCorrect ? 'var(--state-success)' : 'var(--state-danger)'};">
              <div style="font-size: var(--text-body); font-weight: 600; color: var(--text-primary);">${i + 1}. ${log.question.question}</div>
              <div style="font-size: var(--text-caption); color: var(--text-secondary); margin-top: 4px;">Answer: ${log.question.answer.slice(0, 150)}...</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    if (window.renderMathInElement) {
      window.renderMathInElement(container, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false }
        ],
        throwOnError: false
      });
    }
  }

  return {
    startQuiz: function() {
      quizQuestions = pickRandomQuestions(10);
      currentIndex = 0;
      score = 0;
      answersLog = [];

      const startCard = document.getElementById('quiz-setup-card');
      const gameContainer = document.getElementById('quiz-game-container');
      if (startCard) startCard.style.display = 'none';
      if (gameContainer) gameContainer.style.display = 'block';

      renderCurrentQuestion();
    },

    handleAnswer: function(optIdx) {
      const q = quizQuestions[currentIndex];
      const isCorrect = (optIdx === q.correctOption);
      if (isCorrect) {
        score++;
        if (navigator.vibrate) navigator.vibrate(50);
      } else {
        if (navigator.vibrate) navigator.vibrate([40, 40, 40]);
      }
      answersLog.push({
        question: q,
        selected: optIdx,
        isCorrect: isCorrect
      });
      showInstantReview(isCorrect, isCorrect ? 'Great job!' : 'Review the solution below:');
    },

    revealAndSelfScore: function(userSaysCorrect) {
      const q = quizQuestions[currentIndex];
      if (userSaysCorrect) {
        score++;
        if (navigator.vibrate) navigator.vibrate(50);
      } else {
        if (navigator.vibrate) navigator.vibrate([40, 40, 40]);
      }
      answersLog.push({
        question: q,
        selected: userSaysCorrect,
        isCorrect: userSaysCorrect
      });
      showInstantReview(userSaysCorrect, userSaysCorrect ? 'Marked Correct' : 'Marked for Review');
    },

    nextQuestion: function() {
      currentIndex++;
      renderCurrentQuestion();
    }
  };
})();
