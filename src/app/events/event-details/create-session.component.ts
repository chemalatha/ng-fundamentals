import {Component, OnInit, Output,EventEmitter} from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ISession,restrictedWords } from '../shared';

@Component({
    selector:'create-session',
    templateUrl:'./create-session.component.html',
    styles:[
        `
        em{float:right;color:#E05C65;padding-left:10px;}
        .error input {background-color:red}
        .error {background-color:orange}
        .error ::-webkit-input-placeholder{color:#999;}
        
        `
    ]
})

export class CreateSessionComponent implements OnInit{
    newSessionForm:FormGroup;
    name:FormControl;
    presenter:FormControl;
    duration:FormControl;
    level:FormControl;
    abstract:FormControl;
    @Output() saveNewSession = new EventEmitter();
    @Output() cancelNewSession = new EventEmitter();

    ngOnInit(){
        this.name = new FormControl('',[Validators.required,Validators.pattern('[0-9]{10}')]);
        this.presenter = new FormControl('',Validators.required);
        this.duration = new FormControl('',Validators.required);
        this.level = new FormControl('',Validators.required);
        this.abstract = new FormControl('',[Validators.required,Validators.maxLength(400),restrictedWords(['foo','bar'])]);

        this.newSessionForm = new FormGroup({
            name:this.name,
            presenter:this.presenter,
            duration:this.duration,
            level:this.level,
            abstract:this.abstract

        })
    }
    saveSession(formValues){
        let session:ISession = {
            id:undefined,
            voters:[],
            name:formValues.name,
            presenter:formValues.presenter,
            duration:+formValues.duration,
            level:formValues.level,
            abstract:formValues.abstract
        }
        this.saveNewSession.emit(session);

    }
    cancel(){
        this.cancelNewSession.emit();
    }


}