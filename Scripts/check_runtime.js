// Check Node.js version
const semver = require("semver");
const required = ">=18.0.0";
if (!semver.satisfies(process.version, required)) {
  console.error(`❌ Node.js version ${process.version} does not satisfy ${required}`);
  process.exit(1);
} else {
  console.log(`✅ Node.js version ${process.version} OK`);
}