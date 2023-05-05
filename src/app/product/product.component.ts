import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AddproductComponent } from '../addproduct/addproduct.component';
import { Product } from '../model/product';
import { AuthService } from '../service/auth.service';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  
  displayedColumns: string[] = ['code', 'name', 'image', 'price','vendor','action'];
  dataSource: any;
  empdata: any;
  userId: any;
  published:any = true;
  reload:any = sessionStorage.getItem('reload')
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private toastr: ToastrService,private service: ProductsService,private dialog: MatDialog) {

  }

  ngOnInit(): void {
    if (this.reload) {
      sessionStorage.removeItem('reload');
      location.reload();
       }
    this.userId = sessionStorage.getItem("username")
    // alertify.success(this.userId);
    this.GetAll();
    // this.productApprove(id:any)
    this.service.RequiredRefresh.subscribe(r => {
      this.GetAll();
    });
  }

  // productApprove(id:any){
  //   this.service.GetProductbycode(id).subscribe(item => {
  //    this.empdata.patchValue({
  //       isactive:true
  //     })
  //   });
  // }
  //   this.dataSource.isactive = true;
  //  console.log( this.dataSource.isactive );
  

  GetAll() {
      this.service.GetProduct().subscribe(result => {
        
      this.empdata = result;
      // console.log(this.empdata);
      this.dataSource = new MatTableDataSource<Product[]>(this.empdata);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // this.dataSource.filter((u: { Product: { uid: any; }; })=> u.Product.uid == this.userId );
      // this.dataSource.filteredData.filter((u)=>u.uid == this.userId);
      // console.warn(this.dataSource.filteredData);
            
    });
  }
  productApprove(data: any) {

     
   const approveData = new FormData();
    approveData.append('published', this.published);
    // data['published'] = true;
    this.service.approveProduct(data, approveData).subscribe(res => {
      console.log("Updated Successfully");
    })
    // this.OpenDialog('1000ms','600ms',code)
    
  }

  OpenDialog(enteranimation: any, exitanimation: any, code: any) {
    console.log(code + "id of p");
    this.dialog.open(AddproductComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '50%',
      data: {
        empcode: code
        
      }
    });
}

}
