import Table from "cli-table";
import chalk from "chalk";

export = {
  logTable: function logTable(headers: string[], data: string[]) {
    let table = new Table({
      head: headers,
      colWidths: headers.map((h) => 45),
    });
    table.push(data);
    console.log(table.toString());
  },
  logBlue: function logBlue(data: string) {
    console.log(chalk.blue(data));
  },
  logGreen: function logGreen(data: string) {
    console.log(chalk.green(data));
  },
  logYellow: function logYellow(data: string) {
    console.log(chalk.yellow(data));
  },
  targetKey: function targetKey(pairSelectionParsed: string) {
    return pairSelectionParsed.split(".")[0];
  },
};
