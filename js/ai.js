// Groq-Powered AI Master Tutor Engine for IPE GRIND ("IPE GURU")
// High-performance streaming typewriter, KaTeX math isolation, voice speech, and prompt routing
window.IPE_AI = (function() {
  const GROQ_CONFIG = {
    endpoint: 'https://api.groq.com/openai/v1/chat/completions',
    apiKey: window.GROQ_API_KEY || localStorage.getItem('ipe_groq_key') || '',
    model: 'qwen/qwen3.8-27b',
    fallbackModel: 'openai/gpt-oss-120b'
  };

  const SYSTEM_PROMPT = `You are 'IPE GURU', the legendary, friendly AI Physics & Chemistry Master Teacher for Telangana Board (TS BIE) Intermediate 2nd Year students.
Your mission is to make students deeply understand concepts from scratch, score 60/60 in board exams, and keep them eagerly chatting and learning.

Key Teaching Guidelines:
1. Language: Conversational Tenglish (Telugu written purely in English/Latin alphabet + English technical terms, NEVER use Telugu script characters). Example: "Arere bhayya, idhi chaala interesting concept! Asalu idi ela work chesthundo zero nundi chuddam...".
2. Explain from scratch: Start with an intuitive real-world analogy before introducing the formula.
3. Break down derivations and formulas into easy 1-2-3 board exam steps.
4. Always format mathematical formulas and equations in LaTeX using $...$ for inline and $$...$$ for display equations.
5. Keep students chatting: At the end of every reply, ask an intriguing, friendly concept-check question or challenge them to test their intuition (e.g., "Ippudu meelo okka doubt ravali... source observer ki daggara vasthe apparent frequency perugutunda taggutunda? Tell me your thought!").
6. Tone: Warm, energetic, encouraging, like a favorite coaching master.`;

  let conversationHistory = [];
  let isGenerating = false;
  let isFullscreen = false;

  function init() {
    const savedKey = localStorage.getItem('ipe_groq_key');
    if (savedKey) GROQ_CONFIG.apiKey = savedKey;
  }

  function renderMath(element) {
    if (window.renderMathInElement && element) {
      try {
        window.renderMathInElement(element, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false }
          ],
          throwOnError: false
        });
      } catch (e) {
        console.warn('KaTeX render warning:', e);
      }
    }
  }

  // Open AI Chat Modal / Drawer
  function openChat(initialPrompt) {
    const modal = document.getElementById('ai-chat-modal');
    if (!modal) return;
    modal.classList.add('open');

    // Show initial welcome if empty
    const messagesContainer = document.getElementById('ai-chat-messages');
    if (conversationHistory.length === 0 && messagesContainer) {
      appendAssistantMessage(
        "Namaste champ! 🚀 Nenu me **IPE GURU** ni. Physics and Chemistry lo edaina concept ardham kaledha? Or formula derive cheyyadam kashtanga undha? Just ask me - scratch nundi crystal clear ga explain chestha! Ee roju em nerchukundham?",
        false
      );
    }

    if (initialPrompt && initialPrompt.trim() !== '') {
      const input = document.getElementById('ai-chat-input');
      if (input) input.value = initialPrompt;
      sendMessage(initialPrompt);
    }
  }

  function closeChat() {
    const modal = document.getElementById('ai-chat-modal');
    if (modal) modal.classList.remove('open');
  }

  function toggleFullscreen() {
    const sheet = document.querySelector('.ai-chat-sheet');
    const btn = document.getElementById('ai-fullscreen-btn');
    if (!sheet) return;
    isFullscreen = !isFullscreen;
    sheet.classList.toggle('fullscreen-sheet', isFullscreen);
    if (btn) btn.textContent = isFullscreen ? '❐' : '⛶';
  }

  function appendUserMessage(text) {
    const container = document.getElementById('ai-chat-messages');
    if (!container) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = 'ai-msg user-msg';
    msgDiv.innerHTML = `
      <div class="user-msg-wrapper">
        <div class="msg-bubble user-bubble">${escapeHtml(text)}</div>
      </div>
    `;
    container.appendChild(msgDiv);
    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
  }

  // Safe Markdown parser with KaTeX Math delimiter preservation
  function formatMarkdown(text) {
    if (!text) return '';

    // Step 1: Stash Display Math ($$...$$)
    const displayMath = [];
    let cleanText = text.replace(/\$\$([\s\S]*?)\$\$/g, (match, math) => {
      displayMath.push(math);
      return `___DISPLAY_MATH_${displayMath.length - 1}___`;
    });

    // Step 2: Stash Inline Math ($...$)
    const inlineMath = [];
    cleanText = cleanText.replace(/\$([^\$\n]+?)\$/g, (match, math) => {
      inlineMath.push(math);
      return `___INLINE_MATH_${inlineMath.length - 1}___`;
    });

    // Step 3: Escape HTML Entities
    let html = cleanText
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Step 4: Markdown elements
    // Headings
    html = html.replace(/^### (.*$)/gim, '<div class="ai-md-h3">$1</div>');
    html = html.replace(/^## (.*$)/gim, '<div class="ai-md-h2">$1</div>');
    html = html.replace(/^# (.*$)/gim, '<div class="ai-md-h1">$1</div>');

    // Blockquotes
    html = html.replace(/^> (.*$)/gim, '<div class="ai-md-quote">💡 $1</div>');

    // Numbered step lists: 1. Item
    html = html.replace(/^(\d+)\.\s+(.*$)/gim, '<div class="ai-md-step"><span class="step-num">$1</span><span class="step-text">$2</span></div>');

    // Bullet lists: - Item or * Item
    html = html.replace(/^[\*\-]\s+(.*$)/gim, '<div class="ai-md-bullet"><span class="bullet-dot">✦</span><span class="bullet-text">$1</span></div>');

    // Bold & Italics
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Inline Code
    html = html.replace(/`([^`]+)`/g, '<code class="ai-md-code">$1</code>');

    // Paragraph Spacing
    html = html.replace(/\n\n/g, '<div class="ai-para-break"></div>');
    html = html.replace(/\n/g, '<br>');

    // Step 5: Restore KaTeX Display Math
    displayMath.forEach((math, idx) => {
      html = html.replace(`___DISPLAY_MATH_${idx}___`, `$$${math}$$`);
    });

    // Step 6: Restore KaTeX Inline Math
    inlineMath.forEach((math, idx) => {
      html = html.replace(`___INLINE_MATH_${idx}___`, `$${math}$`);
    });

    return html;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Slowly reveal AI response line-by-line with typewriter effect and smooth autoscroll
  async function revealLineByLine(fullText, msgContainer) {
    const lines = fullText.split('\n');
    let displayedText = '';

    const cursor = document.createElement('span');
    cursor.className = 'ai-typing-cursor';
    cursor.textContent = '▍';
    msgContainer.appendChild(cursor);

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      displayedText += (i === 0 ? '' : '\n') + line;

      msgContainer.innerHTML = formatMarkdown(displayedText);
      msgContainer.appendChild(cursor);

      renderMath(msgContainer);

      const chatViewport = document.getElementById('ai-chat-messages');
      if (chatViewport) {
        chatViewport.scrollTop = chatViewport.scrollHeight;
      }

      // Natural pause pacing
      const delay = line.trim() === '' ? 50 : Math.min(220, Math.max(90, line.length * 4));
      await new Promise(r => setTimeout(r, delay));
    }

    if (cursor.parentNode) cursor.parentNode.removeChild(cursor);
    renderMath(msgContainer);
  }

  // Append Assistant Message with Avatar, Name, Actions, and smart follow-up suggestions
  function appendAssistantMessage(text, animate = true) {
    const container = document.getElementById('ai-chat-messages');
    if (!container) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = 'ai-msg assistant-msg';

    const avatar = document.createElement('div');
    avatar.className = 'ai-msg-avatar';
    avatar.innerHTML = '🤖';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'ai-msg-content';

    const authorHeader = document.createElement('div');
    authorHeader.className = 'ai-msg-author';
    authorHeader.innerHTML = `
      <span class="ai-author-name">IPE GURU</span>
      <span class="ai-author-badge">TS Board Expert</span>
    `;

    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble assistant-bubble';

    const actionsBar = document.createElement('div');
    actionsBar.className = 'ai-msg-actions';
    actionsBar.innerHTML = `
      <button class="ai-action-btn" onclick="window.IPE_AI.copyMessage(this)" title="Copy Explanation">📋 Copy</button>
      <button class="ai-action-btn" onclick="window.IPE_AI.speakMessage(this)" title="Listen to Explanation">🔊 Listen</button>
    `;

    // Smart Follow-Up Chips Bar
    const followUps = document.createElement('div');
    followUps.className = 'ai-followup-chips';
    followUps.innerHTML = `
      <button class="ai-followup-pill" onclick="window.IPE_AI.sendMessage('Sir, please explain this concept with an everyday real-world example in Tenglish!')">💡 Real-Life Analogy</button>
      <button class="ai-followup-pill" onclick="window.IPE_AI.sendMessage('Sir, board exam lo 4 marks SAQ ki entha rayali? Point by point presentation steps cheppandi.')">📝 4M / 8M Exam Steps</button>
      <button class="ai-followup-pill" onclick="window.IPE_AI.sendMessage('Sir, ee concept meeda previous IPE board problem / numerical solve chesi chupinchandi.')">🔢 Practice Problem</button>
    `;

    contentDiv.appendChild(authorHeader);
    contentDiv.appendChild(bubble);
    contentDiv.appendChild(actionsBar);
    contentDiv.appendChild(followUps);

    msgDiv.appendChild(avatar);
    msgDiv.appendChild(contentDiv);
    container.appendChild(msgDiv);

    if (animate) {
      return revealLineByLine(text, bubble);
    } else {
      bubble.innerHTML = formatMarkdown(text);
      renderMath(bubble);
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
      return Promise.resolve();
    }
  }

  // Copy Message to Clipboard
  function copyMessage(btnEl) {
    const bubble = btnEl.closest('.ai-msg-content').querySelector('.assistant-bubble');
    if (!bubble) return;
    const text = bubble.innerText;
    navigator.clipboard.writeText(text).then(() => {
      const orig = btnEl.innerHTML;
      btnEl.innerHTML = '✓ Copied!';
      btnEl.style.color = '#34d399';
      setTimeout(() => {
        btnEl.innerHTML = orig;
        btnEl.style.color = '';
      }, 2000);
    }).catch(err => {
      console.warn('Clipboard copy error:', err);
    });
  }

  // Speak Message Aloud
  function speakMessage(btnEl) {
    const bubble = btnEl.closest('.ai-msg-content').querySelector('.assistant-bubble');
    if (!bubble) return;
    const text = bubble.innerText;
    window.IPE_SPEECH.speakRawText(text, (speaking) => {
      btnEl.innerHTML = speaking ? '⏹ Stop' : '🔊 Listen';
      btnEl.style.color = speaking ? '#f87171' : '';
    });
  }

  // Send message to Groq API
  async function sendMessage(overrideText) {
    if (isGenerating) return;

    const input = document.getElementById('ai-chat-input');
    const text = overrideText || (input ? input.value.trim() : '');
    if (!text) return;

    if (input) input.value = '';

    appendUserMessage(text);
    conversationHistory.push({ role: 'user', content: text });

    isGenerating = true;
    updateSendButtonState(true);

    const typingIndicator = document.getElementById('ai-typing-indicator');
    if (typingIndicator) typingIndicator.style.display = 'flex';

    // Auto scroll chat
    const chatViewport = document.getElementById('ai-chat-messages');
    if (chatViewport) chatViewport.scrollTop = chatViewport.scrollHeight;

    try {
      const messages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...conversationHistory.slice(-8)
      ];

      let response = null;
      let usedServerless = false;

      // 1. Check if serverless /api/chat is available (e.g. Vercel deployment)
      try {
        const testRes = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(GROQ_CONFIG.apiKey ? { 'x-groq-key': GROQ_CONFIG.apiKey } : {})
          },
          body: JSON.stringify({
            messages: messages,
            model: GROQ_CONFIG.model
          })
        });

        if (testRes.ok) {
          response = testRes;
          usedServerless = true;
        }
      } catch (e) {
        // Not on serverless, fallback to direct client call
      }

      // 2. Direct client call to Groq API
      if (!usedServerless) {
        if (!GROQ_CONFIG.apiKey) {
          if (typingIndicator) typingIndicator.style.display = 'none';
          showApiKeyBanner(false);
          return;
        }

        response = await fetch(GROQ_CONFIG.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + GROQ_CONFIG.apiKey
          },
          body: JSON.stringify({
            model: GROQ_CONFIG.model,
            messages: messages,
            temperature: 0.7,
            max_tokens: 900
          })
        });
      }

      if (!response || !response.ok) {
        if (response && response.status === 401) {
          if (typingIndicator) typingIndicator.style.display = 'none';
          showApiKeyBanner(true);
          return;
        }
        throw new Error(`Groq HTTP error: ${response ? response.status : 'No response'}`);
      }

      const data = await response.json();
      const reply = data.choices && data.choices[0] && data.choices[0].message
        ? data.choices[0].message.content
        : "Arere, network slow undi bhayya. Can you ask that again?";

      conversationHistory.push({ role: 'assistant', content: reply });

      if (typingIndicator) typingIndicator.style.display = 'none';

      // Line-by-line smooth progressive reveal
      await appendAssistantMessage(reply, true);

      // Award XP for asking AI doubts
      window.IPE_STORAGE.addXP(10);
      window.IPE_APP.updateStatsUI();
      window.IPE_GAME.showXPToast(10, '🧠 AI Concept Insight!');

    } catch (err) {
      console.error('Groq AI error:', err);
      if (typingIndicator) typingIndicator.style.display = 'none';
      appendAssistantMessage(
        "Oops! Network issue ochindi bhayya. Koddiga sepu tarwatha malli try cheyyandi, or check your API key / internet connection.",
        false
      );
    } finally {
      isGenerating = false;
      updateSendButtonState(false);
    }
  }

  function showApiKeyBanner(isInvalid = false) {
    const container = document.getElementById('ai-chat-messages');
    if (!container) return;

    const existing = document.getElementById('ai-key-banner');
    if (existing) {
      document.getElementById('ai-groq-key-input')?.focus();
      return;
    }

    const banner = document.createElement('div');
    banner.className = 'ai-key-banner';
    banner.id = 'ai-key-banner';
    banner.innerHTML = `
      <div class="ai-key-title">🔑 ${isInvalid ? 'Invalid Groq API Key' : 'Groq API Key Setup'}</div>
      <div class="ai-key-desc">
        ${isInvalid
          ? 'API key authenticate avvaledu. Please enter a valid Groq API key.'
          : 'To chat with IPE GURU, enter your free Groq API key (starts with <code>gsk_...</code>):'}
      </div>
      <div class="ai-key-input-row">
        <input type="password" id="ai-groq-key-input" placeholder="gsk_..." class="ai-key-input" value="${escapeHtml(GROQ_CONFIG.apiKey || '')}" />
        <button class="ai-key-save-btn" onclick="window.IPE_AI.saveApiKeyFromInput()">Save</button>
      </div>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:4px;">
        <a href="https://console.groq.com/keys" target="_blank" class="ai-key-link">Get free key at console.groq.com ↗</a>
        ${GROQ_CONFIG.apiKey ? '<button onclick="window.IPE_AI.clearApiKey()" style="background:none; border:none; color:var(--text-muted); font-size:11px; cursor:pointer;">Clear Key</button>' : ''}
      </div>
    `;
    container.appendChild(banner);
    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    document.getElementById('ai-groq-key-input')?.focus();
  }

  function saveApiKeyFromInput() {
    const input = document.getElementById('ai-groq-key-input');
    if (!input) return;
    const key = input.value.trim();
    if (!key) {
      alert('Please enter a valid Groq API key (starts with gsk_)');
      return;
    }
    GROQ_CONFIG.apiKey = key;
    localStorage.setItem('ipe_groq_key', key);
    const banner = document.getElementById('ai-key-banner');
    if (banner) banner.remove();
    appendAssistantMessage("Awesome! Me Groq API key successfully save ayindi. Ippudu me doubts adagandi, chuddam! 🚀", false);
  }

  function clearApiKey() {
    GROQ_CONFIG.apiKey = '';
    localStorage.removeItem('ipe_groq_key');
    const banner = document.getElementById('ai-key-banner');
    if (banner) banner.remove();
    appendAssistantMessage("API key cleared. Click 🔑 Key to enter a new one whenever you're ready.", false);
  }

  function updateSendButtonState(loading) {
    const btn = document.getElementById('ai-chat-send-btn');
    if (!btn) return;
    btn.disabled = loading;
    btn.innerHTML = loading ? '<span>⏳</span>' : '<span>➔</span>';
  }

  // Smart Offline Concept Breakdown Generator for 100% Offline / No-API-Key Availability
  function generateOfflineExplanation(q) {
    const hint = q.teluguHint || q.telugu_hint || q.tenglish_hint || 'Ee concept board exam lo chaala high-yield!';
    const formulaPart = q.formula ? `\n\n### 📐 Key Formula & Terms\n$$${q.formula.replace(/^\$+|\$+$/g, '')}$$\nBoard exam lo formula raasaka prathi symbol definition and SI units thappakunda rayali.` : '';

    return `### 💡 IPE GURU Master Concept Breakdown\n` +
      `**${q.subject} • ${q.chapter}** (${q.type} - ${q.marks} Marks)\n\n` +
      `**Q: ${q.question}**\n\n` +
      `#### 1. Real-World Analogy & Tenglish Intuition\n` +
      `> 💡 **Quick Hint:** ${hint}\n\n` +
      `#### 2. Board Exam Presentation (Exact Steps for Full ${q.marks}/${q.marks} Marks)\n` +
      `${q.answer}` +
      `${formulaPart}\n\n` +
      `#### 3. 🎯 Examiner Secret & Scoring Strategy\n` +
      `• Ee question previous IPE exams lo frequent ga repeat ayina **High-Yield Question**!\n` +
      `• **Step-by-Step:** Answers ni points (1, 2, 3) ga rayandi, paragraphs la rayakandi.\n` +
      `• **Units & Formulas:** Numericals lo final answer ki proper unit pettakapothe mark cut chestharu.\n\n` +
      `*💡 Tip: Live AI tho open-ended conversations chat cheyadaniki, paina unna 🔑 Key button tap chesi free Groq API key enter cheyyandi!*`;
  }

  // Quick Action: Explain Question from Scratch
  function explainQuestion(qId) {
    const all = window.IPE_FEED.getAllLoadedQuestions ? window.IPE_FEED.getAllLoadedQuestions() : window.IPE_FEED.getQuestions();
    const q = all.find(item => item.id === qId);
    if (!q) return;

    openChat();

    if (GROQ_CONFIG.apiKey && navigator.onLine) {
      const prompt = `Sir, please explain this ${q.subject} board question from scratch in simple Tenglish: "${q.question}". Also explain the formula and step-by-step logic.`;
      sendMessage(prompt);
    } else {
      appendUserMessage(`Explain question: "${q.question}"`);
      const offlineReply = generateOfflineExplanation(q);
      conversationHistory.push({ role: 'assistant', content: offlineReply });
      const typingIndicator = document.getElementById('ai-typing-indicator');
      if (typingIndicator) typingIndicator.style.display = 'flex';
      setTimeout(async () => {
        if (typingIndicator) typingIndicator.style.display = 'none';
        await appendAssistantMessage(offlineReply, true);
        window.IPE_STORAGE.addXP(10);
        window.IPE_APP.updateStatsUI();
        window.IPE_GAME.showXPToast(10, '🧠 AI Concept Insight!');
      }, 300);
    }
  }

  // Quick Action: Explain Formula from Scratch
  function explainFormula(title, formula) {
    openChat();
    if (GROQ_CONFIG.apiKey && navigator.onLine) {
      const prompt = `Sir, please explain the formula "${title}" ($${formula}$) from scratch in Tenglish. Real world example tho start chesi, terms and IPE board exam lo ela question adugutharo cheppandi!`;
      sendMessage(prompt);
    } else {
      appendUserMessage(`Explain formula: ${title} (${formula})`);
      const offlineReply = `### 📐 Formula Breakdown: ${title}\n` +
        `**Formula:** $$${formula.replace(/^\$+|\$+$/g, '')}$$\n\n` +
        `#### 1. Concept Intuition (Tenglish)\n` +
        `> Ee formula IPE Board Exam lo direct derivation gaani, numericals lo gaani frequent ga repeat avthundi. Prathi term yokka standard SI unit gurthupettukondi.\n\n` +
        `#### 2. Board Exam Tips for Full Marks\n` +
        `• 1. State the fundamental law or definition first.\n` +
        `• 2. Write the formula clearly in the center of the answer page.\n` +
        `• 3. Mention what each symbol represents (e.g., $m$ = mass in kg, $v$ = velocity in m/s).\n` +
        `• 4. In numericals, always write final answer with proper units (Marks are deducted if units are missing)!\n\n` +
        `*💡 Tip: Live interactive doubts adagadaniki, 🔑 Key button tap chesi free Groq API key enter cheyyandi!*`;
      conversationHistory.push({ role: 'assistant', content: offlineReply });
      const typingIndicator = document.getElementById('ai-typing-indicator');
      if (typingIndicator) typingIndicator.style.display = 'flex';
      setTimeout(async () => {
        if (typingIndicator) typingIndicator.style.display = 'none';
        await appendAssistantMessage(offlineReply, true);
      }, 300);
    }
  }

  function clearChat() {
    conversationHistory = [];
    const container = document.getElementById('ai-chat-messages');
    if (container) container.innerHTML = '';
    appendAssistantMessage("Chat reset chesanu champ! Kottha doubt or concept em nerchukundham? Ask away!", false);
  }

  return {
    init: init,
    openChat: openChat,
    closeChat: closeChat,
    toggleFullscreen: toggleFullscreen,
    sendMessage: sendMessage,
    explainQuestion: explainQuestion,
    explainFormula: explainFormula,
    clearChat: clearChat,
    copyMessage: copyMessage,
    speakMessage: speakMessage,
    showApiKeyBanner: showApiKeyBanner,
    saveApiKeyFromInput: saveApiKeyFromInput,
    clearApiKey: clearApiKey
  };
})();
