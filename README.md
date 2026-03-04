# port-sniper 🎯

> A blazing fast, beautiful CLI tool to instantly identify and kill processes hoarding your local development ports.

![port-sniper screenshot](./screenshot.png) *(Imagine a beautiful clack-based terminal here)*

## The Problem
Getting the dreaded `EADDRINUSE: address already in use :::3000` error happens multiple times a day. You usually have to Google `lsof -i :3000`, copy the PID, and type `kill -9 <PID>`.

**port-sniper** automates this away into a single visually satisfying command.

## Features
- ✨ **Zero configuration required.** Just type `snipe <port>`.
- 🎨 **Beautiful UI.** Powered by `@clack/prompts`.
- ⚡ **Lightning Fast.** Uses native `lsof` and `kill -9` commands under the hood. No heavy libraries.
- 🛡️ **Interactive Safety.** Prompts you before killing anything to ensure you don't accidentally terminate the wrong service.

## Usage

Simply run this command:

```bash
npx @dinakars777/port-sniper 3000
```

For the best experience, install it globally so you can use the short `snipe` alias!
```bash
npm install -g @dinakars777/port-sniper

# Now you can just use:
snipe 3000
snipe 8080
```

## How It Works

1. It searches for processes bound to the provided port number.
2. If the port is free, it tells you and exits.
3. If it finds a process, it displays the `Command`, `PID`, and `User` owning the process.
4. It asks you to confirm `Kill this process? [y/N]`.
5. If confirmed, it executes a forceful termination and frees up your port!

## Contributing

Pull requests are welcome!

```bash
git clone https://github.com/dinakars777/port-sniper.git
cd port-sniper
npm install
npm run dev
```

## License

MIT
