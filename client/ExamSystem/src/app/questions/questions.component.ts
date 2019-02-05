import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatDialog} from '@angular/material';
import { Questions } from './question.model';
import { QuestionsService } from './questions.service';
import { CrudQuestionComponent } from './crud-question/crud-question.component';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  displayedColumns: string[] = ['question', 'sampleAnswer', 'status', 'actions'];
  dataSource = new  MatTableDataSource<Questions>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public questionsService: QuestionsService,
    public dialog: MatDialog) { }

  ngOnInit() {
    console.log('Question Oninit');
    this.loadData();
  }

  addNew() {
    console.log('add new click');


    const newDialog = this.dialog.open(CrudQuestionComponent, {
      width: '80%',
      height: 'auto',
      data: { data: '' }
    });

    newDialog.afterClosed().subscribe(result => {
      this.loadData();
    });
   }
  startEdit(data) {
    console.log(data + 'row Edit click');
    const editDialog = this.dialog.open(CrudQuestionComponent, {
      width: '80%',
      height: 'auto',
      data: data
    });
    editDialog.afterClosed().subscribe(result => {
      this.loadData();
    });
  }
  deleteItem(id) {
    console.log('Delete click '+ id);
    this.questionsService.deactiveQuestionById(id).subscribe(result => {
      this.loadData();
    });
   }

   public loadData() {
    this.questionsService.getAllQuestion().subscribe(result => {
      console.log(result);
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
    });
  }
}
