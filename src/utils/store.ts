import { readFileSync, writeFile } from "fs";
import { DOMAIN_FILE_PATH } from "../config";

type TDomain = {
  value: string;
  tld: string;
  secure?: boolean;
};
type Domar<T> = T extends false | undefined ? Partial<TDomain> : TDomain;
const a: Domar<false> = {};
type JsonData = {
  [key: string]: TDomain;
};

class DomainStoreUtility {
  private jsonData: JsonData;
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
    this.jsonData = this.loadFromFile();
  }

  // Function to load JSON data from a file
  private loadFromFile(): JsonData {
    try {
      const jsonString = readFileSync(this.filePath, "utf-8");
      return JSON.parse(jsonString);
    } catch (error: any) {
      console.log(`Error loading JSON data from file: ${error.message}`);
      return {};
    }
  }
  // Function to add a new value
  addDomain<X extends true>(domain: string, newValue: Domar<X>): void {
    if (this.jsonData[domain]) {
      console.log(`Domain '${domain}' already exists in the file.`);
      return;
    }

    this.jsonData[domain] = {
      value: newValue.value,
      tld: newValue.tld,
      secure: newValue?.secure ?? false,
    };
    this.saveToFile();
    console.log(`Domain '${domain}' added successfully.`);
  }

  // Function to remove the value
  removeDomain(domain: string): void {
    if (!this.jsonData[domain]) {
      console.log(`Domain '${domain}' does not exist in the file.`);
      return;
    }

    delete this.jsonData[domain];
    this.saveToFile();
    console.log(`Domain '${domain}' removed successfully.`);
  }

  // Function to update the value
  updateDomain<X extends true | false>(
    domain: string,
    newValue: Domar<X>,
    addIfNotExist?: X
  ): void {
    if (this.jsonData[domain]) {
      this.jsonData[domain] = {
        ...this.jsonData[domain],
        ...newValue,
      };
      this.saveToFile();
      console.log(`Domain '${domain}' updated successfully.`);
      return;
    }

    if (!addIfNotExist) {
      console.log("Invalid JSON structure");
      return;
    }
    this.addDomain(domain, newValue as TDomain);
  }

  private isAddIfNotExistTrue(arg: true | false): arg is true {
    return arg === true;
  }

  secureDomain(domain: string, secure?: boolean): void {
    if (this.jsonData[domain]) {
      this.jsonData[domain].secure = secure ?? true;
      this.saveToFile();
      console.log(`Domain '${domain}' secured.`);
    } else {
      console.log("No such domain");
    }
  }

  // Function to update the value
  clearDomains(): void {
    if (Object.keys(this.jsonData).length === 0) {
      console.log(`No domains yet`);
      return;
    }
    this.jsonData = {};
    console.log("Domains cleared!");
    this.saveToFile();
  }

  // Function to get the current JSON data
  getDomains(): JsonData {
    if (Object.keys(this.jsonData).length === 0) {
      console.log(`No domains yet`);
      return {};
    }
    return this.jsonData;
  }

  // Function to save JSON data to a file
  private saveToFile(): void {
    const jsonString = JSON.stringify(this.jsonData, null, 2);
    writeFile(
      this.filePath,
      jsonString,
      {
        encoding: "utf-8",
      },
      () => {}
    );
  }
}

const DomainStore = new DomainStoreUtility(DOMAIN_FILE_PATH);

export default DomainStore;
