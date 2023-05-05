import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject, map, tap } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService implements OnInit {
  userId: any;
  private _refreshrequired = new Subject<void>();
  get RequiredRefresh() {
    return this._refreshrequired;
  }

  constructor(private _http: HttpClient) {}
  ngOnInit(): void {
    this.userId = sessionStorage.getItem('username');
  }
  publicUrl = 'http://localhost:8080/api/auth/published';
  baseUrl = 'http://localhost:8080/api/product';
  productUrl = 'http://localhost:8080/api/test/products';
  token = sessionStorage.getItem('token');
   head_obj = new HttpHeaders().set("Authorization","Bearer "+this.token);

  // Getall() {
  //   return this._http.get(this.apiurl);
  // }

 
 
  
  // Save(inputdata: any) {
  //   return this._http.post(this.apiurl, inputdata).pipe(
  //     tap(() => {
  //       this.RequiredRefresh.next();
  //     })
  //   );
  // }

  //   EditProduct(inputdata:any){
  //     return this._http.put(this.apiurl,inputdata).pipe(
  //       tap(()=>{
  // this.RequiredRefresh.next();
  //       })
  //     );
  //   }

  

  

  // editProduct(id: any, inputdata: any) {
  //   return this._http.put(this.apiurl + '/' + id, inputdata);
  // }

  // GetDes() {
  //   return this._http.get(this.apiurl);
  // }


  // updateVendor(data: any, id: number) {
  //   return this._http.put<any>("http://localhost:3000/vendorproduct" + "/" + id, data)
  //     .pipe(map((res: any) => {
  //       return res;
  //     }))
  // }
  
  // *******************Spring
  saveFile(FormData: FormData): Observable<any> {
  
    let token = sessionStorage.getItem('token');
    const _headers = new HttpHeaders({
      // 'Content-Type':
      //   'multipart/form-data; boundary=<calculated when request is sent>',
      Authorization: 'Bearer ' + token,
    });
    console.log(FormData);
    return this._http.post("http://localhost:8080/api/addProduct", FormData,{headers:_headers});
  }

  // ********** Done at backend side ***************

  GetProduct(): Observable<Product[]> {
    return this._http.get<Product[]>(this.productUrl,{headers:this.head_obj});
  }

  addProduct(data: FormData): Observable<any> {


    return this._http
      .post(this.baseUrl, data, { headers: this.head_obj, observe:'response' })
      .pipe(
        tap(() => {
          this.RequiredRefresh.next();
        })
      );
  }

   
  GetProductById(userId: string): Observable<Product> {
    return this._http.get<Product>(this.baseUrl+'/' + `${userId}`,{headers:this.head_obj});
  }


  GetProductbycode(code: any) {
    return this._http.get(this.baseUrl + '/id/' + code,{headers:this.head_obj});
  }
  
  Remove(code: any) {
    return this._http.delete(this.baseUrl + '/' + code,{headers:this.head_obj});
  }

  updateProduct(id: any, data: FormData): Observable<any> {
    console.warn(data);
    return this._http.put(this.baseUrl + '/' + `${id}`, data,{headers:this.head_obj}).pipe(
      tap(() => {
        this.RequiredRefresh.next();
      })
    );
  }

  approveProduct(id: any, data: FormData): Observable<any> {
    console.warn(data);
    return this._http.patch(this.baseUrl + '/' + `${id}`, data,{headers:this.head_obj}).pipe(
      tap(() => {
        this.RequiredRefresh.next();
      })
    );
  }

  getApproveProduct(){
    return this._http.get<Product[]>(this.publicUrl );
  }
}
