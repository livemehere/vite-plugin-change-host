import typescript from "@rollup/plugin-typescript";

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
    input:'./src/index.ts',
    plugins:[
        typescript()
    ],
    output:[
        {
            file:'./dist/index.cjs',
            format:'cjs'
        },
        {
            file:'./dist/index.mjs',
            format:'es'
        }
    ],

}

export default config
