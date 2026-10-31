// Full 60-Mark Official Board Mock Exam Generator for IPE GRIND
// Authentic TS & AP Intermediate 2nd Year Question Paper Engine with 3-Hour Timer, Print/PDF Styling & Marking Scheme
window.IPE_MOCK = (function() {
  let activeSubject = 'physics'; // 'physics' | 'chemistry'
  let currentPaper = null;
  let timerInterval = null;
  let timeRemainingSec = 3 * 3600; // 3 Hours (10800 sec)
  let isTimerRunning = false;
  let isAnswerKeyVisible = false;

  // Student self-score marks cache
  let studentScores = {};

  // Fetch candidate questions from registered chapters
  function getQuestionsForSubject(subject) {
    const list = [];
    const chapters = window.IPE_DATA && window.IPE_DATA.chapters ? window.IPE_DATA.chapters : {};
    Object.keys(chapters).forEach(k => {
      const ch = chapters[k];
      if (ch && ch.subject && ch.subject.toLowerCase() === subject.toLowerCase()) {
        if (ch.questions && Array.isArray(ch.questions)) {
          ch.questions.forEach(q => {
            list.push({ ...q, chapterName: ch.chapter, chapterId: ch.id, chapterNum: ch.chapterNumber });
          });
        }
      }
    });
    return list;
  }

  // Shuffle helper
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Generate Authentic 60-Mark Question Paper conforming to TSBIE Blueprint
  function generatePaper(subject = 'physics') {
    activeSubject = subject;
    const allQ = getQuestionsForSubject(subject);

    // 1. Section A: 10 VSAQs (2 Marks each)
    let vsaqPool = allQ.filter(q => q.type === 'VSAQ');
    if (vsaqPool.length < 10) vsaqPool = allQ.filter(q => q.marks === 2 || q.type === 'VSAQ' || q.type === 'Numerical');
    const selectedVSAQs = shuffle(vsaqPool).slice(0, 10);

    // 2. Section B: 8 SAQs (4 Marks each, answer any 6)
    let saqPool = allQ.filter(q => q.type === 'SAQ' || q.marks === 4);
    if (saqPool.length < 8) saqPool = allQ.filter(q => q.type !== 'LAQ' && q.type !== 'VSAQ');
    const selectedSAQs = shuffle(saqPool).slice(0, 8);

    // 3. Section C: 3 LAQs (8 Marks each, answer any 2)
    // Strictly select from high-weightage 8M chapters if available
    let laqPool = allQ.filter(q => q.type === 'LAQ' || q.marks === 8);
    if (laqPool.length < 3) laqPool = allQ.filter(q => q.important);
    const selectedLAQs = shuffle(laqPool).slice(0, 3);

    currentPaper = {
      subject: subject.toUpperCase(),
      dateGenerated: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      sectionA: selectedVSAQs,
      sectionB: selectedSAQs,
      sectionC: selectedLAQs
    };

    studentScores = {};
    isAnswerKeyVisible = false;
    resetTimer();
    renderPaperUI();
  }

  function renderPaperUI() {
    const container = document.getElementById('mock-exam-paper-container');
    if (!container || !currentPaper) return;

    let qCounter = 1;

    let html = `
      <div class="mock-board-paper" id="printable-mock-paper">
        <!-- Official Telangana Board Paper Header -->
        <div class="mock-board-header">
          <div class="mock-board-crest">TELANGANA STATE BOARD OF INTERMEDIATE EDUCATION, HYDERABAD</div>
          <div class="mock-board-subtitle">INTERMEDIATE PUBLIC EXAMINATIONS (IPE) - MODEL QUESTION PAPER</div>
          <div class="mock-board-meta-row">
            <span><strong>YEAR:</strong> SECOND YEAR (SENIOR INTER)</span>
            <span><strong>SUBJECT:</strong> ${currentPaper.subject} (ENGLISH VERSION)</span>
          </div>
          <div class="mock-board-meta-row sub">
            <span><strong>TIME:</strong> 3 HOURS</span>
            <span><strong>MAX. MARKS:</strong> 60 (TOTAL VALUE: 76)</span>
          </div>
        </div>

        <div class="mock-board-instructions">
          <strong>GENERAL INSTRUCTIONS:</strong>
          <ol>
            <li>Answer <strong>ALL</strong> questions from <strong>Section 'A'</strong> in the same order.</li>
            <li>In <strong>Section 'B'</strong>, answer any <strong>SIX</strong> questions. (Questions 11 to 18).</li>
            <li>In <strong>Section 'C'</strong>, answer any <strong>TWO</strong> questions. (Questions 19 to 21).</li>
            <li>Draw neat and labeled diagrams wherever necessary. Formula and units carry separate weightage.</li>
          </ol>
        </div>

        <!-- ================= SECTION A ================= -->
        <div class="mock-section-block">
          <div class="mock-sec-title-row">
            <span class="mock-sec-title">SECTION A</span>
            <span class="mock-sec-marks">10 &times; 2 = 20 Marks</span>
          </div>
          <div class="mock-sec-note">Note: Answer ALL questions. Very Short Answer Type. Each question carries TWO marks.</div>
          <div class="mock-questions-list">
    `;

    currentPaper.sectionA.forEach((q, idx) => {
      const qNum = qCounter++;
      html += buildQuestionItemHTML(q, qNum, 2, 'A');
    });

    html += `
          </div>
        </div>

        <!-- ================= SECTION B ================= -->
        <div class="mock-section-block">
          <div class="mock-sec-title-row">
            <span class="mock-sec-title">SECTION B</span>
            <span class="mock-sec-marks">6 &times; 4 = 24 Marks</span>
          </div>
          <div class="mock-sec-note">Note: Answer any SIX questions. Short Answer Type. Each question carries FOUR marks.</div>
          <div class="mock-questions-list">
    `;

    currentPaper.sectionB.forEach((q, idx) => {
      const qNum = qCounter++;
      html += buildQuestionItemHTML(q, qNum, 4, 'B');
    });

    html += `
          </div>
        </div>

        <!-- ================= SECTION C ================= -->
        <div class="mock-section-block">
          <div class="mock-sec-title-row">
            <span class="mock-sec-title">SECTION C</span>
            <span class="mock-sec-marks">2 &times; 8 = 16 Marks</span>
          </div>
          <div class="mock-sec-note">Note: Answer any TWO questions. Long Answer Type. Each question carries EIGHT marks.</div>
          <div class="mock-questions-list">
    `;

    currentPaper.sectionC.forEach((q, idx) => {
      const qNum = qCounter++;
      html += buildQuestionItemHTML(q, qNum, 8, 'C');
    });

    html += `
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;

    // Render KaTeX math on rendered questions
    if (window.renderMathInElement) {
      try {
        window.renderMathInElement(container, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false }
          ],
          throwOnError: false
        });
      } catch (e) {}
    }
  }

  function buildQuestionItemHTML(q, qNum, maxMarks, sectionKey) {
    const scoreVal = studentScores[qNum] !== undefined ? studentScores[qNum] : '';

    return `
      <div class="mock-question-item" id="mock-q-${qNum}">
        <div class="mock-q-header">
          <div class="mock-q-num">${qNum}.</div>
          <div class="mock-q-text">${q.question}</div>
          <div class="mock-q-marks-tag">[${maxMarks}M]</div>
        </div>

        ${q.formula ? `<div class="mock-q-formula-hint">Formula: $${q.formula.replace(/^\$+|\$+$/g, '')}$</div>` : ''}

        <!-- Interactive Marking Scheme & Answer Reveal -->
        <div class="mock-q-answer-box ${isAnswerKeyVisible ? 'visible' : ''}">
          <div class="mock-answer-header">
            <span>✅ Official Model Answer & Marking Scheme:</span>
            <span class="mock-chapter-tag">Ch ${q.chapterNum || ''}: ${q.chapterName || ''}</span>
          </div>
          <div class="mock-answer-body">
            ${q.answer ? q.answer.replace(/\n/g, '<br>') : 'Model answer not available.'}
          </div>
          
          <div class="mock-step-marking">
            <span class="step-title">📋 Step Marks Distribution:</span>
            ${getMarkingBreakdown(maxMarks)}
          </div>

          <!-- Self Evaluation Mark Input -->
          <div class="mock-self-eval-row no-print">
            <label>Your Score (0 to ${maxMarks}):</label>
            <input type="number" min="0" max="${maxMarks}" step="0.5" value="${scoreVal}" 
                   placeholder="0" onchange="window.IPE_MOCK.recordScore(${qNum}, this.value, ${maxMarks}, '${sectionKey}')">
          </div>
        </div>
      </div>
    `;
  }

  function getMarkingBreakdown(maxMarks) {
    if (maxMarks === 2) {
      return `<span>• Accurate Statement / Law / Formula: <strong>1 Mark</strong></span><span>• Units / Calculation / Key condition: <strong>1 Mark</strong></span>`;
    } else if (maxMarks === 4) {
      return `<span>• Definition / Working Principle: <strong>1 Mark</strong></span><span>• Neat labeled diagram / circuit: <strong>1 Mark</strong></span><span>• Derivation / Key equations / Conclusion: <strong>2 Marks</strong></span>`;
    } else {
      // 8 Marks
      return `<span>• Principle & Statement: <strong>2 Marks</strong></span><span>• Labeled Schematic Diagram / Circuit: <strong>2 Marks</strong></span><span>• Step-by-step Mathematical Derivation: <strong>3 Marks</strong></span><span>• Numerical problem / Final Units: <strong>1 Mark</strong></span>`;
    }
  }

  function toggleAnswerKey() {
    isAnswerKeyVisible = !isAnswerKeyVisible;
    const boxes = document.querySelectorAll('.mock-q-answer-box');
    boxes.forEach(b => b.classList.toggle('visible', isAnswerKeyVisible));

    const btn = document.getElementById('mock-toggle-key-btn');
    if (btn) {
      btn.textContent = isAnswerKeyVisible ? '🙈 Hide Marking Scheme' : '💡 Reveal Official Marking Scheme & Answers';
    }

    // Re-render math if opened
    if (isAnswerKeyVisible && window.renderMathInElement) {
      const container = document.getElementById('mock-exam-paper-container');
      if (container) {
        window.renderMathInElement(container, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false }
          ],
          throwOnError: false
        });
      }
    }
  }

  function recordScore(qNum, val, maxMarks, sectionKey) {
    const num = Math.max(0, Math.min(maxMarks, parseFloat(val) || 0));
    studentScores[qNum] = { score: num, max: maxMarks, section: sectionKey };
    calculateTotalScore();
  }

  function calculateTotalScore() {
    // Section A: All 10
    let secASum = 0;
    for (let q = 1; q <= 10; q++) {
      if (studentScores[q]) secASum += studentScores[q].score;
    }

    // Section B: Best 6 out of 8 (Q11 to Q18)
    const secBScores = [];
    for (let q = 11; q <= 18; q++) {
      if (studentScores[q]) secBScores.push(studentScores[q].score);
    }
    secBScores.sort((a, b) => b - a);
    const secBSum = secBScores.slice(0, 6).reduce((a, b) => a + b, 0);

    // Section C: Best 2 out of 3 (Q19 to Q21)
    const secCScores = [];
    for (let q = 19; q <= 21; q++) {
      if (studentScores[q]) secCScores.push(studentScores[q].score);
    }
    secCScores.sort((a, b) => b - a);
    const secCSum = secCScores.slice(0, 2).reduce((a, b) => a + b, 0);

    const total = secASum + secBSum + secCSum;

    const scoreCard = document.getElementById('mock-scorecard-banner');
    if (scoreCard) {
      scoreCard.style.display = 'block';
      scoreCard.innerHTML = `
        <div class="mock-score-result">
          <div class="mock-score-number">${total} / 60</div>
          <div class="mock-score-status">${getFeedbackText(total)}</div>
          <div class="mock-score-breakdown">
            Sec A (VSAQs): ${secASum}/20 • Sec B (SAQs): ${secBSum}/24 • Sec C (LAQs): ${secCSum}/16
          </div>
        </div>
      `;
    }
  }

  function getFeedbackText(score) {
    if (score >= 58) return '🌟 State Rank Level (60/60 Topper Material)';
    if (score >= 52) return '🎯 High Distinction (Outstanding Command)';
    if (score >= 42) return '⚡ Solid First Class (Strong Performance)';
    if (score >= 21) return '✅ Pass Guaranteed (Revise LAQs for 50+)';
    return '⚠️ Needs Urgent Revision in Section A & LAQs';
  }

  // Timer controls
  function startTimer() {
    if (isTimerRunning) return;
    isTimerRunning = true;
    updateTimerUI();

    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      timeRemainingSec--;
      if (timeRemainingSec <= 0) {
        timeRemainingSec = 0;
        pauseTimer();
        alert('⏰ 3 Hours Completed! Stop writing and evaluate your answer sheet.');
      }
      updateTimerUI();
    }, 1000);
  }

  function pauseTimer() {
    isTimerRunning = false;
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    updateTimerUI();
  }

  function toggleTimer() {
    if (isTimerRunning) pauseTimer();
    else startTimer();
  }

  function resetTimer() {
    pauseTimer();
    timeRemainingSec = 3 * 3600; // 3 Hours
    updateTimerUI();
  }

  function updateTimerUI() {
    const hours = Math.floor(timeRemainingSec / 3600);
    const mins = Math.floor((timeRemainingSec % 3600) / 60);
    const secs = timeRemainingSec % 60;

    const timerEl = document.getElementById('mock-timer-display');
    const toggleBtn = document.getElementById('mock-timer-toggle-btn');

    if (timerEl) {
      timerEl.textContent = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      timerEl.classList.toggle('warning', timeRemainingSec < 900); // under 15 mins
    }
    if (toggleBtn) {
      toggleBtn.textContent = isTimerRunning ? '⏸ Pause' : '▶ Start Timer';
    }
  }

  function printExamPaper() {
    if (typeof window !== 'undefined' && window.print) {
      window.print();
    }
  }

  function openMockModal(subject = 'physics') {
    const modal = document.getElementById('mock-exam-modal');
    if (modal) {
      modal.classList.add('open');
      if (!currentPaper || currentPaper.subject.toLowerCase() !== subject.toLowerCase()) {
        generatePaper(subject);
      }
    }
  }

  function closeMockModal() {
    const modal = document.getElementById('mock-exam-modal');
    if (modal) modal.classList.remove('open');
  }

  return {
    init: function() {
      updateTimerUI();
    },
    openModal: openMockModal,
    closeModal: closeMockModal,
    generatePaper: generatePaper,
    toggleAnswerKey: toggleAnswerKey,
    recordScore: recordScore,
    toggleTimer: toggleTimer,
    resetTimer: resetTimer,
    printExamPaper: printExamPaper
  };
})();
