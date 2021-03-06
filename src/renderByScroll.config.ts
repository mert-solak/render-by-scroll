import React from 'react';

export interface Props {
  shouldRender?: boolean | undefined;
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
  instead?: React.ReactNode | undefined;
  wrapperElement?: 'div' | 'tr';
}
