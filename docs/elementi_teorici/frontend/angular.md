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