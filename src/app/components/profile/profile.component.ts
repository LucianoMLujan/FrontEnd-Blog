import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from '../../models/post';
import { User } from '../../models/user';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [PostService, UserService]
})
export class ProfileComponent implements OnInit {
	public url: string;
	public posts: Array<Post>;
	public user: User;
	public identity;
	public token;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _postService: PostService,
		private _userService: UserService
	) {
		this.url = global.url;
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
	}

	ngOnInit() {
		this.getProfile();
	}

	getProfile() {
		//Obtener el id del post de la url
		this._route.params.subscribe(params => {
			let userId = +params['id'];
			this.getUser(userId);
			this.getPosts(userId);
		});
	}

	getUser(userId) {
		this._userService.getUser(userId).subscribe(
			response => {
				if(response.status == 'success') {
					this.user = response.user;
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}

	getPosts(userId) {
		this._userService.getPosts(userId).subscribe(
			response => {
				if(response.status == 'success') {
					this.posts = response.posts;
				}
			},
			error => {
				console.log(<any>error);
			}
		); 
	}

	deletePost(id) {
		this._postService.delete(this.token, id).subscribe(
			response => {
				this.getProfile();
			},
			error => {
				console.log(<any>error);
			}
		);
	}

}
