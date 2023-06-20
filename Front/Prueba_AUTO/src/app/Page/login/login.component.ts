import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MUsuarioComponent } from 'src/app/Page/usuarios/usuarios.component'
import { ServiciosService } from 'src/app/services/servicios.service';
import { TypeRequest } from 'src/app/variables/type-request.enum';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form:FormGroup=new FormGroup({
    usuario:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required])
  })
  constructor(private dialog:MatDialog,private servicio:ServiciosService,private router:Router) { }

  ngOnInit(): void {

  }
  Olvido (){
    let dialogRef = this.dialog.open( MUsuarioComponent , {
      width:"75%"
    });
    
  }
  login(){
    if(this.form.valid){
      let datos = {
        ProcedimientoAlmacenado: "SP_LOGIN",
        Entidades:[
          {NombreEntidad: "P_USUARIO", ValorEntidad: this.form.value.usuario},
          {NombreEntidad: "P_PASSWORD", ValorEntidad: Md5.hashStr(this.form.value.password).toString()}
        ]
      }
      this.servicio.GENERARTOKENACCESO(datos).subscribe({
        next:(data:any)=>{
          sessionStorage.setItem("Usuario",data.usuario)
          let datosToken = { id_usuario: data.id_usuario, nombre: data.nombre, usuario:data.usuario }
          sessionStorage.setItem("token",JSON.stringify(datosToken))
          this.router.navigate(['Inicio'])
        },error:(err:any)=>{
          console.log(err)
          Swal.fire(err.error.estado,err.error.mensajeGeneral,'error')
        }
      })
    }else{
      this.form.markAllAsTouched()
    }
    
  }
  //Funcion para cambiar de password a text los campos
  nearest(event:any){
    //Busca el input
    console.log(event.target.parentElement)
    let button=event.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector("input")
    //Verifica que si el tipo es password
    if(button.getAttribute("type")=="password"){
      //Cambia el tipo a texto
      button.setAttribute("type","text")
    }else{
      //cambia el tipo a password
      button.setAttribute("type","password")
    }
  }
}
