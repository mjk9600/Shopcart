import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductsService } from '../service/products.service';
import { AddproductComponent } from '../addproduct/addproduct.component';
import { Product } from '../model/product';
import { ToastrService } from 'ngx-toastr';
import * as alertify from 'alertifyjs'

@Component({
  selector: 'app-productconfig',
  templateUrl: './productconfig.component.html',
  styleUrls: ['./productconfig.component.css']
})
export class ProductconfigComponent implements OnInit {

  // constructor(private builder: FormBuilder, private _service: ProductsService, private dialog: MatDialog) {
  //   this.LoadUser();
  
  // }
  // userlist: any;
  // dataSource: any;
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;

  // ngAfterViewInit(): void {

  // }
  // LoadUser() {
  //   this._service.GetProduct().subscribe(res => {
  //     this.userlist = res;
  //     this.dataSource = new MatTableDataSource(this.userlist);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //   });
  // }
  // displayedColumns: string[] = [ 'name', 'image', 'price', 'category', 'action'];

  // updateuser(code: any) {
  //   this.OpenDialog('1000ms', '600ms', code);
  // }

  displayedColumns: string[] = ['code', 'name', 'image', 'price', 'vendor','action'];
  dataSource: any;
  empdata: any;
  userId: any;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private toastr: ToastrService,private service: ProductsService, private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem("username")
    // alertify.success(this.userId);
    this.GetAll();
    this.service.RequiredRefresh.subscribe(r => {
      this.GetAll();
    });
  }

  GetAll() {
    // this.service.GetProductbycode(this.userId).subscribe(result => {
      this.service.GetProductById(this.userId).subscribe(result => {
        
      this.empdata = result;
      console.log(this.empdata);
      this.dataSource = new MatTableDataSource<Product>(this.empdata);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // this.dataSource.filter((u: { Product: { uid: any; }; })=> u.Product.uid == this.userId );
      // this.dataSource.filteredData.filter((u)=>u.uid == this.userId);
      // console.warn(this.dataSource.filteredData);
            
    });
  }
  Filterchange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    
    this.dataSource.filter = filvalue;
    this.dataSource.filteredData.filter( (res: { uid: any; })=> 
      {res.uid == this.userId });
  }
  getrow(code: any) {
    
  }
  FunctionEdit(code: any) {
    this.OpenDialog('1000ms','600ms',code)
  }
  FunctionDelete(code: number) {
    alertify.confirm("Remove Employee","Do you want to remove?",()=>{
      this.service.Remove(code).subscribe(result => {
        this.GetAll();
        alertify.success("Removed successfully.")
      });

    },function(){

    })
    
  }

  // EditProduct() {
  //   this.service.editProduct(this.dataSource.value.id, this.dataSource.value).subscribe(res => {
  //     this.toastr.success('Updated successfully.');
  //     // this.dialogref.close();
  //   });
  // }

  OpenDialog(enteranimation: any, exitanimation: any, code: any) {
    console.log(code + "id of p");
    this.dialog.open(AddproductComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '50%',
      data: {
     empcode:code
      }
    });
    // popup.afterClosed().subscribe(res => {
    //   this.LoadUser();
    // });
  }

}