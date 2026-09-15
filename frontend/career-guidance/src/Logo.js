import React from 'react';

function Logo({ size = 80 }) {
  return (
    <div style={{ fontSize: size * 0.7, lineHeight: 1 }}>
      🎓
    </div>
  );
}

export default Logo;