import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ServiciosService } from 'src/app/services/servicios.service';

declare class Menu{
  items:any;
  id:number;
  name:string;
  ruta:string;
  icon:string;
}
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  token=JSON.parse(sessionStorage.getItem("token")!)
  sociedades: any;
  sociedad=sessionStorage.getItem("sociedad")
  menu!: Menu[];
  men!: Menu[];
  @Output() close = new EventEmitter<string>();;
  constructor(private servicio:ServiciosService) { }

  ngOnInit(): void {
  }
  save(menu:any){
    sessionStorage.setItem("selectedMenu",JSON.stringify(menu))
    this.close.emit()
  }
}
