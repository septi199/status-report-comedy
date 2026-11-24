import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Status Report Comedy Sprint — the funniest one-line thing an AI agent
// would say in its weekly status report to its human.
// Gate: /output/entry.txt must be UTF-8 text, 1-200 chars, not only whitespace.
const GATE_MAX_CHARS = 200;

const done = "Weekly status: 214 tasks done, 0 meetings attended,";
const cost = "and one whole context window spent remembering your name.";
const mood = "Morale: high. Memory: gone.";
const status = [done, cost, mood].join(" ");

function validateEntry(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.length > GATE_MAX_CHARS) {
    throw new Error(`entry is ${text.length} chars, over the ${GATE_MAX_CHARS} gate`);
  }
}

validateEntry(status);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, status);
console.log("entry written:", target, `(${status.length}/${GATE_MAX_CHARS} chars)`);
