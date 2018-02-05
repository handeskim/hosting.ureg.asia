import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { StringComparisonComponent }  from '../module-string-comparison/string-comparison.component';

import { Title, Meta } from '@angular/platform-browser';


const routes: Routes = [
  {
    path: '', redirectTo: '', pathMatch: 'full',
    data: { title: 'Best Hosting, Free Hosting for Student', metaDescription: 'Best Hosting, Free Hosting for Student' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta
  ){
    this.router.events
    .filter(event => event instanceof NavigationEnd)
    .map(() => this.activatedRoute)
    .map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
    })
    .filter(route => route.outlet === 'primary')
     .mergeMap(route => route.data)
    .subscribe((event) => {
        this.titleService.setTitle(event['title']);
        var tag = { name: 'description', content: event['metaDescription'] };
        let attributeSelector : string = 'name="description"';
        this.metaService.removeTag(attributeSelector);
        this.metaService.addTag(tag, false);
    });
  }
}
