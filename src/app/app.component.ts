import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {DataService} from './data.service';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material';

import * as $ from 'jquery';
import {DialogComponent} from "./dialog/dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  messagesSub: Subscription;
  seenByUsersSub: Subscription;
  userName: string;
  userMessage: string;
  messages = [];
  seenByUsers = [];
  seen: boolean;
  dialogRef;

  constructor(private dataService: DataService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.openDialog();
    this.messagesSubInit();
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

  seenByUsersSubInit(): void {
    this.seenByUsersSub = this.dataService.getSeenByUsers()
      .subscribe(data => {
        this.seenByUsers = data;
      });
  }

  seenByAnyone(): boolean {
    return this.seenByUsers.length > 0;
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

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.userName = result;
      this.dataService.sendUserInfo(this.userName);
    });
  }

  ngOnDestroy() {
    this.messagesSub.unsubscribe();
    this.seenByUsersSub.unsubscribe();
    this.dialogRef.unsubscribe();
  }
}

