// IPE TS 2nd Year Physics - Chapter 16: Communication Systems
// Fully compliant with IPE Telangana Board format and syllabus requirements

window.IPE_DATA = window.IPE_DATA || {};
window.IPE_DATA.chapters = window.IPE_DATA.chapters || {};

window.IPE_DATA.chapters["phy-ch16"] = {
  "id": "phy-ch16",
  "subject": "Physics",
  "chapterNumber": 16,
  "chapter": "Communication Systems",
  "formulaSheet": [
    {
      "title": "Modulation Index in AM",
      "formula": "\\mu = \\frac{A_m}{A_c} = \\frac{A_{max} - A_{min}}{A_{max} + A_{min}}",
      "symbols": "$A_m = \\text{Modulating signal amplitude}$, $A_c = \\text{Carrier amplitude}$",
      "units": "$\\text{Dimensionless (}\\le 1\\text{ to avoid distortion)}$",
      "tip": "Modulated wave bandwidth $\\text{BW} = 2 f_m$."
    },
    {
      "title": "Range of Line-of-Sight TV Antenna",
      "formula": "d = \\sqrt{2 R h_t} + \\sqrt{2 R h_r}",
      "symbols": "$R = 6400 \\text{ km} = \\text{Earth radius}$, $h_t = \\text{Transmitter height}$, $h_r = \\text{Receiver height}$",
      "units": "$\\text{m or km}$",
      "tip": "Area covered $= \\pi d^2 = 2\\pi R h_t$."
    },
    {
      "title": "Critical Frequency & Maximum Usable Frequency (MUF)",
      "formula": "f_c = 9\\sqrt{N_{max}}, \\quad MUF = f_c \\sec i = \\frac{f_c}{\\cos i}",
      "symbols": "$N_{max} = \\text{Maximum electron density of ionosphere layer (m}^{-3}\\text{)}$, $i = \\text{Angle of incidence}$",
      "units": "$\\text{Hz or MHz}$",
      "tip": "Waves with frequency higher than $MUF$ penetrate right through the ionosphere and escape into outer space."
    },
    {
      "title": "Amplitude Modulation Index",
      "formula": "\\mu = \\frac{A_m}{A_c} = \\frac{A_{max} - A_{min}}{A_{max} + A_{min}}",
      "symbols": "$A_m = \\text{Modulating message signal amplitude}$, $A_c = \\text{Carrier wave amplitude}$",
      "units": "$\\text{Dimensionless (} \\le 1 \\text{)}$",
      "tip": "To avoid signal distortion during envelope detection, modulation index must satisfy $\\mu \\le 1$ ($100\\%$)."
    }
  ],
  "questions": [
    {
      "id": "phy-ch16-q001",
      "subject": "Physics",
      "chapter": "Communication Systems",
      "type": "VSAQ",
      "marks": 2,
      "important": true,
      "pyq": "TS IPE 2024, 2023, 2021",
      "question": "What is modulation? Why is modulation necessary for transmitting audio signals?",
      "answer": "1. Modulation: The process of superimposing low-frequency audio information signals onto high-frequency carrier waves.\n2. Necessity:\n• To reduce antenna length ($L = \\lambda / 4$; audio signals require towers hundreds of kilometers tall).\n• To prevent mixing of signals from different stations.\n• To increase effective radiated power ($P \\propto (l/\\lambda)^2$).",
      "formula": "\\lambda = \\frac{c}{\\nu}, \\quad L = \\frac{\\lambda}{4}",
      "telugu_hint": "thakkuva frequency gl smaachaar smketaalnu ekkuva frequency gl vaahk wavepai adhyaaropnm cheydaanni maadyuleshn antaru.",
      "source_check": "verified",
      "tenglish_hint": "thakkuva frequency gl smaachaar smketaalnu ekkuva frequency gl vaahk wavepai adhyaaropnm cheydaanni maadyuleshn antaru."
    },
    {
      "id": "phy-ch16-q002",
      "subject": "Physics",
      "chapter": "Communication Systems",
      "type": "VSAQ",
      "marks": 2,
      "important": true,
      "pyq": "TS IPE High-Yield ⭐",
      "question": "Mention the basic blocks of a generalized communication system.",
      "answer": "1. Information Source & Input Transducer\n2. Transmitter\n3. Communication Channel (Transmission medium)\n4. Noise Source (external disturbance)\n5. Receiver & Output Transducer",
      "formula": "\\text{Source} \\to \\text{Transmitter} \\to \\text{Channel} \\to \\text{Receiver}",
      "telugu_hint": "smaachaar vyvsth bhaagaalu: smaachaar jnkm, traans meetr, prsaar maadhymm (chhaanl), riseevr.",
      "source_check": "verified",
      "tenglish_hint": "smaachaar vyvsth bhaagaalu: smaachaar jnkm, traans meetr, prsaar maadhymm (chhaanl), riseevr."
    },
    {
      "id": "phy-ch16-q003",
      "subject": "Physics",
      "chapter": "Communication Systems",
      "type": "Numerical",
      "marks": 2,
      "important": true,
      "pyq": "TS IPE High-Yield ⭐",
      "question": "A TV transmitting antenna has a height of $80\\text{ m}$. What is the maximum distance up to which TV transmission can be received? ($R = 6.4 \\times 10^6 \\text{ m}$)",
      "answer": "• Given: $h = 80 \\text{ m}, R = 6.4 \\times 10^6 \\text{ m}$.\n• Formula: $d = \\sqrt{2 R h}$\n• Calculation:\n$d = \\sqrt{2 \\times 6.4 \\times 10^6 \\times 80} = \\sqrt{1024 \\times 10^6} = 32 \\times 10^3 \\text{ m} = 32 \\text{ km}$.\n• Result: Maximum distance = $32 \\text{ km}$.",
      "formula": "d = \\sqrt{2 R h} = 32 \\text{ km}",
      "telugu_hint": "$d = \\sqrt{2 \\times 6.4 \\times 10^6 \\times 80} = 32\\text{ km}$.",
      "source_check": "verified",
      "tenglish_hint": "$d = \\sqrt{2 \\times 6.4 \\times 10^6 \\times 80} = 32\\text{ km}$."
    },
    {
      "id": "phy-ch16-q004",
      "subject": "Physics",
      "chapter": "Communication Systems",
      "type": "MCQ",
      "marks": 1,
      "important": false,
      "question": "Sky wave propagation is based on reflection of radio waves from which layer of atmosphere?",
      "options": [
        "A) Troposphere",
        "B) Stratosphere",
        "C) Ionosphere",
        "D) Mesosphere"
      ],
      "correctOption": 2,
      "answer": "Correct Answer: C) Ionosphere.\n• Sky waves ($3\\text{ MHz}$ to $30\\text{ MHz}$) undergo total internal reflection from the ionospheric plasma layers.",
      "formula": "\\text{Sky waves reflect from Ionosphere}",
      "telugu_hint": "skai waves ayaanospiyr dvaaraa reflection chemdutaayi.",
      "source_check": "verified",
      "tenglish_hint": "skai waves ayaanospiyr dvaaraa reflection chemdutaayi."
    }
  ]
};
