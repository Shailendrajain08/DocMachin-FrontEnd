import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-verified',
  templateUrl: './not-verified.component.html',
  styleUrls: ['./not-verified.component.scss']
})
export class NotVerifiedComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.router.navigate(['/login'])
  }
}
