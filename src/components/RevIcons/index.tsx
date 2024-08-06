import React, { ReactElement } from 'react';

interface RevIconProps {
  rev: string;
  children: ReactElement;
}

const RevIcon: React.FC<RevIconProps> = ({ rev, children }) => {
  // Clone the child element and add the rev attribute
  return React.cloneElement(children, { rev });
};

export default RevIcon;
