
/**
 * Features configuration for the dropdown/select component.
 */
export interface DropDownFeature {
    /**
     * Determines whether to allow clearing the selection.
     */
    allowClear?: boolean;
  
    /**
     * Determines whether to enable searching within the dropdown.
     */
    allowSearching?: boolean;
  
    /**
     * Determines whether to allow multiple selection.
     */
    allowMultiple?: boolean;
  
    /**
     * Number of selected items to display.
     */
    selectedItemsToDisplay?: 1 | 2 | 3 | 4 | 5;
  
    /**
     * Placeholder text for the search input.
     */
    searchPlaceholderLabel?: string;
  
    /**
     * Label to display when no entries are found during search.
     */
    searchNoEntriesFoundLabel?: string;
  
    /**
     * Determines whether to hide the clear search button.
     */
    hideClearSearchButton?: boolean;
  
    /**
     * Determines whether to show a "Toggle All" checkbox.
     */
    showToggleAllCheckbox?: boolean;
  
    /**
     * Determines whether to show the count of selected items.
     */
    showSelectedCount?: boolean;
  
    /**
     * Maximum number of chips to display when multiple items are selected.
     */
    chipCount?: number;
  }