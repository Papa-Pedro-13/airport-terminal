export interface Weather {
  request: Request;
  location: Location;
  current: Current;
}

export interface RequestWeather {
  type: string;
  query: string;
  language: string;
  unit: string;
}

export interface Location {
  name: string;
  country: string;
  region: string;
  lat: string;
  lon: string;
  timezone_id: string;
  localtime: string;
  localtime_epoch: number;
  utc_offset: string;
}

export interface Current {
  observation_time: string;
  temperature: number;
  weather_code: number;
  weather_icons: string[];
  weather_descriptions: string[];
  wind_speed: number;
  wind_degree: number;
  wind_dir: string;
  pressure: number;
  precip: number;
  humidity: number;
  cloudcover: number;
  feelslike: number;
  uv_index: number;
  visibility: number;
  is_day: string;
}

export interface Flights {
  pagination: Pagination;
  data: Daum[];
}

export interface Pagination {
  limit: number;
  offset: number;
  count: number;
  total: number;
}

export interface Daum {
  flight_date: string;
  flight_status: string;
  departure: Departure;
  arrival: Arrival;
  airline: Airline;
  flight: Flight;
  aircraft?: Aircraft;
  live?: Live;
}

export interface Departure {
  airport: string;
  timezone: string;
  iata: string;
  icao: string;
  terminal?: string;
  gate?: string;
  delay?: number;
  scheduled: string;
  estimated: string;
  actual?: string;
  estimated_runway?: string;
  actual_runway?: string;
}

export interface Arrival {
  airport?: string;
  timezone?: string;
  iata: string;
  icao: string;
  terminal?: string;
  gate?: string;
  baggage?: string;
  delay?: number;
  scheduled: string;
  estimated: string;
  actual?: string;
  estimated_runway?: string;
  actual_runway?: string;
}

export interface Airline {
  name: string;
  iata: string;
  icao: string;
}

export interface Flight {
  number: string;
  iata: string;
  icao: string;
  codeshared?: Codeshared;
}

export interface Codeshared {
  airline_name: string;
  airline_iata: string;
  airline_icao: string;
  flight_number: string;
  flight_iata: string;
  flight_icao: string;
}

export interface Aircraft {
  registration: string;
  iata: string;
  icao: string;
  icao24: string;
}

export interface Live {
  updated: string;
  latitude: number;
  longitude: number;
  altitude: number;
  direction: number;
  speed_horizontal: number;
  speed_vertical: number;
  is_ground: boolean;
}
