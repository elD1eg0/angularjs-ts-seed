# Introduction

A seed project for AngularJS apps written in *TypeScript*.

_This project is heavily inspired by [angular2-seed](https://github.com/mgechev/angular2-seed)_

# Features
* AngularJS **1.5.x**
* Angular Component Router
* Angular Material **1.1.0-RC1** ([doc](https://material.angularjs.org/latest/))
* SystemJS
* Livereload (install [Chrome Plugin](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) to enable this feature)

# Unit tests
* [jasmine](http://jasmine.github.io/2.4/introduction.html)
* [jasmine-matchers](https://github.com/JamieMason/Jasmine-Matchers) for handful extra matchers

## Recipes
You can find some useful recipes (eg. how to test $timeout and $interval) here:

```bash
 app
 |-- components
     |-- common
         |-- common.config.spec.ts       # angular values and constants
     |-- example
         |-- example-external.directive.html     # template for example-external.directive
         |-- example-external.directive.ts       # directive with external template (templateUrl needs the relative path from app/components)
         |-- example-external.directive.spec.ts  # test for a directive with external template
         |-- example-simple.directive.spec.ts    # test for a directive with inline-template
         |-- example.controller.spec.ts  # $interval and $timeout with jasmine spies
         |-- example.filter.spec.ts      # test for a custom filter
         |-- example.module.spec.ts      # injection and logs
         |-- example.provider.spec.ts    # test for a provider and its generated service with an example of module-level configuration
         |-- example.service.spec.ts     # angular services and Date
```

# How to start

```bash
git clone https://github.com/soulsoftware/angularjs-ts-seed
cd angularjs-ts-seed
npm install
```

Node should automatically install:
* [typings](https://github.com/typings/typings) with TypeScript definitions
* [gulp-cli](https://github.com/gulpjs/gulp-cli) that should show the list of the
available tasks, with the description of the main ones

You can replicate these behaviours by running the following commands:

```bash
# If the tools have not been installed
npm install --save-dev typings gulp-cli

# If the TS definitions need to be updated
typings install

# If you need information about the main available tasks
gulp -T
```

## Main tasks

If you need support for using the afore mentioned tasks, you can run:

```bash
# shorthand
gulp <task> -s

# full version
gulp <task> --support
```

### Accelerator

You can generate a **scaffolded component** by using the following command:

```bash
gulp gen:component --name <componentName>
```

You can generate a new angular *module* by using the following command:

```bash
gulp gen:module --name <snakeCasedModuleName> --path <existingPathFromComponents>
```

You can generate a new angular *controller* by using the following command:

```bash
gulp gen:controller --name <snakeCasedControllerName> --path <existingPathFromComponents> [--module <moduleName>]
```

You can generate a new angular *filter* by using the following command:

```bash
gulp gen:filter --name <snakeCasedFilterName> --path <existingPathFromComponents> [--module <moduleName>]
```

You can generate a new angular *service* by using the following command:

```bash
gulp gen:service --name <snakeCasedServiceName> --path <existingPathFromComponents> [--module <moduleName>]
```

You can generate a new angular *provider* by using the following command:

```bash
gulp gen:provider --name <snakeCasedProviderName> --path <existingPathFromComponents> [--module <moduleName>]
```

### Build, test and run

If you are ready to test and run the application:

```bash
# Unit test with PhantomJS or Chrome
gulp test

# Dev run (default task)
gulp

# Dev run (default configuration)
gulp serve

# Prod run
gulp serve --prod
# ... or
gulp serve -p
```

## Scaffolding

The new component generator:

```bash
gulp component --name about
```

will create the following structure:

```bash
 app
 |-- components
     |-- about
         |-- about.css            # styles
         |-- about.html           # main template
         |-- about.ts             # entry point for imports / main definition
         |-- about.controller.ts  # main controller
         |-- about.module.ts      # angular module
         |-- about.spec.ts        # unit test specs

         components.ts            # *update manually* to register the module
```

Then, you can link this component to a specific route, by using it in `app.ts`.

# Conventions

To enforce the adoption of best practices, every build begins with *lint* tasks.

In addition, you are encouraged to format your code `[Shift+Alt+F]` before any commit.

The use of **factories** is **deprecated**, because of the Object Oriented paradigm adopted.

# Git Flow

TBD

# License

MIT
