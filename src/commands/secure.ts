import DomainStore from "../utils/store";

export function secureCommand(domainName: string) {
  DomainStore.secureDomain(domainName, true);
}
