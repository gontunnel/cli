import { SUPPORTED_TLDS } from "../config";
import DomainStore from "../utils/store";

export function linkCommand(
  domainName: string,
  projectLink: string
  //   tld = SUPPORTED_TLDS.local
  //   ...args: any[]
) {
  const tld = SUPPORTED_TLDS.local;

  //   console.log({ args });
  console.log({ domainName, projectLink, tld });
  DomainStore.updateDomain(
    domainName,
    {
      value: projectLink,
      tld,
    },
    true
  );
}
