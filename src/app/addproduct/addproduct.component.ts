import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css'],
})
export class AddproductComponent implements OnInit {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: ProductsService,
    public dialogref: MatDialogRef<AddproductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  editdata: any;
  userId: any;
  // Form Variables newProduct for saving Database
  imgfile: any = File;
  price: any;
  pname: any;
  uname: any;
  published: any;
  Editid: any;
  // imageform !:FormGroup
  // file_store: any = File;

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('username');
    if (this.data.empcode != null && this.data.empcode != '') {
      this.LoadEditData(this.data.empcode);
    }
  }

  LoadEditData(id: number) {
    console.warn(this.data);

    this.service.GetProductbycode(id).subscribe((item) => {
      console.warn(item);
      this.editdata = item;
      this.Editid = this.editdata.pid;
      console.warn(this.editdata.p_price);

      // this.newProduct.controls['id'].setValue(this.editdata.pid);
      // this.newProduct.controls['image'].setValue(this.editdata.p_image);
      this.newProduct.controls['name'].setValue(this.editdata.p_name);
      this.newProduct.controls['price'].setValue(this.editdata.p_price);
      this.newProduct.controls['isactive'].setValue(this.editdata.published);
      this.newProduct.controls['uid'].setValue(this.editdata.uname);
      // this.newProduct.setValue({
      //   id: this.editdata.pid,
      //   name: this.editdata.p_name,
      //   image: this.editdata.p_image,
      //   price: this.editdata.p_price,
      //   isactive: this.editdata.published,
      //   uid: this.editdata.uname,
      // });
    });
  }

  newProduct = new FormGroup({
    uid: new FormControl(''),
    id: new FormControl({ value: 0, disabled: true }),
    name: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    isactive: new FormControl(false),
  });

  onFileSelectedMethod(event: any) {
    // const reader = new FileReader();
    const file = event.target.files[0];
    console.log(file);
    this.imgfile = file;
  }

  // handleFileInputChange(l: File): void {
  //   this.file_store = l;
  //   if (l.length) {
  //     const f = l;
  //     const count = l.length > 1 ? `(+${l.length - 1} files)` : "";
  //     this.imgfile.patchValue(`${f.name}${count}`);
  //   } else {
  //     this.imgfile.patchValue("");
  //   }
  // }

  addproduct() {
    console.log(this.newProduct.value);
    if (this.newProduct.valid) {
      console.warn(this.Editid);
      if (this.Editid != '' && this.Editid != null) {
        this.price = this.newProduct.value.price;
        this.pname = this.newProduct.value.name;
        this.published = this.newProduct.value.isactive;
        this.uname = this.editdata.uname;
        const editData = new FormData();
        editData.append('newImage', this.imgfile);
        editData.append('p_name', this.pname);
        editData.append('p_price', this.price);
        editData.append('published', this.published);
        // editData.append('uname', this.uname);

        this.service
          .updateProduct(this.Editid, editData)
          .subscribe((response) => {
            this.dialogref.close();
            this.toastr.success('Updated successfully.');
          });
      } else {
        this.newProduct.patchValue({
          uid: this.userId,
        });

        this.price = this.newProduct.value.price;
        this.pname = this.newProduct.value.name;
        this.published = this.newProduct.value.isactive;
        this.uname = this.userId;
        const formData = new FormData();
        formData.append('image', this.imgfile);
        formData.append('pname', this.pname);
        formData.append('price', this.price);
        formData.append('published', this.published);
        formData.append('uname', this.uname);

        this.service.addProduct(formData).subscribe((response) => {
          this.dialogref.close();
          this.toastr.success('saved successfully.');
        });
      }
    }
    else{
      this.toastr.warning('All Field must be Required', '', { closeButton: true, timeOut: 4000, progressBar: true});
    }
  }

  // ___________________________________________________

  // ******************image upload ************8

  // productForm = this.builder.group({
  //   pname: this.builder.control(''),
  //   file: this.builder.control(''),
  //   price: this.builder.control(''),
  //   published: this.builder.control(true),
  //   uname: this.builder.control(''),
  // });

  // AddProduct() {
  //   this.price = this.productForm.value.price;
  //   this.pname = this.productForm.value.pname;
  //   this.published = this.productForm.value.published;
  //   this.uname = this.userId;

  //   if (this.productForm.valid) {
  //     console.log(this.userId);
  //     const formData = new FormData();
  //     formData.append('image', this.imgfile);
  //     formData.append('pname', this.pname);
  //     formData.append('price', this.price);
  //     formData.append('published', this.published);
  //     formData.append('uname', this.uname);

  //     this.service.addProduct(formData).subscribe((response) => {
  //       this.dialogref.close();
  //       this.toastr.success('saved successfully.');
  //     });
  //   }
  // }

  // *****88triel
  // storeImg() {
  //   if (this.imageform.valid) {

  //     const formData = new FormData();
  //     formData.append('image', this.imgfile );
  //     // formData.append('pname', this.userId);
  //     // formData.append('price', this.imgfile );
  //     // formData.append('published', this.imgfile );
  //     // formData.append('uname', this.imgfile );

  //     console.log(formData);

  //     this.service.saveFile(formData).subscribe((data) => {
  //       console.log(data);
  //       console.log("save success");
  //     })
  //   }
  // }
}
