import DomainStore from "../utils/store";

export function unsecureCommand(domainName: string) {
  DomainStore.secureDomain(domainName, false);
}
