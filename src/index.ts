#!/usr/bin/env node

import { Command } from 'commander';
import pc from 'picocolors';
import { findProcessesOnPort, killProcess } from './core';
import { showIntro, showSuccess, showError, promptToKillProcess } from './ui';

const program = new Command();

program
    .name('port-sniper')
    .description('🎯 A blazing fast, beautiful CLI tool to kill processes hoarding your local ports.')
    .version('1.0.0')
    .argument('<port>', 'The port number to inspect and clear (e.g., 3000)');

program.parse(process.argv);

async function main() {
    const port = program.args[0];

    if (!port || isNaN(Number(port))) {
        console.error(pc.red('✖ Error: Please provide a valid port number.'));
        console.log(pc.dim('Example: npx @dinakars777/port-sniper 3000'));
        process.exit(1);
    }

    showIntro();

    const processes = findProcessesOnPort(port);

    if (processes.length === 0) {
        showSuccess(`Port ${port} is completely free. No sniper needed! ✨`);
        process.exit(0);
    }

    let killedCount = 0;

    for (const p of processes) {
        const shouldKill = await promptToKillProcess(p);
        if (shouldKill) {
            const success = killProcess(p.pid);
            if (success) {
                console.log(pc.green(`✔ Process ${p.pid} (${p.command}) terminated.`));
                killedCount++;
            } else {
                console.error(pc.red(`✖ Failed to kill process ${p.pid}. You might need sudo privileges.`));
            }
        } else {
            console.log(pc.dim(`Skipping process ${p.pid}.`));
        }
    }

    if (killedCount > 0) {
        showSuccess(`Successfully cleared Port ${port}. You're ready to code! 🚀`);
    } else {
        showSuccess(`Finished. Port ${port} was left as is.`);
    }
}

main().catch((err) => {
    console.error(pc.red('An unexpected error occurred:'), err);
    process.exit(1);
});
