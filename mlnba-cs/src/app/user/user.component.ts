import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSort, MatTableDataSource } from '@angular/material';


import { User } from '../models/user.model';
import { UserService } from './user.service';
import { AppService } from '../app.service';

const ELEMENT_DATA: User[] = [];

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  users: User[];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  selectedUser : User;
  dialog: MatDialog

  columnsToDisplay = ['select', 'username', 'lastname', 'firstname', 'roles'];
  selection = new SelectionModel<User>(false, []);
  @ViewChild(MatSort) sort: MatSort;

  constructor(private app: AppService, private router: Router, private userService: UserService, public dialogi: MatDialog) {
    this.dialog = dialogi;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.users.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.users.forEach(row => this.selection.select(row));
  }

  ngOnInit() {
    this.listUsers();
  };

  listUsers() {
    this.userService.getUsers()
    .subscribe( data => {
      this.users = data;
      this.dataSource = new MatTableDataSource(this.users);
      //this.users.sort = this.sort;
      this.selectedUser = null;
      console.log('retrieved ' + this.users.length + ' users');
    });
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user)
      .subscribe( data => {
        this.listUsers();
//this.dataSource.loadUsers();
      })
  };

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  };

  saveUser(): void {
    if(this.selectedUser.id==null) {
      this.userService.createUser(this.selectedUser)
        .subscribe( data => {
          this.listUsers();
        });
    } else {
      this.userService.updateUser(this.selectedUser)
        .subscribe( data => {
          this.listUsers();
        });
    }
  };

  selectUser(user: User): void {
    this.selectedUser = user;
  };

  selectUserRow(user): void {
    if(this.selection.selected.length==0) {
      this.selectedUser = null;
    } else {
      this.selectedUser = user;
    }
  };

  createUser(): void {
    this.selectedUser = new User;
    this.selection.clear();
    this.openDialog();
  };

  openDialog() {
    const dialogRef = this.dialog.open(DialogDataExampleDialog, {
      data: Object.assign({}, this.selectedUser)
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result!=null) {
        console.log('The dialog was closed: ' + result.username + '/' + this.selectedUser.username);
        this.selectedUser = result;
        this.saveUser();

      } else {
        console.log('action canceled');
        this.selectedUser = null;
        this.selection.clear()
      }
    });
  }

}

@Component({
  selector: 'user-dialog',
  templateUrl: './user-dialog.html',
})
export class DialogDataExampleDialog {

  
  constructor(public dialogRef: MatDialogRef<DialogDataExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: User) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

