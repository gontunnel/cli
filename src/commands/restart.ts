import { restartProxyServer } from "../core/proxy";
import { restartMDNS } from "../core/mdns";

export function restartCommand() {
  restartMDNS();
  restartProxyServer();
}
