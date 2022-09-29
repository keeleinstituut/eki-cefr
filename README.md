# EkilexTools

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Kausta tekitamine, mis läheb serverisse

* Kirjuta terminali käsk kui soovid sõnaveebi rakendust lisada: ng build --prod

* Kirjuta terminali käsk kui soovid testserverisse rakendust lisada: ng build --configuration=test

* dist kausta tekkinud kaus tõsta vajalikku kohta

* kaustas olevas index.html failis peab muutma base urli vastavaks ehk  "/ww/teacher-tools"


## Apache conf
* Kopeeri angular failid serverisse /opt kausta
* muuda index.html failis base url
* muuda Apache confi

```
Alias "/ww/teacher-tools" "/opt/teacher-tools"

<Directory "/opt/teacher-tools">
Order Allow,Deny
Allow from all
Require all granted
</Directory>


<Location "/ww/teacher-tools">
ProxyPass "!"
</Location>
```

* taaskäivita apache teenus
