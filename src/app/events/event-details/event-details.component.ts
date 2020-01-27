import {Component} from '@angular/core';
import {EventService} from '../shared/event.service';
import {ActivatedRoute,Params} from '@angular/router';
import { ISession } from '../shared';

@Component({
    templateUrl:'./event-details.component.html',
    styles:[
        `
        .container{
            padding-right:20px;
            padding-left:20px;
        }
        .event-image{
            height:100px;
        }
        a{
            pointer:cursor
        }
        `
    ]
})

export class EventDetailsComponent{
    event:any;
    addMode:boolean = false;
    filterBy:string = 'all';
    sortBy:string = 'votes';
    constructor(private eventService:EventService,private route:ActivatedRoute){

    }
    ngOnInit(){
        this.route.data.forEach((data) =>{
            this.event = data['event'];
            this.addMode = false;

        });
    }
    addSession(){
        this.addMode = true;
    }
    saveNewSession(session:ISession){
        const nextId = Math.max.apply(null,this.event.sessions.map(session => session.id));
        session.id = nextId+1;
        this.event.sessions.push(session);
        this.eventService.saveEvent(this.event).subscribe(()=>{
            this.addMode = false;
        })
    }
    cancelAddSession(){
        this.addMode = false;
    }

}