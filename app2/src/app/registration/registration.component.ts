import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {BasicService} from '../basic.service'
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import {UsersService } from '../users.service'
import {Config } from '../config'


@Component({templateUrl: 'registration.component.html'})
export class RegistrationComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    registrationData: boolean;
    message:string;
    test;
    userRegistration: any;
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private basicservice :BasicService,
        private userservice : UsersService,private config:Config
            
        

        ) 
        {

    //    this.function();
         }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });

      this.basicservice.telicast.subscribe((data) => {
          this.message = data;
    });
      console.log("msg", this.message);
    }
    editData(){
        this.basicservice.edit(this.test);
        console.log('aaaaa',this.test);
        this.router.navigate(['/registration']);
        
    }

    get f() { return this.registerForm.controls; }

    onSubmit() {     
        this.submitted = true;
        this.loading = true;

        if (this.registerForm.invalid) {
            this.loading = false;
            return;
        }
        console.log("registration value",this.registerForm.value);
          this.userRegistration =this.registerForm.value

        this.registration(this.userRegistration);
        
       
    //   
    
      //   this.router.navigate(['/login'])
    
    }
    registration(userRegistration){     
        this.loading = false;
     this.userservice.registration(this.userRegistration).subscribe((data)=>{
     console.log('registration data',data)
     if(data['message']=='Registration SuccessFull'){
            this.config.openSnackBar('Registration Successfully',true);
            this.router.navigate (['login'])
     }

})
    }
//   
}
