import { Routes } from '@angular/router';
import { DropdownPage } from './pages/dropdown/dropdown/dropdown.component';

export const routes: Routes = [
    {
      path: 'dropdown',
      pathMatch: 'full', // Ensures that the path matches the entire URL
      component: DropdownPage, // Use the component property to specify the component
    },
  ];