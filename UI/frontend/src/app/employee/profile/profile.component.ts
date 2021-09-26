import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private service: SharedService) {}

  @Input() emp: any;
  Id: string | undefined;
  EmployeeName: string | undefined;
  HomeAddress: string | undefined;
  Mail: string | undefined;
  DateOfBirth: string | undefined;
  DateOfEmployment: string | undefined;
  Workplace: string | undefined;
  Superior: string | undefined;
  PhotoFileName: string | undefined;
  PhotoFilePath: string | undefined;

  ngOnInit(): void {
    this.loadEmployeeList();
  }

  loadEmployeeList() {
    this.Id = this.emp.Id;
    this.EmployeeName = this.emp.EmployeeName;
    this.HomeAddress = this.emp.HomeAddress;
    this.Mail = this.emp.Mail;
    this.DateOfBirth = this.emp.DateOfBirth;
    this.DateOfEmployment = this.emp.DateOfEmployment;
    this.Workplace = this.emp.Workplace;
    this.Superior = this.emp.Superior;
    this.PhotoFileName = this.emp.PhotoFileName;
    this.PhotoFilePath = this.service.PhotoUrl + '/' + this.PhotoFileName;
  }
}
