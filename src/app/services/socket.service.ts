import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket = io(environment.socketUrl, {
    transports: ['websocket'],
  });

  emitScoreUpdate(data: any): void {
    this.socket.emit('scoreUpdate', data);
  }

  onScoreUpdate(callback: (data: any) => void): void {
    this.socket.on('scoreUpdate', callback);
  }
}
