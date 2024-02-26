import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-building-dropdown',
  templateUrl: './building-dropdown.component.html',
  styleUrls: ['./building-dropdown.component.scss']
})
export class BuildingDropdownComponent implements OnInit {
  
  //DUMMY DATA
  public buildingList = [
    {
      id: '1',
      description: 'Stepa Stepanovic'
    },
    {
      id: '2',
      description: 'Toundra Toundranovic'
    },
  ]
  //-------------
  public formGroup: FormGroup;
  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this._fb.group({
      Building: [null, null]
    })
  }

}
