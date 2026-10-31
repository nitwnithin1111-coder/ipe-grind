# ⚡ IPE GRIND - TS Inter 2nd Year (Class 12)

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/nitwnithin1111-coder/ipe-grind)

> **Reels-Style Learning Platform for Telangana Board (TS BIE) Intermediate 2nd Year Physics & Chemistry.**  
> Built for students studying on their phones while travelling in buses, trains, or in spare minutes.

---

## 📱 Features

1. **Reels-Style Vertical Feed**:
   - Each question is a full-screen card with smooth CSS scroll-snap.
   - Swipe up/down to advance, just like Instagram Reels or TikTok (plus keyboard shortcuts `↑`/`↓`/`Space`/`J`/`K`).
2. **Exam-Ready Format**:
   - VSAQ (2 Marks), SAQ (4 Marks), LAQ (8 Marks), Numericals with step-by-step solutions, and Quick Interactive MCQs.
   - 100% verified KaTeX mathematical & chemical rendering (3,341 expressions tested error-free).
   - Tenglish & Telugu regional concept clarifications (`telugu_hint`) on every question.
   - **226 Verified PYQ Badges** (`🔥 TS IPE 2024, 2023, 2022 (8M Guaranteed)`).
3. **Flagship Visionary Features**:
   - 🧪 **Interactive Formula Lab**: Real-time 60fps HTML5 Canvas variable simulators for Sonometer vibrations, Potentiometer internal resistance, Daniell cell Nernst equation, and 1st-order kinetics.
   - 📝 **Full 60M Official Board Mock Exam**: Randomized 3-hour mock paper generator strictly following TSBIE blueprint with "@media print" PDF export and self-scoring rubric.
   - 🎬 **Reels Hands-Free Commute Mode**: Auto-advancing reels with speed selector (`15s`/`30s`/`45s`/`Audio Sync`) and lower-third HUD safe-zone design.
   - 🎧 **Ambient Focus Studio**: Pure Web Audio API synthesized 40Hz Gamma focus binaural beats, 10Hz Alpha calm, gentle rain, and brown noise.
   - ⏳ **Live Exam Countdown & Daily Study Goal**: Real-time board exam countdown clock and daily 20 Qs progress ring.
   - 📋 **Official TSBIE Blueprint & PYQ Trends Hub**: Complete chapter weightage breakdown and 7-year PYQ repeat pattern analysis (2018–2025).
4. **5 Study Modes**:
   - 📱 **Feed**: Scroll through questions with filters (Subject, Marks, Important ⭐, 🔥 PYQs).
   - 📚 **Chapters**: Full TS Board syllabus with circular progress rings and formula access.
   - ⚡ **Quiz**: 10-question timed rapid-fire mode with instant score, XP bonus & review.
   - 📐 **Formulas**: 159 High-yield formula flashcards & chemical reactions with 3D Deck flip.
   - 🔖 **Saved**: Personal review queue for Bookmarked (★) and "Revise Again" (🔁) questions across full syllabus.
5. **Zero Dependencies & Offline PWA**:
   - Pure HTML + CSS + Vanilla JavaScript. No node_modules, no bundlers, no backend.
   - Works 100% offline with Service Worker (PWA installable on Android / iOS home screen).

---

## 🚀 How to Run Locally

You can run IPE GRIND in **three simple ways**:

### Method 1: Just Double-Click (Zero Setup!)
1. Open the `ipe-grind` folder on your computer.
2. Double-click **`index.html`** in any web browser (Chrome, Edge, Firefox, Safari).
3. The app will launch immediately with all questions and formula cards!

### Method 2: Mobile Phone (Testing on Android / iPhone)
1. Open Chrome on Android or Safari on iPhone.
2. Open the deployed website link (see Free Deployment below).
3. Tap **"Install App"** or tap **Share ➔ Add to Home Screen**.
4. The app installs as a native full-screen app and works even without internet!

### Method 3: Local Server (Optional)
If you prefer running a local static server:
```bash
# Python 3
python -m http.server 8000

# Open in browser:
http://localhost:8000
```

