import os, re, glob

data_dir = r"C:\Users\chary\.gemini\antigravity\scratch\ipe-grind\data"
js_files = glob.glob(os.path.join(data_dir, "*", "*.js"))

def strip_math(text):
    text = re.sub(r'\$\$.*?\$\$', '', text, flags=re.DOTALL)
    text = re.sub(r'\$.*?\$', '', text, flags=re.DOTALL)
    return text

samples = []
for fpath in js_files:
    rel = os.path.relpath(fpath, data_dir)
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # search for items with question id if possible
    # parse questions block or regex
    q_matches = re.finditer(r'\{[^{}]*"id":\s*"([^"]+)"[^{}]*"question":\s*"((?:\\.|[^"\\])*)"[^{}]*\}', content)
    for qm in q_matches:
        qid = qm.group(1)
        qtext = qm.group(2).replace('\\n', ' ').replace('\\"', '"')
        out = strip_math(qtext)
        if re.search(r'\b\d+(?:\.\d+)?\s*[xX]\s*10\^[-+]?\d+', out) or re.search(r'\b10\^[-+]?\d+', out) or re.search(r'\b(?:cm\^3|g/cm\^3|mol\^-1|s\^-1)\b', out) or re.search(r'\b(?:N_A|K_a|K_b|lambda_0)\b', out) or '\\' in out:
            samples.append((rel, qid, "question", qtext))
            if len(samples) >= 15:
                break
    if len(samples) >= 15:
        break

for f, qid, field, text in samples:
    print(f"[{f} | {qid}]")
    print(f"  {text}\n")
