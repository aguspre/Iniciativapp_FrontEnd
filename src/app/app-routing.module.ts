import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterFormComponent } from './components/character-form/character-form.component';
import { CharacterComponent } from './components/character/character.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {path: 'character-creation', component: CharacterFormComponent},
  {path: 'characters', component: CharacterComponent},
  {path: `character-edit/:id`, component: CharacterFormComponent},
  {path: '**', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
