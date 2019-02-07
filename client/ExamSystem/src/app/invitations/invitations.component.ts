import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { Invitations } from './invitations.model';
import { InvitationsService } from './invitations.service';
import { CrudInvitationComponent } from './crud-invitation/crud-invitation.component';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.css']
})
export class InvitationsComponent implements OnInit {
  displayedColumns: string[] = ['inviteeName', 'email', 'result', 'status', 'actions'];
  dataSource = new MatTableDataSource<Invitations>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public invitationService: InvitationsService,
    public dialog: MatDialog) { }

  ngOnInit() {
    console.log('Invitation Oninit');
    this.loadData();
  }

  addNew() {
    console.log('add new click');
    const newDialog = this.dialog.open(CrudInvitationComponent, {
      width: '80%',
      minHeight: '300px',
      data: { data: '' }
    });

    newDialog.afterClosed().subscribe(result => {
      this.loadData();
    });
  }
  sendEmail(data){
    this.invitationService.sendEmail((data)).subscribe(result => {
      console.log(result);
    });

  }
  startEdit(data) {
    console.log(data + 'row Edit click');
    const editDialog = this.dialog.open(CrudInvitationComponent, {
      width: '80%',
      height: 'auto',
      data: data
    });
    editDialog.componentInstance.onAdd.subscribe((data: any) => {
      this.loadData();
    });
  }
  deleteItem(id) {
    console.log('Delete click ' + id);
    this.invitationService.deactiveInvitationById(id).subscribe(result => {
      this.loadData();
    });
  }

  public loadData() {
    this.invitationService.getAllInvitation().subscribe(result => {
      console.log(result);
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
    });
  }
}
