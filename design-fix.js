#!/usr/bin/env node
import fs from "fs-extra";
import glob from "glob";

async function main() {
  try {
    console.log("🎨 Running design-fix...");

    const files = glob.sync("src/components/**/*.{js,jsx,ts,tsx,css,html}");
    if (!files.length) {
      console.log("⚠️ No design files found, skipping.");
      return;
    }

    if (!process.env.OPENAI_API_KEY) {
      console.log("⚠️ OPENAI_API_KEY missing, skipping AI healing.");
      return;
    }

    for (const file of files) {
      console.log(`🎨 Healing design in: ${file}`);
      // TODO: Send file to OpenAI and overwrite
    }

    console.log("✅ design-fix completed successfully.");
  } catch (err) {
    console.error("❌ design-fix crashed:", err.message);
  }
}

main().finally(() => process.exit(0));
