---
layout: page
title:  RESTful Web Services
permalink: /teoria/backend/restful
parent: Tecnologie di Backend
---

# RESTful Web Services

I RESTful Web Services sono un'architettura molto popolare per la progettazione di API (Application Programming Interface) scalabili e semplici da gestire. REST (Representational State Transfer) è uno stile architetturale che segue una serie di principi per la comunicazione tra sistemi distribuiti, basandosi principalmente sul protocollo HTTP.

## Principi Fondamentali

L'architettura REST è definita da una serie di principi che consentono la comunicazione tra client e server in maniera scalabile e indipendente. Di seguito, sono riportati i principi chiave:

### 1. **Risorse**

In REST, ogni elemento del sistema è considerato una **risorsa** e viene identificato da un URL (Uniform Resource Locator) univoco. Le risorse possono rappresentare qualsiasi cosa: utenti, documenti, immagini, ecc. Per esempio:

```
GET /utenti/123
```

In questo esempio, l'URL identifica una risorsa specifica, in questo caso un utente con ID 123.

### 2. **Metodi HTTP**

REST sfrutta i metodi del protocollo HTTP per interagire con le risorse. Ogni metodo rappresenta un'operazione specifica da effettuare sulla risorsa:

- **GET**: Recupera una risorsa senza modificarla.
- **POST**: Crea una nuova risorsa.
- **PUT**: Modifica o sostituisce una risorsa esistente.
- **PATCH**: Modifica parzialmente una risorsa esistente.
- **DELETE**: Cancella una risorsa esistente.

Ad esempio, per creare un nuovo utente si può invocare un'API come questa:

```
POST /utenti
```

### Idempotenza

L'idempotenza è un concetto fondamentale nei metodi HTTP di REST. Un'operazione è **idempotente** se può essere ripetuta più volte senza cambiare il risultato. I metodi **GET**, **PUT**, **DELETE** sono idempotenti, mentre **POST** non lo è.

- **GET**: Ogni chiamata a un endpoint **GET** restituirà sempre la stessa risorsa, senza effetti collaterali.
- **PUT**: La stessa risorsa viene sostituita con ogni chiamata, quindi il risultato è lo stesso, indipendentemente dal numero di volte che viene invocato.
- **DELETE**: Una risorsa viene cancellata, e chiamate successive non avranno più effetto se la risorsa non esiste.

**POST**, invece, non è idempotente poiché ogni richiesta crea una nuova risorsa, generando risultati diversi per ogni chiamata.

### 3. **Stateless**

L'architettura REST prevede che ogni richiesta dal client al server sia **stateless**, ovvero senza stato. Questo significa che ogni richiesta deve contenere tutte le informazioni necessarie affinché il server possa elaborarla correttamente, senza bisogno di mantenere dati di sessione.

### 4. **Rappresentazioni delle Risorse**

Le risorse vengono comunicate tra client e server in diverse **rappresentazioni**, come JSON, XML o HTML. Le API RESTful tendono a usare JSON per la sua leggerezza e facilità di lettura.

Ad esempio, un utente può essere rappresentato in JSON come:

```json
{
  "id": 123,
  "nome": "Mario",
  "email": "mario@example.com"
}
```

### 5. **Uniform Interface**

REST utilizza una **interfaccia uniforme** per permettere a client e server di interagire in maniera consistente e semplice. Questo implica l'uso di convenzioni comuni, ad esempio l'utilizzo degli stessi metodi HTTP per operazioni simili e una struttura uniforme per le risposte.

## Vantaggi di REST

L'approccio RESTful presenta diversi vantaggi per lo sviluppo di servizi web:

- **Scalabilità**: Le API RESTful possono essere facilmente scalate poiché ogni richiesta è indipendente.
- **Semplicità**: L'uso dei metodi HTTP rende l'interazione semplice e intuitiva.
- **Flessibilità**: Le risorse possono essere rappresentate in formati diversi e l'architettura può essere adattata a diverse piattaforme.

## Status Codes HTTP

Uno dei punti fondamentali delle API RESTful è l'utilizzo degli **status code HTTP** per comunicare il risultato delle operazioni. Gli status code sono importanti per fornire informazioni utili sia agli sviluppatori che agli utenti sull'esito delle richieste. Alcuni dei più comuni sono:

- **200 OK**: La richiesta è stata elaborata con successo.
- **201 Created**: Una nuova risorsa è stata creata.
- **204 No Content**: La richiesta è stata elaborata con successo, ma non c'è nessuna risposta da restituire.
- **400 Bad Request**: La richiesta è errata o malformata, spesso a causa di dati invalidi forniti dal client.
- **401 Unauthorized**: L'autenticazione è richiesta per accedere alla risorsa.
- **403 Forbidden**: L'accesso alla risorsa non è permesso, anche se l'utente è autenticato.
- **404 Not Found**: La risorsa richiesta non esiste.
- **409 Conflict**: Indica un conflitto, spesso usato per duplicati di risorse.
- **500 Internal Server Error**: Si è verificato un errore interno al server.

### Gestione degli Errori

La gestione degli errori è un aspetto cruciale nella progettazione di API RESTful. Una buona gestione degli errori rende le API più facili da usare e da debuggare. È importante:

- **Utilizzare status code appropriati**: Restituire il codice HTTP corretto in risposta a una richiesta aiuta il client a comprendere il risultato dell'operazione.
- **Messaggi di errore dettagliati**: Fornire un messaggio di errore utile, che descriva il problema in modo chiaro. Ad esempio:

```json
{
  "errore": "InvalidParameter",
  "messaggio": "Il campo 'email' non è valido. Deve essere una stringa valida."
}
```

- **Documentare gli errori**: Documentare i possibili errori e le relative cause per ogni endpoint permette agli sviluppatori di comprendere meglio le API e come gestire gli errori in maniera appropriata.

- **Idempotenza degli errori**: In caso di errore, è utile che le operazioni idempotenti come **PUT** o **DELETE** possano essere ripetute senza causare effetti collaterali, permettendo al client di correggere la richiesta e riprovare.

## Best Practices

Per creare un'API RESTful ben strutturata, è importante seguire alcune **best practices**:

1. **Usare URL descrittivi**: Gli endpoint dovrebbero essere descrittivi, come `/utenti` per rappresentare una collezione di utenti.
2. **Usare versioni**: Versionare le API (es: `/v1/utenti`) per mantenere la retrocompatibilità.
3. **Gestione degli errori**: Fornire messaggi di errore chiari e usare correttamente gli status code HTTP.
4. **Idempotenza**: Assicurarsi che i metodi idempotenti siano sempre ripetibili senza causare effetti collaterali imprevisti.
5. **Utilizzare i metodi HTTP correttamente**: Usare i metodi **GET**, **POST**, **PUT**, **PATCH** e **DELETE** in modo appropriato e coerente.

## Conclusione

I RESTful Web Services sono diventati un approccio standard per lo sviluppo di API moderne grazie alla loro semplicità e flessibilità. Seguendo i principi REST, è possibile creare API scalabili, facilmente manutenibili e in grado di soddisfare una vasta gamma di esigenze. La corretta gestione degli errori, l'idempotenza e l'utilizzo accurato dei metodi HTTP sono fondamentali per garantire una buona esperienza sia per gli sviluppatori che per gli utenti finali.

## Collegamenti Esterni

Per ulteriori approfondimenti, puoi consultare i seguenti collegamenti:

- [RESTful API Overview](https://restfulapi.net/)
- [REST API Tutorial](https://www.restapitutorial.com/)
- [REST Cookbook](https://restcookbook.com/)
