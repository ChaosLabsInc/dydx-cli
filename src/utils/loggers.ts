import Table from "cli-table";
import chalk from "chalk";

export function logTable(headers: string[], data: string[]) {
  let table = new Table({
    head: headers,
    colWidths: headers.map((h) => 45),
  });
  table.push(data);
  console.log(table.toString());
}

export function logBlue(data: string) {
  console.log(chalk.blue(data));
}

export function logGreen(data: string) {
  console.log(chalk.green(data));
}

export function logYellow(data: string) {
  console.log(chalk.yellow(data));
}

export function targetKey(pairSelectionParsed: string) {
  return pairSelectionParsed.split(".")[0];
}
