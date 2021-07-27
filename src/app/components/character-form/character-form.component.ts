import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICharacter } from 'src/app/interfaces/icharacter';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-character-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.css'],
})
export class CharacterFormComponent implements OnInit {
  
  // variables de character para update y create
  characterData : any | undefined;
  newCharacter : any | undefined;
  id : number | undefined;
  
  // propiedades del character a llenar con el form
  selectedValue: string = 'characterType';
  characterName: string = '';
  characterInit: number = 0;
  characterCa: number = 0;
  characterHp: number = 0;
  characterUrlAvatar: string = '';

  // urlRegEx : string = "^(https:|http:|www\.)\S*";

  // variables del form
  form: FormGroup;
  action : string = "Crear";


  constructor(
    private _characterService: ApiServiceService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router  
  ) {
    this.form = this.fb.group({
      characterName: ['', Validators.required],
      characterInit: [0, [Validators.required, Validators.min(0)]],
      characterCa: 0,
      characterHp: 0,
      characterUrlAvatar: [''],
      selectedValue: ['', Validators.required]
    });
  }

  ngOnInit(): void {
                                
      this.route.params.subscribe(data => {
        this.id = data.id;

        if(this.id){
          this._characterService.getCharacterById(this.id).subscribe( data => {
            this.characterData = data;
            //console.log(this.characterData);
            this.populateForm();
          });
          this.action = "Editar";
        }
        else{
          this.action = "Crear";
        }
      });
      
  }


  populateForm(){
    this.form.setValue({
      characterName : this.characterData.name,
      characterUrlAvatar:  this.characterData.urlAvatarImg,
      characterInit:  this.characterData.initiative,
      characterHp:  this.characterData.hitPoints,
      characterCa:  this.characterData.armorClass,
      selectedValue:  this.characterData.isPlayable ? 'pc' : 'npc'
    })
  }

  saveChar(): void {

    this.newCharacter = {
      name: this.form.get('characterName')?.value,
      urlAvatarImg: this.form.get('characterUrlAvatar')?.value,
      initiative: this.form.get('characterInit')?.value,
      hitPoints: this.form.get('characterHp')?.value,
      armorClass: this.form.get('characterCa')?.value,
      isPlayable: this.form.get('selectedValue')?.value == "pc" ? true : false,
      characterID : this.id != undefined ? Number(this.id) : Number('')    
    }

    if(this.id == undefined)
    {
      //console.log(this.newCharacter);
      this.createChar(this.newCharacter);
    }
    else if(this.id != undefined && this.characterData != undefined)
    {
      this.updateChar(this.id, this.newCharacter);
    }
    else
    {
     // console.log('Error en el form');
    }
  }

  createChar(char : any): void {
    this._characterService.createCharacter(char).subscribe(data => {
      //console.log(data);
      this.form.reset();
      this.router.navigate(['/characters']);
    })
 
  }

  updateChar(id: any, char : any): void {
    this._characterService.updateCharacter(id, char).subscribe(data => {
      //console.log(data);
      this.form.reset();
      this.router.navigate(['/characters']);
    })
  }
}
