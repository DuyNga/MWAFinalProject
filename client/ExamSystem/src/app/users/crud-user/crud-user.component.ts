import { UsersService } from './../users.service';
import { Users } from './../users.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog,MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-crud-user',
  templateUrl: './crud-user.component.html',
  styleUrls: ['./crud-user.component.css']
})
export class CrudUserComponent implements OnInit {
  crudUserForm: FormGroup;
  hide = true;
  constructor(fb: FormBuilder,
    private userService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CrudUserComponent>
    ) {

    console.log(data);
    this.crudUserForm = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
      role: 'Staff',
      status: 'active'
    });
    if ( data == null ) {
      this.data = new Users();
    }

  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  ngOnInit() {
  }
  addNewUser() {
    console.log(this.data);
    this.userService.addNewUser(this.data).subscribe(result => {
      this.dialogRef.close();
      console.log(result);
      this.dialogRef.close();
    });

  }

  cancel() {
    this.dialogRef.close();
   }
}
