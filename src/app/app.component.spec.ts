import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { CityComponent } from './city/city.component';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatAutocompleteModule, MatSelectModule, MatButtonModule, MatToolbarModule, MatCardModule, MatFormFieldModule } from '@angular/material';
import { HomeComponent } from './home/home.component';
import { ResultComponent } from './result/result.component';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { WeatherService } from './shared/services/weather.service';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [WeatherService],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatInputModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatButtonModule,
        MatToolbarModule,
        MatCardModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatGoogleMapsAutocompleteModule.forRoot(),
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyBUcu9P8e6h7bVj97qhqMISIW8YlzFcm2g',
          libraries: ['places']
        }),
        BrowserAnimationsModule
      ],
      declarations: [
        AppComponent,
        ResultComponent,
        HomeComponent,
        CityComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'weather-battle'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('weather-battle');
  });

});
