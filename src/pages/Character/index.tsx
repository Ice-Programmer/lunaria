import React from 'react';
import { useTranslation } from 'react-i18next';

export const CharacterPage: React.FC = () => {
  const { t } = useTranslation();

  return <>{t('pages.character')}</>;
};
