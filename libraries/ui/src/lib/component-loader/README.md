<!-- THIS IS A GENERATED FILE - DO NOT EDIT -->

<a name="user-content-component-loader"></a>
<a name="component-loader"></a>
# Component Loader

A collection of directives and services for dynamically loading components.

---


<a name="user-content-component-loader-componentloader"></a>
<a name="component-loader-componentloader"></a>
## ComponentLoader

<a name="user-content-component-loader-componentloader-selector"></a>
<a name="component-loader-componentloader-selector"></a>
### Selector

```componentLoader, [componentLoader]```


### Standalone

```true```





<a name="user-content-component-loader-componentloader-implements"></a>
<a name="component-loader-componentloader-implements"></a>
### Implements

```OnChanges,OnDestroy```





---
### Inputs

```
@Input('componentLoader')
componentType?: string
```




---
### Outputs

```
@Output()
componentChanged = new EventEmitter<T>()
```






---
### Methods

```
ngOnChanges(): void
```

```
loadComponent(componentType?: string): void
```

```
ngOnDestroy(): void
```



## Usage

```html

<ng-container [componentLoader]="componentName">
</ng-container>

```

```scss
:host {
  display: block;
}

```

