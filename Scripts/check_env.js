// Check for missing env vars
const required = ["DB_URL", "API_KEY"];
let missing = required.filter(k => !process.env[k]);
if (missing.length) {
  console.error("❌ Missing env vars:", missing.join(", "));
  process.exit(1);
} else {
  console.log("✅ Env vars OK");
}