import {Component, inject} from '@angular/core';
import {AsyncPipe, CommonModule} from '@angular/common';
import {GridLayoutComponentModule} from "@jbr/ui";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {Monster, MonsterService} from "../../service/monster.service";
import {combineLatestWith, debounceTime, map, startWith, tap} from "rxjs";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-monsters',
  standalone: true,
  imports: [GridLayoutComponentModule, ReactiveFormsModule, AsyncPipe, RouterLink],
  templateUrl: './monsters.component.html',
  styleUrls: ['./monsters.component.scss']
})
export class MonstersComponent {

  readonly searchControl = new FormControl('', {nonNullable: true});

  readonly #service = inject(MonsterService);

  readonly #search$ = this.searchControl.valueChanges.pipe(
    debounceTime(250),
    startWith('')
  )

  readonly monsters$ = this.#service.getMonsters().pipe(
    combineLatestWith(this.#search$),
    map(([monsters, search]) => {
      return monsters.filter((monster: Monster) => monster.name.startsWith(search))
    }),
  )
}
