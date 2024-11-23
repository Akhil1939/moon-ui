import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DropdownComponent, DropdownOptions } from '@moon';
import { single } from 'rxjs';
import { TextValueOptionConfig } from '../../../../../../moon-lib/src/lib/shared/models';

@Component({
  selector: 'page-dropdown',
  standalone: true,
  imports: [DropdownComponent, ReactiveFormsModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownPage {

  dropDownForm:FormGroup = new FormGroup({
    singleSelect:new FormControl('')
  })
  singleSelectDropDownOptions:DropdownOptions={
    formControlName:'singleSelect',
    data:[],
    label:'singleSelect',
    isFloatLabel:true,
    features:{
      allowClear:true,
      allowSearching:true,
      enableVirtualization:true,
    }


  }
  getData(size: number): TextValueOptionConfig[] {
    return Array.from({ length: size }, (_, index) => ({ 
      text: `Option ${index + 1}`, 
      value: index + 1 
    }));
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    setTimeout(() => {
      this.singleSelectDropDownOptions.data = this.getData(2000);
    }, 1000);
  }
}
