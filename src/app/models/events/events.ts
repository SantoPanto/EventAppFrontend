export interface IEvent {
  eid?: number; // Backend otomatik vereceği için opsiyonel
  name: string;
  date: string; // LocalDate yyyy-MM-dd formatında gelir
  time: string; // LocalTime HH:mm formatında gelir
  location: string;
  description: string;
  category: string;
  published?: boolean; // Etkinliğin yayında olup olmama durumu
}