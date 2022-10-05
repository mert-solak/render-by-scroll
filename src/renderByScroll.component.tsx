import React, { LegacyRef, useEffect, useMemo, useRef, useState, useCallback } from 'react';

import { Props } from './renderByScroll.config';

export const RenderByScroll: React.FC<Props> = ({
  children,
  shouldRender: shouldRenderProp,
  className,
  style,
  instead,
  wrapperElement = 'div',
}) => {
  const [shouldRender, setShouldRender] = useState(shouldRenderProp ?? false);

  const elementRef = useRef<HTMLDivElement | HTMLTableRowElement>(null);

  const isInViewport = useCallback(() => {
    if (elementRef?.current === null || elementRef?.current === undefined) {
      return;
    }

    const rect = elementRef.current.getBoundingClientRect();

    if (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    ) {
      setShouldRender(true);
    }
  }, [elementRef]);

  useEffect(() => {
    if (elementRef?.current === null || elementRef?.current === undefined) {
      return () => {};
    }

    window.addEventListener('load', isInViewport);
    window.addEventListener('scroll', isInViewport);
    window.addEventListener('resize', isInViewport);

    return () => {
      window.removeEventListener('load', isInViewport);
      window.removeEventListener('scroll', isInViewport);
      window.removeEventListener('resize', isInViewport);
    };
  }, [elementRef]);

  useEffect(() => {
    if (shouldRenderProp && shouldRender !== shouldRenderProp) {
      setShouldRender(shouldRenderProp);
    }
  }, [shouldRenderProp]);

  useEffect(() => {
    if (shouldRender) {
      window.removeEventListener('load', isInViewport);
      window.removeEventListener('scroll', isInViewport);
      window.removeEventListener('resize', isInViewport);
    }
  }, [shouldRender]);

  const withWrapper = useMemo(() => {
    switch (wrapperElement) {
      case 'tr':
        return (
          <tr className={className} style={style} ref={elementRef as LegacyRef<HTMLTableRowElement>}>
            {shouldRender ? children : instead}
          </tr>
        );

      default:
        return (
          <div className={className} style={style} ref={elementRef}>
            {shouldRender ? children : instead}
          </div>
        );
    }
  }, [children, className, instead, shouldRender, style, wrapperElement]);

  return withWrapper;
};
