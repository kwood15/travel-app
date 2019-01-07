import React from 'react';
import PropTypes from 'prop-types';

export const Badge = ({ className, children }) => (
  <span className={`badge ${className}`}>{children}</span>
);

Badge.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};
