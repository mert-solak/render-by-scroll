import React, { LegacyRef, useEffect, useMemo, useRef, useState } from 'react';

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

  useEffect(() => {
    if (elementRef.current === null) {
      return () => {};
    }

    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          intersectionObserver.disconnect();
          setShouldRender(true);
        }
      });
    });
    intersectionObserver.observe(elementRef.current);

    return () => {
      intersectionObserver.disconnect();
    };
  }, [elementRef]);

  useEffect(() => {
    if (shouldRenderProp && shouldRender !== shouldRenderProp) {
      setShouldRender(shouldRenderProp);
    }
  }, [shouldRenderProp]);

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
