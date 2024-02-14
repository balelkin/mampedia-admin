import React from 'react';
import PropTypes from 'prop-types';

export default function Prompt({ prompt }) {
  return <h5 className="prompt">{prompt}</h5>;
}

Prompt.propTypes = { prompt: PropTypes.string };

Prompt.defaultProps = { prompt: 'Stranger' };
