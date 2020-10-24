import { Injectable } from '@angular/core';
import { BasicServiceService } from '../basic-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private url = '/search/users'

  constructor(private basicService : BasicServiceService) { }

  public searchUserByName (params) {
    return this.basicService.get(
      this.url,
      params
    )
  }
}
