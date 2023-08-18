import {Injectable} from "@angular/core";
import {delay, Observable, of} from "rxjs";



const MONSTER_NAMES = [
  'barry',
  'ben',
  'bernie',
  'fred',
  'bob',
  'alice',
  'jill',
  'jenny',
  'jessica',
  'jason',
  'jacob',
];


export type Monster = {
  name: string
}

const monsters: Monster[] = new Array(20).fill(1).map((item, index) => ({
  name: Object.values(MONSTER_NAMES)[Math.floor(Math.random() * Object.values(MONSTER_NAMES).length)]
}));



@Injectable({providedIn: 'root'})
export class MonsterService {

  getMonsters(): Observable<Monster[]> {
    console.log('RETRIEVING MONSTERS');
    return of(monsters).pipe(
      delay(1000)
    );
  }

  getMonster(name: string): Observable<Monster | undefined> {
    console.log('RETRIEVING MONSTER', name);
    return of(monsters.find(monster => monster.name === name)).pipe(
      delay(1000)
    );
  }
}
