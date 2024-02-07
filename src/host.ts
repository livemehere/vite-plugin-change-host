import fs from 'fs';
import os from 'os';

const HOST_FILE_PATH = os.platform() === 'win32' ? 'C:\\Windows\\System32\\drivers\\etc\\hosts' : '/etc/hosts';
let _hosts:string[] = [];
function getHostFileText(path:string) {
    return fs.readFileSync(path, 'utf8');
}

function getNotExistHosts(matches:string[]|null, hosts:string[]) {
    if (!matches) {
        return hosts;
    }
    const result:string[] = [];
    hosts.forEach((host) => {
        if (!matches.some((match) => match.includes(host))) {
            result.push(host);
        }
    });
    return result;
}

function writeHost(hosts:string[],customPath?:string) {
    const path = customPath ?? HOST_FILE_PATH
    _hosts = hosts;
    const text = getHostFileText(path);
    const HOST_REGEX = /\n(127\.0\.0\.1\s+(.+))/g;
    const matches = text.match(HOST_REGEX);
    const notExistHosts = getNotExistHosts(matches, hosts);
    const mappedHosts = notExistHosts.map((host) => `\n127.0.0.1 ${host}`).join('');
    fs.appendFileSync(path, mappedHosts);
    console.log(`🚀 SET HOSTS 🚀${mappedHosts}`);
}

function cleanUpHosts(customPath?:string) {
    const path = customPath ?? HOST_FILE_PATH
    let text = getHostFileText(path);
    const targets = _hosts.map((host) => `\n127.0.0.1 ${host}`);
    targets.forEach((target) => {
        console.log('REMOVE :: ', target.replace('\n', ''));
        text = text.replace(target, '');
    });
    fs.writeFileSync(path, text);
}

export { writeHost, cleanUpHosts };
