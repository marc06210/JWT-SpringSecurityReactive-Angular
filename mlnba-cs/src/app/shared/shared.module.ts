import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatMenuModule} from '@angular/material';
import { MatTableModule,  MatCheckboxModule, MatDialogModule } from '@angular/material';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
 
const materialModules = [
  MatButtonModule,
  MatIconModule,
  MatMenuModule, 
  MatButtonModule,
  MatTableModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule
];
 
@NgModule({
  exports: [
    ...materialModules,
    // other declarables (components, directives, pipes) and modules you want to share
  ],
  imports: [
    ...materialModules,  // so that our shared declarables can use Material components
    // other needed modules by declarables of the SharedModule
  ]
})
export class SharedModule { }
