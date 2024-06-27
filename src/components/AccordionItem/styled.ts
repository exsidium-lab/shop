import { Icon } from 'elui-react';
import styled from 'styled-components';

export const StyledAccordionItem = styled.div`
  width: 100%;
`;

export const StyledAccordionHead = styled.div<{ $isExpanded: boolean }>`
  display: flex;
  align-items: start;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
`;

export const StyledChevronIcon = styled(Icon.ChevronDown)<{ $isExpanded?: boolean }>`
  cursor: pointer;
  transform: ${({ $isExpanded }) => `rotate(${$isExpanded ? 180 : 0}deg)`};
  transition: transform 0.3s ease-out;
`;
