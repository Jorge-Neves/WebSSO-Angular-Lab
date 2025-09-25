import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationSignalService {
  private _message = signal<string | null>(null);

  public readonly message = this._message.asReadonly();

  sendMessage(msg: string) {
    this._message.set(msg);
  }

  clearMessage() {
    this._message.set(null);
  }
}
