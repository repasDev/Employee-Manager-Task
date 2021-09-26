import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl="http://localhost:5000/api";
  readonly PhotoUrl="http://localhost:5000/Photos"

  constructor(private http:HttpClient) { }

  getEmpList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/Employee')
  }

  addEmployee(val:any){
    return this.http.post(this.APIUrl+'/employee', val)
  }

  updateEmployee(val:any){
    return this.http.put(this.APIUrl+'/employee', val)
  }

  deleteEmployee(val:any){
    return this.http.delete(this.APIUrl+'/employee/' + val)
  }

  UploadPhoto(val:any){
    return this.http.post(this.APIUrl+'/employee/savefile', val)
  }
}
