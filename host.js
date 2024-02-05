import fs from 'fs';
import os from 'os';

const HOST_FILE_PATH = os.platform() === 'win32' ? 'C:\\Windows\\System32\\drivers\\etc\\hosts' : '/etc/hosts';
let _hosts = [];
function getHostFileText() {
    return fs.readFileSync(HOST_FILE_PATH, 'utf8');
}

function getNotExistHosts(matches, hosts) {
    if (!matches) {
        return hosts;
    }
    const result = [];
    hosts.forEach((host) => {
        if (!matches.some((match) => match.includes(host))) {
            result.push(host);
        }
    });
    return result;
}

/**
 * @param hosts{string[]}
 */
function writeHost(hosts) {
    _hosts = hosts;
    const text = getHostFileText();
    const HOST_REGEX = /\n(127\.0\.0\.1\s+(.+))/g;
    const matches = text.match(HOST_REGEX);
    const notExistHosts = getNotExistHosts(matches, hosts);
    const mappedHosts = notExistHosts.map((host) => `\n127.0.0.1 ${host}`).join('');
    fs.appendFileSync(HOST_FILE_PATH, mappedHosts);
    console.log(`🚀 SET HOSTS 🚀${mappedHosts}`);
}

function cleanUpHosts() {
    let text = getHostFileText();
    const targets = _hosts.map((host) => `\n127.0.0.1 ${host}`);
    targets.forEach((target) => {
        console.log('REMOVE :: ', target.replace('\n', ''));
        text = text.replace(target, '');
    });
    fs.writeFileSync(HOST_FILE_PATH, text);
}

export { writeHost, cleanUpHosts };
