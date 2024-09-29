import { ChangeDetectionStrategy, Component } from '@angular/core';
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
    dropdown: new FormControl(['A']),
  });
  ngOnInit(): void {
    this.dropdown = {
      label: 'Dropdown',
      isFloatLabel: true,
      formControlName: 'dropdown',
      classes: [''],
      data: [],
      features:{
        allowSearching: true,
        allowMultiple:true,
        showSelectedCount:true,
        allowClear:true,
      },
      selectionChange: () => {},
    };

    setTimeout(() => {
      this.dropdown.data = [
        { text: 'Item A1', value: 'A' },
        { text: 'Item A2', value: 'B' },
        { text: 'Item A3', value: 'C' },
        {text: 'Item A4', value: 'D'},
        { text: 'Item A5', value: 'E'},
        {text:'Item A', value: 'F'}
      ];
    }, 2000);
    this.form.valueChanges.subscribe(() => {
      console.log(this.form.value)
    });
  }
}
