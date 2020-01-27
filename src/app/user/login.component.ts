import {Component} from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
    templateUrl:'./login.component.html',
    styles:[
        `
        em{
            float:right;
            color:red;
        }
        `
    ]
})

export class LoginComponent{
    userName:string;
    password:string;
    mouseoverLogin:boolean;
    loginInvalid:boolean = false;
    constructor(private authService:AuthService,private route:Router){

    }
    login(formValues){
        this.authService.loginUser(formValues.userName,formValues.password).subscribe((response)=>{
            if(!response){
                this.loginInvalid = true;
            } else{
                this.route.navigate(['events']);
            }
            
        })
        
    }
    cancel(){
        this.route.navigate(['events']);
    }
}