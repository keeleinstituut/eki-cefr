# Õpetajate tööriistad

Angulari versioon [Angular CLI](https://github.com/angular/angular-cli) version 17.3.3.


Angulari rakenduse kompileerimiseks on vajalik eelnevalt installida [node.js](https://nodejs.org) ja [Angular CLI](https://github.com/angular/angular-cli)  tarkvara.

## Rakenduse paigaldamine

**Angulari juhend**

https://angular.io/start/start-deployment


**Koodi allalaadimine**

```bash
# kataloogi loomine
mkdir eki-cefr

# projekti koodi allalaadimine. NB! toodangusse mõeldud kood asub harus master
git clone --single-branch --branch master  https://github.com/keeleinstituut/eki-cefr.git
```

**Paigaldamine**

```bash
# liikumine projekti kataloogi
cd  eki-cefr

# JavaScript teekide paigaldamine
npm install
```

**Kausta tekitamine, mis läheb serverisse**

<code>ng build</code> käsk genereerib kõik vajalikud failid kataloogi <code>dist/</code>

<code>--configuration production</code> parameeter määrab ära, et kompileerimisel loetakse keskkonnamuutujad sisse failist <code>eki-cefr/src/environments/environment.prod.ts</code> 


```bash
ng build --configuration production
```

<code>dist</code> kausta tekkinud kaust tõsta vajalikku kohta

<code>dist</code> kaustas olevas <code>index.html</code> failis peab muutma base urli vastavaks ehk  <code>/ww/teacher-tools</code>


## Apache
* Kopeeri angular failid serverisse <code>/opt</code> kausta
* muuda <code>index.html</code> failis <code>base url</code>
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

## Teised serverid

https://angular.io/guide/deployment#server-configuration




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


