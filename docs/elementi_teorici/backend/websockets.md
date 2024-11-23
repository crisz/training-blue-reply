---
layout: page
title:  WebSockets
permalink: /teoria/backend/websockets
parent: Tecnologie di Backend
---

# WebSockets

I WebSockets sono una tecnologia che consente la comunicazione bidirezionale e full-duplex tra un client e un server attraverso un'unica connessione TCP. A differenza delle tradizionali richieste HTTP, che sono di tipo richiesta-risposta e stateless, i WebSockets permettono una comunicazione continua e persistente, particolarmente utile per applicazioni in tempo reale come chat, giochi online, e aggiornamenti finanziari.

## Principi Fondamentali

I WebSockets permettono una comunicazione costante tra client e server, senza la necessità di riaprire una connessione ogni volta. Di seguito sono riportati i principi chiave di questa tecnologia:

### 1. **Connessione Persistente**

Con i WebSockets, la connessione tra il client e il server è **persistente**. Una volta stabilita, la connessione rimane aperta, permettendo lo scambio di messaggi bidirezionale in qualsiasi momento. Questo approccio elimina la necessità di continuare a inviare richieste HTTP ripetute, migliorando l'efficienza.

La connessione viene stabilita con una richiesta di handshake iniziale basata su HTTP, dopodiché viene effettuato l'upgrade alla connessione WebSocket.

### 2. **Comunicazione Bidirezionale**

A differenza delle richieste HTTP, che sono unidirezionali, i WebSockets supportano la **comunicazione bidirezionale**. Questo significa che sia il client che il server possono inviare messaggi in qualsiasi momento senza dover attendere una risposta.

Ad esempio, in una chat in tempo reale, sia il client che il server possono inviare messaggi indipendentemente l'uno dall'altro.

### 3. **Full-Duplex**

I WebSockets forniscono una comunicazione **full-duplex**, il che significa che i dati possono essere inviati e ricevuti contemporaneamente. Questo è ideale per scenari in cui è necessario uno scambio rapido e continuo di informazioni tra client e server.

### 4. **Basso Overhead**

Poiché la connessione rimane aperta, il protocollo WebSocket ha un **basso overhead** rispetto al modello HTTP tradizionale. Non c'è bisogno di creare nuove connessioni o inviare intestazioni HTTP per ogni messaggio, rendendo la comunicazione più efficiente, soprattutto in contesti ad alta frequenza di scambio dati.

## Vantaggi di WebSockets

I WebSockets offrono numerosi vantaggi rispetto alle tradizionali tecnologie di comunicazione:

- **Efficienza**: Riduce il sovraccarico di rete grazie alla connessione persistente e all'assenza di richieste ripetute.
- **Reattività in tempo reale**: Consente comunicazioni in tempo reale, perfette per app di chat, giochi e sistemi di trading.
- **Scalabilità**: Anche se una connessione persistente richiede risorse sul server, permette una gestione efficiente di molteplici client con aggiornamenti frequenti.

## Stato della Connessione

I WebSockets gestiscono diverse fasi durante la loro connessione:

- **Handshake**: La connessione WebSocket inizia con un handshake HTTP, durante il quale il client richiede l'aggiornamento del protocollo. Una volta che il server accetta, la connessione viene stabilita e si passa alla modalità WebSocket.
- **Connessione Aperta**: Dopo l'handshake, la connessione rimane aperta e sia il client che il server possono scambiarsi messaggi in qualsiasi momento.
- **Chiusura della Connessione**: La connessione può essere chiusa da entrambe le parti con un messaggio di chiusura, ad esempio quando il client chiude l'applicazione o il server deve effettuare manutenzione.

## Gestione degli Errori

La **gestione degli errori** è importante per mantenere la stabilità e l'affidabilità delle connessioni WebSocket:

- **Riconnessione Automatica**: È buona pratica implementare un meccanismo di riconnessione automatica sul lato client per gestire disconnessioni accidentali o problemi di rete.
- **Codici di Stato WebSocket**: I WebSockets utilizzano **codici di stato** per indicare la ragione della chiusura della connessione. Alcuni dei più comuni sono:
  - **1000**: Connessione chiusa normalmente.
  - **1001**: La connessione è stata chiusa poiché il server o il client sta andando offline.
  - **1006**: Errore anomalo, spesso indica che la connessione è stata chiusa senza un messaggio di chiusura appropriato.

- **Gestione degli Errori di Rete**: L'implementazione dovrebbe prevedere timeout e tentativi di riconnessione in caso di fallimento della connessione per garantire la continuità del servizio.

## Best Practices

Per creare un'applicazione WebSocket robusta, è importante seguire alcune **best practices**:

1. **Heartbeat**: Utilizzare messaggi di ping/pong per verificare che la connessione sia ancora attiva e mantenere la connessione viva.
2. **Autenticazione e Sicurezza**: Autenticare i client durante il handshake e utilizzare TLS (wss://) per garantire la sicurezza della connessione.
3. **Scalabilità**: Per applicazioni con molti client, utilizzare un sistema di bilanciamento del carico e strumenti come Redis per la gestione dei messaggi distribuiti.
4. **Compressione dei Messaggi**: Se i messaggi sono voluminosi, è possibile utilizzare la compressione per ridurre la quantità di dati trasferiti.

## Status Codes WebSocket

I WebSockets utilizzano codici di stato specifici per gestire la chiusura delle connessioni e segnalare eventuali errori. Alcuni dei più comuni sono:

- **1000 Normal Closure**: La connessione è stata chiusa intenzionalmente senza errori.
- **1001 Going Away**: La connessione è stata chiusa perché una delle parti sta terminando (ad esempio, il server viene spento).
- **1002 Protocol Error**: La connessione è stata chiusa a causa di un errore del protocollo.
- **1003 Unsupported Data**: Il server ha ricevuto dati di tipo non supportato.
- **1006 Abnormal Closure**: Chiusura anomala, spesso segno di un errore di connessione senza un messaggio di chiusura formale.

## Collegamenti Esterni

Per ulteriori approfondimenti, puoi consultare i seguenti collegamenti:

- [WebSocket Overview - MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [RFC 6455 - The WebSocket Protocol](https://datatracker.ietf.org/doc/html/rfc6455)
- [WebSockets: A Conceptual Deep Dive](https://ably.com/concepts/websockets)

## Conclusione

I WebSockets sono una tecnologia potente per le applicazioni in tempo reale che richiedono una comunicazione costante e bidirezionale tra client e server. Grazie alla loro capacità di mantenere una connessione persistente, i WebSockets permettono una riduzione del carico di rete e migliorano la reattività delle applicazioni. La gestione degli errori, l'implementazione delle best practices e l'utilizzo di tecniche di sicurezza sono fondamentali per garantire una connessione affidabile e sicura, migliorando così l'esperienza utente.
