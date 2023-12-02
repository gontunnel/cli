import mdns from "multicast-dns";
import os from "os";
import DomainStore from "./store";

const ip: string = getIp();

let mdnsInstance: mdns.MulticastDNS | null = null;

export function startMDNS(verbose?: boolean) {
  mdnsInstance = mdns();

  mdnsInstance.on("query", function (query, rinfo) {
    query.questions.forEach(function (q) {
      if (verbose)
        console.log("We have %s -> %s at %s", q.name, ip, rinfo.port);
      const domain = DomainStore.getDomain(q.name);

      if (!!domain) {
        if (verbose)
          console.log(
            "Responding %s -> %s at %s %s",
            q.name,
            ip,
            rinfo.port,
            q.type + q.class
          );
        // if (!mdnsInstance) return;
        // @ts-ignore
        mdnsInstance.respond(
          {
            answers: [
              {
                type: "A",
                name: q.name,
                data: ip,
                class: q.class,
              },
            ],
          },
          { port: rinfo.port }
        );
      }
    });
  });
}

export function restartMDNS() {
  stopMDNS();
  startMDNS();
}

export function stopMDNS(verbose?: boolean) {
  if (mdnsInstance) {
    mdnsInstance.destroy();
    mdnsInstance = null;
    if (verbose) console.log("mDNS service stopped.");
  } else {
    if (verbose) console.log("mDNS service is not running.");
  }
}

function getIp(): string {
  const networks = os.networkInterfaces();
  let found: string = "127.0.0.1";

  Object.keys(networks).forEach(function (k) {
    const n = networks[k];
    if (!n) return;
    n.forEach(function (addr: any) {
      if (addr.family === "IPv4" && !addr.internal) {
        found = addr.address;
      }
    });
  });

  return found;
}
