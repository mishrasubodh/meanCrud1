import { Component, OnInit, Output,ViewChild ,Inject, ChangeDetectorRef,} from '@angular/core';
import {UsersService } from '../users.service'
import {Config } from '../config'
import {MatPaginator, MatSort, MatTableDataSource,MatDialogRef, MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { promise } from 'protractor';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {BasicService } from "../basic.service"



export interface PeriodicElement {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  button: string;
  button1: string;
}
export interface DialogData {
  animal: string;
  name: string;
}
// abstract class ChangeDetectorRef {
//   abstract markForCheck(): void
//   abstract detach(): void
//   abstract detectChanges(): void
//   abstract checkNoChanges(): void
//   abstract reattach(): void
// } 


@Component({
  selector: 'app-home',

  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  p:number = 1;
  displayedColumns: string[] = ['_id','firstName', 'lastName', 'username', 'button', 'button1'];
  dataSource; 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  id: any;
  onlydata: string;
    constructor(
      public service:UsersService,
    public basicservice :BasicService,
      public config :Config,
      private dialog: MatDialog,
      private Router:Router,

     //  private cd:ChangeDetectorRef
     
    ) {
      const users = Array.from({length: 100});
    this. getallusersdata();
    this.basicservice.telicast.subscribe((data)=>{
      console.log("ghghgghghghghghghghhghgh",data)
      this.onlydata= data
    })
     }

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
  changData(obj){
    this.basicservice.edit(obj)

  }
getallusersdata(){     
  this.service.getallusersdata().subscribe((data)=>{
    console.log("22222",data);
    this.dataSource = data;
    console.log("33333",this.dataSource);
    // this.con.markForCheck();
  })
}

  
openDialog(id) {
  console.log("333333333",id)
this.service.getdatabyid(id).then((dataPassed)=>{
 
  const dialogRef = this.dialog.open(dialogbox, {
    width: '669px',
    height: '417px',
    panelClass: 'dialogbox',
    data: {dataPassed }
  });

  dialogRef.afterClosed().subscribe((result) => {
    this.id = result;
    console.log("33333",this.id);  
    window.location.reload();
  });
})
}

deletedata(id){
  this.service.deletedata(id).subscribe((data)=>{
    console.log("33333",data); 
    if(data['message']=='data successfuly delete') {
      this.getallusersdata();
     // this.cd.markForCheck();
    }
  });
}
backtologin(){
 this.Router.navigate(['login'])
}
gotoregistration(){
  this.Router.navigate(['registration'])
}

}



@Component({
  selector: 'dialogbox',
  templateUrl: 'dialogbox.html',
  styleUrls: ['dialogbox.scss'],
})
export class dialogbox {

  dataSource;
  loginForm = this.fb.group({
    id:[null],
    firstname:[null],
    lastname:[null],
    username: [null],
  });
  editabledata: DialogData;
  constructor( 
    public dialogRef: MatDialogRef<dialogbox>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private fb: FormBuilder, public service:UsersService,private classCall:HomeComponent

    ) 
    { 
 this.editabledata = data['dataPassed']
 console.log("55555",this.editabledata);
    }

    onSubmit(): void {
    
let obj={
"id":this.editabledata['_id'],
"firstName":this.editabledata['firstName'],
"lastName":this.editabledata['lastName'],
"username":this.editabledata['username']
}
  this.service.putdatabyid(obj).then((data)=>{
  })
    this.dialogRef.close(); 
    this.classCall.getallusersdata(); 
  }
 
  
}
