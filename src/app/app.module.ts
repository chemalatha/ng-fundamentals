import { BrowserModule } from '@angular/platform-browser';
import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {
  EventsListComponent,
  EventThumbnailComponent,
  EventService,
  EventDetailsComponent,
  CreateEventComponent,
  EventResolver,
  EventListResolver,
  CreateSessionComponent,
  SessionListComponent,
  CollapsibleWell,
  DurationPipe,
  UpvoteComponent,
  VoterService,
  LocationValidator
} from './events/index';
import { EventsAppComponent } from './events-app.component';
import { NavbarComponent } from './nav/navbar.component';
import { TOASTR_TOKEN, 
        Toastr,
        JQ_TOKEN,
        SimpleModalComponent,
        ModalTriggerDirective
 } from './common/index';
//  import {ModalTriggerDirective} from './common/modal-trigger.directive'
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { Error404Component } from './errors/404.component';
import { AuthService } from './user/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

 declare let toastr:Toastr;
 let jQuery = window['$'];

@NgModule({
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavbarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWell,
    DurationPipe,
    SimpleModalComponent,
    ModalTriggerDirective,
    UpvoteComponent,
    LocationValidator
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  schemas:[
    NO_ERRORS_SCHEMA
  ],
  providers: [
    EventService,
    {provide:TOASTR_TOKEN, useValue:toastr},
    {provide:JQ_TOKEN,useValue:jQuery},
    EventResolver,
    {provide:'canDeactivateCreateEvent', useValue:checkDirtyState},
    EventListResolver,
    AuthService,
    VoterService
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }

export function checkDirtyState(component:CreateEventComponent){
  if(component.isDirty)
  { 
    return window.confirm('you have not saved the content on this page, do you want to really cancel?');
  } else{
    return true;
  }
}
