import {dts} from "rollup-plugin-dts";

export default {
    input:'./src/index.ts',
    plugins:[dts()],
    output:[
        {
            file:'./dist/index.d.ts',
            format:'es'
        },
        {
            file:'./dist/index.cjs',
            format:'cjs'
        },
        {
            file:'./dist/index.mjs',
            format:'es'
        }
    ]

}