import { Injectable } from '@angular/core';
import { BasicServiceService } from '../basic-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private urlSearch = '/search/users'
  private urlRepo = '/users/'

  constructor(private basicService : BasicServiceService) { }

  public searchUserByName (params) {
    return this.basicService.get(
      this.urlSearch,
      params
    )
  }

  public getReposByName (params) {
    return this.basicService.get(
      this.urlRepo + params.username + '/repos',
      null
    )
  }

  public getFollowersByName (params) {
    return this.basicService.get(
      this.urlRepo + params.username + '/followers',
      null
    )
  }
}
