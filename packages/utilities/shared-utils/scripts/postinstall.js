const path = require('path')
const fs = require('fs')

function tryRequirePkg(pkg) {
  try {
    return require(pkg);
  } catch (e) {
    return null;
  }
}

function copyDemiDir(dir) {
  const src = path.join(__dirname, '..', 'dist', 'demi', dir)
  const dest = path.join(__dirname, '..', 'dist')

  fs.cpSync(src, dest, { recursive: true })
}

function modifyDts(path) {
  const dts = fs.readFileSync(path, 'utf8')
  const modifiedDts = dts.replace(/\.\.\/\.\.\/common/g, './common')

  fs.writeFileSync(path, modifiedDts, 'utf8')
}

function postinstall() {
  const nextjs = tryRequirePkg('next')
  const react = tryRequirePkg('react')
  const nextjsVersion = nextjs?.version?.version || ''
  const reactVersion = react?.version || ''

  if (nextjsVersion.startsWith('14') || reactVersion.startsWith('18')) {
    copyDemiDir('react18')
  } else {
    copyDemiDir('react19')
  }

  modifyDts(path.join(__dirname, '..', 'dist', 'index.d.ts'))
}

postinstall();
