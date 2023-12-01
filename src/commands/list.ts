import chalk from "chalk";
import DomainStore from "../utils/store";

export function listCommand() {
  const domains = DomainStore.getDomains();

  const domainString = Object.entries(domains)
    .map(
      (domain) =>
        `${chalk.blue(domain[0])} => ${chalk.underline.blue(domain[1].value)}`
    )
    .join("\n");
  console.log("\n" + domainString);
}
