import { Component, OnInit, Inject } from '@angular/core';
import { GoodsService } from 'app/services/goods/goods.service';
import { Goods, Category } from 'app/types/index';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  formData: Partial<Goods> = {
    id: this.data?.id || undefined,
    name: this.data?.name || '',
    description: this.data?.description || '',
    category_id: this.data?.category_id || 0,
    price: this.data?.price || 0,
    images: this.data?.images || [],
  };

  uploadedImages: File[];
  categories: Category[];
  previewImage: string = this.data?.images?.[0]?.image || '';

  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Goods | undefined,
    private goodsService: GoodsService
  ) {}

  ngOnInit(): void {
    console.log('get data from form', this.data);

    this.getCategories();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  handleFileInput(event: any) {
    this.uploadedImages = event.target.files;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (!e.target) {
        return;
      }
      this.previewImage = e.target.result as string;
    };
    reader.readAsDataURL(this.uploadedImages[0]);
  }

  getCategories() {
    this.goodsService
      .listCategories()
      .subscribe((res) => (this.categories = res));
  }

  async onSubmit(value: NgForm) {
    const formValue = { ...value }.form.value;
    const formData = new FormData();
    if (this.uploadedImages[0]) {
      formData.append('image', this.uploadedImages[0]);
    }

    //new good
    if (!this.formData.id) {
      this.goodsService.addGood(formValue).subscribe((res) => {
        formData.append('goods', res.id.toString());
        this.goodsService
          .uploadImage(formData)
          .subscribe((res: any) => console.log(res));
      });
    }
    //update
    else {
      this.goodsService.updateGood(formValue).subscribe((res) => {
        formData.append('id', res.images?.[0]?.id.toString());
        this.goodsService
          .updateImage(formData)
          .subscribe((res: any) => console.log(res));
      });
    }
  }
}
