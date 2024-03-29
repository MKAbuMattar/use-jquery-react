import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';

export default [
  {
    input: 'src/index.ts',
    external: ['react', 'jquery'],
    plugins: [
      terser(),
      typescript({
        tsconfig: 'tsconfig.json',
        declaration: true,
        declarationDir: 'types',
        rootDir: 'src',
        sourceMap: false,
      }),
    ],
    output: [
      {
        file: 'lib/index.js',
        name: 'UseJQueryReact',
        format: 'cjs',
        sourcemap: false,
      },
      {
        file: 'lib/index.mjs',
        name: 'UseJQueryReact',
        format: 'es',
        sourcemap: false,
      },
    ],
  },
  {
    input: 'lib/types/index.d.ts',
    external: ['react', 'jquery'],
    plugins: [dts()],
    output: [{file: 'lib/index.d.ts', format: 'es'}],
  },
];
