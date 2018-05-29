
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AppServiceService {

  ranks: any;

  constructor(
    private _http: HttpClient
  ) { }

  CreateList(info) {
    const url = 'http://localhost:1000/generate_doc/rank_list';
    return this
      ._http
      .post(url, info)
      .map(res => {
        return res;
      });
  }

  CreateProtocol(info) {
    const url = 'http://localhost:1000/generate_doc/protocol';
    return this
      ._http
      .post(url, info)
      .map(res => {
        return res;
      });
  }

  GetFaculties() {
    const url = 'http://localhost:1000/get_db/get_faculties';
    return this
      ._http
      .get(url)
      .map(res => {
        return res;
      });
  }

  GetDirections() {
    const url = 'http://localhost:1000/get_db/get_directions';
    return this
      ._http
      .get(url)
      .map(res => {
        return res;
      });
  }

  GetProfiles() {
    const url = 'http://localhost:1000/get_db/get_profiles';
    return this
      ._http
      .get(url)
      .map(res => {
        return res;
      });
  }

  GetGroupsCode(code) {
    const url = 'http://localhost:1000/get_db/get_groups_code/' + code;
    return this
      ._http
      .get(url)
      .map(res => {
        return res;
      });
  }

  GetGroupsDate(date) {
    const url = 'http://localhost:1000/get_db/get_groups_date/' + date;
    return this
      ._http
      .get(url)
      .map(res => {
        return res;
      });
  }

  GetRanks() {
    const url = 'http://localhost:1000/get_db/get_ranks';
    return this
      ._http
      .get(url)
      .map(response => {
        return response;
      });
  }

  GetComissions(direction, year) {
    const url = 'http://localhost:1000/get_db/get_comissions/' + direction + '/' + year;
    return this
      ._http
      .get(url)
      .map(res => {
        return res;
      });
  }

  GetTicketsCode(code) {
    const url = 'http://localhost:1000/get_db/get_tickets/' + code;
    return this
      ._http
      .get(url)
      .map(res => {
        return res;
      });
  }

  GetStudentsCode(code) {
    const url = 'http://localhost:1000/get_db/get_students/' + code;
    return this
      ._http
      .get(url)
      .map(res => {
        return res;
      });
  }

  GetStudentsRate(code) {
    const url = 'http://localhost:1000/get_db/get_students_rate/' + code;
    return this
      ._http
      .get(url)
      .map(res => {
        return res;
      });
  }

  SetTicket(id, number) {
    const uri = 'http://localhost:1000/get_db/set_ticket_by_student/' + id;
    const obj = {
      number: number
    };
    return this
      ._http
      .post(uri, obj)
      .map(res => {
        return res;
      });
  }

  SetComission(id, number) {
    const uri = 'http://localhost:1000/get_db/set_comission_by_gradings/' + id;
    const obj = {
      number: number
    };
    return this
      ._http
      .post(uri, obj)
      .map(res => {
        return res;
      });
  }

  CreateRanks(id_stud, id_com, result, question) {
    const uri = 'http://localhost:1000/get_db/create_ranks';
    const obj = {
      id_stud: id_stud,
      id_com: id_com,
      question: question,
      result: result
    };
    return this
      ._http
      .put(uri, obj)
      .map(res => {
        return res;
      });
  }

  SetRanks(id, number, question) {
    const uri = 'http://localhost:1000/get_db/set_ranks/' + id + '/' + question;
    const obj = {
      number: number
    };
    return this
      ._http
      .post(uri, obj)
      .map(res => {
        return res;
      });
  }

  DeleteRanks(id, question) {
    const uri = 'http://localhost:1000/get_db/delete_ranks/' + id + '/' + question;
    return this
      ._http
      .delete(uri)
      .map(res => {
        return res;
      });
  }

  SetResult(id, number) {
    const uri = 'http://localhost:1000/get_db/set_result/' + id;
    const obj = {
      number: number
    };
    return this
      ._http
      .post(uri, obj)
      .map(res => {
        return res;
      });
  }

  SetProtocol(id, number) {
    const uri = 'http://localhost:1000/get_db/set_protocol/' + id;
    const obj = {
      number: number
    };
    return this
      ._http
      .post(uri, obj)
      .map(res => {
        return res;
      });
  }

}
