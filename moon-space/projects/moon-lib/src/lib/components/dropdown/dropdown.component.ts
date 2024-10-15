import {
  Component,
  effect,
  ElementRef,
  input,
  signal,
  ViewChild,
} from '@angular/core';
import { DropdownOptions } from './models/dropdown-options';
import {
  AbstractControl,
  ControlContainer,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { TextValueOptionConfig } from '../../shared/models';
import { distinctUntilChanged } from 'rxjs';
import { DropdownModule } from './dropdown.module';

@Component({
  selector: 'moon-dropdown',
  standalone: true,
  imports: [DropdownModule],
  host: { ngSkipHydration: 'true' },
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
})
export class DropdownComponent {
  options = input.required<DropdownOptions>();
  displayOptions = signal<TextValueOptionConfig[]>([]);
  data = this.displayOptions();
  dropdownModelValue: any;
  formGroup!: FormGroup;
  selectedItemsToDisplay: number = 3;
  isLoaded: boolean = false;
  public dropdownSearchCtrl: FormControl<string | null> = new FormControl<
    string | null
  >('');
  isChecked: boolean = false;
  isIndeterminate: boolean = false;
  allOptions!: (number | string)[];
  @ViewChild('matOption') matOption!: ElementRef;

  constructor(
    private controlContainer: ControlContainer,
  ) {
    effect(() => {
      this.setControlDefaultValue();
      this.setSelectedValue();
    });
  }

  ngOnInit(): void {
    this.formGroup = <FormGroup>this.controlContainer.control;
    this.displayOptions.set(this.options().data);
    this.setControlDefaultValue();
    this.setSelectedValue();
    this.selectedItemsToDisplay =
      this.options().features?.selectedItemsToDisplay ??
      this.selectedItemsToDisplay;
    this.control?.valueChanges.pipe(distinctUntilChanged()).subscribe((x) => {
      this.dropdownModelValue = x;
      if (this.options().features?.allowMultiple) {
        // this.setToggleState();
      }
    });
    if (this.options().features?.allowSearching) {
      this.dropdownSearchCtrl.valueChanges.pipe().subscribe(() => {
        this.filterData();
      });
    }
  }
  get control(): AbstractControl {
    return this.formGroup.get(this.options().formControlName)!;
  }

  get selectedItemClass(): string {
    return this.selectedItemsCount > this.selectedItemsToDisplay
      ? 'selected-many'
      : 'selected-' + this.selectedItemsCount;
  }
  get selectedItemsCount(): number {
    if (
      this.options().features?.allowMultiple &&
      this.dropdownModelValue &&
      Array.isArray(this.dropdownModelValue)
    ) {
      return this.dropdownModelValue.length;
    } else {
      return 0;
    }
  }
  get selectedChips(): any {
    return this.dropdownModelValue.slice(0, this.selectedItemsToDisplay);
  }
  getSelectedOptionForDisplay = () => {
    if (this.options().data.length > 0) {
      const selectedOption = this.options().data?.find(
        (x) => x.value == this.dropdownModelValue
      );
      const selectedOptionDisplay = selectedOption ? selectedOption.text : '';
      return selectedOptionDisplay
        ? selectedOptionDisplay.replace(/,\s*$/, '')
        : '';
    } else {
      return '';
    }
  };

  removeOption = (option: string): void => {
    const index = this.dropdownModelValue.indexOf(option);
    if (index >= 0) {
      this.dropdownModelValue.splice(index, 1);
      this.dropdownModelValue = [...this.dropdownModelValue];
      this.setFormControlValue();
    }
    this.control.markAsTouched();
  };

  clear = (): void => {
    this.dropdownModelValue = this.options().features?.allowMultiple
      ? []
      : null;
    this.setFormControlValue();
  };
  setFormControlValue = (): void => {
    this.control.setValue(this.dropdownModelValue);
    this.control.updateValueAndValidity();
    if (this.options().selectionChange) {
      if (
        this.options().features?.allowMultiple &&
        Array.isArray(this.dropdownModelValue)
      ) {
        const selectedOptions: TextValueOptionConfig[] = [];
        Array.from(this.dropdownModelValue).forEach((item) => {
          const opt = this.displayOptions().find(
            (element) => element.value == item
          );
          if (opt) selectedOptions.push(opt);
        });
        if (this.options().isOverrideCallbacks) {
          // this.callBackFnCalled.emit({
          //   [this.options.selectionChange.name]: selectedOptions,
          // });
          return;
        }
        this.options().selectionChange?.(selectedOptions);
      } else {
        const selectedOption: TextValueOptionConfig =
          this.displayOptions()?.find(
            (x) => x.value == this.dropdownModelValue
          )!;
        if (this.options().isOverrideCallbacks) {
          // this.callBackFnCalled.emit({
          //   [this.options.selectionChange.name]: selectedOption,
          // });
          return;
        }
        this.options().selectionChange?.(selectedOption);
      }
    }
  };

  filterData = (): void => {
    const search = this.dropdownSearchCtrl.value?.toLowerCase();
    const dropdownData = search
      ? this.options().data.filter(
          (x) => x.text.toLowerCase().indexOf(search) > -1
        )
      : this.options().data;
    this.setDropdownOptions(dropdownData);
  };
  setDropdownOptions = (data: TextValueOptionConfig[]): void => {
    this.displayOptions.set(data);
    if (this.options().features?.allowMultiple) {
      this.setToggleState();
    }
    this.isLoaded = true;
  };
  getMultiSelectedOptionForDisplay(option: string): string {
    if (this.options().data.length > 0) {
      option = this.options().data?.find((y) => y.value == option)?.text!;
    }
    return option;
  }
  toggleSelectAll = (selectAllValue: boolean): void => {
    if (selectAllValue) {
      this.allOptions = Array.from(
        this.displayOptions()?.map((x) => {
          return x.value;
        })
      );
    }
  };
  private setToggleState = (): void => {
    const selectedValue = this.control?.value
      ? Array.from(this.control.value)
      : [];
    if (selectedValue.length > 0 && this.displayOptions().length > 0) {
      this.isIndeterminate =
        this.displayOptions().length >
        this.displayOptions().filter(
          (x) => selectedValue.findIndex((y) => y == x.value) > -1
        ).length;
      this.isChecked =
        this.displayOptions().length ==
        this.displayOptions().filter(
          (x) => selectedValue.findIndex((y) => y == x.value) > -1
        ).length;
    } else {
      this.isIndeterminate = false;
      this.isChecked = false;
    }
  };

  private setControlDefaultValue = (): void => {
    if (this.control?.value == null && this.options().features?.allowMultiple) {
      this.control.setValue([], { emitEvent: false });
    }
  };
  private setSelectedValue = (): void => {
    if (
      this.options()?.features?.allowMultiple &&
      this.control?.value &&
      this.options().data.length > 0
    ) {
      // Ensure value is an array and remove duplicates
      let selectedValue = Array.isArray(this.control.value)
        ? Array.from(new Set(this.control.value))
        : [];

      // Filter to include only valid values from textvalue array
      selectedValue = selectedValue.filter(
        (x) => this.options().data.findIndex((y) => y.value == x) > -1
      );

      // Update control value without emitting event
      this.control.setValue(selectedValue, { emitEvent: false });
      this.dropdownModelValue = selectedValue;
    } else {
      // Handle single selection case
      this.dropdownModelValue = this.control?.value;
    }
  };
}
