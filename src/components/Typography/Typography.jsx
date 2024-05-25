import React from 'react';
import PropTypes from 'prop-types';

function Typography({ children, fontSize = '16px', bold = false }) {
  return (
    <div style={{ fontSize: fontSize, fontWeight: bold ? '700' : '400' }}>
      {children}
    </div>
  );
}

Typography.propTypes = {
  children: PropTypes.node.isRequired,
  fontSize: PropTypes.string,
  bold: PropTypes.bool,
};

export default Typography;
