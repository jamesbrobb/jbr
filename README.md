# jbr

serve portfolio
``` 
ng serve portfolio
```

build
```
ng build <project or lib name>
```

create library routes
```
 npm run create-libraries-routes
```

run ts test script
```
cd libraries/<library>
```
or
```
cd projects/<project>
```
Then run with tsx relative to execution.
So for either of the above
```
tsx ../../scripts/ts-test-script.ts
```
create readme
```
ng generate @jamesbenrobb/schematics:tsc-test <path to file>
```

gitdown
```
npx gitdown ./EXAMPLE.tpl.md --output-file ./EXAMPLE.md && npx gitdown ./README.tpl.md --output-file ./README.md
```




