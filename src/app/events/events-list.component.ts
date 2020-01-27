import {Component,OnInit} from '@angular/core';
import { EventService } from './shared/event.service';
// import { TOASTR_TOKEN } from '../common/toastr.service';
import {ActivatedRoute} from '@angular/router';
import { IEvent } from './shared';

@Component({
    templateUrl:'./events-list.component.html'
})
export class EventsListComponent implements OnInit{
    events:IEvent[];
    constructor(private eventService:EventService,
                private route:ActivatedRoute){
        
    }
    ngOnInit(){
        this.events = this.route.snapshot.data['events'];
    }


}