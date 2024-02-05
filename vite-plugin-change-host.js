import { writeHost } from './host';

/**
 * @type{import('vite').Plugin}
 * @param {string|{host:string, additionalHosts:string[]}} options
 * */
function changeHost(options) {
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
