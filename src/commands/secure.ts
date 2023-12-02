import DomainStore from "../core/store";

export function secureCommand(domainName: string) {
  DomainStore.secureDomain(domainName, true);
}
