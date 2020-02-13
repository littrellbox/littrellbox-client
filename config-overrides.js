const darkTheme = require('@ant-design/dark-theme');
const { override, fixBabelImports, addLessLoader } = require('customize-cra');

console.log(darkTheme);

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: darkTheme.default,
  }),
);