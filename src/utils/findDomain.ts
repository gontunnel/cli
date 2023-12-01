import DomainStore from "./store";

export default function findDomain(query: string) {
  const domains = DomainStore.getDomains();
  const queryName = query.slice(0, query.lastIndexOf("."));
  const queryTld = query.slice(query.lastIndexOf("."));
  console.log({
    queryName,
    queryTld,
  });
  const domain = domains[queryName];
  if (!domain) return false;
  if (domain.tld === queryTld) return domain;
  return false;
}
