import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../../json/students.service';
import { AppServiceService } from '../../../app-service.service';
import { isNullOrUndefined } from 'util';
import * as moment from 'moment';

@Component({
  selector: 'app-exam-sec',
  templateUrl: './exam-sec.component.html',
  styleUrls: ['./exam-sec.component.scss', '../menu/style.menu.scss']
})

export class ExamSecComponent implements OnInit {

  groups: any;
  comissions: any;
  tickets: any;
  students: any;
  profiles: any;

  date: any;
  group_list: any;
  comission_list: any;
  students_list: any;
  ticket_group: [ { number: number, first_question: string, second_question: string, third_question: string } ];

  group: any;
  root: string;
  direction_id: number;

  constructor(
    private appService: AppServiceService
  ) { }

  ngOnInit() {
    this.date = moment(new Date()).format('YYYY-MM-DD');
    this.root = 'm';
    this.profiles = [];
    this.appService.GetProfiles()
      .subscribe(res => {
        this.profiles = res;
      });
    this.GetGroups();
  }

  SetRoot(root: string) {
    this.root = root;
  }

  GetGroups() {
    this.group = {};
    this.appService.GetGroupsDate(this.date)
      .subscribe(res => {
        this.groups = res;
        this.SetGroup();
      });
  }

  SetGroup() {
    this.group_list = [];
    this.group_list = this.groups.sort(this.SortByGroup);
    if (this.group_list.length > 0) {
      this.group = this.group_list[0];
    }
    this.GetComission();
  }

  SortByGroup(a, b) {
    if (a.group < b.group) {
      return -1;
    }
    if (a.group > b.group) {
      return 1;
    }
    return 0;
  }

  SelectGroup(selectedValue: any) {
    this.group = this.groups[selectedValue.target.selectedIndex];
    this.GetComission();
  }

  GetComission() {
    this.comission_list = [];
    this.direction_id = null;
    if (isNullOrUndefined(this.group.code) !== true) {
      this.direction_id = this.profiles.find(profile => profile.code === this.group.id_profiles).id_directions;
      this.appService.GetComissions(this.direction_id, moment(this.date).format('YYYY'))
        .subscribe(res => {
          this.comissions = res;
          this.SetComission();
        });
    }
  }

  SetComission() {
    if (isNullOrUndefined(this.comissions) !== true) {
      this.comission_list = this.comissions.filter(person => ['p', 'c']
        .includes(person.role))
        .map(person => {
          return {
            code: person.code,
            pred: person.role === 'p' ? true : false,
            fio: person.fio,
            group_code: this.group.code,
            status: false
          };
        });
      this.GetTickets();
    }
  }

  GetTickets() {
    this.tickets = [];
    if (isNullOrUndefined(this.group.code) !== true) {
      this.appService.GetTicketsCode(this.group.code)
        .subscribe(res => {
          this.tickets = res;
          this.SetTickets();
        });
    }
  }

  SetTickets() {
    this.ticket_group = null;
    if (isNullOrUndefined(this.tickets) !== true) {
      this.ticket_group = this.tickets[0];
    }
    this.GetStudents();
  }

  GetStudents() {
    this.students = [];
    if (isNullOrUndefined(this.group.code) !== true) {
      this.appService.GetStudentsCode(this.group.code)
        .subscribe(response => {
          this.students = response;
        });
    }
  }

  OnReturnStudents(students) {
    this.students = students;
  }
}
