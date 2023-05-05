import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router
  ) {
    sessionStorage.clear();
  }
  result: any;

  loginform = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  });

  // *********spring backend *****************

  loginUser() {
    if (this.loginform.valid) {
      this.service.LoginUser(this.loginform.value).subscribe(
        (item) => {
          this.result = item;
          console.warn('item', item);
          console.log(this.result.username);
          console.log(this.loginform.value.password);
          if (this.result.accessToken) {
            console.log(this.result.active);
            if (this.result.active == true) {
              sessionStorage.setItem('username', this.result.username);
              sessionStorage.setItem('id', this.result.id);
              sessionStorage.setItem('role', this.result.roles);
              sessionStorage.setItem('token', this.result.accessToken);
              sessionStorage.setItem('reload', 'true');
              sessionStorage.setItem('user', JSON.stringify(this.result));
              if (this.result.roles == 'admin') {
                this.router.navigate(['product/{{result.id}}']);
              } else {
                this.router.navigate(['home/{{result.id}}']);
              }
            } else {
              this.toastr.error('Please contact Admin', 'InActive User');
            }
          } else {
            this.toastr.error('Dear user token is not generated!');
          }

          console.warn('item', item);
        },

        (err) => this.toastr.error('Invalid credentials')
      );
    } else {
      this.toastr.warning('Please enter valid data.');
    }
  }
}
