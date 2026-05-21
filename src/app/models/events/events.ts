export interface IEvent {
  eid: number;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: string;
  status: string;
  ownerCid: number;
  ownerName: string; 
  ownerSurname: string; 
}

// Backend'den dönen Page yapısı için:
export interface IEventPage {
  content: IEvent[];
  totalElements: number;
  totalPages: number;
}