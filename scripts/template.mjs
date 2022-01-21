import { Props } from './types';

const template = (
  { componentName, exports, imports, interfaces, jsx, props },
  { tpl }
) => {
  componentName = componentName.slice(3);
  imports = ['import React from \'react\';'];
  interfaces = Props;

  return tpl`${imports}
import PropTypes from 'prop-types';
${interfaces}

function ${componentName}(${props}: Props): React.ReactElement<Props> {
  return ${jsx};
}

${exports}
  `;
};

// module.exports = template;
export default template;
