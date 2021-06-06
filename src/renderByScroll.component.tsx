import React, { useEffect, useRef, useState } from 'react';

import { Props } from './renderByScroll.config';

export const RenderByScroll: React.FC<Props> = ({ children, shouldRender: shouldRenderProp = false }) => {
  const [shouldRender, setShouldRender] = useState(shouldRenderProp);

  const elementRef = useRef(null);

  useEffect(() => {
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

  return <div ref={elementRef}>{shouldRender && children}</div>;
};
