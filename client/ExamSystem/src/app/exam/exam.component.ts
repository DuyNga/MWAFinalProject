import { Questions } from './../questions/question.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { InvitationsService } from './../invitations/invitations.service';
import { Router } from '@angular/router';
import { AgreementComponent } from './agreement/agreement.component';
import { MatDialog } from '@angular/material';
import { ExamService } from './exam.service';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import decode from 'jwt-decode';
@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  result; tokenValue;
  errorMess;
  exam: FormGroup;
  data: any;
  decodeToken;
  constructor(private examService: ExamService, public dialog: MatDialog, private router: Router
    , private invitationService : InvitationsService, fb: FormBuilder, ) {
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(result);
    //   if(result === undefined || result === false){
    //     this.randomQuestion();
    //   }
    // });
    this.data = new Questions();
    this.exam = fb.group({
      floatLabel: 'auto',
    });
    const token = this.router.url.split('/')[2];
    console.log(decode(token));
    this.decodeToken = decode(token);
    const isValidToken = this.tokenVerification(token);
    //if (isValidToken  === 1){
      const dialogRef = this.dialog.open(AgreementComponent);

      dialogRef.afterClosed().toPromise().then(
        res => { // Success
          if(res !== undefined && res !== false){
                this.randomQuestion();
                this.examService.addTokenToBlackList(JSON.stringify({token : token})).subscribe(result=> console.log("token used"));
        }
      }
      );
    // } else if(isValidToken === 0){
    //   this.errorMess = 'Your session is ended!';
    // }

   }

   ngOnInit() {

  }

  randomQuestion() {
    this.examService.getRandom().subscribe(result =>{
      this.result = result;
      result.forEach(element => {
        element.sampleAnswer = '';
      });
    });

  }

  decode(token) {
    return decode(token);
  }

 async tokenVerification(token){
    let isValid = 0;
     this.examService.getBlackListToken(token).subscribe(result =>{
      console.log(result);
      if(!result && result[0].token ===token){
         isValid = 0;
      } else {
         isValid = 1;
      }
    });

    // const decodeToken = decode(token);
    // console.log(decodeToken);

    // console.log(JSON.parse(decodeToken.info)._id);
    // const invi = JSON.parse(decodeToken.info);
    // this.invitationService.getInvitationById(invi._id).toPromise().then(result=>{
    //     console.log(result);
    // });
    return isValid;
  }

  submitAnswer(){
    const data = {id : this.decodeToken.invInfo.id, submittedAnswer : this.result};
    this.examService.submitAnswer(data).subscribe(result =>{
      console.log(result);
    });
  }
}
