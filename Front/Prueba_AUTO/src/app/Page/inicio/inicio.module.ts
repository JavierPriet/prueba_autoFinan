import { NgModule } from '@angular/core';


import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MenuComponent } from 'src/app/Shared/menu/menu.component';
import { HeaderComponent } from 'src/app/Shared/header/header.component';
import { UsuariosComponent } from 'src/app/Page/usuarios/usuarios.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    InicioComponent,
    HeaderComponent,
    MenuComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatRadioModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSidenavModule,
    InicioRoutingModule
  ]
})
export class InicioModule { }
