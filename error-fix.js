#!/usr/bin/env node
import { execSync } from "child_process";
import fs from "fs";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function runTests() {
  try {
    execSync("npm test", { stdio: "pipe" });
    console.log("✅ Tests passed!");
    return true;
  } catch (err) {
    const output = err.stdout.toString() + err.stderr.toString();
    console.log("❌ Test failed, analyzing...");
    return output;
  }
}

async function main() {
  let retries = 3;
  while (retries--) {
    const result = await runTests();
    if (result === true) return;
    const snippet = result.slice(0, 1000);
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: `Fix this code:
${snippet}` }],
    });
    console.log("AI Suggestion:", response.choices[0].message.content);
    // In real system, we’d patch file here
  }
  console.log("⚠️ Could not auto-fix after retries.");
}

main();
