import { writeHost } from './host.js';
import type {Plugin, ResolvedConfig} from 'vite';

type Options = string | { host: string; additionalHosts?: string[],hostFilePath?:string };

function changeHost(options:Options):Plugin {
    let _config:ResolvedConfig;
    const host = typeof options === 'string' ? options : options.host;
    const additionalHosts = typeof options === 'string' ? [] : options.additionalHosts || [];
    const customPath = typeof options !== 'string' ? options.hostFilePath : undefined;
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
        configResolved(config){
            _config = config;
        },
        configurePreviewServer(){
            writeHost([host, ...additionalHosts],customPath);
        },
        buildStart() {
            if(_config.command !== 'serve') return;
            writeHost([host, ...additionalHosts],customPath);
        },
    };
}

export default changeHost;
