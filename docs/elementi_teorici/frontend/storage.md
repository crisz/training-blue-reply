---
layout: page
title:  Storage
permalink: /teoria/frontend/storage
parent: Elementi Teorici Frontend
---

# Storage

La gestione dello **storage** nelle applicazioni web è fondamentale per garantire la persistenza dei dati e offrire una buona esperienza utente. Lo storage permette di salvare informazioni lato client, come preferenze dell'utente o dati temporanei, migliorando la funzionalità e l'usabilità dell'applicazione. 

In Angular, la gestione dello storage è un aspetto cruciale per garantire una corretta gestione dei dati applicativi. Esistono diverse strategie per affrontare questa problematica, che variano in base alle necessità del progetto. In questo capitolo esploreremo diverse soluzioni, dalle più semplici come `localStorage` e `sessionStorage`, fino a tecnologie più avanzate come **IndexedDB**, e vedremo come utilizzare i **cookie** per memorizzare informazioni sul browser.

### Tipologie di Storage

#### Web Storage API: LocalStorage e SessionStorage

La strategia più comune e semplice è l'uso di **`localStorage`** e **`sessionStorage`**, che fanno parte della **Web Storage API**. Questi strumenti permettono di memorizzare piccoli quantitativi di dati direttamente sul browser dell'utente e sono ideali per dati non sensibili, come le preferenze utente o alcune configurazioni che non richiedono crittografia avanzata.

- **LocalStorage**: I dati memorizzati in `localStorage` persistono anche dopo la chiusura del browser, rendendolo adatto per memorizzare informazioni che devono rimanere accessibili tra diverse sessioni, come preferenze di tema o impostazioni. `localStorage` è limitato alla memorizzazione di dati sotto forma di stringhe e ha una capacità generalmente limitata a circa 5-10 MB per dominio, a seconda del browser.
- **SessionStorage**: I dati memorizzati in `sessionStorage` sono disponibili solo durante la sessione corrente dell'utente e vengono eliminati alla chiusura della finestra del browser. Questo è utile per gestire informazioni temporanee, come i dati di sessione o lo stato di una visita.

La **Web Storage API** è facile da usare grazie ai metodi `setItem()`, `getItem()`, e `removeItem()` che consentono di interagire con lo storage del browser in modo intuitivo. Tuttavia, è fondamentale evitare di utilizzare `localStorage` e `sessionStorage` per informazioni sensibili o dati che necessitano di crittografia, in quanto non offrono una protezione adeguata.

#### Migliorare la Manutenibilità con Servizi Angular

Una buona pratica in Angular è centralizzare la gestione dello storage creando un **servizio dedicato** che astragga l'uso diretto di `localStorage` e `sessionStorage`. Questo approccio migliora la manutenibilità del codice e ne facilita la scalabilità, permettendo di estendere facilmente le funzionalità, come aggiungere la gestione degli errori o il supporto per la scadenza automatica dei dati.

