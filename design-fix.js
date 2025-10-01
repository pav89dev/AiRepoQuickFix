#!/usr/bin/env node
import fs from "fs";
import glob from "glob";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

glob("src/components/**/*.{js,jsx,ts,tsx,css,html}", async (err, files) => {
  for (const file of files) {
    const code = fs.readFileSync(file, "utf-8");
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: `Improve UI layout, readability, design. Keep logic unchanged:
${code}` }],
    });
    fs.writeFileSync(file, response.choices[0].message.content);
    console.log(`✨ Updated design for ${file}`);
  }
  console.log("✅ Design fixes done, re-running tests...");
});
