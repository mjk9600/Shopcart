import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { usermodel } from '../model/usermodel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private _refreshrequired=new Subject<void>();
  get RequiredRefresh(){
    return this._refreshrequired;
  }


  // user = new Subject<usermodel>();
  // user : usermodel = new usermodel();
  constructor(private http:HttpClient) { 

  }
  baseUrl='http://localhost:8080/api';
  signUpurl = 'http://localhost:8080/api/auth/signup';
  signInurl = 'http://localhost:8080/api/auth/signin';
  token = sessionStorage.getItem('token');
   head_obj = new HttpHeaders().set("Authorization","Bearer "+this.token);

  RegisterUser(inputdata:any){
    return this.http.post(this.baseUrl+'/auth/signup',inputdata)
  }

  LoginUser(inputdata:any){
    return this.http.post(this.baseUrl+'/auth/signin',inputdata)
  }


  GetUserbyCode(id:any){
 
    
    return this.http.get<any>(this.baseUrl+'/test/users/'+ id,{headers:this.head_obj});
    
  }
  Getall(){
    // let token = sessionStorage.getItem('token')
    // let head_obj = new HttpHeaders().set("Authorization","Bearer "+token)
    return this.http.get(this.baseUrl+'/test/users',{headers:this.head_obj});
  }
  updateuser(id:any,inputdata:any){
    
    return this.http.put(this.signUpurl+'/'+id,inputdata);
  }
  getuserrole(){
    return this.http.get('http://localhost:3000/role');
  }
  isloggedin(){
    return sessionStorage.getItem('username')!=null;
  }
  getrole(){
    return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():'';
  }
  GetAllCustomer(){
    return this.http.get('http://localhost:3000/customer');
  }
  Getaccessbyrole(role:any,menu:any){
    return this.http.get('http://localhost:3000/roleaccess?role='+role+'&menu='+menu)
  }


  userPermission(id:any,data: FormData){

    return this.http.patch<any>(this.baseUrl+'/test/users/'+`${id}`,data,{headers:this.head_obj});
  }
}
