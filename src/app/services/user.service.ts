import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';

@Injectable()
export class UserService {
	
	public url: string;
	public identity;
	public token;

	constructor(
		public _http: HttpClient
	) {
		this.url = global.url;
	}

	register(user): Observable<any> {
		let json = JSON.stringify(user);
		let params = 'json='+json;
		let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');

		return this._http.post(this.url+'register', params, {headers: headers});
	}

	signup(user, gettoken = null): Observable<any> {
		if(gettoken != null) {
			user.gettoken = 'true';
		}

		let json = JSON.stringify(user);
		let params = 'json='+json;
		let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');

		return this._http.post(this.url+'login', params, {headers:headers});
	}

	update(token, user):Observable<any> {
		//Convierte html entities en utf-8
		user.description = global.htmlEntities(user.description);

		let json = JSON.stringify(user);
		let params = "json="+json;

		let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);

	   return this._http.put(this.url + 'user/update', params, {headers: headers});
	}

	getIdentity() {
		let identity = JSON.parse(localStorage.getItem('identity'));

		if(identity && identity != "undefined") {
			this.identity = identity;
		}else{
			this.identity = null;
		}

		return this.identity;
	}

	getToken() {
		let token = localStorage.getItem('token');

		if(token && token != "") {
			this.token = token;
		}else{
			this.token = null;
		}

		return this.token;
	}

	getPosts(id):Observable<any> {
		let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');

		return this._http.get(this.url + 'post/user/' + id, {headers: headers});
	}

	getUser(id):Observable<any> {
		let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');

		return this._http.get(this.url + 'user/detail/' + id, {headers: headers});
	}

} 