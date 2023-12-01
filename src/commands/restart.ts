import { restartProxyServer } from "../core/forward";
import { restartMDNS } from "../core/mdns";

export function restartCommand() {
  restartMDNS();
  restartProxyServer();
}
