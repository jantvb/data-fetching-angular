import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getData(): Observable<any> {
    return this.httpClient.get<any>('https://www.random.org/integers/?num=200&min=1&max=10&col=1&base=10&format=plain&rnd=new', { responseType: 'text' as 'json' });
  }
}
