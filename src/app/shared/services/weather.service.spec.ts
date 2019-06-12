import { TestBed, getTestBed } from '@angular/core/testing';
import { WeatherService } from './weather.service';
import { HttpClientTestingModule,
         HttpTestingController } from '@angular/common/http/testing';

describe('WeatherService', () => {
  let injector: TestBed;
  let service: WeatherService;
  let httpMock: HttpTestingController;

  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeatherService],
      imports: [HttpClientTestingModule]
    });
    injector = getTestBed();
    service = injector.get(WeatherService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getForecast', () => {
    it('should return an Observable<CityInfo>', () => {
      const dummyCityInfo = {
        cityName: 'Dallas',
        weatherResults: {
          avgWeather: {
            avgTemp: 92,
            totalPrecip: 2.0,
            maxWind: 15
          },
          score: 39
        }
      }
  
      service.getForecast('Dallas', '7').subscribe(cityInfo => {
        expect(cityInfo).toEqual(dummyCityInfo);
      });
      let url = 'http://api.apixu.com/v1/forecast.json?key=953569584dac4183994174512192405&q=Dallas&days=7'
      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe("GET");
      req.flush(dummyCityInfo);
    });
  });
  
});

