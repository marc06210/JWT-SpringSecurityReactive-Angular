import { Component, OnInit, Inject } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { User, RoleData } from '../models/user.model';
import { MatSnackBar, MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatSnackBarConfig } from '@angular/material';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  credentials = {username: '', password: ''};
  error = null;
  user: User = null;
  dialog: MatDialog;

  formRoles: FormGroup;
  roles = null;
  selectedRoles = null;


  constructor(private app: AppService, private http: HttpClient, private router: Router,
            public dialogi: MatDialog, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
    //this.loginRequest();
    this.dialog = dialogi;
  }

  /*loginRequest() {
    this.http.get('/api/me').subscribe(
      (user:User) => {
        this.user = user;
        this.app.isAdmin(user);
        this.selectedRoles = this.user.roles;
        this.app.authenticated = true;
        this.loadRoles();
    },
    (error: Error) => {
      this.error = error;
      this.user = null;
      this.app.authenticated = false;
    } );

  }*/

  login() {
    this.app.authenticate(this.credentials, this.loadRoles());
    /*const auth = btoa(this.credentials.username+':'+this.credentials.password);
    const headers = new HttpHeaders({ Authorization: 'Basic ' + auth });

    this.http.get('/api/me', {headers: headers})
      .subscribe(
        response => {
          this.app.credentials = auth;
          this.loadRoles();
        },
        err => {
          return console.log('error' + err.message);
        }
      );*/
    /*
    works almost well with loginPage
    const params = new HttpParams({
      fromObject: {
        username: this.credentials.username,
        password: this.credentials.password
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    this.http.post('/login', params, httpOptions)
      .subscribe(
        (res: any) => {
          console.log('ok' + res);
        },
        (err: HttpErrorResponse) => {
          if(err.status==200 && err.url.endsWith('/home')) {
            console.log(' it is ok');
            return;

          }
          console.log('ko' + err)
        }
      );
    return false;
    */
  }

  loadRoles(): void {
    this.http.get('/api/role').subscribe(
      (data: RoleData[]) => {
        this.roles = data;
        const controls = this.roles.map(c => new FormControl(false));
        
        this.formRoles = this.formBuilder.group({
          roles: new FormArray(controls)
        });
        this.selectedRoles = this.user.roles.map(r => r.authority);
    },
    (error: Error) => {
      console.log(error.message);
    } );
  }

  updatePassword(oldPassword: string, newPassword: string) {
    var data = {
      oldPassword: oldPassword,
      newPassword: newPassword
    };
    this.http.put('/api/member/' + this.user.id + '/pwd', data).subscribe(
      (result: User) => {
        //this.error = 'Le mot de passe a été mis à jour';
        this.openSnackBar("Le mot de passe a été mis à jour", 'Great', {
          duration: 2000,
        })
      },
      (error: Error) => {
        console.log(error.message);
        //this.error = 'Le mot de passe n\'a pu être mis à jour';
        this.openSnackBar("Le mot de passe n\'a pu être mis à jour!", "Okay!")
      } 
    );
  }

  updateUser(): void {
    console.log('update user: ' + this.user);
    this.http.put('/api/member', this.user).subscribe(
      (result: string) => {
        console.log(result);
      }
    );
  }

  onAreaListControlChanged(list){
    // determine selected options
    this.user.roles = list.selectedOptions.selected.map(item => {
      let r: RoleData = {
      authority : item.value,
      id : item.value}
      return r;
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(PasswordDialog, {data:{}});

    dialogRef.afterClosed().subscribe(result => {
      if(result!=null) {
        if(result.newPassword1.length < 7) {
          this.openSnackBar("Les mots de passe doivent comporter au moins 7 caractères!", "Okay!")
          //this.error = "Les mots de passe doivent comporter au moins 7 caractères!";
          return;
        }
        if(result.newPassword1!=result.newPassword2) {
          this.openSnackBar("Les nouveaux mots de passe doivent correspondre!", "Okay!")
          //this.error = "Les nouveaux mots de passe doivent correspondre!";
          return;
        }
        this.updatePassword(result.oldPassword, result.newPassword1);
      } else {
        console.log('action canceled');
      }
    });
  }

  openSnackBar(message: string, action: string, config?:MatSnackBarConfig) {
    this.snackBar.open(message, action, config);
  }
}

class PasswordUpdateData {
  oldPassword: string;
  newPassword1: string;
  newPassword2: string;
}

@Component({
  selector: 'password-dialog',
  templateUrl: './password-dialog.html',
})
export class PasswordDialog {

  
  constructor(public dialogRef: MatDialogRef<PasswordDialog>,
    @Inject(MAT_DIALOG_DATA) public data: PasswordUpdateData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
