// Interactive 3D Flashcards & Formula Quick Revision Engine for IPE GRIND
window.IPE_FLASHCARDS = (function() {
  let allCards = [];
  let filteredCards = [];
  let currentIndex = 0;
  let isFlipped = false;
  let activeMode = 'deck'; // 'deck' | 'list'
  let activeSubject = 'all'; // 'all' | 'physics' | 'chemistry'
  let activeChapter = 'all';
  let searchQuery = '';

  // Safe KaTeX Helper to ensure proper LaTeX rendering across all fields
  function cleanLatexMath(str) {
    if (!str) return '';
    // If already has KaTeX math delimiters $, leave it intact
    if (str.includes('$')) return str;
    // If contains LaTeX commands without $, wrap properly
    if (/\\[a-zA-Z]+/.test(str)) {
      return `$${str}$`;
    }
    return str;
  }

  // Parse raw symbols string into structured breakdown
  function splitTerms(str) {
    if (!str) return [];
    const rawSegments = [];
    let current = '';
    let braceCount = 0;
    let inDollar = false;

    for (let i = 0; i < str.length; i++) {
      const ch = str[i];
      if (ch === '$') inDollar = !inDollar;
      if (ch === '{') braceCount++;
      if (ch === '}') braceCount--;

      // Split on comma or \quad outside braces and math
      if ((ch === ',' || str.slice(i, i + 5) === '\\quad') && braceCount === 0 && !inDollar) {
        if (current.trim()) rawSegments.push(current.trim());
        current = '';
        if (str.slice(i, i + 5) === '\\quad') i += 4;
      } else {
        current += ch;
      }
    }
    if (current.trim()) rawSegments.push(current.trim());

    // Merge segments that belong to a single left-hand side like "P, Q, R, S = ..."
    const terms = [];
    let buffer = [];
    for (let i = 0; i < rawSegments.length; i++) {
      const seg = rawSegments[i];
      if (seg.includes('=')) {
        if (buffer.length > 0) {
          terms.push([...buffer, seg].join(', '));
          buffer = [];
        } else {
          terms.push(seg);
        }
      } else {
        const nextHasEq = rawSegments.slice(i + 1).some(s => s.includes('='));
        if (nextHasEq) {
          buffer.push(seg);
        } else {
          if (buffer.length > 0) {
            terms.push([...buffer, seg].join(', '));
            buffer = [];
          } else {
            terms.push(seg);
          }
        }
      }
    }
    if (buffer.length > 0) {
      terms.push(buffer.join(', '));
    }
    return terms;
  }

  function formatSymbolsHtml(symbolsStr) {
    if (!symbolsStr) return '';
    const terms = splitTerms(symbolsStr);

    // Chemical reactions block
    const isReaction = symbolsStr.includes('\\to') || symbolsStr.includes('\\rightleftharpoons');
    if (isReaction) {
      return `
        <div class="fc-terms-box">
          <div class="fc-terms-header">Chemical Reaction Steps</div>
          <div class="fc-reactions-block">
            ${terms.map(t => {
              const clean = t.replace(/^\$+|\$+$/g, '').trim();
              return `<div class="fc-reaction-item">$$${clean}$$</div>`;
            }).join('')}
          </div>
        </div>
      `;
    }

    const items = terms.map(term => {
      let raw = term.trim();
      if (raw.startsWith('$') && raw.endsWith('$') && !raw.slice(1, -1).includes('$')) {
        raw = raw.slice(1, -1).trim();
      }

      const eqIdx = raw.indexOf('=');
      const colIdx = raw.indexOf(':');

      let splitIdx = -1;
      let sep = '=';
      if (eqIdx !== -1 && (colIdx === -1 || eqIdx < colIdx)) {
        splitIdx = eqIdx;
        sep = '=';
      } else if (colIdx !== -1 && !raw.startsWith('\\text')) {
        splitIdx = colIdx;
        sep = ':';
      }

      if (splitIdx !== -1) {
        let left = raw.substring(0, splitIdx).trim();
        let right = raw.substring(splitIdx + 1).trim();

        left = left.replace(/^\$+|\$+$/g, '').trim();

        let descHtml = right;
        if (descHtml.includes('\\text{')) {
          descHtml = descHtml.replace(/\\text\{([^}]+)\}/g, '$1');
        }

        if (/\\[a-zA-Z]+/.test(descHtml) && !descHtml.includes('$')) {
          descHtml = `$${descHtml}$`;
        }

        return `
          <div class="fc-term-entry">
            <span class="fc-term-symbol">$${left}$</span>
            <span class="fc-term-sep">${sep}</span>
            <span class="fc-term-desc">${descHtml}</span>
          </div>
        `;
      } else {
        let clean = raw.replace(/\\text\{([^}]+)\}/g, '$1');
        if (/\\[a-zA-Z]+/.test(clean) && !clean.includes('$')) {
          clean = `$${clean}$`;
        }
        return `
          <div class="fc-term-entry">
            <span class="fc-term-desc">${clean}</span>
          </div>
        `;
      }
    });

    return `
      <div class="fc-terms-box">
        <div class="fc-terms-header">Terms & Symbols Explained</div>
        <div class="fc-terms-grid">${items.join('')}</div>
      </div>
    `;
  }

  function formatUnitsHtml(unitsStr) {
    if (!unitsStr) return '';
    const clean = cleanLatexMath(unitsStr);
    return `
      <div class="fc-unit-row">
        <span class="fc-detail-label">SI Unit:</span>
        <span class="fc-unit-badge">${clean}</span>
      </div>
    `;
  }

  function renderMath(element) {
    if (!element) return;
    if (window.IPE_RENDER_MATH) {
      window.IPE_RENDER_MATH(element);
      return;
    }
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
        console.warn('KaTeX rendering error:', err);
      }
    }
  }

  // Extract all 104 formulas from loaded chapters
  function extractAllFormulas() {
    const list = [];
    const chapters = window.IPE_DATA && window.IPE_DATA.chapters ? window.IPE_DATA.chapters : {};
    Object.keys(chapters).forEach(chKey => {
      const ch = chapters[chKey];
      if (ch && ch.formulaSheet && Array.isArray(ch.formulaSheet)) {
        ch.formulaSheet.forEach((card, idx) => {
          list.push({
            id: `${ch.id}-fc-${idx}`,
            chapterId: ch.id,
            chapterNumber: ch.chapterNumber,
            chapterName: ch.chapter,
            subject: ch.subject,
            title: card.title || 'Key Formula',
            formula: card.formula || '',
            symbols: card.symbols || '',
            units: card.units || '',
            tip: card.tip || ''
          });
        });
      }
    });
    return list;
  }

  function filterCards() {
    if (!allCards || allCards.length === 0) {
      allCards = extractAllFormulas();
    }
    let list = [...allCards];

    if (activeSubject !== 'all') {
      list = list.filter(c => c.subject.toLowerCase() === activeSubject.toLowerCase());
    }

    if (activeChapter !== 'all') {
      list = list.filter(c => c.chapterId === activeChapter);
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      list = list.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.formula.toLowerCase().includes(q) ||
        c.chapterName.toLowerCase().includes(q) ||
        c.symbols.toLowerCase().includes(q) ||
        c.tip.toLowerCase().includes(q)
      );
    }

    filteredCards = list;
    if (currentIndex >= filteredCards.length) {
      currentIndex = 0;
    }
  }

  // Populate Chapter Dropdown for Fast Jumping
  function populateChapterDropdown() {
    const select = document.getElementById('flashcard-chapter-select');
    if (!select || !window.IPE_DATA || !window.IPE_DATA.manifest) return;

    let html = '<option value="all">All Chapters (Full Syllabus)</option>';

    if (activeSubject === 'all' || activeSubject === 'physics') {
      html += '<optgroup label="Physics (Chapters 1–16)">';
      window.IPE_DATA.manifest.physics.forEach(ch => {
        html += `<option value="${ch.id}">Physics Ch ${ch.num}: ${ch.name}</option>`;
      });
      html += '</optgroup>';
    }

    if (activeSubject === 'all' || activeSubject === 'chemistry') {
      html += '<optgroup label="Chemistry (Chapters 1–15)">';
      window.IPE_DATA.manifest.chemistry.forEach(ch => {
        html += `<option value="${ch.id}">Chemistry Ch ${ch.num}: ${ch.name}</option>`;
      });
      html += '</optgroup>';
    }

    select.innerHTML = html;
    select.value = activeChapter;
  }

  // Render Back Face explanation and AI Explain button ONLY after flipping
  function renderBackFaceContent(card) {
    const backFaceEl = document.getElementById('fc-back-face');
    if (!backFaceEl) return;
    const isPhy = card.subject.toLowerCase() === 'physics';

    backFaceEl.innerHTML = `
      <div class="fc-header-row">
        <span class="chip chip-subject ${isPhy ? 'physics' : 'chemistry'}">${card.subject}</span>
        <span class="fc-chapter-tag">${card.title}</span>
      </div>

      <div class="fc-back-body">
        <!-- Large Display Formula with KaTeX wrapped in .formula-box -->
        <div class="fc-math-box formula-box" style="margin-bottom: 10px;">
          <div class="fc-formula-display" style="font-size: 1.15rem;">$$${card.formula}$$</div>
        </div>

        <!-- Terms and symbols structured breakdown -->
        ${card.symbols ? formatSymbolsHtml(card.symbols) : ''}

        <!-- SI Units -->
        ${card.units ? formatUnitsHtml(card.units) : ''}

        <!-- IPE Exam Tip -->
        ${card.tip ? `
          <div class="fc-exam-tip-box">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
            <span><strong>IPE Tip:</strong> ${cleanLatexMath(card.tip)}</span>
          </div>
        ` : ''}
      </div>

      <div class="fc-front-footer">
        <span class="fc-tap-hint">Tap card to flip back</span>
        <button class="fc-ai-explain-btn" onclick="event.stopPropagation(); window.IPE_AI.explainFormula('${card.title.replace(/'/g, "\\'")}', '${card.formula.replace(/'/g, "\\'")}')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="12" x="3" y="6" rx="2"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><path d="M12 2v4M2 12h1M21 12h1"/></svg>
          <span>Explain with AI</span>
        </button>
      </div>
    `;

    renderMath(backFaceEl);
  }

  // Render 3D Deck View
  function renderDeckView() {
    const container = document.getElementById('flashcards-view-content');
    if (!container) return;

    if (filteredCards.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="padding: 40px 20px;">
          <div class="empty-icon-wrap">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
          </div>
          <h3>No flashcards match your filter</h3>
          <p>Try switching to All Subjects or clearing your search.</p>
          <button class="btn-primary" style="max-width: 200px; margin: 16px auto 0;" onclick="window.IPE_FLASHCARDS.resetFilters()">Reset Filters</button>
        </div>
      `;
      return;
    }

    const card = filteredCards[currentIndex];
    const isPhy = card.subject.toLowerCase() === 'physics';
    const themeClass = isPhy ? 'theme-physics' : 'theme-chemistry';
    const isBookmarked = window.IPE_STORAGE.isBookmarked(card.id);

    container.innerHTML = `
      <div class="deck-mode-wrapper">
        <!-- Deck Header Status -->
        <div class="deck-status-bar">
          <div class="deck-counter-badge">
            <span>Card ${currentIndex + 1} of ${filteredCards.length}</span>
          </div>
          <div class="deck-actions-right">
            <button class="deck-icon-btn ${isBookmarked ? 'active' : ''}" onclick="window.IPE_FLASHCARDS.toggleBookmark('${card.id}')" title="Bookmark for Revision">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
            </button>
            <button class="deck-icon-btn" onclick="window.IPE_FLASHCARDS.shuffle()" title="Shuffle Deck">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.8-1.1 2-1.7 3.3-1.7H22"/><path d="m18 2 4 4-4 4"/><path d="M2 6h1.4c1.3 0 2.5.6 3.3 1.7l6.1 8.6c.8 1.1 2 1.7 3.3 1.7H22"/><path d="m18 14 4 4-4 4"/></svg>
            </button>
          </div>
        </div>

        <!-- 3D Flip Card Container -->
        <div class="flashcard-3d-scene" onclick="window.IPE_FLASHCARDS.flip()">
          <div class="flashcard-3d-card ${themeClass} ${isFlipped ? 'flipped' : ''}" id="flashcard-3d-card">
            
            <!-- FRONT FACE: Concept & Formula Prominently Displayed -->
            <div class="flashcard-face flashcard-front" id="fc-front-face">
              <div class="fc-header-row">
                <span class="chip chip-subject ${isPhy ? 'physics' : 'chemistry'}">${card.subject}</span>
                <span class="fc-chapter-tag">Ch ${card.chapterNumber}: ${card.chapterName}</span>
              </div>

              <div class="fc-front-main">
                <div class="fc-prompt-label">TS IPE Board Formula</div>
                <div class="fc-front-title">${card.title}</div>

                <!-- Display Formula prominently on Front face with KaTeX wrapped in .formula-box -->
                <div class="fc-math-box formula-box" style="margin: 14px 0 10px;">
                  <div class="fc-formula-display">$$${card.formula}$$</div>
                </div>

                <div class="fc-front-sub">Tap card to flip for Terms breakdown & Explanation</div>
              </div>

              <div class="fc-front-footer">
                <span class="fc-tap-hint">Tap card for Terms & Units breakdown</span>
              </div>
            </div>

            <!-- BACK FACE: Lazy Loaded ONLY after flipping -->
            <div class="flashcard-face flashcard-back" id="fc-back-face">
              <!-- Loaded on flip to maximize performance on 2GB RAM phones -->
            </div>

          </div>
        </div>

        <!-- Deck Bottom Navigation Controls -->
        <div class="deck-controls-row">
          <button class="deck-nav-btn" onclick="window.IPE_FLASHCARDS.prev()" ${currentIndex === 0 ? 'disabled' : ''}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
            <span>Prev</span>
          </button>
          
          <button class="deck-flip-btn" onclick="window.IPE_FLASHCARDS.flip()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/></svg>
            <span>Flip Card</span>
          </button>

          <button class="deck-nav-btn next-btn" onclick="window.IPE_FLASHCARDS.next()">
            <span>Next</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>

        <!-- Mobile Touch Swipe Hint -->
        <div class="deck-keyboard-hint">
          <span>Swipe or tap buttons to navigate • ${Math.round(((currentIndex + 1) / filteredCards.length) * 100)}% through deck</span>
        </div>
      </div>
    `;

    // Only render front face math upfront (fast & light for 2GB RAM devices)
    if (isFlipped) {
      renderBackFaceContent(card);
    } else {
      const frontEl = document.getElementById('fc-front-face');
      if (frontEl) renderMath(frontEl);
    }

    setupSwipeGestures();
  }

  // Render List View (Browse All 104 Formulas)
  function renderListView() {
    const container = document.getElementById('flashcards-view-content');
    if (!container) return;

    if (filteredCards.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="padding: 40px 20px;">
          <span class="empty-icon">🔍</span>
          <h3>No formula cards match your search</h3>
          <p>Try clearing search keywords or subject filters.</p>
          <button class="btn-primary" style="max-width: 200px; margin: 16px auto 0;" onclick="window.IPE_FLASHCARDS.resetFilters()">Reset Filters</button>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="formulas-list-grid">
        ${filteredCards.map((card, idx) => {
          const isPhy = card.subject.toLowerCase() === 'physics';
          const isBookmarked = window.IPE_STORAGE.isBookmarked(card.id);
          return `
            <div class="formula-flashcard ${isPhy ? 'theme-physics' : 'theme-chemistry'}" id="fc-item-${card.id}">
              <div class="fc-item-top">
                <div style="display: flex; align-items: center; gap: 6px;">
                  <span class="chip chip-subject ${isPhy ? 'physics' : 'chemistry'}" style="font-size: 0.65rem;">${card.subject}</span>
                  <span style="font-size: 0.72rem; color: var(--text-dim);">Ch ${card.chapterNumber}: ${card.chapterName}</span>
                </div>
                <button class="icon-btn-tiny ${isBookmarked ? 'active' : ''}" onclick="window.IPE_FLASHCARDS.toggleBookmark('${card.id}')" title="Bookmark">
                  ${isBookmarked ? '★' : '☆'}
                </button>
              </div>

              <div class="fc-title">${card.title}</div>
              
              <div class="fc-math">
                $$${card.formula}$$
              </div>

              ${card.symbols ? formatSymbolsHtml(card.symbols) : ''}

              ${card.units ? formatUnitsHtml(card.units) : ''}

              ${card.tip ? `
                <div class="fc-tip">
                  💡 <strong>IPE Tip:</strong> ${cleanLatexMath(card.tip)}
                </div>
              ` : ''}

              <div class="fc-list-actions" style="margin-top: 10px; display: flex; justify-content: flex-end;">
                <button class="fc-list-ai-btn" onclick="window.IPE_AI.explainFormula('${card.title.replace(/'/g, "\\'")}', '${card.formula.replace(/'/g, "\\'")}')">
                  <span>🤖 Explain with AI</span>
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    renderMath(container);
  }

  // Swipe Gestures for Mobile
  function setupSwipeGestures() {
    const scene = document.querySelector('.flashcard-3d-scene');
    if (!scene) return;

    let touchStartX = 0;
    let touchStartY = 0;

    scene.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    scene.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      const dx = touchEndX - touchStartX;
      const dy = touchEndY - touchStartY;

      // Ensure horizontal swipe
      if (Math.abs(dx) > 60 && Math.abs(dy) < 50) {
        if (dx < 0) {
          // Swipe Left -> Next
          window.IPE_FLASHCARDS.next();
        } else {
          // Swipe Right -> Prev
          window.IPE_FLASHCARDS.prev();
        }
      }
    }, { passive: true });
  }

  return {
    init: function() {
      allCards = extractAllFormulas();
      filterCards();
      populateChapterDropdown();
      this.render();
    },

    render: function() {
      if (activeMode === 'deck') {
        renderDeckView();
      } else {
        renderListView();
      }
    },

    flip: function() {
      if (!filteredCards.length) return;
      isFlipped = !isFlipped;
      const cardEl = document.getElementById('flashcard-3d-card');
      const card = filteredCards[currentIndex];
      if (cardEl) {
        if (isFlipped) {
          cardEl.classList.add('flipped');
          // Explanation and AI button load ONLY after flipping!
          renderBackFaceContent(card);
        } else {
          cardEl.classList.remove('flipped');
          // Clear back face to save memory on 2GB RAM phones
          const backEl = document.getElementById('fc-back-face');
          if (backEl) backEl.innerHTML = '';
        }
      }
      if (navigator.vibrate) navigator.vibrate(30);
    },

    next: function() {
      if (currentIndex < filteredCards.length - 1) {
        currentIndex++;
        isFlipped = false;
        renderDeckView();
      } else {
        // Loop back to start with celebration
        currentIndex = 0;
        isFlipped = false;
        window.IPE_GAME.showXPToast(10, '🎉 Finished Deck!');
        renderDeckView();
      }
    },

    prev: function() {
      if (currentIndex > 0) {
        currentIndex--;
        isFlipped = false;
        renderDeckView();
      }
    },

    shuffle: function() {
      filteredCards.sort(() => 0.5 - Math.random());
      currentIndex = 0;
      isFlipped = false;
      window.IPE_GAME.showXPToast(5, '🔀 Deck Shuffled!');
      renderDeckView();
    },

    setMode: function(mode, btnEl) {
      activeMode = mode;
      isFlipped = false;
      const btns = document.querySelectorAll('.fc-mode-pill');
      btns.forEach(b => b.classList.remove('active'));
      if (btnEl) btnEl.classList.add('active');
      this.render();
    },

    setSubject: function(subj, btnEl) {
      if (!allCards || allCards.length === 0) {
        allCards = extractAllFormulas();
      }
      activeSubject = subj ? subj.toLowerCase() : 'all';
      activeChapter = 'all'; // Reset chapter to prevent 0 results
      currentIndex = 0;
      isFlipped = false;
      const pills = document.querySelectorAll('.formula-filter-pill');
      pills.forEach(p => {
        const val = (p.getAttribute('data-subj') || '').toLowerCase();
        p.classList.toggle('active', val === activeSubject);
      });
      populateChapterDropdown();
      filterCards();
      this.render();
    },

    selectChapter: function(chId) {
      activeChapter = chId;
      currentIndex = 0;
      isFlipped = false;
      filterCards();
      this.render();
    },

    handleSearch: function(query) {
      searchQuery = query;
      currentIndex = 0;
      isFlipped = false;
      filterCards();
      this.render();
    },

    resetFilters: function() {
      activeSubject = 'all';
      activeChapter = 'all';
      searchQuery = '';
      currentIndex = 0;
      isFlipped = false;

      const pills = document.querySelectorAll('.formula-filter-pill');
      pills.forEach(p => {
        p.classList.remove('active');
        if (p.getAttribute('data-subj') === 'all') p.classList.add('active');
      });

      const select = document.getElementById('flashcard-chapter-select');
      if (select) select.value = 'all';

      const searchInput = document.getElementById('flashcard-search-input');
      if (searchInput) searchInput.value = '';

      filterCards();
      this.render();
    },

    toggleBookmark: function(cardId) {
      const added = window.IPE_STORAGE.toggleBookmark(cardId);
      window.IPE_GAME.showXPToast(5, added ? '★ Saved to Revision' : '☆ Removed from Saved');
      window.IPE_APP.updateStatsUI();
      this.render();
    }
  };
})();
