---
layout: page
title:  Angular
permalink: /teoria/frontend/angular
parent: Elementi Teorici Frontend
---

# Angular

Angular è un framework utile per lo sviluppo di applicazioni web creato e mantenuto da Google. È uno dei framework JavaScript più popolari per la costruzione di applicazioni web dinamiche e scalabili. E’ basato su TypeScript, un superset di JavaScript che introduce tipizzazione statica, rendendo il codice più robusto e facilitando il rilevamento di errori durante lo sviluppo. 

La sua architettura adotta il modello a componenti, dove ogni parte dell'applicazione è suddivisa in moduli e componenti riutilizzabili. Angular utilizza un sistema di binding bidirezionale (two-way data binding), che sincronizza automaticamente l'interfaccia utente con il modello di dati. 

Tra le sue funzionalità più potenti troviamo la gestione delle direttive, che permettono di manipolare il DOM, e i servizi, che facilitano la condivisione della logica dell'applicazione tra più componenti. Grazie a queste caratteristiche, Angular semplifica lo sviluppo di applicazioni complesse, fornendo strumenti integrati per la gestione delle richieste HTTP, routing e validazione dei form.

## Cos'è un componente angular?

Un componente in Angular è una delle unità fondamentali che costituiscono l'architettura del framework. Ogni componente rappresenta una parte dell'interfaccia utente dell'applicazione e combina tre elementi principali: il template HTML, il CSS per lo stile, e il codice TypeScript per la logica. Un componente è definito da una classe TypeScript, arricchita da un decoratore `@Component`, che specifica le proprietà essenziali del componente come il selettore (`selector`), il template (`templateUrl`) e lo stile (`styleUrls`).

Il `selector` permette di definire il tag HTML personalizzato che sarà usato per inserire il componente all'interno del DOM. Il template HTML descrive la struttura dell'interfaccia utente di come il componente apparità, mentre il codice TypeScript contiene la logica necessaria per gestire il comportamento dell'interfaccia: come l'interazione con i dati e le risposte agli eventi dell'utente. I componenti sono riutilizzabili e modulari, e attraverso il loro uso si può strutturare un'applicazione Angular in piccole parti coesive che collaborano per formare l'intera applicazione.

## Il DOM
Cos'è il DOM? Il Document Object Model è una rappresentazione strutturata dei documenti HTML e XML in forma di albero gerarchico. Ogni nodo dell'albero rappresenta un elemento del documento, come tag, attributi, testo e commenti. Questo modello fornisce un'interfaccia che consente ai linguaggi di scripting, come JavaScript, di accedere e manipolare gli elementi e i contenuti di una pagina web.

In pratica, il DOM consente ai programmatori di apportare modifiche dinamiche alla struttura, al contenuto e al layout di una pagina web, senza bisogno di ricaricare completamente il documento. Ad esempio, con JavaScript è possibile cambiare il testo di un paragrafo, aggiungere nuovi elementi, rimuoverne altri o aggiornare gli stili CSS in tempo reale.

In Angular, il DOM viene manipolato principalmente attraverso componenti e direttive. Grazie alla manipolazione automatica del DOM tramite il binding dei dati, Angular consente di sincronizzare i dati del modello con l'interfaccia utente, semplificando le modifiche e migliorando l'efficienza dello sviluppo di applicazioni dinamiche.

Di seguito un esempio che mostra la manipolazione del dom tramite le funzioni javascript:

```html
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Manipolazione del DOM in JavaScript</title>
</head>
<body>
  <div id="container">
    <h2>Lista di elementi</h2>
    <ul id="lista"></ul>
  </div>

  <script>
    // Creare un nuovo elemento: `createElement`
    const nuovoElemento = document.createElement('li');
    nuovoElemento.textContent = 'Nuovo elemento della lista';

    // Selezionare un elemento: `getElementById`
    const lista = document.getElementById('lista');
    // Aggiungere un nuovo elemento alla lista: `appendChild`
    lista.appendChild(nuovoElemento);

    // Selezionare un elemento utilizzando `querySelector`
    const container = document.querySelector('#container');
    console.log('Contenuto del container:', container);

    // Creare un altro elemento e aggiungerlo al container
    const nuovoParagrafo = document.createElement('p');
    nuovoParagrafo.textContent = 'Questo è un nuovo paragrafo aggiunto dinamicamente.';
    container.appendChild(nuovoParagrafo);

    // Selezionare tutti gli elementi di una determinata classe con `querySelectorAll`
    // Aggiungiamo una classe a tutti gli `<li>` per fare un esempio
    const elementiLista = document.querySelectorAll('li');
    elementiLista.forEach((elemento, indice) => {
      elemento.classList.add('elemento-lista');
      console.log(`Elemento ${indice + 1}:`, elemento.textContent);
    });

  </script>
</body>
</html>
  ```

