import React, { useMemo } from 'react';
import type { PropsWithChildren } from 'react';
import { notification } from 'antd';
import {
  AppNotificationContext,
  type AppNotificationApi,
} from '@/components/AppNotification/context.ts';

export const AppNotificationProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [notificationApi, contextHolder] = notification.useNotification({
    placement: 'topRight',
    duration: 4.5,
  });

  const value = useMemo<AppNotificationApi>(
    () => ({
      success: ({ title, description, duration }) => {
        notificationApi.success({
          title: title,
          description,
          duration,
        });
      },
      error: ({ title, description, duration }) => {
        notificationApi.error({
          title: title,
          description,
          duration,
        });
      },
    }),
    [notificationApi]
  );

  return (
    <AppNotificationContext.Provider value={value}>
      {contextHolder}
      {children}
    </AppNotificationContext.Provider>
  );
};
