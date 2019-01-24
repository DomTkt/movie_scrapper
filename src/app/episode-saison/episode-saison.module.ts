import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EpisodeSaisonPage } from './episode-saison.page';

const routes: Routes = [
  {
    path: '',
    component: EpisodeSaisonPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EpisodeSaisonPage]
})
export class EpisodeSaisonPageModule {}
