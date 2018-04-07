import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {Subscription} from "rxjs/Subscription";
import {isUndefined} from "util";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit,OnDestroy {

  activeUsersSub: Subscription;
  activeUsers = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.activeUsersSubInit();
  }

  activeUsersSubInit(): void {
    this.activeUsersSub = this.dataService.getActiveUsers()
      .subscribe(data => {
        this.activeUsers = data;
      });
  }

  getNumberOfUsers(): number {
    return isUndefined(this.activeUsers) ? 0 : this.activeUsers.length;
  }

  ngOnDestroy() {
    this.activeUsersSub.unsubscribe();
  }

}
