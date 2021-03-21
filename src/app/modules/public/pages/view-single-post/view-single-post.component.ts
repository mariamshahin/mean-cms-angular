import { Component, Inject, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { currentRouteState } from 'app/store';
import { Subscription } from 'rxjs';
import { selectPublic } from '../../store';
import { viewSinglePost } from '../../store/view-single-post/view-single-post.actions';

@Component({
  selector: 'app-view-single-post',
  templateUrl: './view-single-post.component.html',
  styleUrls: ['./view-single-post.component.scss'],
})
export class ViewSinglePostComponent implements OnInit {
  routerData$ = this.store.pipe(
    select(currentRouteState),
    map((state) => state)
  );

  postData$ = this.store.pipe(
    select(selectPublic),
    map((state) => state.viewSinglePost.post)
  );

  routeSub: Subscription;
  routeParams: { [key: string]: any };

  constructor(
    @Inject('API_BASE_URL') public apiUrl: string,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.routeSub = this.routerData$.subscribe((route: any) => {
      this.routeParams = route.params;
    });
    this.store.dispatch(viewSinglePost({ id: this.routeParams?.id }));
  }
}
