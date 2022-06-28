import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GoodsService } from 'app/services/goods/goods.service';
import { Category } from 'app/types/index';
import { MatDialog } from '@angular/material/dialog';
import { CategoryFormComponent } from 'app/goods/admin/category-form/category-form.component';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  notifierSubscription: Subscription;
  displayedColumns: string[] = ['id', 'name', 'description', 'action'];
  dataSource: MatTableDataSource<Category>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private goodsService: GoodsService, public dialog: MatDialog) {
    this.notifierSubscription = this.goodsService.getUpdate().subscribe(() => {
      this.listCategories();
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.listCategories();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  listCategories() {
    this.goodsService.listCategories().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onDelete(row: Category) {
    this.goodsService
      .removeCategory(row.id)
      .subscribe(() => this.listCategories());
  }

  openDialog(row?: Category | undefined): void {
    const dialogRef = this.dialog.open(CategoryFormComponent, {
      width: '600px',
      height: '300px',
      data: row,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
