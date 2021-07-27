import {Component, Input, OnInit} from '@angular/core';
import { ICharacter } from 'src/app/interfaces/icharacter';
import {MatExpansionModule} from '@angular/material/expansion';


/**
 * @title Card with multiple sections
 */
@Component({
  selector: 'BasicCharCard',
  templateUrl: 'Basic-char-Card.component.html',
  styleUrls: ['Basic-char-Card.component.css'],
})
export class BasicCharCard implements OnInit {
  @Input()
  Character: any;
  selectedCharacter? : ICharacter;
  panelOpenState = false;
  constructor(){}

  ngOnInit(): void {
    console.log(this.Character);
  }
  
updateChar(){

}

}

