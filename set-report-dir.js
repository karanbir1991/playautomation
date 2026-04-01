// set-report-dir.js
const fs = require('fs');
const path = require('path');

const projectName = 'PlaywrightAutomation';
const timestamp = new Date()
  .toISOString()
  .replace(/[:.]/g, '-');

const baseDir = path.join(__dirname, 'playwright-reports');
if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir);
}

const reportDir = path.join(baseDir, `${projectName}-${timestamp}`);
fs.mkdirSync(reportDir);

// 🔑 VERY IMPORTANT: expose to parent process
process.env.PW_HTML_REPORT_DIR = reportDir;

// keep only last 10 reports
const dirs = fs.readdirSync(baseDir)
  .map(name => ({
    name,
    time: fs.statSync(path.join(baseDir, name)).birthtimeMs
  }))
  .sort((a, b) => b.time - a.time);

dirs.slice(10).forEach(d =>
  fs.rmSync(path.join(baseDir, d.name), { recursive: true, force: true })
);

// output for debugging
console.log(reportDir);