- **`document.createElement('li')`**: Crea un nuovo nodo HTML `<li>`.
- **`document.getElementById('lista')`**: Seleziona l'elemento con `id="lista"`.
- **`appendChild(nuovoElemento)`**: Aggiunge il nuovo elemento `<li>` alla lista.
- **`document.querySelector('#container')`**: Seleziona l'elemento con l'ID `container` utilizzando un selettore CSS.
- **`document.querySelectorAll('li')`**: Seleziona tutti gli elementi `<li>` nella pagina, restituendo una NodeList. È utile per iterare su tutti gli elementi corrispondenti.
- **`classList.add('elemento-lista')`**: Aggiunge la classe `elemento-lista` a ciascun elemento della lista per dimostrare l'uso di `querySelectorAll`.

## COME ANGULAR INTERAGISCE CON IL DOM

Angular interagisce con il DOM principalmente tramite il concetto di binding dei dati e l'uso di direttive. Angular semplifica la manipolazione del DOM, consentendo agli sviluppatori di gestire l'interfaccia utente in modo più dichiarativo piuttosto che imperativo, riducendo così la necessità di manipolare manualmente il DOM come in JavaScript puro. Vediamo in dettaglio come Angular gestisce il DOM:

1) DATA BINDING:
Angular utilizza il data binding per sincronizzare automaticamente i dati del modello con la vista. Questo avviene in due direzioni:
- **Binding Unidirezionale (One-Way Data Binding)**: Consente di aggiornare la vista in base ai dati del modello. Ad esempio, se una variabile viene aggiornata nel componente TypeScript, la modifica si riflette automaticamente nella vista HTML.
- **Binding Bidirezionale (Two-Way Data Binding)**: Consente di sincronizzare i dati sia dalla vista al modello che viceversa. Questo è particolarmente utile nei form, dove i dati inseriti dall'utente sono sincronizzati con il modello in tempo reale, utilizzando l'attributo `[(ngModel)]`.

2) DIRETTIVE:
Le direttive di Angular sono strumenti potenti che consentono di interagire e manipolare il DOM in modo semplice e leggibile:

- **Direttive strutturali** (come `ngIf` e `ngFor`): Queste direttive consentono di aggiungere, rimuovere o iterare sugli elementi del DOM in base a determinate condizioni o dati. Ad esempio, `ngIf` permette di mostrare o nascondere un elemento HTML in base al valore di una variabile booleana.
- **Direttive di attributo** (come `ngStyle` e `ngClass`): Consentono di modificare gli attributi o lo stile degli elementi del DOM in modo dinamico. Ad esempio, `ngClass` permette di assegnare classi CSS a un elemento in base a certe condizioni.

3) EVENT BINDING:
Angular consente di catturare eventi del DOM, come click, input, etc., e di collegarli direttamente ai metodi del componente attraverso l'event binding. Ad esempio, l'attributo (click) permette di eseguire un metodo quando l'utente clicca su un elemento. Questo consente di gestire interazioni utente senza scrivere direttamente codice JavaScript per aggiungere listeners agli eventi.
Esempio:
```html
<button (click)="onButtonClick()">Cliccami!</button>
```
```javascript
onButtonClick() {
  console.log('Pulsante cliccato!');
}
```

## CICLI DI VITA DEI COMPONENTI

I cicli di vita dei componenti descrivono le fasi in cui un componente passa durante la sua esistenza. Ogni componente di Angular segue una serie di eventi e metodi che vengono chiamati cicli di vita, e questi metodi permettono agli sviluppatori di fruttare determinati cambiamenti e gestire il comportamento dell'applicazione in modo ottimale. Angular fornisce dei lifecycle hooks che consentono di eseguire operazioni specifiche in diversi momenti del ciclo di vita di un componente.

### Fasi del Ciclo di Vita di un Componente Angular

1. **Creazione del Componente**:
    - Durante la fase di creazione, Angular inizializza il componente e le sue direttive associate. Questa è la fase in cui il componente viene creato e inizialmente configurato.
2. **Rendering del Template**:
    - Il template HTML del componente viene caricato e reso visibile all'utente. Angular compila il template associato e inserisce gli elementi nel DOM.
