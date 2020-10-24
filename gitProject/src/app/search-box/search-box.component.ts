import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/services/user/user-service.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  userService: UserServiceService;
  params: any
  private timer: any;
  private delaySearch: boolean = true;

  constructor(userService: UserServiceService) {
    this.userService = userService
  }

  ngOnInit(): void {
  }

  changeUsername(event: any){
    if (this.delaySearch){
      if (this.timer){
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(this.searchUsers, 1000, event.target.value, this.userService);
    }else {
      this.searchUsers(event.target.value, this.userService);
    }
  }

  searchUsers(username, userService) {
    if (username.length > 0) {
      this.params = {
        q: username
      }
      userService.searchUserByName(this.params)
      .subscribe(
        response=>{
          console.log(response)
        },
        error=>{
          console.log(error)
        }
      );
    }
  }

}
