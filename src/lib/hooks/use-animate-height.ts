import { useState } from 'react';
import { useSpring } from '@react-spring/web';
import useUpdateEffect from 'react-use/esm/useUpdateEffect';

import { useMeasure } from './use-measure';
import { useWindowSize } from './use-window-size';

export const useAnimateHeight = <T extends HTMLElement = HTMLDivElement>(isExpanded: boolean) => {
  const [ref, { height }] = useMeasure<T>();
  const windowWidth = useWindowSize();
  const [overflow, setOverflow] = useState('hidden');

  const [style, { set }] = useSpring(
    {
      height: isExpanded ? height || 'auto' : 0,
      onRest: () => {
        if (isExpanded) setOverflow('visible');
      },
      onStart: () => {
        if (!isExpanded) setOverflow('hidden');
      },
      opacity: isExpanded ? 1 : 0,
    },
    [isExpanded]
  );

  useUpdateEffect(() => {
    if (isExpanded) set({ height });
  }, [windowWidth, height]);

  return {
    ref,
    style: { ...style, overflow },
  };
};