3. **Cambio di Stato e Rilevamento Cambiamenti**:
    - Quando vengono rilevati cambiamenti nei dati, Angular aggiorna il template di conseguenza. Questa fase consente agli sviluppatori di reagire ai cambiamenti dei dati e aggiornare la vista dinamicamente.
4. **Distruzione del Componente**:
    - Alla fine del ciclo di vita, il componente viene distrutto e rimosso dal DOM. È utile per liberare risorse e evitare memory leak.

### Lifecycle Hooks Principali

Angular offre diversi **lifecycle hooks** che consentono di eseguire operazioni specifiche durante il ciclo di vita del componente. Di seguito sono elencati i principali lifecycle hooks:

1. **`ngOnChanges(changes: SimpleChanges)`**:
    - Viene chiamato **ogni volta che uno o più valori di input del componente cambiano**. È particolarmente utile quando si vogliono intercettare cambiamenti delle proprietà legate con `@Input()`.

2. **`ngOnInit()`**:
    - Viene chiamato una sola volta, dopo che Angular ha inizializzato tutte le proprietà legate all'input del componente. È utilizzato per eseguire inizializzazioni, come il caricamento dei dati dal server.

3. **`ngDoCheck()`**:
    - Viene chiamato **ad ogni ciclo di rilevamento delle modifiche**. È utilizzato per implementare una logica personalizzata di rilevamento dei cambiamenti oltre quella predefinita di Angular.

4. **`ngAfterContentInit()`**:
    - Viene chiamato **una sola volta**, dopo che Angular ha proiettato il contenuto nel componente tramite `<ng-content>`. È utile per inizializzare elementi che dipendono dal contenuto proiettato.

5. **`ngAfterContentChecked()`**:
    - Viene chiamato **dopo ogni ciclo di rilevamento dei cambiamenti** sul contenuto proiettato. Serve per reagire ai cambiamenti nel contenuto figlio del componente.

6. **`ngAfterViewInit()`**:
    - Viene chiamato **una sola volta**, dopo che Angular ha inizializzato la vista del componente (e le viste figlie). È utile per operare con il DOM del componente dopo che è stato reso disponibile.

7. **`ngAfterViewChecked()`**:
    - Viene chiamato **dopo ogni ciclo di rilevamento dei cambiamenti** sulla vista del componente (e le viste figlie). Può essere utilizzato per rilevare modifiche nei componenti figlio.

7. **`ngOnDestroy()`**:
    - Viene chiamato **prima che il componente venga distrutto**. Questo hook è utile per effettuare operazioni di pulizia, come la disiscrizione da osservabili o la rimozione di listener per evitare memory leak.


## Gestione degli errori

La gestione degli errori rappresenta un aspetto cruciale nello sviluppo di applicazioni Angular di qualità. Un'efficace strategia di gestione degli errori non solo migliora l'affidabilità e la robustezza dell'applicazione, ma contribuisce anche a un'esperienza utente ottimale e facilita la manutenzione del codice.

1. Importanza della Gestione degli Errori
Nel ciclo di vita di un'applicazione, gli errori possono manifestarsi in diverse forme e a vari livelli, inclusi errori di rete, bug nel codice, malfunzionamenti di componenti o servizi, e input non validi da parte dell'utente. Una gestione inadeguata degli errori può portare a crash dell'applicazione, perdita di dati, e un'esperienza utente frustrante. Pertanto, implementare una strategia solida per la gestione degli errori è essenziale per garantire la stabilità e la fiducia degli utenti nell'applicazione.

2. Tipologie di Errori in Angular
Gli errori in Angular possono essere classificati in diverse categorie, ciascuna con caratteristiche specifiche e necessità di gestione particolari:

Errori di Rete: Problemi nella comunicazione tra client e server, come interruzioni di connessione o risposte non valide.
Errori di Validazione: Input non conformi ai requisiti dell'applicazione, spesso gestiti tramite form validation.
Errori di Logica: Bug nel codice che causano comportamenti imprevisti o malfunzionamenti dell'applicazione.
Errori di Terze Parti: Problemi derivanti da librerie o servizi esterni integrati nell'applicazione.

3. Principi Fondamentali della Gestione degli Errori
Per affrontare efficacemente gli errori in Angular, è utile seguire alcuni principi fondamentali:

Centralizzazione: Consolidare la logica di gestione degli errori in punti centralizzati dell'applicazione per evitare duplicazioni e facilitare la manutenzione.
Trasparenza: Garantire che gli errori vengano registrati in modo dettagliato per facilitare il debugging, senza esporre informazioni sensibili all'utente finale.
Feedback all'Utente: Fornire messaggi chiari e comprensibili all'utente in caso di errori, migliorando la loro esperienza e guidandoli su eventuali azioni correttive.
Resilienza: Implementare meccanismi di recupero, come il retry delle operazioni fallite o l'uso di fallback, per mantenere l'applicazione operativa nonostante gli errori.

