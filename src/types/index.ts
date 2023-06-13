import { FC, ReactElement } from 'react';

export type FCWithChildren = FC<{
  children: ReactElement;
}>;
