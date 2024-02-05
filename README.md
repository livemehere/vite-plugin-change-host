# vite-plugin-change-host

A vite plugin to change the host of the dev server.   
Actual work is append `host` list in to os `hosts` file.   
In Windows `C:\Windows\System32\drivers\etc\hosts` and macOS `/etc/hosts`.   
And it changes the `server`, `preview` host property in vite config.   

```js
{
    server: {
        //...
        host: 'home.exmaple.com'
    },
    preview: {
        //...
        host: 'home.exmaple.com'
    }
}
```

## Install

```bash
npm install vite-plugin-change-host
yarn add vite-plugin-change-host
```

## Usage

### vite.config.js

```js
export default defineConfig({
    plugins: [
        changeHost({
            host: 'home.exmaple.com',
            additionalHosts: ['example.com', 'api.example.com'],
        }),
    ],
})

// ...

// you'd better clean up the hosts when devserver is closed
process.on('SIGINT', () => {
    cleanUpHosts();
    process.exit();
});
```