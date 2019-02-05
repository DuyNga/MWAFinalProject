
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject ,Output, EventEmitter} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
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
  @Output() closeEmitter = new EventEmitter();
  constructor(fb: FormBuilder,
    private questionService: QuestionsService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {

    console.log(data);
    this.crudQuestionForm = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
      role: 'staff',
      status: 'active'
    });
    if ( data == null ) {
      console.log("set new");
      this.data = new Questions();
    }

  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);
 
  ngOnInit() {
  }
  addNewQuestion(){
    console.log(this.data);
    console.log(this.data.id);
    console.log(this.data._id);
    this.questionService.addNewQuestion((this.data)).subscribe(result => {
      console.log(result);
    });

  }

  cancel(){
    this.closeEmitter.emit();
  }

}
