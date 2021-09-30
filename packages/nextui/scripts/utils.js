const { green, cyan, red } = require('chalk');
const execa = require('execa');

const step = (name, fn) => async () => {
  console.log(cyan('Building: ') + green(name));
  await fn();
  console.log(cyan('Built: ') + green(name));
};

const shell = (cmd) =>
  execa(cmd, { stdio: ['pipe', 'pipe', 'inherit'], shell: true });

const error = (err) => {
  if (err && Array.isArray(err))
    console.log(red(err.map((e) => e.message).join('\n')));
  if (err && typeof err === 'object')
    console.error(red(err.stack || err.toString()));
  process.exit(1);
};

module.exports = { step, shell, error };
