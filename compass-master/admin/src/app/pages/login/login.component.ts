import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as appGlobals from '../../app.global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public signIn: FormGroup;
  public isFormSubmitted: boolean = false;
  public data: any;
  public isIncorrect: boolean = false;
  public loadIndicatorVisible = false;
  public buttonText = "Login";
  public isDisabled: boolean = false;
  constructor(private form: FormBuilder, public http: HttpClient, public route: Router,) { }

  ngOnInit(): void {
    this.signIn = this.form.group({
      email: this.form.control('', Validators.required),
      password: this.form.control('', Validators.required)
    });
  }

  submit() {
    this.isFormSubmitted = true;
    this.isIncorrect = false;
    this.buttonText = "Logging in";
    this.loadIndicatorVisible = true;
    this.isDisabled = true;
    if (this.signIn.valid) {
      const url = `${appGlobals.createEndpoint('Auth/admin/' + this.signIn.value.email + '/' + this.signIn.value.password)}`;
      this.http.get(url).subscribe((res: any) => {
        this.data = res;
        const userDetails = {
          user: {
            userid: this.data.userid,
            admin: this.data.admin,
            name: this.data.name,
            email: this.data.email
          }
        }
        window.localStorage.setItem('User', JSON.stringify(userDetails));
        window.localStorage.setItem('Token', JSON.stringify(this.data.token));
        this.loadIndicatorVisible = false;
        this.route.navigate(['/contents']);
        this.buttonText = "Login";
        console.log(this.data)
      }, (err) => {
        this.isIncorrect = true;
        this.loadIndicatorVisible = false;
        this.buttonText = "Login";
        this.isDisabled = false;
        console.log(err)
      });
    }
    else {
      this.loadIndicatorVisible = false;
      this.buttonText = "Login";
      this.isDisabled = false;
    }
  }



}
