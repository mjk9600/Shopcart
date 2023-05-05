import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(private _service: ProductsService) {
    this.LoadProducts();
  }
  productlist: any;
  dataSource: any;

  LoadProducts() {
    this._service.getApproveProduct().subscribe((res) => {
      this.productlist = res;
    });
  }
}
