import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog,MatDialogRef } from '@angular/material';
import { InvitationsService } from '../invitations.service';
import { Invitations } from '../invitations.model';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-crud-invitation',
  templateUrl: './crud-invitation.component.html',
  styleUrls: ['./crud-invitation.component.css']
})

export class CrudInvitationComponent implements OnInit {
  crudInvitationForm: FormGroup;
  hide = true;
  isShowAnswer = false;
  isShowResult = false;
  @Output() onAdd = new EventEmitter;
  constructor(fb: FormBuilder,
    private invitationService: InvitationsService,
    @Inject(MAT_DIALOG_DATA,
      ) public data: any,
      public dialogRef: MatDialogRef<CrudInvitationComponent>
    ) {

    console.log(data);
    this.crudInvitationForm = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
      role: 'staff',
      status: 'active'
    });
    if ( data == null ) {
      console.log("set new");
      this.data = new Invitations();
    }
    if (!data.hasOwnProperty('_id')){
      this.data.status="Not Sent";
    }
    if (!data.hasOwnProperty('result')){
      this.data.result="";
    }
    if (data.hasOwnProperty('submittedAnswer')){
      this.isShowResult=true;
      this.isShowAnswer=true;
    }
    this.data.answers=['a','b','c'];
    this.data.questions=['a1','b1','c1'];

  }

  formControl = new FormControl('', [
    Validators.email,
    Validators.required
  ]);
 
  ngOnInit() {
  }
  randomQuestion(){
    this.invitationService.randomQuestion().subscribe(result => {
      console.log(result);
      this.data.questions=result;
    });

  }
  sendEmail(){
    if (!this.data.hasOwnProperty('_id')){
      this.addNewInvitation();
    }
    console.log(this.data);
    this.invitationService.sendEmail((this.data)).subscribe(result => {
      console.log(result);
    });

  }
  addNewInvitation(){
    this.data.token=this.randomToken();
    this.data.questionIds=[];
    console.log(this.data);
    this.invitationService.addNewInvitation((this.data)).subscribe(result => {
      console.log(result);
    });
    this.onAdd.emit('');
    this.cancel();
  }

  cancel(){
    this.dialogRef.close();
  }
  randomToken() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }
}
