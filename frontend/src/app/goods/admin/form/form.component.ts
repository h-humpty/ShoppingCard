import { Component, OnInit, Inject } from '@angular/core';
import { GoodsService } from 'app/services/goods/goods.service';
import { Goods, Category } from 'app/types/index';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private goodsService: GoodsService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
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

  sendMessage(): void {
    // send message to subscribers via observable subject
    this.goodsService.sendUpdate('Refresh');
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
        this.goodsService.uploadImage(formData).subscribe(() => {
          this.sendMessage();
          this.openSnackBar('New good added!', 'OK');
        });
      });
    }
    //update
    else {
      this.goodsService.updateGood(formValue).subscribe((res) => {
        formData.append('id', res.images?.[0]?.id.toString());
        this.goodsService.updateImage(formData).subscribe((res: any) => {
          this.sendMessage();
          this.openSnackBar('Good is updated!!', 'OK');
        });
      });
    }
  }
}
