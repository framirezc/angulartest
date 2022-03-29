import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    //const url ='/api/movies?sortBy=year&page=2&filter=moon';
    const url = 'https://raw.githubusercontent.com/delta-protect/development-test/master/movies.json';
    return this.http.get(url);    
  } 
}
