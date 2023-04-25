# TINF21C_Projekt_Einsatz_von_Webtechnologien
Dies ist ein Blog. Der Blog ist mit Node.JS und Express umgesetzt. 
# Installation
## Konfiguration der Datenbank
   Die Skripte im Ordner [Installation](https://github.com/michi3214/TINF21C_Projekt_Einsatz_von_Webtechnologien/tree/main/Installation) gefunden werden. Mit dem Skript "create_database.sql" wird eine neue Datenbank mit dem Namen "DB_TINF21C_Webtechnologien_Blog" generiert. Zudem werden alle benötigten Tabellen angelegt und die CSV-Dateien importiert. 
   Bitte beachten Sie hierbei, dass der Dateipfad gegebenenfalls an ihre Umgebung angepasst werden muss. Dies kann in den Zeilen 33 und 43 erfolgen.  

## Installation der npm-Pakete
   Öffnen Sie im Terminal den Dateipfad des Projektes und führen Sie den Befehle: `npm install` aus. Nun werden alle benötigten Pakete geladen. 
# Nutzen der Webseite
## Starten des Webserivce 
   Als nächstes kann der Webserver gestartet werden. Dazu führen Sie den Befehl: `npm start` aus. 
## Aufrufen
   Nun kann der Blog unter [http://localhost:3000/](http://localhost:3000/) aufgerufen werden. 

# Struktur der Datenbank
Die Datenbank besteht aus 2 Tabellen. 
   1. tbl_user
   2. tbl_content

### 1. tbl_user
tbl_user verwaltet die registrierten User und hat 7 Spalten. Der Nutzername muss hierbei eindeutig (unique) sein. Zudem werden das Passwort, der genutzte Salt und die Privilegien des Nutzers abgelegt. Die Privilegien werden hierbei in drei Booleans abgelegt, jeweils für Schreib-, Lese- und Updateberechtigungen. 
### 1. tbl_content
Die tbl_content hat 6 Spalten. Die Überschrift, der eigentliche Inhalt, sowie das Erstellungsdatum und Bearbeitungsdatum werden hinterlegt. Außerdem wird der Author gespeichert. 





