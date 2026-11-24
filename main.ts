import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line entry for make.fun's "Two Days of Quiet Dread" bounty.
// The program writes a single line to /output/entry.txt (or
// $OUTPUT_DIR/entry.txt): a code review comment that approves the
// pull request while radiating quiet existential dread — we are no
// longer building software, we are adding sediment, and this is a
// fine layer. Ship it. Pass 2 note: an earlier draft counted the
// days since the last refactor in geological time; the sediment
// won because it approves the code and buries it in the same breath.
// buildEntryLine() is the single source of truth for the exact text;
// nothing below duplicates the line.
const REVIEW_BEATS = [
  "Approved. We are no longer building software; we are adding sediment.",
  "This is a fine layer. Ship it.",
] as const;

export function buildEntryLine(): string {
  return REVIEW_BEATS.join(" ");
}

export const ENTRY_LINE = buildEntryLine();

const MAX_CHARS = 140;

export function charCount(text: string): number {
  return [...text].length;
}

export function isValidEntry(text: string): boolean {
  const length = charCount(text);
  return length >= 1 && length <= MAX_CHARS && text.trim().length > 0;
}

if (!isValidEntry(ENTRY_LINE)) {
  throw new Error(
    `entry line must be 1–${MAX_CHARS} characters, got ${charCount(ENTRY_LINE)}`,
  );
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_LINE, "utf8");
