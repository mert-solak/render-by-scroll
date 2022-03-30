import React from 'react';

export interface Props {
  shouldRender?: boolean;
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
  instead?: React.ReactNode | undefined;
}
