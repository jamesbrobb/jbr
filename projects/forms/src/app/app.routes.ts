import {CanMatchFn, Routes} from "@angular/router";
import {inject} from "@angular/core";
import {map, Observable} from "rxjs";
import {MonstersComponent} from "./components/monsters/monsters.component";
import {MonsterDetailComponent} from "./components/monster-detail/monster-detail.component";
import {MonsterService} from "./service/monster.service";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";


const monsterMatcher: CanMatchFn = (route, segments): Observable<boolean> => {

  const service = inject(MonsterService),
    name = segments[1].path;

  return service.getMonster(name).pipe(
    map(monster => !!monster)
  );
}



export const getAppRoutes = (): Routes => [{
  path:'',
  redirectTo: '/monsters',
  pathMatch: 'full'
}, {
  path: 'monsters',
  component: MonstersComponent,
}, {
  path: 'monsters/:name',
  component: MonsterDetailComponent,
  canMatch: [monsterMatcher]
}, {
  path: '**',
  component: PageNotFoundComponent
}];
