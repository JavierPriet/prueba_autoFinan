import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Page/login/login.component';
import { UsuariosComponent } from './Page/usuarios/usuarios.component';
import { ActividadesComponent } from './Page/actividades/actividades.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'Inicio',loadChildren:()=>import("./Page/inicio/inicio.module").then(m=>m.InicioModule)},
  {path:'Usuarios',component:UsuariosComponent},
  {path:'Actividades',component:ActividadesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
