const presets = [
  [
    '@babel/env',
    {
      targets: {
        edge: '17',
        ie: '11',
        firefox: '60',
        chrome: '67',
        safari: '11.1',
      },
      useBuiltIns: 'usage',
    },
  ],
  '@babel/preset-typescript',
  '@babel/preset-react',
];

const plugins = [
  '@babel/proposal-class-properties',
  '@babel/proposal-object-rest-spread',
];

module.exports = { presets, plugins };
