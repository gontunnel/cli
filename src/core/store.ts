import { DOMAIN_FILE_PATH } from "../config";
import { promises as fsPromises, readFileSync } from "fs";
type TDomain = {
  value: string;
  tld: string;
  secure?: boolean;
};

type JsonData = {
  [key: string]: TDomain;
};

/* The `DomainStoreUtility` class is a utility class that provides methods for managing domain data
stored in a JSON file. */
class DomainStoreUtility {
  private jsonData: JsonData;
  private filePath: string;

  private defaultDomainData = {
    tld: ".local",
    secure: false,
  };

  constructor(filePath: string) {
    this.filePath = filePath;
    this.jsonData = this.loadFromFileSync();
  }

  /**
   * The method `loadFromFileSync` reads a JSON file synchronously and returns the parsed JSON data, or
   * an empty object if there is an error.
   * @returns a JSON object of type `JsonData`.
   */
  private loadFromFileSync(): JsonData {
    try {
      const jsonString = readFileSync(this.filePath, "utf-8");
      return JSON.parse(jsonString);
    } catch (error: any) {
      return {};
    }
  }

  /**
   * The method `loadFromFile` reads a JSON file asynchronously and returns the parsed JSON data, or an
   * empty object if there is an error.
   * @returns a Promise that resolves to a JsonData object.
   */
  private async loadFromFile(): Promise<JsonData> {
    try {
      const jsonString = await fsPromises.readFile(this.filePath, "utf-8");
      return JSON.parse(jsonString);
    } catch (error: any) {
      return {};
    }
  }

  /**
   * The method saves the JSON data to a file and returns true if successful, otherwise false.
   * @returns The `saveToFile` method returns a Promise that resolves to a boolean value. It returns
   * `true` if the file was successfully saved, and `false` if there was an error while saving the file.
   */
  private async saveToFile(): Promise<boolean> {
    try {
      const jsonString = JSON.stringify(this.jsonData, null, 2);
      await fsPromises.writeFile(this.filePath, jsonString, "utf-8");
      return true;
    } catch {
      return false;
    }
  }

  /**
   * The `addDomain` function adds a new domain to a JSON file if it doesn't already exist and saves
   * the changes to the file.
   * @param {string} domain - The `domain` parameter is a string that represents the name of the domain
   * to be added. It is used as a key in the `jsonData` object.
   * @param {TDomain} newValue - The `newValue` parameter is an object of type `TDomain`. It contains
   * the following properties:
   * @returns void, which means it does not return any value.
   */
  addDomain(domain: string, newValue: TDomain): void {
    if (this.jsonData[domain]) {
      console.log(`Domain '${domain}' already exists in the file.`);
      return;
    }

    this.jsonData[domain] = {
      value: newValue?.value,
      tld: newValue?.tld ?? this.defaultDomainData.tld,
      secure: newValue?.secure ?? this.defaultDomainData.secure,
    };

    this.saveToFile();
    console.log(
      `Domain '${domain}${newValue?.tld}' linked to ${newValue?.value}.`
    );
  }

  /**
   * The function removes a domain from a JSON data object and saves the updated data to a file.
   * @param {string} domain - The `domain` parameter is a string that represents the domain you want to
   * remove from the `jsonData` object.
   * @returns The function is not returning anything. It is using console.log() to print messages to
   * the console.
   */
  removeDomain(domain: string): void {
    if (!this.jsonData[domain]) {
      console.log(`Domain '${domain}' does not exist in the file.`);
      return;
    }

    delete this.jsonData[domain];
    this.saveToFile();
    console.log(`Domain '${domain}' removed successfully.`);
  }

  /**
   * The function `updateDomain` updates the value of a domain in a JSON object and saves it to a file,
   * or adds a new domain if it doesn't exist.
   * @param {string} projectName - A string representing the name of the project.
   * @param {TDomain} newValue - The `newValue` parameter is the new value that you want to update the
   * domain with. It is of type `TDomain`, which means it can be any type that is specified when calling
   * the `updateDomain` function.
   * @param {boolean} [allowNew] - The `allowNew` parameter is an optional boolean parameter that
   * determines whether a new domain can be added if the project name does not exist in the `jsonData`
   * object. If `allowNew` is set to `true`, a new domain will be added if the project name does not
   * exist. If
   * @returns void, which means it does not return any value.
   */
  updateDomain(
    projectName: string,
    newValue: TDomain,
    allowNew?: boolean
  ): void {
    if (this.jsonData[projectName]) {
      this.jsonData[projectName] = Object.assign(
        {},
        this.jsonData[projectName],
        newValue
      );
      this.saveToFile();
      console.log(`Domain '${projectName}' updated successfully.`);
      return;
    }

    if (!allowNew) {
      console.log("Invalid project name");
      return;
    }

    this.addDomain(projectName, newValue as TDomain);
  }

  /**
   * The function `secureDomain` secures a domain by updating its secure property in a JSON data object
   * and saving it to a file.
   * @param {string} domain - The `domain` parameter is a string that represents the domain name that
   * you want to secure.
   * @param {boolean} [secure=true] - The `secure` parameter is a boolean value that determines whether
   * the domain should be secured or not. By default, it is set to `true`, meaning the domain will be
   * secured.
   */
  secureDomain(domain: string, secure: boolean = true): void {
    if (this.jsonData.hasOwnProperty(domain)) {
      if (this.jsonData[domain].secure !== secure) {
        this.jsonData[domain].secure = secure;
        this.saveToFile();
        console.log(`Domain '${domain}' secured.`);
      } else {
        console.log(`Domain '${domain}' is already secured.`);
      }
    } else {
      console.log(`No such domain: '${domain}'`);
    }
  }

  /**
   * The function "clearDomains" clears the jsonData object, logs a message if there are no domains,
   * saves the cleared data to a file, and logs a success message.
   * @returns void, which means it does not return any value.
   */
  clearDomains(): void {
    if (Object.keys(this.jsonData).length === 0) {
      console.log(`No domains yet`);
      return;
    }
    this.jsonData = {};
    console.log("Domains cleared!");
    this.saveToFile();
  }

  /**
   * The function "getDomains" returns the JSON data if it exists, otherwise it logs a message
   * indicating that there are no domains.
   * @returns the `jsonData` object.
   */
  getDomains(): JsonData {
    if (Object.keys(this.jsonData).length === 0) {
      console.log(`No domains yet`);
    }
    return this.jsonData;
  }

  /**
   * The function "getDomain" takes a query string and checks if it is a valid domain by comparing the
   * top-level domain (TLD) with the TLD stored in a JSON data object.
   * @param {string} query - The `query` parameter is a string that represents a domain name.
   * @returns either false, if the query does not have a valid domain name, or an object from the
   * jsonData that matches the query domain name and top-level domain (tld).
   */
  getDomain(query: string) {
    const domainParts = this.splitDomain(query);

    if (!domainParts) return;

    const { tld } = this.jsonData[domainParts.queryName] || {};

    if (!tld) return false;
    return tld === domainParts.queryTld
      ? this.jsonData[domainParts.queryName]
      : false;
  }

  splitDomain(query: string) {
    const lastDotIndex = query.lastIndexOf(".");
    if (lastDotIndex === -1) return false;

    const queryName = query.slice(0, lastDotIndex);
    const queryTld = query.slice(lastDotIndex);

    return {
      queryName,
      queryTld,
    };
  }
}

const DomainStore = new DomainStoreUtility(DOMAIN_FILE_PATH);

export default DomainStore;
