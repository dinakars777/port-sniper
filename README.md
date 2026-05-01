# port-sniper 🎯

[![npm version](https://img.shields.io/npm/v/@dinakars777/port-sniper.svg?style=flat-square)](https://www.npmjs.com/package/@dinakars777/port-sniper)
[![npm downloads](https://img.shields.io/npm/dm/@dinakars777/port-sniper.svg?style=flat-square)](https://www.npmjs.com/package/@dinakars777/port-sniper)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

> A blazing fast, beautiful CLI tool to instantly identify and kill processes hoarding your local development ports.

Getting `EADDRINUSE: address already in use :::3000` multiple times a day? You usually have to Google `lsof -i :3000`, copy the PID, and type `kill -9 <PID>`. **port-sniper** automates this into a single, satisfying command.

## Features

- ✨ Zero config — just `snipe <port>`
- 🎨 Clean UI via `@clack/prompts`
- ⚡ Fast — uses native `lsof` and `kill -9`
- 🛡️ Safety prompt before killing

## Quick Start

```bash
npx @dinakars777/port-sniper 3000
```

Or install globally for the short `snipe` alias:

```bash
npm install -g @dinakars777/port-sniper
snipe 3000
snipe 8080
```

## How It Works

1. Searches for processes bound to the provided port
2. If the port is free, exits cleanly
3. Displays the `Command`, `PID`, and `User` owning the process
4. Prompts `Kill this process? [y/N]` before doing anything
5. Executes a forceful termination and frees your port

## Tech Stack

| Package | Purpose |
|---|---|
| `@clack/prompts` | Beautiful interactive CLI UI |
| `execa` | Native process execution |
| TypeScript | Type-safe implementation |

## Contributing

```bash
git clone https://github.com/dinakars777/port-sniper.git
cd port-sniper
npm install
npm run dev
```

## License

MIT
