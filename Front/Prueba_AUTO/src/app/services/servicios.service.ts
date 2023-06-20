import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TypeRequest } from '../variables/type-request.enum';


@Injectable({
  providedIn: 'root'
})
export class ServiciosService implements OnDestroy{
  url=environment.ANGULAR_APP_API_URL 
  entidades: any;
  constructor(private http:HttpClient) { 
  }
  ngOnDestroy(): void {

    
  }
  GENERARTOKENACCESO(data:any):Observable<any>{
    return this.http.post(this.url+TypeRequest.GENERARTOKENACCESO.getUrl,data)
  }
  CONSULTACONVARIABLEPOST(data:any):Observable<any>{
    return this.http.post(this.url+TypeRequest.CONSULTACONVARIABLEPOST.getUrl,data)
  }
  CONSULTAGENERICAPOST(data:any):Observable<any>{
    return this.http.post(this.url+TypeRequest.CONSULTAGENERICAPOST.getUrl,data)
  }
  INSERTARACTUALIZAR(data:any):Observable<any>{
    return this.http.post(this.url+TypeRequest.INSERTARACTUALIZAR.getUrl,data)
  }
  
}
