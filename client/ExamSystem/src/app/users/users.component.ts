import { Users } from './users.model';
import { UsersService } from './users.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['username', 'fullname', 'role', 'status'];
  dataSource = new MatTableDataSource<Users>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public usersService: UsersService) { }

  ngOnInit() {
    console.log('User Oninit');
    this.usersService.getAllUser().subscribe(result => {
      console.log(result);
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
    });
  }

}
