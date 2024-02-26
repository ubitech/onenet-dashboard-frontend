export interface Message {
  text: string;
  type: string;
}

export class Message {
  constructor (text: string, type = 'error') {
    this.text = text;
    this.type = type;
  }
}