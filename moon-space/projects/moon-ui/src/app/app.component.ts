import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { DropdownOptions, MoonLibComponent, DropdownComponent } from '@moon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MoonLibComponent,
    DropdownComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'moon-ui';
  dropdown!: DropdownOptions;
  form: FormGroup = new FormGroup({
    dropdown: new FormControl(['1A', '1B']),
  });
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.dropdown = {
      label: 'Dropdown',
      isFloatLabel: true,
      formControlName: 'dropdown',
      classes: [''],
      data: [],
      features:{
        allowSearching: true,
        allowMultiple:true,
      },
      selectionChange: () => {},
    };

    setTimeout(() => {
      this.dropdown.data = [
        { text: 'Item A1', value: '1A' },
        { text: 'Item A2', value: '1B' },
        { text: 'Item A3', value: '1C' },
        {text: 'Item A4', value: '1D'},
        { text: 'Item A5', value: '1E'},
        {text:'Item A', value: '1F'}
      ];
    }, 5000);
    this.form.valueChanges.subscribe(() => {
      console.log(this.form.value)
    });
  }
}
