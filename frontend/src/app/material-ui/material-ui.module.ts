import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

const materialModules = [MatBadgeModule, MatToolbarModule, MatIconModule];

@NgModule({
  declarations: [],
  imports: [],
  exports: [...materialModules],
})
export class MaterialUIModule {}
