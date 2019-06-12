export interface City {
  winner: boolean;
  cityInfo: CityInfo;
}

export interface CityInfo {
  cityName: string;
  weatherResults: WeatherResults;
}

export interface WeatherResults {
  avgWeather: Weather; // Will be displayed to user on results screen
  score: number;
}

export interface Weather {
  avgTemp: number;
  totalPrecip: number;
  maxWind: number;
}

