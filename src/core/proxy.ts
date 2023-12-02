import http, { IncomingMessage, ServerResponse } from "http";
import { createProxyMiddleware, RequestHandler } from "http-proxy-middleware";
import DomainStore from "./store";

const PORT1 = 80;

let server: http.Server | null = null; // Store the server instance for later use

// Extracted the proxy creation logic into a function for better readability
function createProxy(verbose?: boolean): RequestHandler {
  return createProxyMiddleware({
    target: "http://localhost:3000",
    changeOrigin: true, // Necessary for virtual hosted sites
    router: function (req: IncomingMessage) {
      const domain = DomainStore.getDomain(req.headers.host as string);
      if (!domain) return undefined;
      let url = domain.value;
      // Check if the URL has a protocol, if not, attach "http://"
      if (url && !url.includes("://")) {
        url = "http://" + url;
      }

      return url;
    },
    logLevel: verbose ? "debug" : "silent",
  });
}

// Start the server
function startProxyServer(verbose?: boolean) {
  // Create a proxy middleware to forward requests to the Node.js server
  const proxy = createProxy(verbose);

  // Create the server with a request handler
  const serverHandler = (req: any, res: any) => {
    // Use the proxy middleware for requests to '/'
    proxy(req, res, () => {
      console.log("sjsojos");
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
    });
  };

  if (!server) {
    server = http.createServer(serverHandler);
    server.listen(PORT1, () => {
      if (verbose) console.log(`Server running on http://localhost:${PORT1}`);
    });
  } else {
    if (verbose) console.log("Server is already running.");
  }
}

// Kill the server
function stopProxyServer(verbose?: boolean) {
  if (server) {
    server.close(() => {
      if (verbose) console.log("Server killed.");
      server = null;
    });
  } else {
    if (verbose) console.log("Server is not running.");
  }
}

// Restart the server
function restartProxyServer() {
  stopProxyServer();
  startProxyServer();
}

export { startProxyServer, stopProxyServer, restartProxyServer };
