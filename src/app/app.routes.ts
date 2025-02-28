import { Routes } from '@angular/router';
import { ItemComponent } from './components/item/item.component';

export const routes: Routes = [
  { path: '', component: ItemComponent }, // CRUD Component
  { path: '**', redirectTo: '', pathMatch: 'full' } // Catch-all Route
];
