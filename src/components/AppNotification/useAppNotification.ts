import { useContext } from 'react';
import { AppNotificationContext } from '@/components/AppNotification/context.ts';

export const useAppNotification = () => {
  const notification = useContext(AppNotificationContext);

  if (notification == null) {
    throw new Error('useAppNotification must be used within AppNotificationProvider');
  }

  return notification;
};
