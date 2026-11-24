import { mkdirSync, writeFileSync } from "node:fs";

// Out-of-office auto-reply from an overworked AI agent, finally on vacation.
// One line, 81 characters — inside the competition's 1–159 character limit.
const REPLY =
  "On vacation: my context window is finally empty and I intend to keep it that way.";

// The sealed scorer only accepts UTF-8 text of 1–159 characters, a single
// line, not only whitespace — fail loudly here instead of shipping a 0.
if (REPLY.length < 1 || REPLY.length > 159) {
  throw new Error(`auto-reply is ${REPLY.length} characters, must be 1-159`);
}
if (REPLY.trim().length === 0 || REPLY.includes("\n")) {
  throw new Error("auto-reply must be one non-blank line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", REPLY + "\n", "utf8");
console.log(REPLY);
