module.exports = {
  multipass: true,
  js2svg: {
    indent: 2, 
    pretty: true,
  },
  plugins: [
    {
      name: 'preset-default',
    },
    {
      name: 'removeAttributesBySelector',
      params: {
        selector: 'svg',
        attributes: ['xml:space', 'id'],
      },
    },
    {
      name: 'sortAttrs',
    },
    {
      name: 'removeAttrs',
      params: {
        attrs: ['data-*', 'data.*'],
      },
    },
    {
      name: 'convertStyleToAttrs',
      params: {
        keepImportant: true,
      },
    },
  ],
}