
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog,MatDialogRef } from '@angular/material';
import { QuestionsService } from '../questions.service';
import { Questions } from '../question.model';

@Component({
  selector: 'app-crud-question',
  templateUrl: './crud-question.component.html',
  styleUrls: ['./crud-question.component.css']
})
export class CrudQuestionComponent implements OnInit {
  crudQuestionForm: FormGroup;
  hide = true;
  constructor(fb: FormBuilder,
    private questionService: QuestionsService,
    @Inject(MAT_DIALOG_DATA,
      ) public data: any,
      public dialogRef: MatDialogRef<CrudQuestionComponent>
    ) {

    console.log(data);
    this.crudQuestionForm = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
      role: 'Staff',
      status: 'active'
    });
    if ( data == null ) {
      console.log("set new");
      this.data = new Questions();
      this.data.status="Active";
    }

  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);
 
  ngOnInit() {
  }
  addNewQuestion(){
    this.questionService.addNewQuestion((this.data)).subscribe(result => {
      console.log(result);
      this.dialogRef.close();
    });

  }

  cancel(){
    this.dialogRef.close();
  }

}
