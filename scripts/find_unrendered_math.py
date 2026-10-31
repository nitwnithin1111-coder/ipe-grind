import os
import re
import glob
import json

def strip_math_blocks(text):
    # Replace display math $$...$$ and inline math $...$ with empty strings
    text = re.sub(r'\$\$.*?\$\$', '', text, flags=re.DOTALL)
    text = re.sub(r'\$.*?\$', '', text, flags=re.DOTALL)
    return text

def scan_files():
    data_dir = r"C:\Users\chary\.gemini\antigravity\scratch\ipe-grind\data"
    js_files = glob.glob(os.path.join(data_dir, "*", "*.js"))
    
    findings = []
    
    # Patterns indicating unrendered math/units outside math blocks:
    patterns = [
        (r'\b\d+(?:\.\d+)?\s*[xX]\s*10\^[-+]?\d+', 'Scientific notation x 10^n outside math'),
        (r'\b10\^[-+]?\d+', 'Power 10^n outside math'),
        (r'[a-zA-Z0-9]\^[-+]?\d+', 'Exponent ^ outside math'),
        (r'\b(?:N_A|K_a|K_b|K_w|K_c|K_p|E_a|P_1|P_2|V_1|V_2|T_1|T_2|R_1|R_2|C_1|C_2|I_1|I_2|lambda_0|mu_0|epsilon_0)\b', 'Subscript variable outside math'),
        (r'\\(?:frac|times|pm|circ|mu|alpha|beta|gamma|lambda|Delta|delta|theta|omega|pi|approx|le|ge|cdot|sqrt|to|rightarrow|right|left)\b', 'Raw LaTeX command outside math'),
        (r'\b(?:cm\^3|g/cm\^3|g\s*cm\^-3|mol\^-1|s\^-1|m\^2|m\^3|kg\s*m\^-3|J\s*K\^-1|cal\s*g\^-1)\b', 'Unit with power outside math'),
        (r'([A-Za-z0-9]+)\s*_\s*([A-Za-z0-9]+)', 'Subscript _ outside math')
    ]
    
    for fpath in js_files:
        relpath = os.path.relpath(fpath, data_dir)
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Extract question, answer, formula, hint strings
        # Simple regex to find "question": "...", "answer": "...", etc.
        matches = re.finditer(r'"(question|answer|formula|tenglish_hint|telugu_hint)":\s*"((?:\\.|[^"\\])*)"', content)
        for m in matches:
            key = m.group(1)
            raw_val = m.group(2)
            # unescape common escaped chars
            val = raw_val.replace('\\n', '\n').replace('\\"', '"').replace('\\\\', '\\')
            
            outside_math = strip_math_blocks(val)
            for pat, desc in patterns:
                m_pat = re.findall(pat, outside_math)
                if m_pat:
                    findings.append({
                        'file': relpath,
                        'key': key,
                        'desc': desc,
                        'matches': m_pat[:3],
                        'snippet': outside_math[:120].strip()
                    })
                    break

    print(f"Total unrendered math occurrences found: {len(findings)}")
    # Group by file
    by_file = {}
    for item in findings:
        f = item['file']
        by_file[f] = by_file.get(f, 0) + 1
    
    for f, count in sorted(by_file.items(), key=lambda x: -x[1]):
        print(f"  {f}: {count} occurrences")

if __name__ == '__main__':
    scan_files()
