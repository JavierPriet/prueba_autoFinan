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
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {
  filtros: any[] = [{texto:'Estado', valor: 'Estado'}];
  columnas: any[] = [{title: 'Codigo', field: 'PkId'},{title: 'Nombre', field: 'Nombre'},{title: 'Actividad', field: 'Actividad'},{title: 'Estado', field: 'Estado'},{title: 'Fecha Creación', field: 'FechaCreacion'}] ;
  estados: any[] = [{ estado: 'Progreso' }, { estado: 'Finalizado' }];
  value = "";
  hojas: any;
  displayedColumns: string[] = ["actions"];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private servicio: ServiciosService, private dialog: MatDialog) { }

  ngOnInit(): void {
    let datos = {
      "ProcedimientoAlmacenado": "SP_CRUD_TAREAS_USUARIO",
      "Entidades": [
        {
          "NombreEntidad": "P_PKID",
          "ValorEntidad": "NULL"
        },
        {
          "NombreEntidad": "P_FK_ID_USUARIO",
          "ValorEntidad": JSON.parse(sessionStorage.getItem('token')!).id_usuario,
        },
        {
          "NombreEntidad": "P_ACTIVIDAD",
          "ValorEntidad": "NULL"
        },
        {
          "NombreEntidad": "P_ESTADO",
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
    let dialog = this.dialog.open(MActividadesComponent, {
      width: "80%"
    })
    dialog.afterClosed().subscribe({
      next: data => {
        this.buscar()
      }
    })
  }

  view(element: any) {
    let dialog = this.dialog.open(MActividadesComponent, {
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
    let dialog = this.dialog.open(MActividadesComponent, {
      width: "80%",
      data: { info: element, type: "edit" }
    })
    dialog.afterClosed().subscribe({
      next: data => {
        this.buscar()
      }
    })
  }
  delete(element:any){
    console.log(element);
    let mesage = 'Se va a eliminar el resgistro seleccionado ¿esta seguro?';
    Swal.fire({
      title: mesage,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      confirmButtonColor: '#00acc8',
      denyButtonColor: '#e1251b',
    }).then((result) => {
      if (result.isConfirmed) {
        let datosTabla = {
          "ProcedimientoAlmacenado": "SP_CRUD_TAREAS_USUARIO",
          "Entidades": [
            { 
              "NombreEntidad": 'P_PKID',
              "ValorEntidad": element.PkId.toString() },
            {
              "NombreEntidad": "P_FK_ID_USUARIO",
              "ValorEntidad": JSON.parse(sessionStorage.getItem('token')!).id_usuario,
            },
            {
              "NombreEntidad": "P_ACTIVIDAD",
              "ValorEntidad": "NULL"
            },
            {
              "NombreEntidad": "P_ESTADO",
              "ValorEntidad": "NULL"
            },
            {
              "NombreEntidad": "P_ACCION",
              "ValorEntidad": "4"
            }
          ]
      };
        console.log(datosTabla);
        this.servicio.INSERTARACTUALIZAR(datosTabla).subscribe({
          next: (data: any) => {
            if (data.respuesta == 'SATISFACTORIO') {
              let respuesta = 'Registro eliminado satisfactoriamente';
              Swal.fire('', respuesta, 'success');
              this.buscar();
            }
          },
        });
      }
    });
  }
  buscar() {
    let datos = {
      "ProcedimientoAlmacenado": "SP_CRUD_TAREAS_USUARIO",
      "Entidades": [
        {
          "NombreEntidad": "P_PKID",
          "ValorEntidad": "NULL"
        },
        {
          "NombreEntidad": "P_FK_ID_USUARIO",
          "ValorEntidad": JSON.parse(sessionStorage.getItem('token')!).id_usuario,
        },
        {
          "NombreEntidad": "P_ACTIVIDAD",
          "ValorEntidad": "NULL"
        },
        {
          "NombreEntidad": "P_ESTADO",
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
  selector: 'app-m-actividades',
  templateUrl: './modal-actividades.component.html',
  styleUrls: ['./actividades.component.css']
})

export class MActividadesComponent implements OnInit {
  current: any = null;
  getTodayFormat = (d = new Date()) => {

    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    let year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return `${year}${month}${day}`;
  };
  form = new FormGroup({
    actividad: new FormControl('', [Validators.required]),
    estado: new FormControl('', [Validators.required]),
  })
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialog: MatDialog, private servicio: ServiciosService) {
    if (data != null) {
      this.current = data.type;
      if (this.current == "view") {
        this.form.disable({ onlySelf: false })
      }
      let info = data.info
      console.log(info)
      this.form.get('actividad').setValue(info.Actividad)
      this.form.get('estado').setValue(info.Estado)
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
  guardar() {
    if (this.form.valid) {
      let info = this.form.getRawValue()
      let datos = {
        "ProcedimientoAlmacenado": "SP_CRUD_TAREAS_USUARIO",
        "Entidades": [
          {
            "NombreEntidad": "P_PKID",
            "ValorEntidad": this.current == 'edit' ? this.data.info.PkId.toString() : 'NULL'
          },
          {
            "NombreEntidad": "P_FK_ID_USUARIO",
            "ValorEntidad": JSON.parse(sessionStorage.getItem('token')!).id_usuario,
          },
          {
            "NombreEntidad": "P_ACTIVIDAD",
            "ValorEntidad": info.actividad.toString()
          },
          {
            "NombreEntidad": "P_ESTADO",
            "ValorEntidad": info.estado.toString()
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