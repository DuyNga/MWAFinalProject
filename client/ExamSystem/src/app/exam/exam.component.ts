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
  timeLeft;
  interval;
  constructor(private examService: ExamService, public dialog: MatDialog, private router: Router
    , private invitationService : InvitationsService, fb: FormBuilder, ) {

    this.data = new Questions();
    this.exam = fb.group({
      floatLabel: 'auto',
    });
    const token = this.router.url.split('/')[2];
    const decodeToken = decode(token);
    console.log(decode(token));
    this.decodeToken = decode(token);
    this.tokenVerification(token, (valid) => {
      console.log(valid);
      console.log(decodeToken);
      console.log(decodeToken.invInfo.id);
      if(valid===1){
        this.invitationService.getInvitationById(decodeToken.invInfo.id).subscribe(result=>{

            if(result.id == decodeToken.invInfo.id
              && result.email == decodeToken.invInfo.email
              && result.inviteeName == decodeToken.invInfo.name){
                const dialogRef = this.dialog.open(AgreementComponent);

                dialogRef.afterClosed().toPromise().then(
                  res => { // Success
                    if(res !== undefined && res !== false){
                          this.randomQuestion();
                          this.examService.addTokenToBlackList(JSON.stringify({token : token}))
                          .subscribe(usedToken => console.log("token used"));
                          // this.timeLeft = 60;
                          // this.interval = setInterval(() => {
                          //   if(this.timeLeft > 0) {
                          //     this.timeLeft--;
                          //   } else {
                          //     this.timeLeft = 60;
                          //   }
                          // },1000)
                  }
                }
                );
            } else {
              this.errorMess = 'Incorrect Token! System will automatic redirect in to home page in 5 seconds!';
              setTimeout(function(){ router.navigate(['/index']); }, 5000);
            }
        });
      } else {
        this.errorMess = 'Your session is ended! System will automatic redirect in to home page in 5 seconds!';
        setTimeout(function(){ router.navigate(['/index']); }, 5000);
      }
    });
   }

   ngOnInit() {

  }

  randomQuestion() {
    this.examService.getRandom().subscribe(result =>{
      this.result = result;
      result.forEach(element => {
        element.answer = '';
      });
    });

  }

  decode(token) {
    return decode(token);
  }

  tokenVerification(token, callBack){
     this.examService.getBlackListToken(token).subscribe(result =>{
      console.log(result);
      if(result !== null)
        {
            callBack (0);
        } else {
        callBack(1);
    }
    });
  }

  submitAnswer(){
    const data = {id : this.decodeToken.invInfo.id, submittedAnswer : this.result};
    this.examService.submitAnswer(data).subscribe(result =>{
      alert('Thanks you, your answer is submitted. You will be redirect to homepage after click OK');
      this.router.navigate(['/index']);
    });
  }
}

