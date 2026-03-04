import { execSync } from 'child_process';

export interface ProcessInfo {
    command: string;
    pid: string;
    user: string;
    port: string;
}

/**
 * Finds processes running on a specific port using `lsof`.
 */
export function findProcessesOnPort(port: string | number): ProcessInfo[] {
    try {
        // -i :port looking for INET connections
        // -P inhibits the conversion of port numbers to port names
        // -n inhibits the conversion of network numbers to host names
        const output = execSync(`lsof -i :${port} -P -n`, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] });
        return parseLsofOutput(output, String(port));
    } catch (error: any) {
        // lsof returns exit code 1 if no process is found. 
        // This is expected behavior, so we return an empty array.
        return [];
    }
}

/**
 * Parses the raw text output of the lsof command into structured ProcessInfo objects.
 */
function parseLsofOutput(output: string, port: string): ProcessInfo[] {
    const lines = output.split('\n').filter(line => line.trim().length > 0);

    if (lines.length <= 1) return []; // Only header row

    const processes: ProcessInfo[] = [];

    // Start from line 1 to skip the header (COMMAND PID USER FD TYPE DEVICE SIZE/OFF NODE NAME)
    for (let i = 1; i < lines.length; i++) {
        const parts = lines[i].trim().split(/\s+/);
        if (parts.length >= 9) {
            const command = parts[0];
            const pid = parts[1];
            const user = parts[2];

            // Avoid adding duplicate PIDs (lsof can report multiple FDs/threads for the same PID)
            if (!processes.some(p => p.pid === pid)) {
                processes.push({ command, pid, user, port });
            }
        }
    }

    return processes;
}

/**
 * Forcefully kills a process by its PID using `kill -9`.
 */
export function killProcess(pid: string): boolean {
    try {
        execSync(`kill -9 ${pid}`, { stdio: 'ignore' });
        return true;
    } catch (error) {
        return false;
    }
}
