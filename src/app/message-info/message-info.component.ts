import { Component, OnInit, OnDestroy } from '@angular/core';
import { TimeInterval } from 'rxjs';

@Component({
  selector: 'app-message-info',
  templateUrl: './message-info.component.html',
  styleUrls: ['./message-info.component.scss']
})
export class MessageInfoComponent implements OnInit, OnDestroy {

  messages: string[] = ['StayHome StaySafe', 'Help The Poor', 'Work Learn From Home', 'Enjoy Time With Family', 'Cooperate With Govt', 'Salute To Doctors']
  message: string = this.messages[0];
  timerId;

  constructor() {

  }

  ngOnInit() {
    this.timerSet();

  }

  banner() {

    this.message = this.messages[Math.floor(Math.random() * this.messages.length)];
    console.log(this.message)

  }


  timerSet() {
    this.timerId = setInterval(() => this.banner(), 9000);
  }


  ngOnDestroy() {
    clearInterval(this.timerId);
  }

}