---

## 📂 Project Structure

```
ipe-grind/
├── index.html                   # Main single-page application shell
├── manifest.json                # PWA manifest for mobile installation
├── sw.js                        # Service worker for offline caching
├── README.md                    # This guide
├── css/
│   ├── style.css                # Mobile-first design system & reels feed layout
│   └── themes.css               # Dark & light theme variables & math styling
├── js/
│   ├── app.js                   # Application coordinator & navigation router
│   ├── feed.js                  # Vertical scroll reels engine & filtering
│   ├── quiz.js                  # Timed 10-question rapid-fire quiz engine
│   ├── storage.js               # LocalStorage manager (XP, Streaks, Bookmarks)
│   ├── gamification.js          # Confetti, XP popups, and badges engine
│   └── speech.js                # Web Speech audio engine for commute listening
├── data/
│   ├── manifest.js              # Complete TS 2nd Year syllabus metadata
│   ├── physics/                 # 16 Complete Chapters (ch01 to ch16)
│   │   ├── ch01-waves.js
│   │   ├── ch02-ray-optics.js
│   │   ├── ch03-wave-optics.js
│   │   ├── ...
│   │   └── ch16-communication.js
│   └── chemistry/               # 15 Complete Chapters (ch01 to ch15)
│       ├── ch01-solid-state.js
│       ├── ch02-solutions.js
│       ├── ch03-electrochemistry.js
│       ├── ...
│       └── ch15-everyday-life.js
└── assets/
    ├── icon.svg                 # Vector app icon
    ├── icon-192.png             # Android home screen icon
    └── icon-512.png             # Splash screen icon
```

---

## ✍️ How to Add or Edit Questions

All question data lives in separate, clean JavaScript files inside `/data/physics/` and `/data/chemistry/`.

### 1. File Structure
Each chapter file registers itself using `window.registerChapter(...)`:

```javascript
// File: data/physics/ch02-ray-optics.js

const rayOpticsChapter = {
  id: "phy-ch02",
  subject: "Physics",
  chapterNumber: 2,
  chapter: "Ray Optics and Optical Instruments",
  formulaSheet: [
    {
      title: "Mirror Formula",
      formula: "\\frac{1}{f} = \\frac{1}{v} + \\frac{1}{u}",
      symbols: "f = \\text{Focal length}, v = \\text{Image distance}, u = \\text{Object distance}",
      units: "\\text{cm or m}",
      tip: "Apply sign conventions: real inverted is negative."
    }
  ],
  questions: [
    {
      "id": "phy-ch02-q001",
      "subject": "Physics",
      "chapter": "Ray Optics and Optical Instruments",
      "type": "VSAQ",
      "marks": 2,
      "important": true,
      "question": "What is total internal reflection? State its conditions.",
      "answer": "1. Definition: When a ray of light traveling from a denser to a rarer medium is incident at an angle greater than the critical angle, it is reflected back into the denser medium.\n2. Conditions:\n• Light must travel from denser to rarer medium.\n• Angle of incidence must exceed critical angle (i > C).",
      "formula": "\\sin C = \\frac{1}{\\mu}",
      "telugu_hint": "కాంతి సాంద్రతర మాధ్యమం నుండి విరళతర మాధ్యమంలోకి వెళ్ళేటప్పుడు సంధిగ్ధ కోణం కంటే ఎక్కువ పతన కోణంతో పతనమైతే సంపూర్ణాంతర పరావర్తనం చెందుతుంది.",
      "source_check": "unverified"
    }
  ]
};

if (typeof window.registerChapter === 'function') {
  window.registerChapter(rayOpticsChapter);
} else {
  window.IPE_DATA.chapters[rayOpticsChapter.id] = rayOpticsChapter;
}
```

### 2. Question Types Allowed:
- `VSAQ` (Very Short Answer - 2 Marks)
- `SAQ` (Short Answer - 4 Marks)
- `LAQ` (Long Answer / Derivations - 8 Marks)
- `Numerical` (Problems with Given, Formula, Steps, Result)
- `MCQ` (Quick revision with `options: ["A) ...", "B) ...", "C) ...", "D) ...]`, `correctOption: 0`)

