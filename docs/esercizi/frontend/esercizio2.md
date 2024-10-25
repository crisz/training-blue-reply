---
layout: page
title: Ex2 ~ Angular - 1
permalink: /esercizi/frontend/esercizio2
parent: Esercizi Frontend
nav_order: 2
---
# Esercizio 2

## Angular - 1 
In questo esercizio, da eseguire direttamente sul codice di event-hub, verranno affrontate diverse tematiche legate al framework Angular. In particolare, all'interno del componente di dettaglio evento è richiesto di inserire una CTA "mostra partecipanti"; al click su di essa vengono recuperati i dettagli dei partecipanti invocando il servizio ```events/{event_id}/participants```. Una volta recuperati i dati dei partecipanti le informazioni degli stessi andranno salvate sullo state dell'applicazione (nuova chiave ```participants``` dell'oggetto ```Event```) ```<b>E</b>``` passate ad un nuovo componente <participant-data> tramite input (Angular).

## Temi trattati
I/O
{: .label }

Lettura/Scrittura state
{: .label }

Http Request
{: .label }

Direttive Angular
{: .label }

Gestione Errori
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
