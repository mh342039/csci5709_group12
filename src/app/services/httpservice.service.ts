import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  localURL = "http://localhost:3000/api";
  ProdURL = "https://g12-csci5709-backend.herokuapp.com/api"
  constructor(private http: HttpClient) { }

  getServiceCall(path: string){
    return this.http.get(this.localURL + path);
  }

  postServiceCall(path: string, data:any ){
    return this.http.post(this.localURL + path, data);
  }

  putServiceCall(path: string, data:any ){
    return this.http.put(this.localURL + path, data);
  }

  deleteServiceCall(path: string, data:any ){
    return this.http.delete(this.localURL + path, data);
  }

}
