import * as fs from "fs";
import { powershell, run, runOrExit } from "../cli.adapter";
import { ACRYLIC_CONFIG_PATH } from "../../config";

export default class Acrylic {
  constructor() {}

  install(tld: string = "test"): void {
    this.createHostsFile(tld);
    this.installService();
  }

  private createHostsFile(tld: string): void {
    const contents = fs.readFileSync(ACRYLIC_CONFIG_PATH, "utf8");

    const replacedContents = contents.replace(
      /GON_TLD|GON_HOME_PATH/g,
      (match) => (match === "GON_TLD" ? tld : "")
    );

    const filePath = this.path("AcrylicHosts.txt");
    fs.writeFileSync(filePath, replacedContents);

    if (!fs.existsSync(ACRYLIC_CONFIG_PATH)) {
      fs.writeFileSync(ACRYLIC_CONFIG_PATH, "\n");
    }
  }

  private installService(): void {
    this.uninstall();
    this.configureNetworkDNS();

    runOrExit(
      `cmd /C "${this.path("AcrylicUI.exe")}" InstallAcrylicService`,
      (code, output) => {
        console.error(`Failed to install Acrylic DNS: ${output}`);
      }
    );

    this.flushdns();
  }

  private configureNetworkDNS(): void {
    const array = [
      '(Get-NetIPAddress -AddressFamily IPv4).InterfaceIndex | ForEach-Object {Set-DnsClientServerAddress -InterfaceIndex $_ -ServerAddresses ("127.0.0.1", "8.8.8.8")}',
      '(Get-NetIPAddress -AddressFamily IPv6).InterfaceIndex | ForEach-Object {Set-DnsClientServerAddress -InterfaceIndex $_ -ServerAddresses ("::1", "2001:4860:4860::8888")}',
    ];

    powershell(array.join(";"));
  }

  updateTld(tld: string): void {
    this.stop();
    this.createHostsFile(tld);
    this.restart();
  }

  uninstall(): void {
    if (!this.installed()) {
      return;
    }

    this.stop();

    run(
      `cmd /C "${this.path("AcrylicUI.exe")}" UninstallAcrylicService`,
      (code, output) => {
        console.warn(`Failed to uninstall Acrylic DNS: ${output}`);
      }
    );

    this.removeNetworkDNS();
    this.flushdns();
  }

  private installed(): boolean {
    return powershell('Get-Service -Name "AcrylicDNSProxySvc"');
  }

  private removeNetworkDNS(): void {
    const array = [
      "(Get-NetIPAddress -AddressFamily IPv4).InterfaceIndex | ForEach-Object {Set-DnsClientServerAddress -InterfaceIndex $_ -ResetServerAddresses}",
      "(Get-NetIPAddress -AddressFamily IPv6).InterfaceIndex | ForEach-Object {Set-DnsClientServerAddress -InterfaceIndex $_ -ResetServerAddresses}",
    ];

    powershell(array.join(";"));
  }

  start(): void {
    runOrExit(
      `cmd /C "${this.path("AcrylicUI.exe")}" StartAcrylicService`,
      (code, output) => {
        console.error(`Failed to start Acrylic DNS: ${output}`);
      }
    );

    this.flushdns();
  }

  stop(): void {
    run(
      `cmd /C "${this.path("AcrylicUI.exe")}" StopAcrylicService`,
      (code, output) => {
        console.warn(`Failed to stop Acrylic DNS: ${output}`);
      }
    );

    this.flushdns();
  }

  restart(): void {
    run(
      `cmd /C "${this.path("AcrylicUI.exe")}" RestartAcrylicService`,
      (code, output) => {
        console.warn(`Failed to restart Acrylic DNS: ${output}`);
      }
    );

    this.flushdns();
  }

  flushdns(): void {
    run('cmd "/C ipconfig /flushdns"', () => {});
  }

  private path(path: string = ""): string {
    const basePath = __dirname.replace(/\\/g, "/") + "/Acrylic";
    return basePath + (path ? `/${path}` : path);
  }
}
