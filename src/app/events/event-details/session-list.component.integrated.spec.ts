import {TestBed,async,ComponentFixture} from '@angular/core/testing';
import {DebugElement,NO_ERRORS_SCHEMA} from '@angular/core';
import {SessionListComponent} from './session-list.component';
import {ISession} from '../shared/event.model';
import {AuthService} from '../../user/auth.service';
import {VoterService} from './voter.service';
import {By} from '@angular/platform-browser'; 
import { detectChanges } from '@angular/core/src/render3';
import { UpvoteComponent } from './upvote.component';
import { DurationPipe, CollapsibleWell } from '../shared';

describe('SessionListComponent',()=>{
    let fixture:ComponentFixture<SessionListComponent>,
        component:SessionListComponent,
        element:HTMLElement,
        debugEl:DebugElement;
    beforeEach(async(()=>{
        let mockAuthService = {
            isAuthenticated:function(){
                return true;
            },
            currentUser:{
                userName:'joe'
            }
        };
        let mockVoterService = {
            userHasVoted:function(){
                return true;
            }
        };

        TestBed.configureTestingModule({
            imports:[],
            declarations:[
                SessionListComponent,
                // UpvoteComponent,
                DurationPipe,
                // CollapsibleWell
            ],
            providers:[
                {provide:AuthService,useValue:mockAuthService},
                {provide:VoterService,useValue:mockVoterService}

            ],
            schemas:[NO_ERRORS_SCHEMA]
        })
    }))
    beforeEach(()=>{
        fixture= TestBed.createComponent(SessionListComponent);
        component = fixture.componentInstance;
        debugEl = fixture.debugElement;
        element = fixture.nativeElement;
    })
    describe('initial display',()=>{
        it('should have the correct session title',()=>{
            component.eventId = 3;
            component.filterBy= 'all';
            component.sortBy= 'name';
            component.sessions = [{
                id:3,
                name:'session 1',
                level:'intermediate',
                presenter:'joe',
                duration:1,
                voters:["john","sai"],
                abstract:'abstract'
            }]
            component.ngOnChanges();
            fixture.detectChanges();

            expect(element.querySelector('[well-title]').textContent).toContain('session 1');
        })
    })
})