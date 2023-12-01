import { exec, ExecException, execSync } from "child_process";
import path from "path";
import { GSUDO_PATH } from "../config";

export function run(
  command: string,
  callback: (
    error: ExecException | null,
    stdout: string,
    stderr: string
  ) => void
): void {
  exec(command, callback);
}

export function runSync(command: string) {
  return execSync(command);
}

export function runOrExit(
  command: string,
  errorCallback: (code: number | undefined, output: string) => void
): void {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      errorCallback(error.code, stderr);
    }
  });
}

export function powershell(
  command: string,
  callback: (
    error: ExecException | null,
    stdout: string,
    stderr: string
  ) => void = () => {}
) {
  const result = runSync(`powershell -Command ${command}`);
  if (result) {
    return true;
  } else {
    return false;
  }
}

export function runSudo(
  command: string,
  callback: (
    error: ExecException | null,
    stdout: string,
    stderr: string
  ) => void = () => {}
): void {
  run(`${GSUDO_PATH} ${command}`, callback);
}
