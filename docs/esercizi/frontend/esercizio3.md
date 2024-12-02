---
layout: page
title: Ex3 ~ Angular - 2
permalink: /esercizi/frontend/esercizio3
parent: Esercizi Frontend
nav_order: 3
---
# Esercizio 3

## Angular - 2
In questo esercizio, da eseguire direttamente sul codice di event-hub, verranno affrontate diverse tematiche legate al framework Angular.
In particolare, all'interno del componente per la registrazione di nuovi utenti (RegistrationPageComponent) ti viene richiesto di aggiungere/modificare i controlli formali sui campi di input; nello specifico è necessario aggiungere le validazioni necessarie per controllare l'email inserita e di aggiungere questi controlli/validazioni al campo password:
- Almeno 8 caratteri
- Almeno una lettera Maiuscola
- Almeno un carattere speciale)

La CTA "Registrati" dovrà rimandere non clickabile fino a che i controlli di cui sopra non verranno superati. Dopo aver interagito con i singoli campi di input, nel caso in cui la validazione dia esito negativo, verificare che questi indichino la presenza di un "errore" (bordatura di rosso) come previsto.


## Temi trattati
Validazione Input
{: .label }

Sicurezza
{: .label }

Direttive Angular
{: .label }

## Procedimento
Sviluppare quanto richiesto nel testo dell'esercizio. 

## Domande
- Perché è importante implementare le validazioni direttamente nel frontend (con Angular) e non affidarsi esclusivamente al backend?
- Perché si è scelto di disabilitare la CTA "Registrati" fino al superamento delle validazioni, invece di consentire comunque il click e mostrare l'errore solo dopo?
- Perché è utile evidenziare gli errori con un’indicazione visiva (bordatura rossa), oltre a disabilitare la CTA?
