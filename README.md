# GON (Name subject to name)

> A devtool that allows you to use domains on your local machine and proxy them to a server

## Introduction

Tired of using localhost:3000? localhost:8000? Tired of tweaking your hosts file or dealing with complex configurations? GON simplifies the process, making it easy to work with custom domains, whether for web development, testing, or collaboration.

## What is Gon (Name subject to name)?

GON, short for "Global On-demand Network," (actually, it is just a play on the name of one of my favourite anime characters, Gon Freecs) is a powerful devtool designed to streamline your local development environment by effortlessly linking custom domains to your local projects and seamlessly proxying them to a remote server.

```sh
    gon link wip 3000
    # -> wip.local now points to localhost:3000
    # Then run gon start
    gon start
```

## Key Features

- Simplified Domain Linking: Use intuitive commands to link custom domains to local ports effortlessly.
- Dynamic Subdomain Tunneling: Connect your local projects to live subdomains on our website for seamless sharing and collaboration.

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

| Command                                 | Description                                            | Status |
| --------------------------------------- | ------------------------------------------------------ | ------ |
| `gon`                                   | (Defaults to `gon setup`)                              | 🏗️     |
| `gon help`                              | View Gon's help content                                | ✅     |
| `gon help [command]`                    | View Gon's help content for a single command           | 🏗️     |
| `gon init`                              | Create a new Gon config in the current directory       | ❌     |
| └ `gon init --yes`                      | Skip the prompts and use defaults                      | ❌     |
| `gon setup`                             | Install and configure everything needed to use gon cli | 🏗️     |
| `gon link [project-name] [port]`        | Link a port to a domain                                | ✅     |
| `gon link-dir [project-name] [port]`    | Link a directory to a domain                           | ❌     |
| `gon unlink [project-name]`             | Remove a domain                                        | ✅     |
| `gon secure [project-name]`             | Serve a domain with HTTPS                              | ❌     |
| `gon unsecure [project-name]`           | Serve a domain with HTTP                               | ❌     |
| `gon clear`                             | Removes all links                                      | ✅     |
| `gon list`                              | Lists all the links                                    | ✅     |
| `gon links`                             | Lists all the links                                    | ❌     |
| └ `gon links add [project-name] [port]` | Link a port to a domain                                | ❌     |
| └ `gon links remove [project-name]`     | Remove a domain                                        | ❌     |
| `gon start`                             | Run DNS resolver and reverse proxy server              | ✅     |
| `gon tunnel [port]`                     | Connect a port to a live subdomain on our website      | 🏗️     |
| `gon share [port]`                      | Connect a port to a live subdomain on our website      | 🏗️     |

## Gon Desktop

### Roadmap

- [x] .local and http forwarding
- [ ] https forwarding
- [ ] web app and live subdomains
- [ ] debugging and inspect tools
- [ ] Setup local dashboard
- [ ] Add other TLDs besides .local
- [ ] Serve directories
- [ ] Desktop app
- [ ] Development templates

### TODO

- [ ] Add loading spinners and progress bars
- [ ] Box link list
- [ ] Use conf for configs

### Notes

- So it seems the right approach is not editing the hosts file. Need to create a DNS server.
- Acrylic DNS for windows, DNSMasq for \*unix
- Nginx server
- winsw for managing windows services or node-windows npm
