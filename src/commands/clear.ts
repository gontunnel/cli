import DomainStore from "../utils/store";

export function clearCommand() {
  DomainStore.clearDomains();
}
