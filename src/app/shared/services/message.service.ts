import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Message } from "../interfaces/api-message";

@Injectable({
  providedIn: "root",
})
export class MessageService {
  public messageNotifier$ = new Subject<Message[]>();

  constructor() {}

  public showMsg(messages: Message[]): void {
    this.messageNotifier$.next(messages);
  }
}
