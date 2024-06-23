export interface AlertNotificationConfig {
  message?: string;
  type?: AlertNotificationTypeEnum;
  show?: boolean;
}

export enum AlertNotificationTypeEnum {
  success = 'success',
  danger = 'danger',
  info = 'info',
  warning = 'warning',
}
