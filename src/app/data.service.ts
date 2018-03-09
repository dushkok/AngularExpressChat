import {Injectable} from '@angular/core';

import {Socket} from '../shared/socket';
import {Observer} from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';
import * as socketIo from 'socket.io-client';


@Injectable()
export class DataService {

  socket: Socket = socketIo('https://angularechat.herokuapp.com/');
  messagesObserver: Observer<any>;
  activeUsersObserver: Observer<any>;
  seenObserver: Observer<any>;


  sendMessage(data): void {
    this.socket.emit('userMessage', data);
  }

  getMessages(): Observable<any> {
    this.socket.on('userMessage', (res) => {
      this.messagesObserver.next(res);
    });
    return this.createMessagesObservable();
  }

  sendUserInfo(name): void {
    this.socket.emit('userInfo', name);
  }

  getActiveUsers(): Observable<any> {
    this.socket.on('usersInfo', (res) => {
      this.activeUsersObserver.next(res);
    });
    return this.createActiveUsersObservableble();
  }

  sendSeenByUser(name): void {
    this.socket.emit('seenByUsers', name);
  }

  getSeenByUsers(): Observable<any> {
    this.socket.on('seenByUsers', (data) => {
      this.seenObserver.next(data);
    });
    return this.createSeenObservable();
  }

  //observables creators
  createMessagesObservable(): Observable<string> {
    return new Observable(observer => {
      this.messagesObserver = observer;
    });
  }

  createActiveUsersObservableble(): Observable<string> {
    return new Observable(observer => {
      this.activeUsersObserver = observer;
    });
  }

  createSeenObservable(): Observable<string> {
    return new Observable(observer => {
      this.seenObserver = observer;
    });
  }

}
