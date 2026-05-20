export interface IEvent {
  eid?: number;        // Backend'deki Event id
  name: string;
  date: string;        // Java'daki LocalDate, string olarak gelir (örn: "2026-05-20")
  time: string;        // Java'daki LocalTime (örn: "14:30")
  location: string;
  description: string;
  category: string;
}