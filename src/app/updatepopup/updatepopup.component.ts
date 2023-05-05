import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css']
})
export class UpdatepopupComponent implements OnInit {

  userActive:any;

  constructor(private builder: FormBuilder, private service: AuthService, private toastr: ToastrService,
    private dialogref: MatDialogRef<UpdatepopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.service.getuserrole().subscribe(res => {
      this.rolelist = res;
    });
    
    

  }
  ngOnInit(): void {
    if (this.data.usercode != '' && this.data.usercode != null) {
      this.loaduserdata(this.data.usercode);
    }
  }
  rolelist: any;
  editdata: any;
  Editid: any;

  registerform = this.builder.group({
    // id: this.builder.control(''),
    username: this.builder.control(''),
    password: this.builder.control(''),
    email: this.builder.control(''),
    // role: this.builder.control(''),
    isactive: this.builder.control(false)
   
  });

  loaduserdata(code: any) {
    
    this.service.GetUserbyCode(code).subscribe(res => {
      this.editdata = res;
      this.Editid = this.editdata.id;
      console.warn(this.editdata);
      // this.editdata.setValue({
      //    username: this.editdata.username,
      //   password: this.editdata.password, email: this.editdata.email, 
      //  isactive: this.editdata.isactive
      // });
      this. registerform.controls['isactive'].setValue(this.editdata.active);
    });
  }
  UpdateUser() {
    
    this.userActive = this.registerform.value.isactive;
    const userActivation = new FormData();
    userActivation.append('active', this.userActive);
    console.warn( this.editdata);
    console.warn(userActivation + this.Editid)
    this.service.userPermission(this.Editid, userActivation).subscribe(res => {
      this.toastr.success('Updated successfully.');
      this.dialogref.close();
    });
  }

}
