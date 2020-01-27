import {Component, Input} from '@angular/core';

@Component({
    selector:'collapsible-well',
    templateUrl:'./collapsible-well.component.html'
})
export class CollapsibleWell{
    visible:boolean = false;
    toggleContent(){
        this.visible = !this.visible;
    }
}