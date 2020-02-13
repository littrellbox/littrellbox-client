//const darkTheme = require('@ant-design/dark-theme') //antd 3.x
const { override, fixBabelImports, addLessLoader } = require('customize-cra');

const dark = require('antd/dist/dark-theme'); //switch to antd/dist/dark-theme, antd 4.x
const darkTheme = {};

Object.keys(dark).forEach((key) => {
  darkTheme[`@${key}`] = dark[key];
});

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: darkTheme,
  }),
);