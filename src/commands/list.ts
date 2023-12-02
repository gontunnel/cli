import chalk from "chalk";
import DomainStore from "../core/store";
import { simpleLog } from "../utils/log";

export function listCommand() {
  const domains = Object.entries(DomainStore.getDomains());
  if (domains.length === 0) return;
  simpleLog(
    `\n${domains
      .map(
        ([name, { value }]) =>
          `${chalk.blue(name)} => ${chalk.underline.blue(value)}`
      )
      .join("\n")}`
  );
}