4. Componenti Chiave nella Gestione degli Errori in Angular
Angular offre diverse funzionalità e strumenti per gestire gli errori in maniera efficace. Tra i componenti chiave troviamo:

HttpClient e RxJS: Utilizzati per effettuare richieste HTTP e gestire risposte asincrone, includendo operatori come catchError per intercettare e gestire gli errori.
Interceptors HTTP: Meccanismi che permettono di intercettare tutte le richieste e risposte HTTP, consentendo di applicare logiche di gestione degli errori in maniera centralizzata.
ErrorHandler Globale: Un servizio che estende la classe ErrorHandler di Angular per catturare e gestire errori non gestiti a livello applicativo.
Componenti e Servizi Personalizzati: Implementazioni specifiche per gestire errori in contesti particolari, come componenti di interfaccia utente o servizi di business logic.

5. Approcci alla Gestione degli Errori
Diversi approcci possono essere adottati per gestire gli errori in Angular, ognuno con i propri vantaggi e scenari di applicazione:

Gestione Locale negli Snippets di Codice: Implementare la gestione degli errori direttamente nei componenti o servizi specifici, utilizzando costrutti come try-catch o operatori di RxJS.
Interceptors per la Gestione Globale: Utilizzare gli interceptor HTTP per intercettare tutte le comunicazioni HTTP e applicare logiche di gestione degli errori in un unico punto.
ErrorHandler Globale: Estendere la classe ErrorHandler per catturare errori non gestiti in tutta l'applicazione, centralizzando il logging e le notifiche.
Servizi di Logging Esterni: Integrare servizi di terze parti o personalizzati per registrare e monitorare gli errori in ambienti di produzione.

6. Best Practices per la Gestione degli Errori in Angular
Per garantire una gestione efficace degli errori, è consigliabile seguire alcune best practice consolidate:

- Centralizzare la Logica di Gestione degli Errori: Utilizzare interceptor e gestori globali per evitare duplicazioni e mantenere una gestione coerente degli errori.
- Fornire Feedback Significativo all'Utente: I messaggi di errore devono essere chiari, concisi e privi di dettagli tecnici che potrebbero confondere l'utente.
- Implementare un Sistema di Logging Completo: Registrare gli errori in modo dettagliato, includendo informazioni come lo stack trace, il contesto dell'errore e eventuali dati di input, per facilitare il debugging e l'analisi post-mortem.
- Utilizzare Meccanismi di Retry e Fallback: Implementare strategie per tentare nuovamente operazioni fallite o fornire alternative in caso di errori temporanei.
- Validazione Preventiva dei Dati: Eseguire controlli e validazioni sui dati in ingresso per prevenire errori prima che si verifichino, migliorando la qualità e l'affidabilità dell'applicazione.
- Separazione delle Responsabilità: Mantenere una chiara distinzione tra la logica di business e la logica di gestione degli errori, favorendo un'architettura pulita e modulare.
- Testare la Gestione degli Errori: Scrivere test unitari e di integrazione per verificare che gli errori vengano gestiti correttamente in tutti i casi previsti.

7. Vantaggi di una Corretta Gestione degli Errori
Adottare una strategia efficace di gestione degli errori in Angular comporta numerosi vantaggi:

- Miglioramento dell'Affidabilità: Riduce la probabilità di crash e malfunzionamenti, garantendo un funzionamento più stabile dell'applicazione.
- Esperienza Utente Ottimizzata: Fornisce feedback chiaro e utile agli utenti, riducendo la frustrazione e aumentando la fiducia nell'applicazione.
- Facilitazione della Manutenzione: Un sistema di gestione degli errori ben strutturato semplifica il processo di debugging e manutenzione del codice.
- Monitoraggio e Analisi Proattiva: Permette di identificare e risolvere proattivamente i problemi, migliorando continuamente la qualità dell'applicazione.

### Che Cos'è un Interceptor in Angular?

Un Interceptor in Angular è una classe che implementa l'interfaccia HttpInterceptor fornita da @angular/common/http. Gli interceptor permettono di intercettare e manipolare le richieste e le risposte HTTP in uscita e in entrata, rispettivamente. Questo meccanismo consente di applicare logiche comuni, come l'aggiunta di header di autenticazione, la gestione degli errori, il logging delle richieste, o la modifica delle risposte, senza dover ripetere il codice in ogni servizio che effettua chiamate HTTP.

