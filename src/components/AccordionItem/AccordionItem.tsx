import { animated } from 'react-spring';
import { Typography, useAnimateHeight } from 'elui-react';
import { useCallback, useState } from 'react';

import { TAccordionItem } from './types';
import { StyledAccordionHead, StyledAccordionItem, StyledChevronIcon } from './styled';

export const AccordionItem = ({ title, description, children, isInitialOpen = true }: TAccordionItem) => {
  const [isExpanded, setExpanded] = useState(isInitialOpen);
  const { ref, style } = useAnimateHeight(isExpanded);

  const onToggle = useCallback(() => setExpanded(prev => !prev), []);

  return (
    <StyledAccordionItem>
      <StyledAccordionHead onClick={onToggle} $isExpanded={isExpanded}>
        <div>
          <Typography variant="h4" typographyStyle={{ display: 'block', maxWidth: 500, paddingBottom: 8 }}>
            {title}
          </Typography>
          <Typography color="grey_800" typographyStyle={{ display: 'block', maxWidth: 1100, marginBottom: 24 }}>
            {description}
          </Typography>
        </div>
        <StyledChevronIcon $isExpanded={isExpanded} />
      </StyledAccordionHead>
      <animated.div style={style}>
        <div ref={ref}>{children}</div>
      </animated.div>
    </StyledAccordionItem>
  );
};
