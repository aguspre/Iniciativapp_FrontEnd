import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ICharacter } from 'src/app/interfaces/icharacter';
import {MatCardModule} from '@angular/material/card';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

/**
 * @title Card with multiple sections
 */
@Component({
  selector: 'charCard',
  templateUrl: 'char-Card.component.html',
  styleUrls: ['char-Card.component.css'],
})
export class CharCard implements OnInit {
  @Input() Character: any;
  selectedChar : any;
  isSelected : boolean = false;
  rendering : boolean = false;
  panelOpenState = false;
  @Output() deleted = new EventEmitter<boolean>();
  @Output() callForm = new EventEmitter<boolean>();

  constructor(
    private _characterService : ApiServiceService,
    private route: ActivatedRoute,
    private router: Router  
  ){}

  ngOnInit(): void {

    if(this.Character == null){
      this.render();
    }
  }

  render(){
    this.rendering = true;
  }
  
  onSelect(char : ICharacter){
    this.isSelected = !this.isSelected;
    this.selectedChar = char;
    //console.log(this.selectedChar.characterID);
  }

  deleteCharacter(){
    this._characterService.deleteCharacter(this.Character.characterID).subscribe(data => {this.updateParent();});
  }

  callFormUpdateChar(){
    this.router.navigate(['character-edit/'+this.Character.characterID]);
  }

  updateParent(){
    this.deleted.emit();
  }
}

