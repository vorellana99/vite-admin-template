const fs = require('fs');
const path = require('path');

const reportPath = process.argv[2] || path.join(__dirname, '../localhost_2026-02-13_19-15-38.report.html');
const html = fs.readFileSync(reportPath, 'utf8');
const start = html.indexOf('window.__LIGHTHOUSE_JSON__ = ') + 'window.__LIGHTHOUSE_JSON__ = '.length;
let depth = 0;
let end = start;
let inString = false;
let escape = false;
let stringChar = '';
for (let i = start; i < html.length; i++) {
  const c = html[i];
  if (escape) { escape = false; continue; }
  if (inString) {
    if (c === '\\') escape = true;
    else if (c === stringChar) inString = false;
    continue;
  }
  if (c === '"' || c === "'") { inString = true; stringChar = c; continue; }
  if (c === '{') depth++;
  else if (c === '}') { depth--; if (depth === 0) { end = i + 1; break; } }
}
const jsonStr = html.slice(start, end);
const data = JSON.parse(jsonStr);
const cats = data.categories || {};
const audits = data.audits || {};

console.log('=== PUNTUACIONES POR CATEGORÍA ===');
Object.entries(cats).forEach(([id, c]) => {
  const score = c.score != null ? Math.round(c.score * 100) : 'N/A';
  const icon = typeof score === 'number' ? (score >= 90 ? '✓' : score >= 50 ? '~' : '✗') : '';
  console.log(id + ': ' + score + ' ' + icon);
});

console.log('\n=== AUDITORÍAS CON SCORE < 90 (mejorable) ===');
Object.entries(audits).forEach(([id, a]) => {
  if (a.score != null && a.score >= 0 && a.score < 0.9) {
    console.log('  ' + id + ' (' + Math.round(a.score * 100) + '): ' + (a.title || id));
  }
});

console.log('\n=== AUDITORÍAS FALLIDAS (score null o 0) ===');
Object.entries(audits).forEach(([id, a]) => {
  if (a.score === null || a.score === 0) {
    console.log('  ' + id + ': ' + (a.title || id));
  }
});
