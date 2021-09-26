import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css'],
})
export class AddEditComponent implements OnInit {
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

  addEmployee() {
    var val = {
      Id: this.Id,
      EmployeeName: this.EmployeeName,
      HomeAddress: this.HomeAddress,
      Mail: this.Mail,
      DateOfBirth: this.DateOfBirth,
      DateOfEmployment: this.DateOfEmployment,
      Workplace: this.Workplace,
      Superior: this.Superior,
      PhotoFileName: this.PhotoFileName,
    };
    this.service.addEmployee(val).subscribe((res) => {
      alert(res.toString());
    });
  }

  updateEmployee() {
    var val = {
      Id: this.Id,
      EmployeeName: this.EmployeeName,
      HomeAddress: this.HomeAddress,
      Mail: this.Mail,
      DateOfBirth: this.DateOfBirth,
      DateOfEmployment: this.DateOfEmployment,
      Workplace: this.Workplace,
      Superior: this.Superior,
      PhotoFileName: this.PhotoFileName,
    };
    this.service.updateEmployee(val).subscribe((res) => {
      alert(res.toString());
    });
  }

  uploadPhoto(event: any) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();

    formData.append('uploadedFile', file, file.name);

    this.service.UploadPhoto(formData).subscribe((data: any) => {
      this.PhotoFileName = data.toString();
      this.PhotoFilePath = this.service.PhotoUrl + '/' + this.PhotoFileName;
    });
  }
}
