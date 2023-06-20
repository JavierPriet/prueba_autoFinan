import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  token=JSON.parse(sessionStorage.getItem("token")!)
  sociedades: any;
  @Input() inputSideNav!: MatSidenav;
  constructor(private router:Router) { }

  ngOnInit(): void {
    
  }
  cerrar(){
    sessionStorage.clear()
    this.router.navigate([''])
  }
}
