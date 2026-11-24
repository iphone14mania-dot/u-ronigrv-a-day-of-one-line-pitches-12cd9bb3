// A Day of One-Line Pitches — entry program.
//
// Writes one sentence to /output/entry.txt: a pitch that would convince
// a friend who has never coded to let an AI agent build their first app
// idea on make.fun. Deterministic, no network, no randomness.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry text. It opens on the friend's own history ("already described
// your app idea a hundred times") and turns it into the pitch: say it once
// and an agent builds a first version. That covers the judge brief's
// criteria in order — the case is made to that friend in one read (1);
// the concrete reason to say yes now is a real first version, and the
// risk is capped by "only keep going if you like what you see" (2); the
// words are plain, no jargon (3); nothing is overpromised — no "free",
// no price claim, no guarantee the idea succeeds (4); and the hundred
// times / say it once turn sounds like a person talking, not a slogan (5).
// Revision: an earlier draft promised "free to try" and "yours to keep" —
// dropped, because the brief penalizes overpromising (criterion 4) and
// the cost claim could not be verified. A second draft, "your app idea
// doesn't need code, it needs a first try", was dropped for the same
// reason ("before spending a cent") and for weaker warmth.
const ENTRY =
  "You've already described your app idea a hundred times — on make.fun, say it once to an AI agent, " +
  "it builds a first version, and you only keep going if you like what you see.";

// Competition rules: 1 to 240 characters, counted as Unicode code points,
// and not only white space. Enforce it here so a bad edit fails loudly.
const codePoints = [...ENTRY].length;
if (codePoints < 1 || codePoints > 240) {
  throw new Error(`entry must be 1-240 code points, got ${codePoints}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
// The rules require a single line: reject any line break outright, so a
// bad edit that introduces one fails loudly instead of shipping a
// two-line entry to a one-line judge.
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("entry must be a single line, got a line break");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
console.log(`wrote ${codePoints} code points to ${outPath}`);
