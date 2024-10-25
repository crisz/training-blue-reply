---
layout: page
title: Ex2 ~ Angular - 1
permalink: /esercizi/frontend/esercizio2
parent: Esercizi Frontend
nav_order: 2
---
# Esercizio 2

## Angular - 1 
In questo esercizio, da eseguire direttamente sul codice di event-hub, verranno affrontate diverse tematiche legate al framework Angular. In particolare, all'interno del componente di dettaglio evento è richiesto di inserire una CTA "mostra partecipanti"; al click su di essa vengono recuperati i dettagli dei partecipanti invocando il servizio ```events/{event_id}/participants```. Una volta recuperati i dati dei partecipanti le informazioni degli stessi andranno salvate sullo state dell'applicazione (nuova chiave ```participants``` dell'oggetto ```Event```) E passate ad un nuovo componente <participant-data> tramite input (Angular). 

Il componente si configura come una lista di righe, una riga per ogni partecipante. Ogni riga avrà 4 colonne: Nome/Cognome/Email/CTA "Elimina". Al click sulla CTA "Elimina" verrà notificato il "componente padre" (tramite Output Angular) il quale si occuperà di richiamare il metodo ```/deletePartecipant``` per eliminare il partecipante dall'evento. 
Il servizio prende in input l'id dell'evento come pathParam. Se NON si è proprietari dell'evento il servizio restituirà un errorCode: 403. Sarà necessario gestire l'errore mostrando un toast/popup di errore generico.

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
- ...
- ...

## Risoluzione
<details>
  <summary>Visualizza soluzione</summary>
    ...
</details>
