import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css'],
})
export class ShowComponent implements OnInit {
  constructor(private service: SharedService) {}

  EmployeeList: any = [];

  ModalTitle: string | undefined;
  ActivateAddEditEmpComp: boolean = false;
  emp: any;

  EmployeeIdFilter: string = '';
  EmployeeNameFilter: string = '';
  EmployeeListWithoutFilter: any = [];

  ngOnInit(): void {
    this.refreshEmpList();
  }

  addClick() {
    this.emp = {
      Id: 0,
      EmployeeName: '',
      Address: '',
      Mail: '',
      Born: '',
      Employed: '',
      Workplace: '',
      Superior: '',
      PhotoFileName: 'anonymous.png',
    };
    this.ModalTitle = 'Add Employee';
    this.ActivateAddEditEmpComp = true;
  }
  editClick(item: any) {
    this.emp = item;
    this.ModalTitle = 'Edit Employee';
    this.ActivateAddEditEmpComp = true;
  }

  closeClick() {
    this.ActivateAddEditEmpComp = false;
    this.refreshEmpList();
  }

  deleteClick(item: any) {
    if (confirm('Are you sure?')) {
      this.service.deleteEmployee(item.Id).subscribe((data) => {
        alert(data.toString());
        this.refreshEmpList();
      });
    }
  }

  viewProfile(item: any) {
    this.emp = item;
    this.ActivateAddEditEmpComp = true;
  }

  refreshEmpList() {
    this.service.getEmpList().subscribe((data) => {
      this.EmployeeList = data;
      this.EmployeeListWithoutFilter = data;
    });
  }

  filterFn() {
    var EmployeeIdFilter = this.EmployeeIdFilter;
    var EmployeeNameFilter = this.EmployeeNameFilter;

    this.EmployeeList = this.EmployeeListWithoutFilter.filter(function (
      el: any
    ) {
      return (
        el.Id.toString()
          .toLowerCase()
          .includes(EmployeeIdFilter.toString().trim().toLowerCase()) &&
        el.EmployeeName.toString()
          .toLowerCase()
          .includes(EmployeeNameFilter.toString().trim().toLowerCase())
      );
    });
  }

  sortResult(prop: any, asc: any) {
    this.EmployeeList = this.EmployeeListWithoutFilter.sort(function (
      a: any,
      b: any
    ) {
      if (asc) return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
      else return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
    });
  }
}
