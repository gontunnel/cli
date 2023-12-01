import chalk from "chalk";

export const help = () => `
  ${chalk.bold("Your CLI Tool")} [options] <command> [args]

  ${chalk.dim("Commands:")}

    ${chalk.dim("Basic Commands:")}

      start               Start the server
      restart             Restart the server
      stop                Stop the server
      link <domain> <baseUrl>  Create a link between a domain and a base URL
      list                List all existing links
      unlink <domain>     Remove the link between a domain and a base URL

  ${chalk.dim("Options:")}

    -h, --help           Display help information
    -v, --version        Display the version number

  ${chalk.dim("Examples:")}

    ${chalk.cyan("Start the server:")}
    $ your-cli-tool start

    ${chalk.cyan("Create a link between a domain and a base URL:")}
    $ your-cli-tool link example.com http://localhost:3000

    ${chalk.cyan("List all existing links:")}
    $ your-cli-tool list

    ${chalk.cyan("Remove the link for a specific domain:")}
    $ your-cli-tool unlink example.com
`;

// Usage:
// console.log(help());
