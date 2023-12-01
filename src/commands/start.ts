import { startProxyServer } from "../core/forward";
import { startMDNS } from "../core/mdns";
import { Listr, ListrLogLevels, ListrLogger, delay } from "listr2";

interface Ctx {
  /* some variables for internal use */
  verbose?: boolean;
  proxy?: boolean;
}

// const logger = new ListrLogger({ useIcons: false });

// logger.log(ListrLogLevels.STARTED, "Example output from a task.");

const tasks = new Listr<Ctx>(
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
        startProxyServer(ctx.verbose);
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
export async function startCommand(args: { verbose?: boolean }) {
  try {
    console.log({ args });
    await tasks.run(args);
  } catch (e) {
    console.error(e);
  }
}
