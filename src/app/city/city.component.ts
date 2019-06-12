
import { Component, OnInit, AfterViewInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { } from 'googlemaps';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {

  @Input() optionNumber: string;
  cityFormControl = new FormControl();
  autoCompleteOptions = {
    types: ['(cities)']
  }
  selectedLocation: google.maps.places.PlaceResult;
  cityName: string;
  constructor() { }

  ngOnInit() {
    this.cityFormControl.valueChanges.subscribe(() => 
      this.selectedLocation = null // Will cause an error to be triggered if user doesn't select option from dropdown
    );
  }

  onAutocompleteSelected(result: google.maps.places.PlaceResult) {
    this.cityFormControl.setErrors(null);
    this.selectedLocation = result;
  }
}
