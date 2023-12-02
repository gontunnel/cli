# GON (Name subject to name)

> A devtool that allows you to use domains on your local machine and proxy them to a server

## Introduction

Add an introduction here

Add a diagram here

More description of pain points

## What is Gon (Name subject to name)?

Add a description of the package here

```sh
    gon link wip 3000
    -> wip.local now points to localhost:3000
```

## Gon CLI

### Installation

First be sure that you have [Node/npm](https://nodejs.org/) and
[Yarn](https://yarnpkg.com/docs/install/) installed. Then run the following
command:

```sh
# YARN
yarn global add gon

# NPM
npm i -g gon
```

### Gon CLI Commands

> **Note:** Gon CLI is under active development and some of these commands have
> not yet been implemented.

| Command                                 | Description                                       | Status |
| --------------------------------------- | ------------------------------------------------- | ------ |
| `gon`                                   | (Defaults to `gon install`)                       | ✅     |
| `gon help`                              | View Gon's help content                           | ✅     |
| `gon help [command]`                    | View Gon's help content for a single command      | ❌     |
| `gon init`                              | Create a new Gon config in the current directory  | ❌     |
| └ `gon init --yes`                      | Skip the prompts and use defaults                 | ❌     |
| `gon install`                           | Install all the dependencies for a project        | ❌     |
| `gon link [project-name] [port]`        | Link a port to a domain                           | ✅     |
| `gon unlink [project-name]`             | Remove a domain                                   | ✅     |
| `gon clear`                             | Removes all links                                 | ✅     |
| `gon links`                             | Lists all the links                               | ❌     |
| └ `gon links add [project-name] [port]` | Link a port to a domain                           | ❌     |
| └ `gon links remove [project-name]`     | Remove a domain                                   | ❌     |
| `gon start`                             | Run DNS resolver and reverse proxy server         | ✅     |
| `gon tunnel [port]`                     | Connect a port to a live subdomain on our website | 🖌      |

### Configuration

Gon config is in the root `gon.json`.

For examples, for declaring workspaces in sub-directories:

```json
{
  "star": {
    "value": "localhost:3000"
  }
}
```

## Gon Desktop

### Roadmap

- [*] .local and http forwarding
- [] https forwarding
- [] web app and live subdomains
- [] debugging and inspect tools
- [] Setup local dashboard
- [] Add other TLDs besides .local
- [] Park directories
- [] desktop app
- [] development templates

### TODO

- [] Add loading spinners and progress bars
- [] Box link list
- [] Use conf for configs
- []

### Notes

- So it seems the right approach is not editing the hosts file. Need to create a DNS server.
- Acrylic DNS for windows, DNSMasq for \*unix
- Nginx server
- winsw for managing windows services or node-windows npm

> Please note that this project is released with a [Contributor Code of Conduct](code-of-conduct.md). By participating in this project you agree to its terms.