Gli interceptor operano a livello globale, influenzando tutte le richieste e risposte HTTP effettuate dall'applicazione Angular. Possono essere concatenati in una pipeline, permettendo di applicare più interceptor in sequenza.

Esempio di Utilizzo di un Interceptor per la Gestione degli Errori
Di seguito è riportato un esempio pratico di un interceptor che gestisce gli errori nelle risposte HTTP, loggando l'errore e mostrando una notifica all'utente utilizzando ngx-toastr.

1. Creazione dell'Interceptor
Crea un file chiamato error.interceptor.ts nella cartella src/app/interceptors/.

```javascript
// src/app/interceptors/error.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
          // Errore lato client o di rete
          errorMessage = `Errore: ${error.error.message}`;
        } else {
          // Errore lato server
          errorMessage = `Errore Code: ${error.status}\nMessaggio: ${error.message}`;
        }

        // Log dell'errore nella console
        console.error(errorMessage);

        // Mostra una notifica all'utente
        this.toastr.error('Si è verificato un errore durante la richiesta.', 'Errore');

        return throwError(errorMessage);
      })
    );
  }
}
```

2. Registrazione dell'Interceptor nel Modulo Principale
Per applicare l'interceptor creato, è necessario registrarlo nei provider del modulo principale (AppModule). Assicurati di aver installato ngx-toastr e @angular/animations:

```bash
bash
Copia codice
npm install ngx-toastr --save
npm install @angular/animations --save
```

Modifica il file app.module.ts come segue:

```javascript
// src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    // Altri componenti
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule, // Necessario per Toastr
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }), // Configurazione di Toastr
    // Altri moduli
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
    // Altri provider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

3. Implementazione di un Servizio che Utilizza HttpClient
Creiamo un servizio che effettua una richiesta HTTP. L'interceptor gestirà eventuali errori automaticamente.

```javascript
// src/app/services/data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://api.example.com/data'; // Sostituisci con il tuo endpoint

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      catchError(this.handleLocalError)
    );
  }

  private handleLocalError(error: HttpErrorResponse) {
    // Gestione locale dell'errore, se necessario
    return throwError(error);
  }
}
```

4. Utilizzo del Servizio in un Componente
Infine, utilizziamo il servizio in un componente per recuperare i dati e gestire gli errori.

```javascript
// src/app/components/example/example.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {
  data: any;
  errorMessage: string | null = null;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.dataService.getData().subscribe({
      next: (response) => {
        this.data = response;
        this.errorMessage = null; // Reset dell'errore in caso di successo
      },
      error: (error) => {
        this.errorMessage = 'Impossibile caricare i dati. Riprova più tardi.';
        console.error('Errore nel componente:', error);
      }
    });
  }
}
```

Template del Componente
```html
<!-- src/app/components/example/example.component.html -->
<div *ngIf="errorMessage" class="alert alert-danger">
  {{ errorMessage }}
</div>
<div *ngIf="data">
  <h3>Dati Recuperati:</h3>
  <pre>{{ data | json }}</pre>
</div>
<div *ngIf="!data && !errorMessage">
  <p>Caricamento dati in corso...</p>
</div>
```
Riassunto del Flusso di Gestione degli Errori con Interceptor
1) Richiesta HTTP: Il DataService effettua una richiesta HTTP utilizzando HttpClient.
2) Interceptor: L'interceptor ErrorInterceptor intercetta la risposta HTTP. Se si verifica un errore, l'interceptor:
    - Logga l'errore nella console.
    - Mostra una notifica all'utente tramite ToastrService.
    - Propaga l'errore al chiamante.
3) Componente: Il componente ExampleComponent riceve l'errore attraverso l'osservabile e imposta un messaggio di errore comprensibile all'utente.
4) Feedback all'Utente: L'utente vede una notifica pop-up gestita dall'interceptor e un messaggio di errore nell'interfaccia utente del componente.

Vantaggi dell'Utilizzo degli Interceptor per la Gestione degli Errori
1) Centralizzazione: Tutte le logiche di gestione degli errori HTTP sono consolidate in un unico punto, riducendo la duplicazione del codice.
2) Manutenzione Facilitata: Modifiche alla gestione degli errori possono essere effettuate nell'interceptor senza dover aggiornare ogni singolo servizio o componente.
3) Esperienza Utente Migliorata: Notifiche coerenti e informative migliorano la comunicazione degli errori all'utente finale.