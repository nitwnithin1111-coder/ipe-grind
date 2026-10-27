# -*- coding: utf-8 -*-
import os
import re

base_dir = r"C:\Users\chary\.gemini\antigravity\scratch\ipe-grind"
html_path = os.path.join(base_dir, "index.html")

with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

scripts = re.findall(r'<script\s+src="([^"]+)"', content)
print(f"Total <script src=...> found in index.html: {len(scripts)}")

missing = []
for s in scripts:
    if s.startswith("http"):
        continue
    full_path = os.path.join(base_dir, s.replace("/", os.sep))
    if not os.path.exists(full_path):
        missing.append(s)

print(f"Missing local scripts: {len(missing)}")
if missing:
    for m in missing:
        print(f"  - {m}")
else:
    print("All local scripts referenced in index.html exist on disk!")
