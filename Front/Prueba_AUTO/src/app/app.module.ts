import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Page/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatStepperModule} from '@angular/material/stepper';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatChipsModule} from '@angular/material/chips';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule} from '@angular/material/expansion';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxCurrencyModule } from 'ngx-currency';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatTreeModule} from '@angular/material/tree';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { NgxSpinnerModule } from "ngx-spinner";
import { MUsuarioComponent, UsuariosComponent } from './Page/usuarios/usuarios.component';
import { MActividadesComponent, ActividadesComponent } from './Page/actividades/actividades.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsuariosComponent,
    MUsuarioComponent,
    MActividadesComponent,
    ActividadesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatRadioModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule,
    MatStepperModule,
    MatCheckboxModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatExpansionModule,
    NgxDropzoneModule,
    MatSlideToggleModule,
    MatTreeModule,
    NgxCurrencyModule,
    MatDatepickerModule,
    MatNativeDateModule ,
    MatIconModule,
    NgxSpinnerModule
  ],
  providers: [
      {provide: MAT_DATE_LOCALE, useValue: 'es-CO'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

