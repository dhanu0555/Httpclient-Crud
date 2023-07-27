import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: any[]=[];
  selectedPost: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.dataService.getPosts().subscribe(
      (data: any[]) => {
        this.posts = data;
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }

  addPost() {
    const newPost = {
      title: 'New Post',
      body: 'This is the body of the new post.'
    };

    this.dataService.addPost(newPost).subscribe(
      (data: any) => {
        console.log('New post added:', data);
        // Refresh the posts list after adding
        this.getPosts();
      },
      (error) => {
        console.error('Error adding new post:', error);
      }
    );
  }

  updatePost(post: any) {
    this.dataService.updatePost(post).subscribe(
      (data: any) => {
        console.log('Post updated:', data);
      },
      (error) => {
        console.error('Error updating post:', error);
      }
    );
  }

  deletePost(id: number) {
    this.dataService.deletePost(id).subscribe(
      () => {
        console.log('Post deleted successfully.');
        // Refresh the posts list after deletion
        this.getPosts();
      },
      (error) => {
        console.error('Error deleting post:', error);
      }
    );
  }
}
