import React, { ReactNode } from 'react';
import { appTheme } from '@/theme/theme.ts';

interface CustomFooterProps {
  content: ReactNode;
}

export const CustomFooter: React.FC<CustomFooterProps> = ({ content }) => {
  return (
    <div
      style={{
        marginTop: 'auto',
        backgroundColor: 'white',
        borderTop: `1px solid ${appTheme.colors.border}`,
      }}
    >
      {content}
    </div>
  );
};
