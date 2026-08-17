import React from 'react';
import { TranslationOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.resolvedLanguage?.startsWith('en')
    ? 'en-US'
    : i18n.resolvedLanguage?.startsWith('ja')
      ? 'ja-JP'
      : 'zh-CN';
  const nextLanguage = {
    'zh-CN': {
      code: 'en-US',
      label: 'EN',
      tooltipKey: 'common.language.switchToEnglish',
    },
    'en-US': {
      code: 'ja-JP',
      label: '日',
      tooltipKey: 'common.language.switchToJapanese',
    },
    'ja-JP': {
      code: 'zh-CN',
      label: '中',
      tooltipKey: 'common.language.switchToChinese',
    },
  } as const;
  const next = nextLanguage[currentLanguage];
  const tooltip = t(next.tooltipKey);

  const switchLanguage = () => {
    void i18n.changeLanguage(next.code);
  };

  return (
    <Tooltip title={tooltip} placement="right">
      <Button
        type="text"
        icon={<TranslationOutlined />}
        aria-label={tooltip}
        onClick={switchLanguage}
      >
        {next.label}
      </Button>
    </Tooltip>
  );
};
