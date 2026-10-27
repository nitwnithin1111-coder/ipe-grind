# -*- coding: utf-8 -*-
import json
import os

OUTPUT_DIR = r"C:\Users\chary\.gemini\antigravity\scratch\ipe-grind\data\physics"

def save_chapter(ch_data, filename, var_name):
    path = os.path.join(OUTPUT_DIR, filename)
    json_str = json.dumps(ch_data, indent=2, ensure_ascii=False)
    content = f"""// IPE TS 2nd Year Physics - Chapter {ch_data['chapterNumber']}: {ch_data['chapter']}
// Fully compliant with IPE Telangana Board format and syllabus requirements

window.IPE_DATA = window.IPE_DATA || {};
window.IPE_DATA.chapters = window.IPE_DATA.chapters || {};

const {var_name} = {json_str};

if (typeof window.registerChapter === 'function') {{
  window.registerChapter({var_name});
}} else {{
  window.IPE_DATA.chapters[{var_name}.id] = {var_name};
}}
"""
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Saved {filename} with {len(ch_data['questions'])} questions and {len(ch_data['formulaSheet'])} formulas.")

# Chapters 3 to 9 definition
print("Writing generator for Physics Chapters 3 to 9...")
