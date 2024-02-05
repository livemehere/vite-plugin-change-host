import { writeHost } from './host.js';
import type { Plugin } from 'vite';

type Options = string | { host: string; additionalHosts: string[] };

function changeHost(options:Options):Plugin {
    const host = typeof options === 'string' ? options : options.host;
    const additionalHosts = typeof options === 'string' ? [] : options.additionalHosts || [];
    return {
        name: 'change-host',
        config: () => ({
            server: {
                host,
            },
            preview: {
                host,
            },
        }),
        buildStart() {
            writeHost([host, ...additionalHosts]);
        },
    };
}

export default changeHost;
