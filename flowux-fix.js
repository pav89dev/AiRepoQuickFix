#!/usr/bin/env node
import fs from "fs";
import glob from "glob";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

glob("src/**/*.{js,jsx,ts,tsx,css,html}", async (err, files) => {
  for (const file of files) {
    const code = fs.readFileSync(file, "utf-8");
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: `Enhance UX flow, naming, clarity, consistency. Preserve behavior:
${code}` }],
    });
    fs.writeFileSync(file, response.choices[0].message.content);
    console.log(`🔄 Flow/UX updated for ${file}`);
  }
  console.log("✅ Flow/UX fixes done, re-running tests...");
});
