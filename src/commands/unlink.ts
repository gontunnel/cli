import { SUPPORTED_TLDS } from "../config";
import DomainStore from "../core/store";

export function unlinkCommand(domainName: string) {
  DomainStore.removeDomain(domainName);
}
