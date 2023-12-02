import { SUPPORTED_TLDS } from "../config";
import DomainStore from "../core/store";

export function linkCommand(
  domainName: string,
  port: string,
  //   tld = SUPPORTED_TLDS.local
  //   ...args: any[]
  options?: {
    tld: SUPPORTED_TLDS;
    host: string;
  }
) {
  const tld = SUPPORTED_TLDS.local;
  const defaultHost = "localhost";
  DomainStore.updateDomain(
    domainName,
    {
      value: `${options?.host ?? defaultHost}:${port}`,
      tld,
    },
    true
  );
}
