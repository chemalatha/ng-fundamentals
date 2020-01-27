import {Routes} from '@angular/router';
import {
    EventDetailsComponent,
    EventsListComponent,
    CreateEventComponent,
    EventResolver,
    EventListResolver,
    CreateSessionComponent
} from './events/index';
import {UserModule} from './user/user.module';
import { Error404Component } from './errors/404.component';

export const appRoutes:Routes =[
    {path:'events/new',component:CreateEventComponent,canDeactivate:['canDeactivateCreateEvent']},
    {path:'events',component:EventsListComponent,resolve:{events:EventListResolver}},
    {path:'events/:id',component:EventDetailsComponent,resolve:{event:EventResolver}},
    {path:'404' ,component:Error404Component},
    {path:'',redirectTo:'/events',pathMatch:'full'},
    // {path:'user',loadChildren:'./user/user.module#UserModule'},
    {path:'user',loadChildren: () => UserModule},
    
    {path:'events/sessions/new' , component:CreateSessionComponent}
]