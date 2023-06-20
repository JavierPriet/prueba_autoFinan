import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio.component';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { ActividadesComponent } from '../actividades/actividades.component';

const routes: Routes = [
    {path:'',component:InicioComponent,children:[
    {path:'Usuarios',component:UsuariosComponent},
    {path:'Actividades',component:ActividadesComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
