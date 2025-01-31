export interface AirTableNotification {
  content: string;
  read: boolean;
}

export interface Notification extends AirTableNotification {
  id: string;
  loading: boolean;
}
