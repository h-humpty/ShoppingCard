import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';

const materialModules = [
  MatBadgeModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatFormFieldModule,
  MatGridListModule,
  MatChipsModule,
  MatMenuModule,
  MatTableModule,
  MatPaginatorModule,
  MatDialogModule,
  MatTabsModule,
  MatSelectModule,
];

@NgModule({
  declarations: [],
  imports: [],
  exports: [...materialModules],
})
export class MaterialUIModule {}
