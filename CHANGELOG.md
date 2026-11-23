## [Unreleased]

### Muudetud

- Angular 21.0 -> 22.3
- TypeScript 5.9 -> 6.0
- Brauserite sihtversioonid viidi vastavusse Angular 22 toega (Baseline 2026-05-07).
- Sõnaotsingu piirmäär on 90 märki.
- Otsingutulemuste loogika koondati ühte komponenti `paging`.
- Otsingupäringute parameetrid koostatakse `HttpParams`-i abil, mitte stringide liitmisega.

### Parandatud

- Sõnaotsing ja teksti hindamise vaated ei jää ootele, kui server tagastab veakoodi 422.
- Teksti hindamisel kuvatakse laadimiskuva.
- Laadimiskuva katab kogu vaate ka kerimisel.

## [1.45.0] 2026-01-14

- Angular 19.2 -> 21.0
- Bootstrap 5.3.3 -> 5.3.8

## [1.40.0]

### Muudetud

- Bootstrap 4 -> Bootstrap 5.3. Globaalsed muudatused css osas.
- Angular 17.3 -> 19.2.
- Teksti saadetakse hindamisele _POST_-meetodiga.

## [1.39.0] - 2024-10-08

### Muudetud

- Muutus versioonide numeratsioon, et joonduks paremini Ekilex versiooniga.
- Rakenduse paigaldamise kirjeldus muudeti vastavaks versioneerimise loogikale.

## [1.1.0] - 2024-10-07

### Muudetud

- Jaluse tekstis uuendati aastaarvu info. Eemaldati Sõnaveebi täpse versiooni info.
- Uus toodangu API host.
- Tagasiside väljad muudeti vastavaks Ekilexile v1.39.0

### Parandatud

- Parandatud probleem `ng test` käivitamisel.

## [1.0.0] - 2024-06

### Lisatud

- Algne versioon.
