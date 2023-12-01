import path from "path";

export const DOMAIN_FILE_PATH = path.join(__dirname + "/domains.json");
export const GSUDO_PATH = path.join(__dirname, "../bin/gsudo/gsudo.exe");

export enum SUPPORTED_TLDS {
  local = ".local",
}
