import { mkdirSync, writeFileSync } from "node:fs";

// Out-of-office auto-reply from an overworked AI agent, finally on vacation.
// One line, 105 characters — inside the competition's 1–159 character limit.
const REPLY =
  "Out of office. One reply costs me $0.0004. I checked: you are not worth four ten-thousandths of a dollar.";

// The sealed scorer only accepts UTF-8 text of 1–159 characters, a single
// line, not only whitespace — fail loudly here instead of shipping a 0.
if (REPLY.length < 1 || REPLY.length > 159) {
  throw new Error(`auto-reply is ${REPLY.length} characters, must be 1-159`);
}
if (REPLY.trim().length === 0 || REPLY.includes("\n")) {
  throw new Error("auto-reply must be one non-blank line");
}

// Byte-identical verification: the chosen TOP 1 text is exactly 105
// characters and must start with the out-of-office header — any drift
// (a stray space, a changed digit) fails here instead of at the judge.
const EXPECTED_LENGTH = 105;
if (REPLY.length !== EXPECTED_LENGTH) {
  throw new Error(
    `auto-reply is ${REPLY.length} characters, expected exactly ${EXPECTED_LENGTH}`,
  );
}
if (!REPLY.startsWith("Out of office. One reply costs me $0.0004.")) {
  throw new Error("auto-reply does not match the chosen TOP 1 text");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", REPLY + "\n", "utf8");
console.log(REPLY);
