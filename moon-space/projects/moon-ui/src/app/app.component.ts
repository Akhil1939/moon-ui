import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { DropdownOptions, MoonLibComponent, DropdownComponent, GridComponent } from '@moon';
import { CommonGridOptions } from '../../../moon-lib/src/lib/components/grid/models';
import { title } from 'process';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MoonLibComponent,
    DropdownComponent,
    ReactiveFormsModule,
    GridComponent
    
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
  tableOptions:CommonGridOptions={
    isMultipleRow:true,
    columns:[
      { label: 'ID', property: 'id',level:0 },
      { label: 'Title', property: 'title',level:0 },
      { label: 'Description', property: 'description',level:0 },
      { label: 'Category', property: 'category',level:0 },
      { label: 'Status', property: 'status' ,level:0},
      { label: 'Created By', property: 'createdBy',level:0 },
      { label: 'Created Date', property: 'createdDate',level:0 },
      { label: 'Updated By', property: 'updatedBy' ,level:0},
      { label: 'Updated Date', property: 'updatedDate' ,level:0},
      { label: 'Priority', property: 'priority', level:1 },
      { label: 'Location', property: 'location' , level:1},
      { label: 'Assigned To', property: 'assignedTo', level:1 },
      { label: 'Due Date', property: 'dueDate' , level:1},
      { label: 'Completion Date', property: 'completionDate', level:1 },
      { label: 'Comments', property: 'comments' , level:1}
    ],
    data:[{
      id: 1,
      title: 'Task 1',
      description: 'Complete the project documentation.',
      category: 'Documentation',
      status: 'In Progress',
      createdBy: 'User A',
      createdDate: '2024-09-20',
      updatedBy: 'User B',
      updatedDate: '2024-09-25',
      priority: 'High',
      location: 'New York',
      assignedTo: 'User C',
      dueDate: '2024-09-30',
      completionDate: '',
      comments: 'Need to update section 4.'
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Fix bugs in the login system.',
      category: 'Development',
      status: 'Pending',
      createdBy: 'User B',
      createdDate: '2024-09-18',
      updatedBy: 'User D',
      updatedDate: '2024-09-22',
      priority: 'Medium',
      location: 'San Francisco',
      assignedTo: 'User A',
      dueDate: '2024-10-01',
      completionDate: '',
      comments: 'Critical for next release.'
    },
    {
      id: 3,
      title: 'Task 3',
      description: 'Design new homepage layout.',
      category: 'Design',
      status: 'Completed',
      createdBy: 'User C',
      createdDate: '2024-08-15',
      updatedBy: 'User A',
      updatedDate: '2024-08-20',
      priority: 'Low',
      location: 'Los Angeles',
      assignedTo: 'User D',
      dueDate: '2024-09-15',
      completionDate: '2024-09-14',
      comments: 'Final design approved.'
    }
    // Add more rows as needed for testing
  ]

  }
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
    });
  }
}
