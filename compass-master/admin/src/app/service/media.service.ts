import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import * as appGlobals from '../app.global';

@Injectable({
  providedIn: 'root'
})
export class Data {
  id: number;
  description: string;
  mediaids: string;
  meta = "{}";
  title: string;
  userid: number;
  media: any;
}
@Injectable({
  providedIn: 'root'
})
export class Change<T> {
  type: "insert" | "update" | "remove";
  key: any;
  data: Partial<T>;
}
@Injectable({
  providedIn: 'root'
})
export class MediaService {

  public data: any;

  constructor(public http: HttpClient) { }

  getmeta() {
    const url = `${appGlobals.createEndpoint('Content')}`;
    return this.http.get(url);
  }

  postnewContent(data) {
    const url = `${appGlobals.createEndpoint('Content')}`;
    return this.http.post(url, data);
  }

  deleteContent(id) {
    const url = `${appGlobals.createEndpoint('Content/' + id)}`;
    return this.http.delete(url);
  }
  updateContent(body, id) {
    const url = `${appGlobals.createEndpoint('Content/' + id)}`;
    return this.http.put(url, body);
  }

  getassesmentdata() {
    const url = `${appGlobals.createEndpoint('Assessments')}`;
    return this.http.get(url);
  }
  postassesmentdata(body) {
    const url = `${appGlobals.createEndpoint('Assessments')}`;
    return this.http.post(url, body);
  }

  updateassContent(body, id) {
    const url = `${appGlobals.createEndpoint('Assessments/' + id)}`;
    return this.http.put(url, body);
  }
  deleteassContent(id) {
    const url = `${appGlobals.createEndpoint('Assessments/' + id)}`;
    return this.http.delete(url);
  }
  saveChange(change: Change<Data>) {
    // switch (change.type) {
    //     case "insert":
    //         return this.insert(change);
    //     case "update":
    //         return this.update(change);
    //     case "remove":
    //         return this.remove(change);
    // }
    console.log(change)
    return change;
  }

  getContent() {
    const url = `${appGlobals.createEndpoint('Category')}`;
    return this.http.get(url);
  }

}
