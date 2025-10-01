#!/usr/bin/env node
import fs from "fs-extra";
import { execSync } from "child_process";

async function main() {
  try {
    console.log("🔧 Running error-fix...");

    let output;
    try {
      output = execSync("npm test", { encoding: "utf-8" });
    } catch (err) {
      output = (err.stdout || "") + "\n" + (err.stderr || "");
    }

    if (!output.trim()) {
      console.log("⚠️ No test output, skipping healing.");
      return;
    }

    if (!process.env.OPENAI_API_KEY) {
      console.log("⚠️ OPENAI_API_KEY missing, skipping AI healing.");
      return;
    }

    // TODO: Add OpenAI call here to patch snippet

    console.log("✅ error-fix completed successfully.");
  } catch (err) {
    console.error("❌ error-fix crashed:", err.message);
  }
}

main().finally(() => process.exit(0));
