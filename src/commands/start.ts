import { startProxyServer } from "../core/proxy";
import { startMDNS } from "../core/mdns";
import { Listr, ListrLogLevels, ListrLogger, delay } from "listr2";

interface StartCommandArgs {
  /* some variables for internal use */
  verbose?: boolean;
  proxy?: boolean;
  instant?: [string, string];
}

const tasks = new Listr<StartCommandArgs>(
  [
    {
      title: "Starting DNS Server",
      // task: async (ctx, task): Promise<string> => ctx.input = await task.prompt(ListrInquirerPromptAdapter).run(input, { message: 'Please give me some input' })
      task: async (ctx, task): Promise<void> => {
        startMDNS(ctx.verbose);
        task.title = "DNS Server Ready";
      },
    },
    {
      title: "Starting Proxy Server.",
      task: async (ctx, task): Promise<void> => {
        // await delay(1000);
        if (!ctx.proxy) {
          task.skip("Proxy disabled");
          return;
        }
        let instantConfig = undefined;
        if (ctx?.instant) {
          instantConfig = {
            name: ctx?.instant[0],
            port: ctx?.instant[1],
          };
        }
        startProxyServer(ctx.verbose, instantConfig);
        task.title = "Proxy Server Ready";
      },
    },
  ],
  {
    concurrent: true,
    exitOnError: true,
    collectErrors: "full",
    rendererOptions: { collapseSubtasks: false },
  }
);
export async function startCommand(args: StartCommandArgs) {
  try {
    await tasks.run(args);
  } catch (e) {
    console.error(e);
  }
}