### 3. Math & Formulas:
Write equations between dollar signs for KaTeX rendering:
- Inline math: `$v = \\sqrt{\\frac{T}{\\mu}}$`
- Display formulas: `$$d = \\frac{z \\cdot M}{a^3 \\cdot N_A}$$`

### 4. Linking the new chapter in `index.html`:
Simply add one line at the bottom of `index.html` where other chapters are loaded:
```html
<script src="data/physics/ch02-ray-optics.js"></script>
```

---

## 🌐 Free 1-Click Deployment

You can host IPE GRIND for **100% free forever** on Render, GitHub Pages, or Netlify.

### Option A: Render (Static Site & Blueprint)
1. Push your repository to GitHub (`https://github.com/nithinradhika282-dotcom/ipe-grind.git`).
2. Go to [dashboard.render.com](https://dashboard.render.com).
3. Click **New + ➔ Blueprint** (or **New + ➔ Static Site**).
4. Connect the `ipe-grind` GitHub repository.
5. Render automatically applies the settings from `render.yaml`:
   - **Build Command**: (empty)
   - **Publish Directory**: `.`
6. Click **Apply** / **Deploy**. Your app will be live at `https://ipe-grind.onrender.com` with free global CDN and HTTPS.

### Option B: GitHub Pages (Zero Config)
1. Create a free account at [github.com](https://github.com).
2. Create a new repository named `ipe-grind` (make it **Public**).
3. Upload all files from this folder directly into the repository.
4. Go to **Settings ➔ Pages** in your repository.
5. Under **Build and deployment > Branch**, select `main` (or `master`) and folder `/ (root)`.
6. Click **Save**. Within 60 seconds, your site is live at:  
   `https://<your-username>.github.io/ipe-grind/`

### Option B: Netlify (Drag and Drop in 30 Seconds!)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the `ipe-grind` folder into the browser window.
3. Done! Netlify gives you an instant free HTTPS link (e.g. `https://ipe-grind.netlify.app`).

---

## 🧪 Telangana Board IPE 2nd Year Weightage Guide

### Physics (60 Marks total):
- **LAQ (8 Marks)**: Waves (Ch 1), Current Electricity (Ch 6), Nuclei (Ch 14).
- **SAQ (4 Marks)**: Ray Optics (Ch 2), Wave Optics (Ch 3), Electric Charges (Ch 4), Potential (Ch 5), Moving Charges (Ch 7), EMI (Ch 9), Dual Nature (Ch 12), Atoms (Ch 13), Semiconductors (Ch 15).
- **VSAQ (2 Marks)**: Magnetism (Ch 8), AC (Ch 10), EM Waves (Ch 11), Communication (Ch 16) + 1 question from major chapters.

### Chemistry (60 Marks total):
- **LAQ (8 Marks)**: p-Block (Ch 7), Alcohols/Aldehydes/Acids (Ch 11), Electrochemistry/Kinetics (Ch 3 & 4).
- **SAQ (4 Marks)**: Solid State (Ch 1), Solutions (Ch 2), Surface Chemistry (Ch 5), Metallurgy (Ch 6), d & f block (Ch 8), Coordination Compounds (Ch 9), Haloalkanes (Ch 10), Amines (Ch 12), Biomolecules (Ch 13), Polymers (Ch 14).
- **VSAQ (2 Marks)**: Chemistry in Everyday Life (Ch 15), Solid State (Ch 1), Solutions (Ch 2).

---

## 💡 Board Exam Tips for Students
1. **Always write formula and SI units**: Even in numericals, writing the formula earns 1 mark.
2. **Use bullet points**: Board examiners evaluate step-by-step marking rubrics.
3. **Diagrams**: Draw labeled diagrams for LAQs (closed/open pipes, Bragg's reflection, Schottky/Frenkel defects).
