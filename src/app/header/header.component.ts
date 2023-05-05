import { Component, DoCheck, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { usermodel } from '../model/usermodel';
import { AuthService } from '../service/auth.service';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements DoCheck {
  userId: any;
  role: any;
  // user : any;
  // userName : any;
  isadmin = false;
  isuser = false;
  isMenuVisible = false;
  isUserLoggedIn!: boolean;

  constructor(
    private loginservice: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private service: AuthService
  ) {
    this.loginservice.isUserLoggedIn.subscribe((value) => {
      this.isUserLoggedIn = value;
    });

    // this.role=sessionStorage.getItem('role');
    // this.userName=sessionStorage.getItem('username');
    // this.user = sessionStorage.getItem('user');
    // this.userId = this.user;
    if (this.role == 'admin') {
      this.isadmin = true;
    }
  }

  ngDoCheck(): void {
    let currentroute = this.router.url;
    let role = sessionStorage.getItem('role');
    if (
      currentroute == '/login' ||
      currentroute == '/dashbord' ||
      currentroute == '/register'
    ) {
      this.isMenuVisible = false;
    } else {
      this.isMenuVisible = true;
    }

    if (role == 'admin') {
      this.isadmin = true;
    } else {
      this.isadmin = false;
    }

    if (role == 'user') {
      this.isuser = true;
    } else {
      this.isuser = false;
    }
  }

  ngOnInit(): void {
    // this.userId = {
    //   id: this.route.snapshot.params["id"],
    // };
    this.userId = sessionStorage.getItem('username');

    // this.getUser();
    // this.service.RequiredRefresh.subscribe(r => {
    //   this.getUser();
    // });

    //  this.service.GetUserbyCode(this.userName).subscribe(res=>{
    //   this.userName = res.id;
    //   // this.userId = this.userName;
    //   console.warn(this.userName)
    //  })

    //  this.service.GetUserbyCode(this.userId.id).subscribe(res=>{
    //   this.userId = res.id;
    //   console.warn(this.userId)
    //  })
  }

  // getUser(){
  //   return this.service.GetUserbyCode(this.userId.id).subscribe({
  //     next: (res: any) => {
  //       this.userId = res.id;
  //     },
  //     error: (e) => {
  //       console.log(e);
  //     },

  //   });
  // }
}
