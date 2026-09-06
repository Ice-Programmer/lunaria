import React, { useLayoutEffect, useRef, useState } from 'react';
import { ConfigProvider, Segmented } from 'antd';
import { appTheme } from '@/theme/theme.ts';
import styles from './CustomSegmented.module.css';

interface CustomSegmentedProps {
  options: string[];
  width?: React.CSSProperties['width'];
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const CustomSegmented: React.FC<CustomSegmentedProps> = ({
  options,
  width,
  defaultValue,
  value,
  onChange,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const selectedValue = value ?? internalValue ?? options[0];

  useLayoutEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const selectedItem = scrollContainer?.querySelector<HTMLElement>(
      '.ant-segmented-item-selected'
    );

    if (!scrollContainer || !selectedItem) return;

    const centeredScrollLeft =
      selectedItem.offsetLeft - (scrollContainer.clientWidth - selectedItem.offsetWidth) / 2;

    scrollContainer.scrollTo({
      left: centeredScrollLeft,
      behavior: 'smooth',
    });
  }, [options, selectedValue]);

  const handleChange = (nextValue: string) => {
    if (value === undefined) {
      setInternalValue(nextValue);
    }
    onChange?.(nextValue);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Segmented: {
            trackBg: '#f3f0f7',
            trackPadding: 4,
            itemColor: '#7d7888',
            itemSelectedBg: '#ffffff',
            itemSelectedColor: appTheme.colors.primary,
            itemHoverColor: appTheme.colors.primary,
          },
        },
      }}
    >
      <div ref={scrollContainerRef} className={styles.scrollContainer} style={{ width }}>
        <Segmented
          className={styles.segmented}
          options={options}
          value={selectedValue}
          style={{ border: '1px solid #ded8e8', borderRadius: 10 }}
          onChange={handleChange}
        />
      </div>
    </ConfigProvider>
  );
};
