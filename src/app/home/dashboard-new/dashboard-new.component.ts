import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../service/authenticate.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-dashboard-new',
  templateUrl: './dashboard-new.component.html',
  styleUrls: ['../../../sass/application.scss', './dashboard-new.component.scss']
})
export class DashboardNewComponent implements OnInit {
  id: any;
  constructor(public authservice: AuthenticateService, private userService: UserService,) { }

  async ngOnInit() {
    this.id = await this.userService.getUserDetail();
    //const data: any = this.userService.getUser();
    console.log(this.id)
  }


}
