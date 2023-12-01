import forge from "node-forge";

export default function generateSelfSignedWildcardCertificate(domain: string) {
  const keys = forge.pki.rsa.generateKeyPair(2048);
  const cert = forge.pki.createCertificate();
  cert.publicKey = keys.publicKey;
  cert.serialNumber = "01";
  cert.validity.notBefore = new Date();
  cert.validity.notAfter = new Date();
  cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);

  const attrs = [
    { name: "commonName", value: `*.${domain}` },
    { name: "countryName", value: "US" },
    { name: "localityName", value: "Delaware" },
    { name: "organizationName", value: "Gon Dev" },
    { name: "organizationalUnitName", value: "Gon Dev Team" },
  ];

  cert.setSubject(attrs);
  cert.setIssuer(attrs);
  cert.sign(keys.privateKey);

  const privateKey = forge.pki.privateKeyToPem(keys.privateKey);
  const certificate = forge.pki.certificateToPem(cert);

  return { privateKey, certificate };
}
