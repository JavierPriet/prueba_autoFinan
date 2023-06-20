import { M } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ServiciosService } from 'src/app/services/servicios.service';
import Swal from 'sweetalert2';
import { Md5 } from 'ts-md5';
declare var bootstrap: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  filtros: any[] = [{texto:'Estado', valor: 'Estado'}];
  columnas: any[] = [{title: 'Codigo', field: 'PkId'},{title: 'Usuario', field: 'Usuario'},{title: 'Contraseña', field: 'Contraseña'},{title: 'Nombre', field: 'Nombre'},{title: 'Correo', field: 'Correo'}] ;
  estados: any[] = [{ estado: 'Progreso' }, { estado: 'Finalizado' }];
  value = "";
  hojas: any;
  displayedColumns: string[] = ["actions"];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private servicio: ServiciosService, private dialog: MatDialog) { }

  ngOnInit(): void {
    let datos = {
      "ProcedimientoAlmacenado": "SP_CRUD_USUARIOS",
      "Entidades": [
        {
          "NombreEntidad": "P_PKID",
          "ValorEntidad": "NULL"
        },
        {
          "NombreEntidad": "P_USUARIO",
          "ValorEntidad": "NULL"
        },
        {
          "NombreEntidad": "P_PASSWORD",
          "ValorEntidad": "NULL"
        },
        {
          "NombreEntidad": "P_NOMBRE",
          "ValorEntidad": "NULL"
        },
        {
          "NombreEntidad": "P_CORREO",
          "ValorEntidad": "NULL"
        },
        {
          "NombreEntidad": "P_ACCION",
          "ValorEntidad": "2"
        }
      ]
    }
    console.log(datos)
    this.servicio.CONSULTAGENERICAPOST(datos).subscribe({
      next: (data: any) => {
        if (data.mensaje == '') {
          let mesage = 'No se encontraron registros';
          Swal.fire('', mesage, 'info');
        }
        this.hojas = JSON.parse(data.mensaje)
        this.dataSource = new MatTableDataSource(this.hojas);
        this.displayedColumns = ["actions"].concat(this.columnas.map((ele: any) => ele.field))
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  add() {
    let dialog = this.dialog.open(MUsuarioComponent, {
      width: "80%"
    })
    dialog.afterClosed().subscribe({
      next: data => {
        this.buscar()
      }
    })
  }

  view(element: any) {
    let dialog = this.dialog.open(MUsuarioComponent, {
      width: "80%",
      data: { info: element, type: "view" }
    })
    dialog.afterClosed().subscribe({
      next: data => {
        this.buscar()
      }
    })
  }

  edit(element: any) {
    let dialog = this.dialog.open(MUsuarioComponent, {
      width: "80%",
      data: { info: element, type: "edit" }
    })
    dialog.afterClosed().subscribe({
      next: data => {
        this.buscar()
      }
    })
  }

  buscar() {
    let datos = {
      "ProcedimientoAlmacenado": "SP_CRUD_USUARIOS",
      "Entidades": [
        {
          "NombreEntidad": "P_PKID",
          "ValorEntidad": "NULL"
        },
        {
          "NombreEntidad": "P_USUARIO",
          "ValorEntidad": "NULL"
        },
        {
          "NombreEntidad": "P_PASSWORD",
          "ValorEntidad": "NULL"
        },
        {
          "NombreEntidad": "P_NOMBRE",
          "ValorEntidad": "NULL"
        },
        {
          "NombreEntidad": "P_CORREO",
          "ValorEntidad": "NULL"
        },
        {
          "NombreEntidad": "P_ACCION",
          "ValorEntidad": "2"
        }
      ]
    }
    console.log(datos)
    this.servicio.CONSULTAGENERICAPOST(datos).subscribe({
      next: (data: any) => {
        if (data.mensaje == '') {
          let mesage = 'No se encontraron registros';
          Swal.fire('', mesage, 'info');
        }
        this.hojas = JSON.parse(data.mensaje)
        this.dataSource = new MatTableDataSource(this.hojas);
        this.displayedColumns = ["actions"].concat(this.columnas.map((ele: any) => ele.field))
        this.dataSource.paginator = this.paginator;
      }
    })
  }
}
@Component({
  selector: 'app-m-usuarios',
  templateUrl: './modal-usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})

export class MUsuarioComponent implements OnInit {
  current: any = null;
  estadoRegistro = [
    { valor: "1", texto: "Activo" },
    { valor: "0", texto: "Inactivo" },
  ]
  tipos: any;
  getTodayFormat = (d = new Date()) => {

    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    let year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return `${year}${month}${day}`;
  };
  form = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    usuario: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required]),
    contrasena: new FormControl('', [Validators.required, this.password_validate('contrasena')]),
    contrasenaConfirma: new FormControl('', [Validators.required, this.password_validate('contrasena')]),
    mostrar: new FormControl(false),
  })
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialog: MatDialog, private servicio: ServiciosService) {
    if (data != null) {
      this.current = data.type;
      if (this.current == "view") {
        this.form.disable({ onlySelf: false })
      }
      let info = data.info
      console.log(info)
      this.form.get('nombre').setValue(info.Nombre)
      this.form.get('usuario').setValue(info.Usuario)
      this.form.get('contrasena').setValue(info.Contraseña)
      this.form.get('contrasenaConfirma').setValue(info.Contraseña)
      this.form.get('correo').setValue(info.Correo)
      if (this.current == "edit") {
        this.form.get('contrasena').disable()
        this.form.get('contrasenaConfirma').disable()
      }
      this.mostrar = false
    }
  }
  ngOnInit(): void {
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
      return new bootstrap.Popover(popoverTriggerEl)
    })
  }
  mostrar = true;
  cambiar() {
    if (this.mostrar) {
      this.form.get('contrasena').enable()
      this.form.get('contrasenaConfirma').enable()
      this.form.get('contrasena').setValue("")
      this.form.get('contrasenaConfirma').setValue("")

    } else {
      this.form.get('contrasena').disable()
      this.form.get('contrasenaConfirma').disable()
      this.form.get('contrasena').setValue(this.data.info.Password)
      this.form.get('contrasenaConfirma').setValue(this.data.info.Password)
    }

  }
  password_validate(validar: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.form !== undefined) {

        var password = this.form.get(validar)?.value;
        var re = {
          capital: /[A-Z]/,
          digit: /[0-9]/,
          except: /[\s]/,
          specialCaracter: /[!#$%&/()*_.,:;=?@{|}~+-]/,
          full: /^[A-Za-z0-9!#$%&/()*_.,:;=?@{|}~+-]{7,}$/,
        };
        if (
          !re.capital.test(password) ||
          !re.digit.test(password) ||
          re.except.test(password) ||
          !re.specialCaracter.test(password)
        ) {
          return { password_validate: { value: control.value } };
        }

        if (re.full.test(password)) {
          return null;
        } else {
          return { password_validate: { value: control.value } };
        }
      }
      else {
        return null;
      }
    };
  }
  
  guardar() {
    if (this.form.valid) {
      let info = this.form.getRawValue()
      let datos = {
        "ProcedimientoAlmacenado": "SP_CRUD_USUARIOS",
        "Entidades": [
          {
            "NombreEntidad": "P_PKID",
            "ValorEntidad": this.current == 'edit' ? this.data.info.PkId.toString() : 'NULL'
          },
          {
            "NombreEntidad": "P_USUARIO",
            "ValorEntidad": info.usuario
          },
          {
            "NombreEntidad": "P_PASSWORD",
            "ValorEntidad": this.current == "edit" ? info.contrasena : Md5.hashStr(info.contrasena).toString()
          },
          {
            "NombreEntidad": "P_NOMBRE",
            "ValorEntidad": info.nombre
          },
          {
            "NombreEntidad": "P_CORREO",
            "ValorEntidad": info.correo
          },
          {
            "NombreEntidad": "P_ACCION",
            "ValorEntidad": this.current == "edit" ? "3" : "1"
          }
        ]
      }
      this.servicio.INSERTARACTUALIZAR(datos).subscribe({
        next: data => {
          let mesage = 'Registro almacenado satisfactoriamente';
          Swal.fire('', mesage, 'success');
          this.dialog.closeAll()
        }
      })
    }else{
      this.form.markAllAsTouched()
    }
  }
  
}