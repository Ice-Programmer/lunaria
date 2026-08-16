import React from 'react';
import { Card, Flex, Radio, theme, Typography } from 'antd';

const { Text } = Typography;

export interface SelectedCardOption<T extends string = string> {
  value: T;
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface SelectedCardGroupProps<T extends string = string> {
  value?: T;
  options: SelectedCardOption<T>[];
  onChange?: (value: T) => void;
}

export const SelectedCardGroup = <T extends string = string>({
  value,
  options,
  onChange,
}: SelectedCardGroupProps<T>) => {
  const { token } = theme.useToken();

  return (
    <Flex vertical gap={10} style={{ width: '100%' }}>
      {options.map((option) => {
        const selected = value === option.value;

        return (
          <Card
            key={option.value}
            hoverable={!option.disabled}
            size="small"
            onClick={() => {
              if (!option.disabled) {
                onChange?.(option.value);
              }
            }}
            style={{
              cursor: option.disabled ? 'not-allowed' : 'pointer',
              opacity: option.disabled ? 0.5 : 1,
              borderColor: selected ? token.colorPrimary : undefined,
              backgroundColor: selected ? token.colorPrimaryBg : token.colorBgContainer,
            }}
            styles={{
              body: {
                padding: '10px 20px',
              },
            }}
          >
            <Flex align="center" justify="space-between">
              <Flex align="center" gap={16}>
                {option.icon && (
                  <Flex
                    align="center"
                    justify="center"
                    style={{
                      width: 36,
                      height: 36,
                      flexShrink: 0,
                      borderRadius: token.borderRadiusLG,
                      backgroundColor: token.colorPrimaryBg,
                      color: token.colorPrimary,
                      fontSize: 18,
                    }}
                  >
                    {option.icon}
                  </Flex>
                )}

                <Flex vertical align="start">
                  <Text strong>{option.title}</Text>

                  {option.description && (
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {option.description}
                    </Text>
                  )}
                </Flex>
              </Flex>

              <Radio
                checked={selected}
                disabled={option.disabled}
                onClick={(event) => event.stopPropagation()}
                onChange={() => onChange?.(option.value)}
              />
            </Flex>
          </Card>
        );
      })}
    </Flex>
  );
};
