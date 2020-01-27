import {Component} from '@angular/core';
import { AuthService } from '../user/auth.service';
import { ISession, EventService, IEvent } from '../events';

@Component({
    selector:'nav-bar',
    templateUrl:'./navbar.component.html',
    styles:[`
        .nav.navbar-nav{font-size:15px;}
        #searchForm{margin-right:100px}
        @media(max-width:1200px){
            #searchForm{
                display:none
            }
        }
        li > a.active{
            color:#F67924;
        }`
    ]
})

export class NavbarComponent{
    searchTerm: string = ""
    foundSessions:ISession[];
    allEvents:IEvent[];
    constructor(private auth:AuthService,private eventService:EventService){
    }
    ngOnInit(){
        this.eventService.getEvents().subscribe(events =>{
            this.allEvents = events;
        })
    }
    searchSessions(searchTerm){
        this.eventService.searchSessions(searchTerm).subscribe(sessions => {
            this.foundSessions = sessions;
        })  
    }
}