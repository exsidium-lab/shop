import { ReactNode } from 'react';

export type TAccordionItem = {
  title: string;
  description?: string;
  children: ReactNode;
  isInitialOpen?: boolean;
};
