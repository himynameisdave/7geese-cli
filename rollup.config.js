import babel from  'rollup-plugin-babel';
import commonjs from  'rollup-plugin-commonjs';
import resolve from  'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';


export default [
    {
        input: 'src/index.js',
        output: [
            {
                file: 'bin/7geese',
                format: 'iife'
            }
        ],
        plugins: [
            resolve(),
            commonjs(),
            babel({
                exclude: ['node_modules/**']
            }),
            uglify(),
        ]
    }
];
