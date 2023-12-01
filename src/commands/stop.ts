import { stopProxyServer } from "../core/forward";
import { stopMDNS } from "../core/mdns";

export function stopCommand() {
  stopMDNS();
  stopProxyServer();
}
