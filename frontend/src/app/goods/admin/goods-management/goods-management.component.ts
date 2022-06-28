import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GoodsService } from 'app/services/goods/goods.service';
import { Goods } from 'app/types/index';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-goods-management',
  templateUrl: './goods-management.component.html',
  styleUrls: ['./goods-management.component.scss'],
})
export class GoodsManagementComponent implements AfterViewInit {
  notifierSubscription: Subscription;

  // notifierSubscription: Subscription =
  //   this.goodsService.subjectNotifier.subscribe((notified) => {
  //     console.log(notified);

  //   });
  displayedColumns: string[] = ['id', 'name', 'category', 'price', 'action'];
  dataSource: MatTableDataSource<Goods>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private goodsService: GoodsService, public dialog: MatDialog) {
    this.notifierSubscription = this.goodsService.getUpdate().subscribe(() => {
      this.listGoods();
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.notifierSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.listGoods();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  listGoods() {
    this.goodsService.listGoods().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onDelete(row: Goods) {
    this.goodsService.removeGood(row.id).subscribe(() => this.listGoods());
  }

  openDialog(row?: Goods | undefined): void {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '600px',
      data: row,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
