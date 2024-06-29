import React from 'react';
import './Container.module.css'; // Assuming you have some CSS for this component

const Container = ({ children }) => {
  return <div className="container">{children}</div>;
};

export default Container;
