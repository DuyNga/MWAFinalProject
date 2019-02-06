import { ExamService } from './exam.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  constructor(private examService: ExamService) { }
  result;
  ngOnInit() {
    this.examService.getRandom().subscribe(result => {
      this.result =result;
    });
  }

}
