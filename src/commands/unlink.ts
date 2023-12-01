import { SUPPORTED_TLDS } from "../config";
import DomainStore from "../utils/store";

export function unlinkCommand(domainName: string) {
  DomainStore.removeDomain(domainName);
}
