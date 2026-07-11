import React from 'react';

export function isEnter(e: KeyboardEvent | React.KeyboardEvent) {
  return e.key === 'Enter';
}
