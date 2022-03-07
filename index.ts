import { Welcome, MainSelector } from "./src/cli";

async function main() {
  Welcome();
  await MainSelector();
}

main();
