import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['../../../sass/application.scss', './request.component.scss']
})
export class RequestComponent implements OnInit {
  item1: any;
  letterHead: any;
  forSeal: any;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getTeam()
      .subscribe(
        data => {
          console.log("king123")
          console.log(data['data'])
          console.log(data['data'][0].file[0]["Letter Head"])
          console.log(data['data'][0]['file'][2]["For Seal"])
          if (data['data'] && data['data'][0] && data['data'][0].file && data['data'][0].file[0]) {
            this.letterHead = data['data'][0].file[0]["Letter Head"]
          }
          if (data['data'] && data['data'][0] && data['data'][0].file && data['data'][0].file[2]) {
            this.forSeal = data['data'][0].file[2]["For Seal"]
          }
          console.log(this.forSeal)
          //this.router.navigate(['/login'], { queryParams: { registered: true }});
        },
        error => {
          console.log("error")
        });
  }

}
