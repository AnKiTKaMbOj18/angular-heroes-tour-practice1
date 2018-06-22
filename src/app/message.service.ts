import { Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  @Input() messages:string[]=[];

  constructor() { }

  add(message:string){
    this.messages.push(message);
  }

  clear(){
    this.messages=[];
  }

}
