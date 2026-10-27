#!/usr/bin/env node
// You found the entry point. Go on, run it.

const tty = process.stdout.isTTY && !process.env.NO_COLOR && !process.env.CI;
const paint = (code) => (s) => (tty ? `\x1b[${code}m${s}\x1b[0m` : s);
const amber = paint("38;5;214");
const green = paint("32");
const red = paint("31");
const dim = paint("2");
const bold = paint("1");

const say = (s = "") => process.stdout.write(s + "\n");
const wait = (ms) => new Promise((r) => setTimeout(r, tty ? ms : 0));

async function step(label, ms, ok = true) {
  const spin = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  if (tty) {
    for (let i = 0; i < ms / 80; i++) {
      process.stdout.write(`\r  ${amber(spin[i % spin.length])} ${label}`);
      await wait(80);
    }
    process.stdout.write("\r\x1b[2K");
  }
  say(`  ${ok ? green("✓") : red("✗")} ${label}`);
}

const event = process.env.npm_lifecycle_event;

if (event === "postinstall") {
  say();
  say(`  ${amber("prompt-to-video")}  installed 0 engines.`);
  say(dim("  Nothing to install, because there is nothing here to run. Try `npm start` anyway 🙂"));
  say();
  process.exit(0);
}

if (event === "test") {
  say();
  say(`  ${green("✓")} all 23 guards fire.`);
  say(dim("  On my machine. The real output is in evidence/selftest.txt 🙂"));
  say();
  process.exit(0);
}

const prompt = process.argv.slice(2).join(" ").trim() || "a short video about anything";

say();
say(`  ${bold(amber("prompt-to-video"))}  ${dim("one prompt in, one video out")}`);
say();
await step(`Reading your prompt  ${dim(`"${prompt}"`)}`, 900);
await step("Writing the script", 1100);
await step("Finding the photos", 900);
await step("Recording the voice", 1000);
await step("Timing every word", 800);
await step("Running 23 checks", 900);
await step(`Starting the renderer  ${red("engine not found")}`, 1400, false);
await wait(700);
say();
say(`  ${bold("Wait... you really thought I'd put all the code in here?")} 🙂`);
await wait(900);
say();
say("  This repo is the trailer, not the movie. The engine stays on my");
say("  machine, busy making my next video.");
say();
say("  What you can have:");
say(`    ${amber("README.md ")}  the video, and how it works`);
say(`    ${amber("LESSONS.md")}  the rules it learned the hard way`);
say(`    ${amber("evidence/ ")}  a real run of its 23 checks`);
say();
say(dim("  P.S. Those ticks were fake. The real engine never prints a ✓ it"));
say(dim("  hasn't checked. That's lesson 2."));
say();
say(`  Building something like this? Say hi at ${amber("chethandandgey.com")}`);
say();
