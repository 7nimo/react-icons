const template = (
  { componentName, jsx },
  { tpl }
) => {
  const name = componentName.slice(3);

  return tpl`
    import React from 'react';
    
    type Props = {
      size: number;
    }
    
    function ${name}({ size = 24 }: Props): React.ReactElement<Props> {
      return \(
        ${jsx}
      \);
    };

    export default ${name};
    `;
};

module.exports = template;