Esempio di servizio per la gestione dello storage:

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
```

Questo servizio semplifica l'accesso e permette di gestire lo storage in modo centralizzato e modulare.

### IndexedDB: Gestione Avanzata dei Dati

Per progetti più complessi o con requisiti di performance più elevati, può essere utile adottare soluzioni più avanzate come **IndexedDB**. **IndexedDB** è un potente database orientato agli oggetti che permette di archiviare dati lato client in modo persistente all'interno del browser. È una scelta ottimale per applicazioni Angular complesse, specialmente per le **Progressive Web Apps (PWA)**, poiché consente di memorizzare grandi quantità di dati strutturati, inclusi file e blob, anche quando l'utente è offline.

A differenza di `localStorage`, che ha una capacità limitata e supporta solo stringhe, **IndexedDB** è più flessibile, permettendo di memorizzare dati complessi come array e oggetti. Per utilizzare IndexedDB in Angular, una delle migliori strategie è creare un servizio dedicato che semplifichi l'accesso e la gestione dei dati.

Le API native di IndexedDB sono basate su callback e possono risultare complesse da gestire. Tuttavia, grazie a wrapper come **`ngx-indexed-db`**, è possibile semplificare l'integrazione, utilizzando promesse e facilitando operazioni come la creazione di tabelle, l'inserimento, la lettura e l'aggiornamento dei dati.

Esempio di utilizzo di `ngx-indexed-db` in un servizio Angular:

```typescript
import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  constructor(private dbService: NgxIndexedDBService) {}

  addUser(user: any) {
    return this.dbService.add('users', user);
  }

  getUserById(id: number) {
    return this.dbService.getByKey('users', id);
  }
}
```

### Cookie: Un'Altra Opzione per Memorizzare i Dati

I **cookie** sono piccoli file di testo che vengono salvati nel browser dell'utente quando visita un sito web. Sono utilizzati per memorizzare informazioni che possono essere recuperate in un secondo momento, sia durante la sessione corrente che nelle visite future.

- **Autenticazione dell'utente**: I cookie permettono di mantenere un utente autenticato, evitando di richiedere il login ad ogni visita.
- **Personalizzazione dell'esperienza**: I cookie possono memorizzare preferenze, come la lingua o il tema scelto dall'utente.
- **Tracciamento**: Alcuni cookie sono utilizzati per tracciare il comportamento dell'utente, ad esempio per la pubblicità o l'analisi del traffico web.

In un'app Angular, la gestione dei cookie può essere facilitata utilizzando librerie come **`ngx-cookie-service`**, che semplificano l'interazione con i cookie e migliorano la manutenibilità del codice.

### Come Visualizzare i Cookie in un Sito Web

Per vedere nella pratica i cookie in un sito web, è possibile utilizzare gli strumenti di sviluppo del browser. Questi strumenti permettono di ispezionare i cookie salvati e le loro proprietà.

1. **Aprite gli Strumenti di Sviluppo**:
   - Su **Google Chrome**, **Firefox**, **Edge** o altri browser moderni, cliccate con il tasto destro del mouse in una qualsiasi parte della pagina e selezionate "Ispeziona".
   - In alternativa, potete premere il tasto `F12` sulla tastiera.

2. **Navigare nella Sezione dei Cookie**:
   - Dopo aver aperto gli strumenti di sviluppo, navigate alla scheda **Application** (in Chrome) o **Storage** (in Firefox).
   - Sotto la sezione **Cookies**, vedrete l'elenco dei domini che hanno salvato i cookie.
   - Cliccando su un dominio, vedrete tutti i cookie salvati da quel dominio, insieme ai loro dettagli, come **Nome**, **Valore**, **Dominio**, **Percorso**, **Scadenza**, e altre proprietà (come `Secure` e `HttpOnly`).

3. **Visualizzare e Modificare i Cookie**:
   - Potete visualizzare le informazioni di ogni cookie semplicemente cliccando sulla sua riga.
   - In alcuni browser, è anche possibile modificare il valore di un cookie direttamente da questa interfaccia, ma è importante fare attenzione a non alterare i dati in modo non intenzionale, poiché potrebbe influenzare il comportamento del sito.

Questa procedura è utile per testare se i cookie vengono impostati correttamente e per analizzare quali dati vengono memorizzati dal sito.

### Sicurezza dello Storage nelle Applicazioni Web

La sicurezza è un aspetto fondamentale quando si gestiscono dati tramite storage nelle applicazioni web. **LocalStorage**, **sessionStorage** e **IndexedDB** possono essere utili per memorizzare informazioni lato client, ma è importante tenere in considerazione i rischi di sicurezza associati.

1. **Evita di Memorizzare Dati Sensibili**: Non utilizzare `localStorage`, `sessionStorage` o **cookie** per memorizzare dati sensibili come password, token di autenticazione non crittografati o informazioni personali. Questi strumenti non offrono una protezione adeguata contro attacchi **XSS (Cross-Site Scripting)**, che potrebbero compromettere i dati memorizzati.

2. **Crittografia dei Dati**: Se devi memorizzare informazioni sensibili, assicurati di utilizzare tecniche di crittografia per proteggerli. Sebbene la crittografia non garantisca una sicurezza assoluta, può aiutare a mitigare il rischio di compromissione dei dati. Utilizza librerie di crittografia come **CryptoJS** per cifrare i dati prima di salvarli in `localStorage` o **IndexedDB**.

3. **Controllo dell'Accesso**: Implementa meccanismi di controllo dell'accesso per evitare che script malevoli possano accedere ai dati memorizzati. Ad esempio, imposta correttamente le policy di sicurezza dei contenuti (**CSP - Content Security Policy**) per limitare le risorse che possono essere caricate ed eseguite all'interno della tua applicazione.

4. **SameSite e Secure per i Cookie**: Quando utilizzi i cookie, assicurati di impostare le opzioni **`SameSite`** e **`Secure`**. L'opzione `SameSite` limita l'invio dei cookie a richieste di primo piano, aiutando a prevenire attacchi **CSRF (Cross-Site Request Forgery)**. L'opzione `Secure` fa sì che il cookie venga inviato solo su connessioni HTTPS, migliorando la sicurezza.

5. **Scadenza dei Dati**: Imposta una scadenza per i dati memorizzati. I dati che non sono più necessari dovrebbero essere eliminati dal **storage** per ridurre il rischio di esposizione. Ad esempio, `sessionStorage` è utile per dati temporanei che scadono automaticamente al termine della sessione.

6. **Validazione e Sanificazione degli Input**: Per evitare vulnerabilità come **XSS**, è fondamentale validare e sanificare tutti gli input dell'utente. Questo aiuta a prevenire l'inserimento di codice malevolo che potrebbe compromettere la sicurezza dei dati memorizzati nel browser.

7. **Monitoraggio e Log degli Accessi**: Implementare un sistema di monitoraggio e log degli accessi può aiutare a identificare attività sospette legate all'accesso e alla modifica dei dati memorizzati. Questo è particolarmente importante per applicazioni che gestiscono dati sensibili.

8. **Utilizzo di Token con Scadenza**: Se è necessario memorizzare un token di autenticazione, è buona pratica utilizzare token con scadenza limitata e rinnovabili. Ciò riduce il rischio di utilizzo di token compromessi per lunghi periodi.

### Cookie Tampering

Il **cookie tampering** è una tecnica utilizzata dagli attaccanti per manipolare i dati salvati nei cookie con lo scopo di ottenere accesso non autorizzato o modificare informazioni sensibili. I cookie possono essere facilmente manipolati se non vengono adeguatamente protetti. Questo tipo di attacco può permettere a un utente malintenzionato di alterare, ad esempio, i dati di autenticazione o le preferenze salvate, compromettendo la sicurezza dell'applicazione.

Per mitigare il rischio di cookie tampering, è fondamentale seguire alcune best practices:

1. **Crittografia dei Cookie**: È buona pratica crittografare i dati contenuti nei cookie. In questo modo, anche se un attaccante riuscisse a intercettare e modificare il cookie, i dati sarebbero inutilizzabili senza la chiave di crittografia corretta.

2. **Impostare il Flag HttpOnly**: Questo flag assicura che il cookie non possa essere accessibile tramite JavaScript, riducendo così il rischio di attacchi **XSS**. Questo è particolarmente importante per i cookie che contengono informazioni sensibili, come i token di sessione.

3. **Utilizzare un Hash per Verificare l'Integrità**: È possibile utilizzare un **hash** (ad esempio, HMAC) per verificare l'integrità dei dati nel cookie. Questo permette al server di rilevare eventuali alterazioni non autorizzate. Quando un cookie viene generato, si può includere un hash dei dati insieme a una chiave segreta. Al ritorno del cookie, il server verifica che l'hash corrisponda, garantendo che i dati non siano stati manipolati.

4. **Impostare una Scadenza Breve**: Limitare la durata di vita dei cookie con dati sensibili riduce la finestra temporale disponibile per un attaccante per poterli manomettere. Utilizza cookie con scadenza breve per minimizzare il rischio di compromissione.

5. **Monitoraggio delle Modifiche ai Cookie**: Implementare un sistema che monitori eventuali modifiche non autorizzate ai cookie può aiutare a individuare potenziali tentativi di tampering. Eventuali discrepanze possono essere rilevate e gestite bloccando l'accesso o notificando il team di sicurezza.

### Sincronizzazione con il Backend e Strategie di Cache

La gestione dello storage dovrebbe sempre considerare la sincronizzazione con il **backend**, specialmente in casi di dati che possono cambiare su più dispositivi o sessioni. Utilizzare un servizio di storage centralizzato con strategie di **cache** può migliorare significativamente la performance e l'efficienza delle richieste di rete, riducendo la necessità di effettuare chiamate API frequenti.

Per esempio, **IndexedDB** può essere utilizzato per memorizzare i dati localmente, consentendo all'applicazione di funzionare in modalità offline e sincronizzando i dati con il server una volta ristabilita la connessione. Questa strategia è particolarmente utile nelle Progressive Web Apps, dove garantire la continuità del servizio è essenziale.

### Conclusione

La gestione dello storage in Angular offre diverse possibilità a seconda delle esigenze dell'applicazione. **LocalStorage** e **sessionStorage**, attraverso la **Web Storage API**, sono semplici e immediati per dati non critici, mentre **IndexedDB** offre una soluzione scalabile per la memorizzazione di grandi volumi di dati e per il supporto offline. I **cookie**, invece, rimangono utili per esigenze di autenticazione e tracciamento. La scelta della tecnologia più adatta dipende dal contesto del progetto e dai requisiti specifici in termini di sicurezza, volume di dati e necessità di sincronizzazione. Creare servizi dedicati per la gestione dello storage è una buona pratica per garantire un codice più pulito, manutenibile e scalabile. Tuttavia, la sicurezza dei dati deve essere sempre una priorità, utilizzando tecniche di crittografia, controllo degli accessi, scadenza dei dati e monitoraggio per mitigare i rischi associati all'uso dello storage lato client.

Per ulteriori approfondimenti, puoi consultare i seguenti collegamenti:

- [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
- [How to Store and Secure Sensitive Data in Web Applications](https://beaglesecurity.com/blog/article/how-to-store-and-secure-sensitive-data-in-web-applications.html)
- [Cookie Tampering Techniques](https://www.geeksforgeeks.org/cookie-tampering-techniques/)

