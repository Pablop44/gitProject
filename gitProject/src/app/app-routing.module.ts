import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDatailedViewComponent } from './user-datailed-view/user-datailed-view.component';
import { SearchBoxComponent } from './search-box/search-box.component';

const routes: Routes = [
  { path: '', component: SearchBoxComponent },
  { path: 'user/:username', component: UserDatailedViewComponent, data: {animation: 'user'} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
