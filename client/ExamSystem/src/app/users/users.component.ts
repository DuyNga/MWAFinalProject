import { CrudUserComponent } from './crud-user/crud-user.component';
import { Users } from './users.model';
import { UsersService } from './users.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatDialog} from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['username', 'fullname', 'role', 'status', 'actions'];
  dataSource = new MatTableDataSource<Users>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public usersService: UsersService,
    public dialog: MatDialog) { }

  ngOnInit() {
    console.log('User Oninit');
    this.loadData();
  }

  addNew() {
    console.log('add new click');


    const newDialog = this.dialog.open(CrudUserComponent, {
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
    const editDialog = this.dialog.open(CrudUserComponent, {
      width: '80%',
      height: 'auto',
      data: data
    });
    editDialog.afterClosed().subscribe(result => {
      this.loadData();
    });
  }
  deleteItem(id) {
    console.log('Delete click');
    this.usersService.deactiveUserById(id).subscribe(result => {
      this.loadData();
    });
   }
   delete(id) {
    console.log('Delete click');
    this.usersService.   deleteUserById
    (id).subscribe(result => {
      this.loadData();
    });
   }

   public loadData() {
    this.usersService.getAllUser().subscribe(result => {
      console.log(result);
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
    });
  }
}
