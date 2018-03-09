import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {DataService} from './data.service';
import * as $ from 'jquery';
import {isUndefined} from "util";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  messagesSub: Subscription;
  activeUsersSub: Subscription;
  seenByUsersSub: Subscription;
  userName: string;
  userMessage: string;
  messages = [];
  activeUsers = [];
  seenByUsers = [];
  seen: boolean;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.userName = prompt('Enter your name',);
    this.dataService.sendUserInfo(this.userName);

    this.messagesSubInit();
    this.activeUsersSubInit();
    this.seenByUsersSubInit();

  }

  messagesSubInit(): void {
    this.messagesSub = this.dataService.getMessages()
      .subscribe(data => {
        this.messages.push({
          time: new Date().toLocaleTimeString(),
          message: data.message, userName: data.userName
        });

        $("#chatId").stop().animate({scrollTop: $("#chatId")[0].scrollHeight}, 1000);
        this.seen = false;
      });
  }

  activeUsersSubInit(): void {
    this.activeUsersSub = this.dataService.getActiveUsers()
      .subscribe(data => {
        this.activeUsers = data;
      });

  }

  seenByUsersSubInit(): void {
    this.seenByUsersSub = this.dataService.getSeenByUsers()
      .subscribe(data => {
        this.seenByUsers = data;
      });
  }

  getNumberOfUsers(): number {
    return isUndefined(this.activeUsers) ? 0 : this.activeUsers.length;
  }

  sendMessage(data): void {
    this.dataService.sendMessage(data);
    this.userMessage = "";
  }

  seenByUser(): void {
    if (!this.seen) {
      this.dataService.sendSeenByUser(this.userName);
      this.seen = true;
    }
  }

  ngOnDestroy() {
    this.messagesSub.unsubscribe();
    this.activeUsersSub.unsubscribe();
    this.seenByUsersSub.unsubscribe();
  }
}
