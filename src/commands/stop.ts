import { stopProxyServer } from "../core/proxy";
import { stopMDNS } from "../core/mdns";

export function stopCommand() {
  stopMDNS();
  stopProxyServer();
}
