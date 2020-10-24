import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BasicServiceService {

  private apiDirection: String
  private params: String
  private headers: HttpHeaders


  constructor(private httpClient: HttpClient) {
    this.apiDirection = 'https://api.github.com'
    this.params = null
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  get (url, params) {

    if (params != null) {
      this.params = Object.keys(params).map(function(k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
      }).join('&');
      this.params = '?' + this.params
    } else {
      this.params = ''
    }

    const httpOptions = {
      headers: this.headers
    };

    return this.httpClient.get(this.apiDirection + url + this.params, httpOptions);
  }

  post (url, params, json) {
    this.params = Object.keys(params).map(function(k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
    }).join('&');

    const httpOptions = {
      headers: this.headers
    };

    return this.httpClient.post(this.apiDirection + url + this.params, json, httpOptions);
  }
}
