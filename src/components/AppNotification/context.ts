import { createContext } from 'react';
import type { ReactNode } from 'react';

export interface AppNotificationOptions {
  title: ReactNode;
  description?: ReactNode;
  duration?: number;
}

export interface AppNotificationApi {
  success: (options: AppNotificationOptions) => void;
  error: (options: AppNotificationOptions) => void;
}

export const AppNotificationContext = createContext<AppNotificationApi | null>(null);
