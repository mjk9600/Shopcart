import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private builder: FormBuilder, private service: AuthService, private router: Router,
    private toastr: ToastrService) {
 
  }

  registerform = this.builder.group({
    username: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    // name: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    // role: this.builder.control(''),
    isactive: this.builder.control(false)
  });
  proceedregister() {
    if (this.registerform.valid) {
      console.log(this.registerform.value)
      this.service.RegisterUser(this.registerform.value).subscribe(result => {
        this.toastr.success('Please contact admin for enable access.','Registered successfully')
        this.router.navigate(['login'])
      },
      (err) => this.toastr.error('Username or Email already taken!')
      );
    }
   
     else {
    //  if(this.registerform.value.username){
    //     this.toastr.warning('Username minimum length 5 charecter. ')
    //   }
    //  else if(this.registerform.value.email){
    //     this.toastr.warning('Email must be proper format.')
    //   }
      
    //   else if(this.registerform.value.password){
    //     this.toastr.warning('Password minimum length 8 charecter. ')
    //   }
      this.toastr.warning( `1.Username must be 5 charecter.
      2.Email must be in Proper Format.
      3.Password has Atleast 8 charecter with First letter must be Capital, use special charecter and number
      Example: Demo@1234. `,'Enter Valid Format', { closeButton: true, timeOut: 4000, progressBar: true})
    }
  }

}