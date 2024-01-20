<!-- THIS IS A GENERATED FILE - DO NOT EDIT -->
# CommandProcessor

A processor to execute the commands of a `CommandGroup`.

---
1) [The `execute` method signature](#1)
2) [Calling the `execute` method](#2)
3) [When a command has an additional output type](#3)
4) [When a command expects additional arguments](#4)
---

# 1.

**The `execute` method signature.**

The `CommandProcessor` has a single asynchronous `execute` method. This is an overloaded method with 4 signatures, but has a single implementation using conditional types to determine which arguments are required at the call site.

```ts
import {Observable} from "rxjs";

export class CommandProcessor {

    execute(commandGroup, input): Observable<IOType>
    execute(commandGroup, input, extraArgs): Observable<IOType>
    execute(commandGroup, input, bypassCondition): Observable<IOType|BypassType>
    execute(commandGroup, input, extraArgs, bypassCondition): Observable<IOType|BypassType> {
        
    }
}
```

The first two arguments are always required:

 - `commandGroup: CommandGroup`
 - `input` - the type of this argument is inferred from the `CommandGroup`'s `IOType`

Any other required arguments are determined by inspecting the supplied `CommandGroup`:

 - `extraArgs` - required if the `CommandGroup` specifies an `ExtraArgsType`. Its type is a predetermined length tuple exposing element labels and types. 
 - `bypassCondition: CommandProcessorBypassCondition` - this is required if the `CommandGroup` specifies an `AdditionalOutputType`. It's a type guard function that is executed to test the current return type, bypassing the remaining commands if it's found to be the same type as the groups `AdditionalOutputType`.


# 2.

**Calling the `execute` method.**

A simple command with string input and output

```ts
import {take} from 'rxjs/operators'
import {Command, CommandGroup, CommandProcessor} from 'commands';


const group = new CommandGroup<Command<string>>(),
    processor = new CommandProcessor();

group.addCommand(new StringInStringOutCommand());
group.addCommand(new StringInStringOutCommand());
group.addCommand(new StringInStringOutCommand());
group.addCommand(new StringInStringOutCommand());

processor.execute(group, 'test')
    .pipe(take(1))
    .subscribe((output: string) => {
        // output: 'test'
    });
```

# 3.

**When a command has an additional output type.**

```ts
import {take} from 'rxjs/operators'
import {Command, CommandGroup, CommandProcessor, CommandProcessorBypassCondition} from 'commands';


const group = new CommandGroup<Command<number, number | string>, true>(),
    processor = new CommandProcessor(),
    bypassCondition: CommandProcessorBypassCondition<number, string> = (inpt: number|string): inpt is string => {
        return typeof inpt === 'string';
    };

group.addCommand(new NumberInNumberOrStringOutCommand());
group.addCommand(new NumberInNumberOrStringOutCommand());
group.addCommand(new NumberInNumberOrStringOutCommand());

// 3rd argument of type CommandProcessorBypassCondition is now required as the CommandGroup has an additional output type
processor.execute(group, 1, bypassCondition) 
    .pipe(take(1))
    .subscribe((output: number | string) => {
        // output: 4
    });

processor.execute(group, 3, bypassCondition)
    .pipe(take(1))
    .subscribe((output: number | string) => {
        // output: 'larger than 5'
        // 3rd Command in group bypassed
    });
```

# 4.

**When a command expects additional arguments.**

```ts
import {take} from 'rxjs/operators'
import {Command, CommandGroup, CommandProcessor} from 'commands';


const group = new CommandGroup<Command<number, number, [extra1: string, extra2: Function]>(),
    processor = new CommandProcessor();

group.addCommand(new CommandWithExtraArguments());
group.addCommand(new CommandWithExtraArguments());
group.addCommand(new CommandWithExtraArguments());
group.addCommand(new CommandWithExtraArguments());

// 3rd argument of an Array of type [string, Function] is now required as the CommandGroup requires extra args
processor.execute(group, 1, ['test', () => {}]) 
    .pipe(take(1))
    .subscribe((output: number) => {
        // output: 9
    });
```
