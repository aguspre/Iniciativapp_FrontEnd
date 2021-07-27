import { Component, Input, OnInit } from '@angular/core';
import { ICharacter } from 'src/app/interfaces/icharacter';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {
  
  charactersList: any[] = [];
  selectedChars: any[] = [];

  constructor(private _characterService : ApiServiceService) {  
  }

  ngOnInit(): void {
    this.getCharacters();
  }

  // Obtiene una lista con los characters desde el backend
  getCharacters(){
    this._characterService.getListCharacters().subscribe((data: any) => 
      this.charactersList = data,
      error => {console.log(error);}
    );
    //console.log(this.charactersList);
  }

  // cuando se elimina un character actualiza la vista
  onDeleted() {
    this.getCharacters();
  }

  onSelect(char: any) {
    //console.log(char);
    this.selectedChars.includes(char) 
      ? 
        this.selectedChars = this.selectedChars.filter(ob => ob.characterID != char.characterID)
      : 
        this.selectedChars.push(char);

    console.log(this.selectedChars);
    
  }
  
}
