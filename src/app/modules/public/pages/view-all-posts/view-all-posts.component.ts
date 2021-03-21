import { Component, Inject, OnInit } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger,
} from '@angular/animations';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { selectPublic } from '../../store';
import { viewPosts } from '../../store/view-all-posts/view-all-posts.actions';

@Component({
  selector: 'app-view-all-posts',
  templateUrl: './view-all-posts.component.html',
  styleUrls: ['./view-all-posts.component.scss'],
  animations: [
    trigger('cardAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(200%)' }),
            stagger(50, [
              animate('1s ease-out', style({ opacity: 1, transform: 'none' })),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class ViewAllPostsComponent implements OnInit {
  postsData$ = this.store.pipe(
    select(selectPublic),
    map((state) => state.viewAllPosts.posts)
  );

  constructor(
    @Inject('API_BASE_URL') public apiUrl: string,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(viewPosts());
  }
}
