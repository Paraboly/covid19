export interface Session {
  id: number;
  dateTimeStart: string;
  dateTimeEnd: string;
  name: string;
  location: string;
  description: string;
  speakerIds: number[];
  tracks: string[];
  _country: string;
  _lastUpdate: string;
  _confirmed: number;
  _deaths: number;
  _recovered: number;
}
