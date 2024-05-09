import { Component, OnInit } from '@angular/core';
import { UniversityService } from '../services/university.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
})
export class UniversityComponent implements OnInit {
  universities: any = [];
  searchText: any;
  constructor(
    private universityService: UniversityService,
    public authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.universityService.listeUniversity().subscribe((uni) => {
      console.log(uni);
      this.universities = uni;
    });
  }
}
