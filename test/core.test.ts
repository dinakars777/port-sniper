import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { killProcess, normalizePort, parseLsofOutput } from '../src/core';

describe('normalizePort', () => {
    it('normalizes valid ports', () => {
        assert.equal(normalizePort('3000'), '3000');
        assert.equal(normalizePort(' 8080 '), '8080');
        assert.equal(normalizePort(443), '443');
    });

    it('rejects invalid port values', () => {
        for (const value of ['Infinity', 'NaN', 'abc', '1.5', '-1', '0', '65536']) {
            assert.throws(() => normalizePort(value));
        }
    });
});

describe('parseLsofOutput', () => {
    it('returns unique processes from lsof output', () => {
        const output = [
            'COMMAND   PID    USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME',
            'node    1234 dinakar   21u  IPv6 0x123456789abcdef      0t0  TCP *:3000 (LISTEN)',
            'node    1234 dinakar   22u  IPv6 0x123456789abcdea      0t0  TCP localhost:3000->localhost:50100 (ESTABLISHED)',
            'python  5678 dinakar   12u  IPv4 0x123456789abcdeb      0t0  TCP *:3000 (LISTEN)',
        ].join('\n');

        assert.deepEqual(parseLsofOutput(output, '3000'), [
            { command: 'node', pid: '1234', user: 'dinakar', port: '3000' },
            { command: 'python', pid: '5678', user: 'dinakar', port: '3000' },
        ]);
    });
});

describe('killProcess', () => {
    it('rejects invalid PIDs before executing kill', () => {
        assert.equal(killProcess('123; echo unsafe'), false);
        assert.equal(killProcess('0'), false);
    });
});
