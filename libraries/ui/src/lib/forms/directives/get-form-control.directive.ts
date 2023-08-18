import {AfterContentInit, ContentChild, DestroyRef, Directive, inject} from "@angular/core";
import {FormControl, FormControlName} from "@angular/forms";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {tap} from "rxjs";

@Directive({
  selector: '[getFormControl]',
  standalone: true
})
export class GetFormControlDirective implements AfterContentInit {

  #destroyRef = inject(DestroyRef);

  @ContentChild(FormControlName)
  public controlName?: FormControlName;
  public control?: FormControl;

  public ngAfterContentInit(): void {
    this.control = this.controlName?.control;
    this.control?.valueChanges.pipe(
      takeUntilDestroyed(this.#destroyRef),
      tap(value => console.log(value))
    ).subscribe();
  }
}
