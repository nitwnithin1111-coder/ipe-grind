// High-Performance Virtualized Feed Engine for IPE GRIND
// Optimized for Low-End / 2GB RAM Devices: Single Active Card in DOM, Lazy Math, 0 Lag
window.IPE_FEED = (function() {
  let activeQuestions = [];
  let currentIndex = 0;
  let currentFilter = {
    subject: 'all',    // 'all' | 'physics' | 'chemistry'
    chapterId: 'all',  // 'all' | 'phy-ch01' | 'chem-ch01' ...
    type: 'all',       // 'all' | 'VSAQ' | 'SAQ' | 'LAQ' | 'Numerical' | 'MCQ'
    importantOnly: false,
    pyqOnly: false,
    searchQuery: ''
  };

  let debounceTimer = null;

  // Lazy KaTeX rendering helper (only runs on visible card elements)
  function renderMath(element) {
    if (!element) return;
    if (window.renderMathInElement) {
      try {
        window.renderMathInElement(element, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false }
          ],
          throwOnError: false
        });
      } catch (err) {
        console.warn('KaTeX notice:', err);
      }
    }
  }

  // Get all questions from currently registered chapters in window.IPE_DATA
  function getAllLoadedQuestions() {
    const list = [];
    const chapters = window.IPE_DATA && window.IPE_DATA.chapters ? window.IPE_DATA.chapters : {};
    Object.keys(chapters).forEach(chKey => {
      const ch = chapters[chKey];
      if (ch && ch.questions && Array.isArray(ch.questions)) {
        ch.questions.forEach(q => {
          list.push({ ...q, chapterName: ch.chapter, chapterId: ch.id });
        });
      }
    });
    return list;
  }

  // Filter questions according to current state
  function getFilteredQuestions() {
    let list = getAllLoadedQuestions();

    if (currentFilter.subject !== 'all') {
      list = list.filter(q => q.subject.toLowerCase() === currentFilter.subject.toLowerCase());
    }

    if (currentFilter.chapterId !== 'all') {
      list = list.filter(q => q.chapterId === currentFilter.chapterId);
    }

    if (currentFilter.type !== 'all') {
      list = list.filter(q => q.type.toLowerCase() === currentFilter.type.toLowerCase());
    }

    if (currentFilter.importantOnly) {
      list = list.filter(q => q.important === true);
    }

    if (currentFilter.pyqOnly) {
      list = list.filter(q => q.pyq || q.important === true);
    }

    if (currentFilter.searchQuery && currentFilter.searchQuery.trim() !== '') {
      const q = currentFilter.searchQuery.toLowerCase();
      list = list.filter(item => {
        return (
          item.question.toLowerCase().includes(q) ||
          item.answer.toLowerCase().includes(q) ||
          (item.chapter && item.chapter.toLowerCase().includes(q))
        );
      });
    }

    return list;
  }

  // Build Virtual Card HTML conforming strictly to Part 3 specifications
  function buildVirtualCardHTML(q, index, total) {
    const isBookmarked = window.IPE_STORAGE.isBookmarked(q.id);
    const isMastered = window.IPE_STORAGE.isMastered(q.id);
    const isRevise = window.IPE_STORAGE.isRevise(q.id);
    const hintText = q.teluguHint || q.telugu_hint || q.tenglish_hint;

    // Subtle Key Formula Markup (1px border, no glowing side-bar)
    let formulaMarkup = '';
    if (q.formula) {
      const cleanFormula = q.formula.replace(/^\$+|\$+$/g, '').trim();
      formulaMarkup = `
        <div class="card-formula-box">
          <span class="card-formula-title">Key Formula</span>
          <div class="card-formula-math">$$${cleanFormula}$$</div>
        </div>
      `;
    }

    // MCQ markup if applicable
    let mcqMarkup = '';
    if (q.type === 'MCQ' && q.options && Array.isArray(q.options)) {
      mcqMarkup = `
        <div class="mcq-options-grid" data-qid="${q.id}" data-correct="${q.correctOption}">
          ${q.options.map((opt, optIdx) => `
            <button class="mcq-option-item" data-opt-idx="${optIdx}" onclick="window.IPE_FEED.handleMCQClick('${q.id}', ${optIdx}, ${q.correctOption})">
              <span class="mcq-opt-letter">${String.fromCharCode(65 + optIdx)}</span>
              <span class="mcq-opt-text">${opt}</span>
              <span class="mcq-feedback-icon"></span>
            </button>
          `).join('')}
        </div>
      `;
    }

    return `
      <div class="vcard-item" id="card-${q.id}" data-id="${q.id}">
        <!-- 1. Small Caption: Subject • Chapter • Marks & PYQ badge -->
        <div class="vcard-caption-row">
          <span class="vcard-caption-text">${q.subject} • ${q.chapter}</span>
          <div class="vcard-tags-group">
            ${(q.pyq || q.important) ? `<span class="vcard-pyq-badge" title="High-Yield Previous Year Question">🔥 ${q.pyq || 'TS IPE PYQ ⭐'}</span>` : ''}
            <span class="vcard-marks-tag">${q.type} (${q.marks}M)</span>
          </div>
        </div>

        <!-- 2. Question Text (Largest text on the card) -->
        <div class="vcard-question-box">
          <h2 class="vcard-question-text">${q.question}</h2>
        </div>

        <!-- MCQ Options if applicable -->
        ${mcqMarkup}

        <!-- 3. Full-Width "Show Answer" Button -->
        <button class="vcard-toggle-answer-btn" id="btn-reveal-${q.id}" onclick="window.IPE_FEED.toggleAnswer('${q.id}')" aria-expanded="false">
          <span id="btn-reveal-lbl-${q.id}">Show answer</span>
          <svg class="reveal-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </button>

        <!-- 4. Collapsible Answer Container -->
        <div class="vcard-answer-box" id="answer-box-${q.id}">
          <div class="vcard-answer-inner">
            <div class="vcard-answer-body">${q.answer}</div>

            <!-- Subtle Key Formula Box (1px border, no glow) -->
            ${formulaMarkup}

            <!-- Collapsed Tenglish Hint Row that expands on tap -->
            ${hintText ? `
              <div class="vcard-hint-container">
                <button class="vcard-hint-trigger" onclick="window.IPE_FEED.toggleTelugu('${q.id}')">
                  <span>💡 Tenglish Hint</span>
                  <span class="hint-chevron">▼</span>
                </button>
                <div class="vcard-hint-content" id="telugu-${q.id}">
                  <p>${hintText}</p>
                </div>
              </div>
            ` : ''}
          </div>
        </div>

        <!-- 5. Primary Action Row: Exactly 3 Buttons (Got it, Revise, Save) -->
        <div class="vcard-action-row">
          <button class="vcard-action-btn got-it ${isMastered ? 'active' : ''}" id="btn-master-${q.id}" onclick="window.IPE_FEED.toggleGotIt('${q.id}')" aria-label="Got it, Mastered">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 6 9 17l-5-5"/></svg>
            <span>${isMastered ? 'Mastered' : 'Got it'}</span>
          </button>

          <button class="vcard-action-btn revise ${isRevise ? 'active' : ''}" id="btn-revise-${q.id}" onclick="window.IPE_FEED.toggleReviseAgain('${q.id}')" aria-label="Mark to Revise Again">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="m3 12 4-4 4 4"/><path d="M7 8v8a4 4 0 0 0 8 0v-2"/><path d="m21 12-4 4-4-4"/></svg>
            <span>${isRevise ? 'Revising' : 'Revise'}</span>
          </button>

          <button class="vcard-action-btn bookmark ${isBookmarked ? 'active' : ''}" id="btn-book-${q.id}" onclick="window.IPE_FEED.toggleBookmark('${q.id}')" aria-label="Save Question">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2.2"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
            <span>${isBookmarked ? 'Saved' : 'Save'}</span>
          </button>
        </div>

        <!-- 6. Secondary Tools Bar: AI Explain & More Options -->
        <div class="vcard-tools-row">
          <button class="vcard-tool-btn ai-explain" onclick="window.IPE_AI.explainQuestion('${q.id}')" title="Explain concept with AI Tutor">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/><path d="m4.93 4.93 1.41 1.41"/><path d="M20 12h2"/><path d="m19.07 4.93-1.41 1.41"/><rect width="16" height="12" x="4" y="8" rx="2"/><circle cx="9" cy="14" r="1"/><circle cx="15" cy="14" r="1"/></svg>
            <span>Explain with AI</span>
          </button>

          <div class="vcard-tools-right">
            <button class="vcard-tool-icon" id="btn-audio-${q.id}" onclick="window.IPE_FEED.handleAudioSpeak('${q.id}')" aria-label="Listen via text-to-speech" title="Listen Audio">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
            </button>

            <button class="vcard-tool-icon" onclick="window.IPE_FEED.shareQuestion('${q.id}')" aria-label="Share question" title="Share">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // Update top progress indicators and navigation state
  function updateProgressUI() {
    const total = activeQuestions.length;
    const currentNum = total > 0 ? currentIndex + 1 : 0;

    const counterEl = document.getElementById('feed-progress-counter');
    if (counterEl) {
      counterEl.textContent = `${currentNum} / ${total}`;
    }

    const prevBtn = document.getElementById('feed-prev-btn');
    if (prevBtn) {
      prevBtn.disabled = currentIndex <= 0;
    }

    const nextBtn = document.getElementById('feed-next-btn');
    if (nextBtn) {
      nextBtn.disabled = currentIndex >= total - 1;
    }

    // Top progress bar fill
    const fillEl = document.getElementById('feed-progress-bar-fill');
    if (fillEl && total > 0) {
      const pct = Math.round((currentNum / total) * 100);
      fillEl.style.width = `${pct}%`;
    }

    // Update active chapter caption tag
    const chapterCaptionEl = document.getElementById('feed-chapter-caption');
    if (chapterCaptionEl) {
      if (currentFilter.chapterId !== 'all') {
        const ch = window.IPE_DATA.chapters[currentFilter.chapterId];
        chapterCaptionEl.textContent = ch ? `${ch.subject} • Ch ${ch.chapterNumber}: ${ch.chapter}` : 'Filtered Chapter';
        chapterCaptionEl.style.display = 'inline-block';
      } else {
        chapterCaptionEl.style.display = 'none';
      }
    }
  }

  // Render Virtual Feed: Exactly 1 Active Card rendered in DOM (Zero lag on 2GB RAM phones)
  function renderFeed() {
    const container = document.getElementById('reels-feed-container');
    if (!container) return;

    activeQuestions = getFilteredQuestions();

    if (activeQuestions.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="color: var(--text-tertiary); margin-bottom: 8px;"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <h3>No questions match filters</h3>
          <p>Try resetting filters or search keywords.</p>
          <button class="btn-primary" style="margin-top: 14px;" onclick="window.IPE_FEED.resetFilters()">Reset Filters</button>
        </div>
      `;
      updateProgressUI();
      return;
    }

    // Ensure currentIndex stays within bounds
    if (currentIndex >= activeQuestions.length) {
      currentIndex = 0;
    } else if (currentIndex < 0) {
      currentIndex = 0;
    }

    const currentQ = activeQuestions[currentIndex];
    container.innerHTML = buildVirtualCardHTML(currentQ, currentIndex, activeQuestions.length);

    // Performance: Only render math for visible question text & preview
    const questionBox = container.querySelector('.vcard-question-box');
    const formulaBox = container.querySelector('.card-formula-math');
    if (questionBox) renderMath(questionBox);
    if (formulaBox) renderMath(formulaBox);

    updateProgressUI();
    setupSwipeGestures();
  }

  // Touch Swipe Gestures for Mobile: Support Vertical Reels Swipe (Up/Down) & Horizontal Swipe (Left/Right)
  function setupSwipeGestures() {
    const container = document.getElementById('reels-feed-container');
    if (!container) return;

    let touchStartX = 0;
    let touchStartY = 0;

    container.ontouchstart = (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    };

    container.ontouchend = (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      const dx = touchEndX - touchStartX;
      const dy = touchEndY - touchStartY;

      // Vertical swipe (Standard Reels swipe: Swipe UP to go Next, Swipe DOWN to go Prev)
      if (Math.abs(dy) > 55 && Math.abs(dy) > Math.abs(dx)) {
        if (dy < 0) {
          window.IPE_FEED.nextQuestion();
        } else {
          window.IPE_FEED.prevQuestion();
        }
      }
      // Horizontal swipe backup (Swipe Left to go Next, Swipe Right to go Prev)
      else if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) {
          window.IPE_FEED.nextQuestion();
        } else {
          window.IPE_FEED.prevQuestion();
        }
      }
    };
  }

  // Full Keyboard Shortcuts for Desktop / Tablet Study
  let keyboardInitialized = false;
  function setupKeyboardShortcuts() {
    if (keyboardInitialized) return;
    keyboardInitialized = true;

    window.addEventListener('keydown', (e) => {
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable)) {
        return;
      }

      const feedSec = document.getElementById('section-feed');
      if (!feedSec || !feedSec.classList.contains('active')) return;

      const currentQ = activeQuestions[currentIndex];

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === 'j') {
        e.preventDefault();
        window.IPE_FEED.nextQuestion();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp' || e.key === 'k') {
        e.preventDefault();
        window.IPE_FEED.prevQuestion();
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (currentQ) window.IPE_FEED.toggleAnswer(currentQ.id);
      } else if (e.key.toLowerCase() === 'b' || e.key.toLowerCase() === 's') {
        if (currentQ) window.IPE_FEED.toggleBookmark(currentQ.id);
      } else if (e.key.toLowerCase() === 'r') {
        if (currentQ) window.IPE_FEED.toggleReviseAgain(currentQ.id);
      } else if (e.key.toLowerCase() === 'm' || e.key.toLowerCase() === 'g') {
        if (currentQ) window.IPE_FEED.toggleGotIt(currentQ.id);
      } else if (e.key.toLowerCase() === 't') {
        if (currentQ) window.IPE_FEED.toggleTelugu(currentQ.id);
      } else if (e.key.toLowerCase() === 'l') {
        if (currentQ) window.IPE_FEED.handleAudioSpeak(currentQ.id);
      } else if (e.key.toLowerCase() === 'e') {
        if (currentQ && window.IPE_AI) window.IPE_AI.explainQuestion(currentQ.id);
      }
    });
  }

  return {
    init: function() {
      currentIndex = 0;
      setupKeyboardShortcuts();
      renderFeed();
    },

    getAllQuestions: getAllLoadedQuestions,
    getAllLoadedQuestions: getAllLoadedQuestions,

    getQuestions: function() {
      return activeQuestions;
    },

    getCurrentIndex: function() {
      return currentIndex;
    },

    nextQuestion: function() {
      if (currentIndex < activeQuestions.length - 1) {
        currentIndex++;
        renderFeed();
      }
    },

    prevQuestion: function() {
      if (currentIndex > 0) {
        currentIndex--;
        renderFeed();
      }
    },

    jumpToIndex: function(idx) {
      if (idx >= 0 && idx < activeQuestions.length) {
        currentIndex = idx;
        renderFeed();
      }
    },

    jumpToQuestion: function(qId) {
      const idx = activeQuestions.findIndex(q => q.id === qId);
      if (idx !== -1) {
        currentIndex = idx;
        renderFeed();
      } else {
        // Reset filters if question is in another subject/chapter
        this.resetFilters();
        const newIdx = activeQuestions.findIndex(q => q.id === qId);
        if (newIdx !== -1) {
          currentIndex = newIdx;
          renderFeed();
        }
      }
    },

    setFilter: function(newFilter) {
      currentFilter = { ...currentFilter, ...newFilter };
      currentIndex = 0;
      renderFeed();
    },

    setSubject: function(subj) {
      currentFilter.subject = subj;
      currentIndex = 0;
      renderFeed();
    },

    // Debounced search (300ms) for high performance
    setSearchQuery: function(query) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        currentFilter.searchQuery = query;
        currentIndex = 0;
        renderFeed();
      }, 300);
    },

    setMarksFilter: function(type, btnEl) {
      if (btnEl) {
        const parent = btnEl.parentElement;
        if (parent) {
          parent.querySelectorAll('.marks-pill').forEach(b => b.classList.remove('active'));
          btnEl.classList.add('active');
        }
      }
      if (type === 'PYQ') {
        currentFilter.pyqOnly = true;
        currentFilter.type = 'all';
      } else {
        currentFilter.pyqOnly = false;
        currentFilter.type = type;
      }
      currentIndex = 0;
      renderFeed();
    },

    resetFilters: function() {
      currentFilter = {
        subject: 'all',
        chapterId: 'all',
        type: 'all',
        importantOnly: false,
        pyqOnly: false,
        searchQuery: ''
      };

      // Reset segmented subject buttons
      const subAll = document.getElementById('global-sub-all');
      if (subAll) {
        document.querySelectorAll('.global-sub-pill').forEach(b => b.classList.remove('active'));
        subAll.classList.add('active');
      }

      // Reset marks pills
      const marksBar = document.querySelector('.feed-marks-scroll-row');
      if (marksBar) {
        marksBar.querySelectorAll('.marks-pill').forEach(b => b.classList.remove('active'));
        const allBtn = marksBar.querySelector('[data-type="all"]');
        if (allBtn) allBtn.classList.add('active');
      }

      currentIndex = 0;
      renderFeed();
    },

    // Toggle Answer disclosure (renders KaTeX lazily on first reveal)
    toggleAnswer: function(qId) {
      const box = document.getElementById(`answer-box-${qId}`);
      const btn = document.getElementById(`btn-reveal-${qId}`);
      const lbl = document.getElementById(`btn-reveal-lbl-${qId}`);
      if (!box || !btn) return;

      const isExpanded = box.classList.contains('expanded');
      if (isExpanded) {
        box.classList.remove('expanded');
        btn.classList.remove('revealed');
        btn.setAttribute('aria-expanded', 'false');
        if (lbl) lbl.textContent = 'Show answer';
      } else {
        box.classList.add('expanded');
        btn.classList.add('revealed');
        btn.setAttribute('aria-expanded', 'true');
        if (lbl) lbl.textContent = 'Hide answer';

        // Lazy KaTeX rendering only when requested
        if (!box.dataset.mathRendered) {
          renderMath(box);
          box.dataset.mathRendered = 'true';
        }
      }
    },

    // Toggle Tenglish Hint disclosure
    toggleTelugu: function(qId) {
      const hint = document.getElementById(`telugu-${qId}`);
      if (!hint) return;
      const isVisible = hint.style.display === 'block';
      hint.style.display = isVisible ? 'none' : 'block';
      if (!isVisible && !hint.dataset.mathRendered) {
        renderMath(hint);
        hint.dataset.mathRendered = 'true';
      }
    },

    // Handle MCQ Click
    handleMCQClick: function(qId, selectedIdx, correctIdx) {
      const card = document.getElementById(`card-${qId}`);
      if (!card) return;
      const options = card.querySelectorAll('.mcq-option-item');
      options.forEach((opt, idx) => {
        opt.style.pointerEvents = 'none';
        if (idx === correctIdx) {
          opt.classList.add('correct');
          const fb = opt.querySelector('.mcq-feedback-icon');
          if (fb) fb.textContent = '✓ Correct';
        } else if (idx === selectedIdx) {
          opt.classList.add('incorrect');
          const fb = opt.querySelector('.mcq-feedback-icon');
          if (fb) fb.textContent = '✗';
        }
      });

      if (selectedIdx === correctIdx) {
        window.IPE_GAME.awardXP(10, '🎯 Correct!');
        if (navigator.vibrate) navigator.vibrate(40);
      } else {
        if (navigator.vibrate) navigator.vibrate([30, 30]);
      }

      // Automatically reveal explanation
      this.toggleAnswer(qId);
    },

    // Got it (Mastered) action
    toggleGotIt: function(qId) {
      const added = window.IPE_STORAGE.toggleMastered(qId);
      const btn = document.getElementById(`btn-master-${qId}`);
      if (btn) {
        if (added) {
          btn.classList.add('active');
          btn.querySelector('span').textContent = 'Mastered';
          window.IPE_GAME.awardXP(10, '✅ Mastered!');
          if (navigator.vibrate) navigator.vibrate(30);
        } else {
          btn.classList.remove('active');
          btn.querySelector('span').textContent = 'Got it';
        }
      }
      window.IPE_APP.updateStatsUI();
    },

    // Revise Again action
    toggleReviseAgain: function(qId) {
      const added = window.IPE_STORAGE.toggleRevise(qId);
      const btn = document.getElementById(`btn-revise-${qId}`);
      if (btn) {
        if (added) {
          btn.classList.add('active');
          btn.querySelector('span').textContent = 'Revising';
          window.IPE_GAME.awardXP(5, '🔁 Added to Revise');
        } else {
          btn.classList.remove('active');
          btn.querySelector('span').textContent = 'Revise';
        }
      }
      window.IPE_APP.updateStatsUI();
    },

    // Bookmark action
    toggleBookmark: function(qId) {
      const added = window.IPE_STORAGE.toggleBookmark(qId);
      const btn = document.getElementById(`btn-book-${qId}`);
      if (btn) {
        const svg = btn.querySelector('svg');
        const span = btn.querySelector('span');
        if (added) {
          btn.classList.add('active');
          if (svg) svg.setAttribute('fill', 'currentColor');
          if (span) span.textContent = 'Saved';
        } else {
          btn.classList.remove('active');
          if (svg) svg.setAttribute('fill', 'none');
          if (span) span.textContent = 'Save';
        }
      }
      window.IPE_APP.updateStatsUI();
    },

    // Audio Speak handler (lazy loads speech on tap)
    handleAudioSpeak: function(qId) {
      const q = activeQuestions.find(item => item.id === qId);
      if (!q) return;

      const btn = document.getElementById(`btn-audio-${qId}`);
      window.IPE_SPEECH.toggleSpeak(qId, q.question, q.answer, (isSpeaking) => {
        if (btn) {
          if (isSpeaking) {
            btn.classList.add('speaking');
          } else {
            btn.classList.remove('speaking');
          }
        }
      });
    },

    // Share action
    shareQuestion: function(qId) {
      const q = activeQuestions.find(item => item.id === qId);
      if (!q) return;

      const shareText = `IPE Grind (TS Inter 2nd Year):\n[${q.subject} - ${q.chapter}] (${q.type} - ${q.marks}M)\nQ: ${q.question}\n\nStudy free on IPE Grind!`;

      if (navigator.share) {
        navigator.share({
          title: `IPE Grind - ${q.chapter}`,
          text: shareText
        }).catch(() => {});
      } else {
        navigator.clipboard.writeText(shareText).then(() => {
          window.IPE_GAME.showXPToast(2, '📋 Copied to clipboard!');
        }).catch(() => {
          alert('Sharing not available.');
        });
      }
    }
  };
})();
