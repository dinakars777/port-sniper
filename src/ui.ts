import { intro, outro, confirm, isCancel } from '@clack/prompts';
import pc from 'picocolors';
import { ProcessInfo } from './core';

export function showIntro() {
    intro(pc.bgRed(pc.white(' port-sniper 🎯 ')));
}

export function showSuccess(message: string) {
    outro(pc.green(`✔ ${message}`));
}

export function showError(message: string) {
    outro(pc.red(`✖ ${message}`));
}

export async function promptToKillProcess(processDetails: ProcessInfo): Promise<boolean> {
    const { command, pid, user, port } = processDetails;

    console.log(pc.yellow(`\n⚠️ Found a process hoarding Port ${port}!`));
    console.log(`Command:  ${pc.cyan(command)}`);
    console.log(`PID:      ${pc.magenta(pid)}`);
    console.log(`User:     ${pc.dim(user)}\n`);

    const shouldKill = await confirm({
        message: 'Kill this process?',
        initialValue: true,
    });

    if (isCancel(shouldKill)) {
        outro(pc.dim('Operation cancelled by user.'));
        process.exit(1);
    }

    return shouldKill;
}
