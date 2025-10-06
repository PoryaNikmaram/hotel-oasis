// app/_components/TextExpander.js
import { useState } from 'react';

function TextExpander({ children }) {
  const words = children.split(' ');
  const needsExpansion = words.length > 40;

  const [isExpanded, setIsExpanded] = useState(false);

  if (!needsExpansion) {
    return <span>{children}</span>;
  }

  const displayText = isExpanded
    ? children
    : `${words.slice(0, 40).join(' ')}...`;

  return (
    <span>
      {displayText}{' '}
      <button
        className='border-b border-primary-700 pb-1 leading-3 text-primary-700'
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? 'Show less' : 'Show more'}
      </button>
    </span>
  );
}

export default TextExpander;
