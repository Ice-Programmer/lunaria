import React from 'react';
import { useTranslation } from 'react-i18next';

export const ResourcePage: React.FC = () => {
  const { t } = useTranslation();

  return <>{t('pages.resource')}</>;
};
