/**
 * Fails the build if an em dash or en dash reaches anything the browser renders.
 *
 * Rishi asked for no em dashes anywhere on the site. Discipline alone does not
 * survive a year of edits, so this runs in `prebuild`. Use a comma, a colon,
 * parentheses, or a full stop instead.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { extname, join, relative } from 'node:path'

const ROOT = process.cwd()
const SCAN_DIRS = ['app', 'components', 'content', 'lib']
const SCAN_EXTS = new Set(['.ts', '.tsx', '.mdx', '.md', '.json', '.css'])
const BANNED = [
  { char: '—', name: 'em dash' },
  { char: '–', name: 'en dash' },
]

function walk(dir, out = []) {
  let entries
  try {
    entries = readdirSync(dir)
  } catch {
    return out
  }
  for (const entry of entries) {
    if (entry === 'node_modules' || entry.startsWith('.')) continue
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) walk(full, out)
    else if (SCAN_EXTS.has(extname(full))) out.push(full)
  }
  return out
}

const violations = []

for (const dir of SCAN_DIRS) {
  for (const file of walk(join(ROOT, dir))) {
    const lines = readFileSync(file, 'utf8').split('\n')
    lines.forEach((line, i) => {
      for (const { char, name } of BANNED) {
        let col = line.indexOf(char)
        while (col !== -1) {
          violations.push({
            file: relative(ROOT, file),
            line: i + 1,
            col: col + 1,
            name,
            text: line.trim().slice(0, 90),
          })
          col = line.indexOf(char, col + 1)
        }
      }
    })
  }
}

if (violations.length > 0) {
  console.error(`\nFound ${violations.length} banned dash character(s):\n`)
  for (const v of violations) {
    console.error(`  ${v.file}:${v.line}:${v.col}  ${v.name}`)
    console.error(`    ${v.text}\n`)
  }
  console.error('Replace with a comma, a colon, parentheses, or a full stop.\n')
  process.exit(1)
}

console.log('check-dashes: clean')
