# TINF21C_Projekt_Einsatz_von_Webtechnologien
## Installation
### Konfiguration der Datenbank
   Die Skripte im Ordner [Installation](https://github.com/michi3214/TINF21C_Projekt_Einsatz_von_Webtechnologien/tree/main/Installation) gefunden werden. Mit dem Skript "create_database.sql" wird eine neue Datenbank mit dem Namen "TINF21C_Kurs_Webtechnologien_Blog" generiert. Zudem werden alle benötigten Tabellen angelegt.

   Als nächstes können die beiliegenden CSV-Dateien importiert werden. Diese können automatisch mit dem Skript "import_csv.sql" geladen werden. Bitte beachten Sie hierbei, dass der Dateipfad gegebenenfalls an ihre Umgebung angepasst werden muss. 

### Installation der npm-Pakete
   Öffnen Sie im Terminal den Dateipfad des Projektes und führen Sie den Befehle: `npm install` aus. Nun werden alle benötigten Pakete geladen. 
## Starten des Webserivce 
   Als nächstes kann der Webserver gestartet werden. Dazu führen Sie den Befehl: `npm start` aus. 

## Nutzen der Webseite
   Nun kann der Blog unter [http://localhost:3000/](http://localhost:3000/) aufgerufen werden. 

