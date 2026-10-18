// Runs bot-vs-bot games using the rules engine inside index.html.
// Usage: node scripts/simulate.js [games]
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const engineSrc = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const mod = { exports: {} };
new Function('module', engineSrc)(mod);
const { simulate } = mod.exports;

const n = Number(process.argv[2]) || 4000;
const pct = (v) => ((v / n) * 100).toFixed(0).padStart(3) + '%';
console.log(`${n} games per setting\n`);
for (const mode of ['classic', 'battle'])
  for (const layout of ['hunter', 'race'])
    for (const sameDice of [false, true]) {
      const a = simulate({ mode, layout, finish: 'over', sameDice, bots: [true, true] }, n);
      console.log(
        `${mode.padEnd(8)}${layout.padEnd(8)}${(sameDice ? 'same dice' : 'own dice').padEnd(11)}` +
        `first ${pct(a.firstW)}  second ${pct(a.secondW)}  draw ${pct(a.draws)}  ` +
        `home/player ${(a.home / n / 2).toFixed(2)}  games with a kill ${pct(a.killGames)}`
      );
    }
