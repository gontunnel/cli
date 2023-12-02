#! /usr/bin/env node
import { Option, program } from "commander";
import {
  clearCommand,
  linkCommand,
  listCommand,
  restartCommand,
  startCommand,
  stopCommand,
  unlinkCommand,
} from "./commands";
import { SUPPORTED_TLDS } from "./config";

program
  .version("1.0.0")
  .description("CLI tool for managing the server and custom domains.");

program.command("dev").description("Start the server.").action(startCommand);
program
  .command("live")
  .description("Forward the server to our live domain.")
  .action(startCommand);
program
  .command("share")
  .description("Forward the server to our live domain.")
  .action(startCommand);

program
  .command("start")
  .description("Start the server.")
  .option("-v, --verbose", "Allow logging to terminal")
  .option("--no-proxy", "Disable proxy server")
  .action(startCommand);
program.command("stop").description("Stop the server.").action(stopCommand);
program
  .command("restart")
  .description("Restart the server.")
  .action(restartCommand);

// program
// .command("park")
// .description("Put the current directory on the server")
// .action((domainName, baseUrl) => {
//   updateHostsFile(domainName, baseUrl, "add");
//   // restartCommand();
// });

// program
// .command("unpark")
// .description("Put the current directory on the server")
// .action((domainName, baseUrl) => {
//   updateHostsFile(domainName, baseUrl, "add");
//   // restartCommand();
// });

program
  .command("link <domainName> <port>")
  .description("Create a link between a domain and a base URL.")
  .addOption(
    new Option("--tld <tld>", 'The TLD to use. Default is ".local"').choices(
      Object.keys(SUPPORTED_TLDS)
    )
  )
  .addOption(
    new Option("--host <baseUrl>", "A host to use instead of localhost")
  )
  .action(linkCommand);
// .action((domainName, baseUrl) => {
//   const commandToRun = `ts-node hosts ${domainName} add ${baseUrl}`; // Replace with your actual list command
//   const fullCommand = `${gsudoCommand} ${commandToRun}`;
//   execSync(fullCommand, { stdio: "inherit" });
// });

program
  .command("unlink <domainName>")
  .description("Remove a link between a domain and a base URL.")
  .action(unlinkCommand);
// .action((domainName) => {
// const commandToRun = `ts-node hosts ${domainName} remove`; // Replace with your actual list command
// const fullCommand = `${gsudoCommand} ${commandToRun}`;
// execSync(fullCommand, { stdio: "inherit" });
// });

program
  .command("clear")
  .description("Clear domain resolutions.")
  .action(clearCommand);

program
  .command("secure")
  .description("Make a project have https support.")
  .action(listCommand);

program
  .command("unsecure")
  .description("Revert project back to http.")
  .action(listCommand);

program
  .command("trust")
  .description("List all existing links.")
  .action(listCommand);

program
  .command("links")
  .description("List all existing links.")
  .action(listCommand);

program
  .command("list")
  .description("List all existing links.")
  .action(listCommand);

program
  .command("setup")
  .description("To start and install everything needed")
  .action(listCommand);

program.parse(process.argv);
