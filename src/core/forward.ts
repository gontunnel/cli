import http, { IncomingMessage, ServerResponse } from "http";
import https from "https";
import { createProxyMiddleware } from "http-proxy-middleware";
import DomainStore from "../utils/store";
import findDomain from "../utils/findDomain";
import generateSelfSignedWildcardCertificate from "./ssl";

const PORT1 = 80;
const PORT2 = 443;

let server: http.Server | null = null; // Store the server instance for later use
let server2: http.Server | null = null; // Store the server instance for later use

// Start the server
function startProxyServer(verbose?: boolean) {
  // Custom domains

  // Create a proxy middleware to forward requests to the Node.js server
  const proxy = createProxyMiddleware({
    target: "http://localhost:3000",
    changeOrigin: true, // Necessary for virtual hosted sites
    router: function (req: IncomingMessage) {
      const domain = findDomain(req.headers.host as string);
      // if (!domain) return undefined;
      // let url = domain.value;
      // // Check if the URL has a protocol, if not, attach "http://"
      // if (url && !url.includes("://")) {
      //   url = "http://" + url;
      // }

      // return url;
      return "http://localhost:5000";
    },
    // logLevel: verbose ? "debug" : "silent",
  });

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

  // if (!server2) {
  //   // Generate self-signed wildcard SSL certificate for *.local
  //   const { privateKey, certificate } =
  //     generateSelfSignedWildcardCertificate("local");
  //   const sslOptions = {
  //     key: privateKey,
  //     cert: certificate,
  //   };
  //   server2 = https.createServer(sslOptions, serverHandler);
  //   server2.listen(PORT2, () => {
  //     if (verbose) console.log(`Server running on http://localhost:${PORT2}`);
  //   });
  // } else {
  //   if (verbose) console.log("Server is already running.");
  // }
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
