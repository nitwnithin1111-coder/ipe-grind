// Web Speech Synthesizer for Bus & Train Audio Study
window.IPE_SPEECH = (function() {
  let isSpeaking = false;
  let activeCardId = null;

  function cleanMathForSpeech(text) {
    if (!text) return '';
    return text
      .replace(/\\\w+/g, ' ') // Strip LaTeX commands
      .replace(/[\$\{\}\^_\\]/g, ' ') // Strip math brackets
      .replace(/\s+/g, ' ')
      .trim();
  }

  return {
    isSupported: function() {
      return 'speechSynthesis' in window;
    },

    toggleSpeak: function(cardId, questionText, answerText, onStateChange) {
      if (!this.isSupported()) {
        alert('Audio speech is not supported in this browser.');
        return;
      }

      if (isSpeaking && activeCardId === cardId) {
        window.speechSynthesis.cancel();
        isSpeaking = false;
        activeCardId = null;
        if (onStateChange) onStateChange(false);
        return;
      }

      window.speechSynthesis.cancel(); // Stop any ongoing speech

      const fullScript = `Question: ${cleanMathForSpeech(questionText)}. Answer: ${cleanMathForSpeech(answerText)}`;
      const utterance = new SpeechSynthesisUtterance(fullScript);
      utterance.rate = 0.95; // Clear pace for study
      utterance.pitch = 1.0;
      utterance.lang = 'en-IN'; // Indian English accent preferred for TS Board

      utterance.onstart = () => {
        isSpeaking = true;
        activeCardId = cardId;
        if (onStateChange) onStateChange(true);
      };

      utterance.onend = () => {
        isSpeaking = false;
        activeCardId = null;
        if (onStateChange) onStateChange(false);
      };

      utterance.onerror = () => {
        isSpeaking = false;
        activeCardId = null;
        if (onStateChange) onStateChange(false);
      };

      window.speechSynthesis.speak(utterance);
    },

    speakRawText: function(text, onStateChange) {
      if (!this.isSupported()) {
        alert('Audio speech is not supported in this browser.');
        return;
      }
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        isSpeaking = false;
        if (onStateChange) onStateChange(false);
        return;
      }
      const clean = cleanMathForSpeech(text);
      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.lang = 'en-IN';
      utterance.onstart = () => { isSpeaking = true; if (onStateChange) onStateChange(true); };
      utterance.onend = () => { isSpeaking = false; if (onStateChange) onStateChange(false); };
      utterance.onerror = () => { isSpeaking = false; if (onStateChange) onStateChange(false); };
      window.speechSynthesis.speak(utterance);
    },

    stop: function() {
      if (this.isSupported()) {
        window.speechSynthesis.cancel();
      }
      isSpeaking = false;
      activeCardId = null;
    }
  };
})();
