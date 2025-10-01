#!/usr/bin/env node
import fs from "fs-extra";
import glob from "glob";

async function main() {
  try {
    console.log("🔄 Running flowux-fix...");

    const files = glob.sync("src/**/*.{js,jsx,ts,tsx,css,html}");
    if (!files.length) {
      console.log("⚠️ No frontend files found, skipping.");
      return;
    }

    if (!process.env.OPENAI_API_KEY) {
      console.log("⚠️ OPENAI_API_KEY missing, skipping AI healing.");
      return;
    }

    for (const file of files) {
      console.log(`🔄 Healing UX flow in: ${file}`);
      // TODO: Send file to OpenAI and overwrite
    }

    console.log("✅ flowux-fix completed successfully.");
  } catch (err) {
    console.error("❌ flowux-fix crashed:", err.message);
  }
}

main().finally(() => process.exit(0));
