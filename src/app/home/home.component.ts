import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  userId: any;
  role: any;
  user: any;
  productlist: any;
  dataSource: any;
  reload: any = sessionStorage.getItem('reload');
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: AuthService,
    private _productService: ProductsService
  ) {}

  LoadProducts() {
    this._productService.GetProductById(this.userId).subscribe((res) => {
      this.productlist = res;
    });
  }

  ngOnInit(): void {
    if (this.reload) {
      sessionStorage.removeItem('reload');
      location.reload();
    }

    this.userId = sessionStorage.getItem('username');
    this.LoadProducts();
    // this.getUser();
  }

  // getUser(){
  //   return this.service.GetUserbyCode(this.userId).subscribe({
  //     next: (res: any) => {
  //       this.userId = res.id;
  //     },
  //     error: (e) => {
  //       console.log(e);
  //     },

  //   });
  // }
}
