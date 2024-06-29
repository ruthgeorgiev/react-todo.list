import React from 'react';


const Typography = ({ fontSize, bold, children, style, className }) => {
  return (
    <div
      className={className}
      style={{
        fontSize,
        fontWeight: bold ? 'bold' : 'normal',
        ...style
      }}
    >
      {children}
    </div>
  );
};

export default Typography;
