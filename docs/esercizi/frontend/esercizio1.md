---
layout: page
title: Ex1 ~ Developer tools
permalink: /esercizi/frontend/esercizio1
parent: Esercizi Frontend
nav_order: 1
---
# Esercizio 1

## Developer tools
In questo esercizio verranno affrontate tematiche legate all'uso e alla comprensione dei Cookie. In particolare sarà necessario agire tramite i "Developer tools" messi a disposizione dal browser. Dopo aver acceduto i developer tools aprire la scheda "Application" e quindi selezionare "Cookies" dalla lista di elemnti sulla colonna sinistra (Storage) per visualizzare i cookie. Tramite la console del browser i cookies (non tutti) sono "accessibili" tramite il document: ```document.cookie```.

## Temi trattati
Cookie
{: .label }

Sicurezza
{: .label }

JavaScript
{: .label }

Developer tools
{: .label }

## Procedimento
A seguito della login vengono restituiti da servizio 2 cookie: provare ad effettuare tampering (modifica) di entrambi i cookie.

## Domande
- come si può modificare un cookie tramite console di sviluppo?
- come si effettua il parse del/dei cookie tramite Javascript?
- nel progetto event-hub, che metadati hanno i cookie?

## Risoluzione
<details>
  <summary>Visualizza soluzione</summary>
  <ol>
    <li>
        Aprire i developer tools. Raggiungere la sezione Application/Storage/Cookies
    </li>
    <li>
        Selezionare http://localhost:4200
    </li>
    <li>
        Provare a modificare il campo "Value" del cookie JWT; navigare il sito e verificare che gli endpoint che prevedono che i servizi identifichino l'utente loggato (riconosciuto tramite le info presenti nel cookie JWT) NON funzionino. La modifica in questo caso è stata efficace perché è stata fatta "tramite" il browser che deve poter avere visibilità dei cookie (anche HttpOnly) per poterli poi inviare nelle successive request.
    </li>
    <li>
        Eseguire la logout, quindi la login. Provare a modificare il cookie JWT tramite console e verificare non sia possibile; non lo è in quanto JWT è un cookie HttpOnly e quindi non visibile/modificabile tramite Javascript. Questa accortezza aiuta a prevenire attacchi di tipo XSS: un attaccante può provare a iniettare codice malevolo nell'applicativo ma non sarà in grado di modificare il cookie contenente le informazioni del JWT. Il token "custom_theme", non essendo HttpOnly risulta invece modificabile.
    </li>
  </ol>
</details>
