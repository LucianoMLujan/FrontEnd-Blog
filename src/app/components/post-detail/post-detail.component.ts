import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService, UserService]
})
export class PostDetailComponent implements OnInit {

	public post: Post;
	public identity;
	public token;

	constructor(
		private _postService: PostService,
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService
	) { 
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
	}

	ngOnInit() {
		this.getPost();
	}

	getPost() {
		//Obtener el id del post de la url
		this._route.params.subscribe(params => {
			let id = +params['id'];

			//Petición ajax para obtener el post
			this._postService.getPost(id).subscribe(
				response => {
					if(response.status == 'success') {
						this.post = response.posts;
					}else{
						this._router.navigate(['/inicio']);
					}
				},
				error => {
					console.log(<any>error);
					this._router.navigate(['/inicio']);
				}
			);

		});

	}

}
