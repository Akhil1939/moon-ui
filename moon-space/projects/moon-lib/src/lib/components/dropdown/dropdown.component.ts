import {
  Component,
  ElementRef,
  EventEmitter,
  input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { DropdownOptions } from './models/dropdown-options';
import {
  AbstractControl,
  ControlContainer,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TextValueOptionConfig } from '../../shared/models';
import { distinctUntilChanged, map, Subject, takeUntil } from 'rxjs';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { SccDropdownModule } from './scc-dropdown.module';

@Component({
  selector: 'moon-dropdown',
  standalone: true,
  imports: [SccDropdownModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
})
export class DropdownComponent {
  options = input.required<DropdownOptions>();
  // @Output() callBackFnCalled = new EventEmitter<CallBackFnOptions>();
  formGroup!: FormGroup;
  dropDownOptions!: TextValueOptionConfig[];
  isLoaded: boolean = false;
  dropdownModelValue: any;
  isDisabled: boolean = false;
  isRequired: boolean = false;
  hideClearSearchButton: boolean = false;
  defaultSearchPlaceholderLabel: string = 'Search...';
  defaultSearchNoEntriesFoundLabel: string = 'No Data Found';
  selectedItemsToDisplay: number = 0;
  isChecked: boolean = false;
  isIndeterminate: boolean = false;
  allOptions!: (number | string)[];

  public dropdownSearchCtrl: FormControl<string | null> = new FormControl<
    string | null
  >('');
  @ViewChild('matOption') matOption!: ElementRef;
  private readonly onDestroy = new Subject<void>();
  constructor(private controlContainer: ControlContainer) {}

  ngOnInit(): void {
    this.formGroup = <FormGroup>this.controlContainer.control;
    this.setControlDefaultValue();
    this.setSelectedValue();
    this.isDisabled = this.control?.disabled;
    this.isRequired = this.control?.hasValidator(Validators.required);
    this.hideClearSearchButton =
      this.options().features?.hideClearSearchButton == true ? true : false;
    this.selectedItemsToDisplay =
      this.options().features?.selectedItemsToDisplay ??
      this.selectedItemsToDisplay;
    this.control?.statusChanges
      .pipe(takeUntil(this.onDestroy))
      .pipe(
        map((status) => status === 'DISABLED'),
        distinctUntilChanged()
      )
      .subscribe((x: any) => (this.isDisabled = x));

    this.control?.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .pipe(distinctUntilChanged())
      .subscribe((x: any) => {
        this.dropdownModelValue = x;
        if (this.isAllowMultiple) {
          this.setToggleState();
        }
      });
    this.control?.statusChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.isRequired = this.control.hasValidator(Validators.required);
      });

    this.dropdownSearchCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.dropDownOptions ? this.filterData() : [];
      });

    this.setDropdownOptions(this.options().data);
    this.selectedItemsToDisplay = this.options().features?.chipCount ?? 0;

    // if (this.options().changeOptions$ !== undefined) {
    //   this.options().changeOptions$
    //     .pipe(takeUntil(this.onDestroy))
    //     .subscribe((value) => {
    //       this.updateData(value);
    //     });
    // }
  }

  updateData(newData: TextValueOptionConfig[]): void {
    this.options().data = newData;
    this.setDropdownOptions(newData);
  }

  ngOnChanges = (changes: SimpleChanges): void => {
    // if (!changes['options'].firstChange) {
    //   this.setDropdownOptions(this.options.data);
    // }
  };

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

  get selectedItemClass(): string {
    return this.selectedItemsCount > this.selectedItemsToDisplay
      ? 'selected-many'
      : 'selected-' + this.selectedItemsCount;
  }

  get control(): AbstractControl {
    return this.formGroup.get(this.options().formControlName)!;
  }

  get formControlName(): string {
    return this.options().formControlName;
  }

  get isAllowMultiple(): boolean {
    return this.options().features?.allowMultiple ? true : false;
  }

  get isAllowClear(): boolean {
    return this.options().features?.allowClear ? true : false;
  }

  get isAllowSearching(): boolean {
    return this.options().features?.allowSearching ?? false;
  }

  get searchPlaceholderLabel(): string {
    const searchPlaceholderLabel =
      this.options().features?.searchPlaceholderLabel;
    return searchPlaceholderLabel && searchPlaceholderLabel !== ''
      ? searchPlaceholderLabel
      : this.defaultSearchPlaceholderLabel;
  }

  get searchNoEntriesFoundLabel(): string {
    const searchNoEntriesFoundLabel =
      this.options().features?.searchNoEntriesFoundLabel;
    return searchNoEntriesFoundLabel && searchNoEntriesFoundLabel !== ''
      ? searchNoEntriesFoundLabel
      : this.defaultSearchNoEntriesFoundLabel;
  }

  get showToggleAllCheckbox(): boolean {
    const show =
      this.options().features?.showToggleAllCheckbox == false ? false : true;
    return show && this.dropDownOptions.length > 0;
  }
  get showSelectedCount(): boolean {
    return this.options().features?.showSelectedCount ?? false;
  }

  get isError(): boolean {
    return this.control?.touched && this.control?.errors ? true : false;
  }

  // get errorConfig(): ErrorMessageOptions {
  //   return {
  //     control: this.control,
  //     formStatus: this.formGroup.status,
  //     label:this.options.label,
  //   };
  // }
  get chipCount(): number {
    return this.selectedItemsToDisplay;
  }
  get selectedChips(): any {
    return this.dropdownModelValue.slice(0, this.selectedItemsToDisplay);
  }

  setDropdownOptions = (data: TextValueOptionConfig[]): void => {
    this.dropDownOptions = data;
    if (this.isAllowMultiple) {
      this.setToggleState();
    }
    this.isLoaded = true;
  };

  selectionChange = (): void => {
    if (!this.options().features?.allowMultiple) this.setFormControlValue();
  };

  getMultiSelectedOptionForDisplay(option: string): string {
    if (this.options().data.length > 0) {
      option = this.options().data?.find((y) => y.value == option)?.text!;
    }
    return option;
  }

  getSelectedOptionForDisplay = () => {
    if (this.options().data.length > 0) {
      if (
        this.dropdownModelValue === null ||
        this.dropdownModelValue === undefined
      ) {
        return '';
      }
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

  optionClick = (): void => {
    if (this.options().features?.allowMultiple) {
      const allOptions = Array.from(
        this.dropDownOptions?.map((x) => {
          return x.value;
        })
      );
      this.dropdownModelValue.length === allOptions.length &&
      this.dropdownModelValue.every(
        (key: number, value: any) => key === allOptions[value]
      )
        ? (this.dropdownModelValue = allOptions)
        : (this.dropdownModelValue = Array.from(this.dropdownModelValue));
    }
    this.setFormControlValue();
    this.filterData();
  };

  clear = (): void => {
    if (this.isAllowClear) {
      this.dropdownModelValue = this.options().features?.allowMultiple
        ? []
        : null;
      this.setFormControlValue();
    }
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
          const opt = this.dropDownOptions?.find(
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
          this.dropDownOptions?.find(
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
    if (this.isAllowSearching) {
      const search = this.dropdownSearchCtrl.value?.toLowerCase();
      const dropdownData = search
        ? this.options().data!.filter(
            (x) => x.text.toLowerCase().indexOf(search) > -1
          )
        : this.options().data;
      this.setDropdownOptions(dropdownData);
    }
  };

  toggleSelectAll = (selectAllValue: boolean): void => {
    if (selectAllValue) {
      this.allOptions = Array.from(
        this.dropDownOptions?.map((x) => {
          return x.value;
        })
      );
    }
    this.dropdownModelValue = selectAllValue ? this.allOptions : [];
    this.setFormControlValue();
    this.filterData();
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

  private setToggleState = (): void => {
    const selectedValue = this.control?.value
      ? Array.from(this.control.value)
      : [];
    if (selectedValue.length > 0 && this.dropDownOptions?.length > 0) {
      this.isIndeterminate =
        this.dropDownOptions.length >
        this.dropDownOptions.filter(
          (x) => selectedValue.findIndex((y) => y == x.value) > -1
        ).length;
      this.isChecked =
        this.dropDownOptions.length ==
        this.dropDownOptions.filter(
          (x) => selectedValue.findIndex((y) => y == x.value) > -1
        ).length;
    } else {
      this.isIndeterminate = false;
      this.isChecked = false;
    }
  };

  private setControlDefaultValue = (): void => {
    if (this.control?.value == null && this.isAllowMultiple) {
      this.control.setValue([], { emitEvent: false });
    }
  };

  private setSelectedValue = (): void => {
    if (this.isAllowMultiple && this.control?.value) {
      let selectedValue = Array.from(new Set(this.control?.value));
      selectedValue = selectedValue.filter(
        (x) => this.options().data.findIndex((y) => y.value == x) > -1
      );
      this.control.setValue(selectedValue, { emitEvent: false });
      this.dropdownModelValue = selectedValue;
    } else {
      this.dropdownModelValue = this.control?.value;
    }
  };
  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
