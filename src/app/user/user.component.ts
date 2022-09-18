import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id: number;

  constructor(private route: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => { // for observables provided by angular like params we dont see unsubscribe, it is taken care by angular itself
      this.id = +params.id;
    });
  }

  onActivate() {
    this.userService.activatedEmiter.next(true);
  }
}
