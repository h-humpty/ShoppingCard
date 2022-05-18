import { Component, OnInit, Inject } from '@angular/core';
import { Category } from 'app/types/index';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GoodsService } from 'app/services/goods/goods.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  id: number | undefined = this.data?.id || undefined;
  name: string = this.data?.name || '';
  description: string = this.data?.description || '';

  constructor(
    public dialogRef: MatDialogRef<CategoryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category | undefined,
    private goodsService: GoodsService
  ) {}

  ngOnInit(): void {
    console.log('get data from form', this.data);
    // if (this.data === undefined) {
    //   this.data = { name: '', description: '' };
    // }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(_values: any) {
    // this.goodsService.
    const formValue = _values.form.value;
    const value = { ...formValue, id: this.id };

    //new Category
    if (!this.id) {
      this.goodsService.addCategory(value).subscribe((res) => console.log(res));
    }
    //update
    else {
      this.goodsService.updateCategory(value).subscribe((res) => {
        console.log(res);
      });
    }
  }
}
