import DomainStore from "../core/store";

export function unsecureCommand(domainName: string) {
  DomainStore.secureDomain(domainName, false);
}
