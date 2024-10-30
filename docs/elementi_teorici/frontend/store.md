---
layout: page
title:  L'uso dello Store
permalink: /teoria/frontend/store
parent: Elementi Teorici Frontend
---

# L'uso dello Store

In questo capitolo esploreremo l'uso dello **Store** all'interno di un'applicazione **Angular**, evidenziando i vantaggi, gli svantaggi, e le diverse tipologie di store che è possibile utilizzare. Parleremo inoltre di due popolari librerie di gestione dello stato in Angular: **NGXS** e **NgRx**, e le confronteremo per capire quale possa essere più adatta a specifici scenari progettuali.

### Cos'è uno Store?

Uno **Store** è un pattern di gestione dello stato utilizzato in molte applicazioni moderne per centralizzare e gestire in maniera efficiente lo stato condiviso tra componenti. In Angular, l'utilizzo di uno store è particolarmente utile quando si lavora con dati che devono essere accessibili da molteplici parti dell'applicazione e richiedono una gestione complessa come, per esempio, l'interazione con API, la sincronizzazione dei dati e la gestione di stati condivisi.

### Differenza tra Store e Storage

È importante distinguere tra lo **Store** e lo **Storage** in un sito web. Lo **Store** è una gestione dello stato in memoria che viene utilizzata durante il ciclo di vita dell'applicazione; consente di gestire lo stato temporaneo e reattivo dell'applicazione, garantendo che i componenti abbiano accesso alle informazioni di cui hanno bisogno in modo centralizzato. Lo **Storage**, invece, riguarda la memorizzazione persistente delle informazioni, come **LocalStorage** o **SessionStorage**, che permettono di salvare dati che persistono anche dopo il refresh della pagina o la chiusura del browser. Mentre lo **Store** è ideale per la gestione dello stato durante l'esecuzione dell'applicazione, lo **Storage** viene utilizzato per conservare dati a lungo termine, come token di autenticazione o preferenze dell'utente. In sintesi, lo Store è volatile e transitorio, mentre lo Storage è persistente.

### Cos'è Redux?

**Redux** è un pattern e una libreria per la gestione dello stato delle applicazioni, progettato per aiutare a scrivere applicazioni che si comportano in modo coerente, che girano in diversi ambienti (client, server e native) e che siano facili da testare. Redux si basa su alcuni principi fondamentali:

1. **Unico Stato Centrale**: L'intero stato dell'applicazione viene mantenuto in un unico oggetto di stato, chiamato store.
2. **Stato Immutabile**: Ogni modifica allo stato crea una nuova copia dell'oggetto stato, garantendo l'immutabilità.
3. **Flusso di Dati Unidirezionale**: Il flusso dei dati avviene in un'unica direzione. Le azioni vengono emesse dai componenti, che vengono elaborate dai reducer per generare il nuovo stato.

**NgRx** e **NGXS** sono implementazioni di questo pattern all'interno dell'ecosistema Angular. Entrambe le librerie seguono i principi di Redux per fornire una gestione dello stato centralizzata ed efficace.

- **NgRx** si basa molto da vicino sui principi di Redux ed è altamente configurabile, il che lo rende una buona scelta per applicazioni molto complesse e di grandi dimensioni. Con NgRx, si utilizzano azioni, reducer e effetti per modellare il flusso dei dati e gestire lo stato.
- **NGXS** invece prende ispirazione da Redux, ma è progettato per essere più facile da usare in Angular. Riduce la complessità del codice boilerplate e offre una sintassi più vicina a un approccio orientato agli oggetti, rendendolo più accessibile ai nuovi sviluppatori.

### Vantaggi dell'uso dello Store

- **Centralizzazione dello Stato**: Uno store consente di centralizzare lo stato dell'applicazione, rendendo più facile monitorare e gestire i cambiamenti. Questo riduce la necessità di passare dati tra componenti tramite **Input** e **Output**, rendendo l'applicazione più scalabile.
- **Facilità di Debug e Test**: Centralizzando lo stato, diventa più semplice monitorare le modifiche grazie all'uso di strumenti come il **Redux DevTools**. Questo semplifica il processo di debug e il testing del codice.
- **Architettura Prevedibile**: L'uso di uno store consente di mantenere un'architettura prevedibile, dove l'applicazione segue una sequenza logica per il flusso dei dati (azioni → reducer o handler → stato aggiornato). Questo facilita il lavoro in team, poiché ogni sviluppatore sa esattamente dove trovare e come gestire lo stato dell'applicazione.

### Svantaggi dell'uso dello Store

- **Curva di Apprendimento**: L'introduzione di uno store richiede una certa conoscenza del pattern e delle librerie specifiche utilizzate, che potrebbe risultare una barriera per chi è alle prime armi con Angular.
- **Complessità Aggiuntiva**: Non sempre è necessario introdurre uno store in un'applicazione. Per applicazioni più piccole, l'uso di uno store potrebbe aggiungere complessità non necessaria rispetto ai vantaggi effettivamente ottenuti.

### Tipologie di Store in Angular

Nel mondo Angular, esistono diverse librerie per la gestione dello stato. Le più popolari sono:

- **NgRx**: Una libreria basata su **Redux** che sfrutta il concetto di gestione dello stato immutabile e l'uso di azioni per aggiornare lo stato. NgRx è una scelta popolare per applicazioni complesse, in quanto consente un controllo rigoroso sullo stato dell'applicazione.
- **NGXS**: Una libreria che si concentra sulla semplicità d'uso e sulla riduzione del codice boilerplate rispetto a NgRx. NGXS è progettata per essere più semplice e intuitiva, mantenendo molti dei vantaggi offerti da un approccio basato su Redux.
- **Akita**: Una libreria reattiva che si distingue per la sua flessibilità e per la capacità di gestire la logica dello stato dell'applicazione senza dover scrivere troppo codice boilerplate.

### Confronto tra NGXS e NgRx

**NGXS** e **NgRx** sono tra le soluzioni più usate per la gestione dello stato in Angular. Vediamo alcune delle differenze chiave tra queste due librerie:

| **Caratteristica** | **NGXS** | **NgRx** |
| --- | --- | --- |
| **Curva di apprendimento** | Più bassa | Più alta, richiede maggiore familiarità con Redux e RxJS |
| **Boilerplate** | Ridotto, richiede meno codice rispetto a NgRx | Maggiore, con molti concetti da implementare (azioni, reducer, effetti) |
| **Sintassi** | Più vicina a un approccio orientato agli oggetti, più intuitivo per i nuovi sviluppatori | Basata su Redux, segue un pattern più funzionale |
| **Flessibilità** | Ottima per progetti di piccola e media complessità | Ottimale per progetti complessi che richiedono una gestione accurata del flusso dati |
| **Community** | Più piccola rispetto a NgRx | Molto ampia, con documentazione estesa e integrazione con tool come Redux DevTools |
- **Quando scegliere NGXS**: NGXS è ideale per i progetti Angular di piccola e media dimensione, dove è importante avere una gestione dello stato centralizzata senza dover scrivere troppo codice. La sua sintassi è più semplice e intuitiva, rendendolo accessibile anche a sviluppatori con meno esperienza.
- **Quando scegliere NgRx**: NgRx è consigliato per applicazioni di grandi dimensioni con requisiti complessi, dove è essenziale avere un controllo rigoroso sullo stato e sui flussi di dati. La struttura più rigida di NgRx può sembrare complicata all'inizio, ma offre vantaggi a lungo termine in termini di mantenibilità e stabilità.

### Utilizzo dello Store in un Progetto Angular

In un progetto Angular, l'implementazione dello store segue alcuni passaggi chiave:

1. **Configurazione dell'App Module**: La configurazione dello store avviene nel modulo principale dell'applicazione, dove si importa il modulo specifico (ad esempio, `StoreModule.forRoot()` per NgRx o `NgxsModule.forRoot()` per NGXS).
2. **Definizione dello Stato**: Viene definita una classe o un'interfaccia che rappresenta lo stato dell'applicazione. In NGXS, questo stato viene definito in una classe decorata con `@State()`, mentre in NgRx si utilizzano reducer per modellare lo stato.
3. **Azioni e Effetti**: In NgRx, le azioni rappresentano le operazioni che possono essere eseguite per modificare lo stato. Gli effetti sono utilizzati per gestire operazioni asincrone come chiamate HTTP. In NGXS, invece, la gestione di azioni e chiamate asincrone è più semplice grazie ai decoratori come `@Action()` e `@Selector()`.
4. **Componenti e Selettori**: I componenti utilizzano i selettori per accedere allo stato all'interno dello store. NGXS semplifica molto questo processo grazie alla sua sintassi meno verbosa, mentre NgRx utilizza funzioni e `createSelector()` per fornire dati ai componenti.

### Conclusione

L'utilizzo di uno store in un progetto Angular offre numerosi vantaggi, soprattutto quando l'applicazione cresce in termini di funzionalità e complessità. **NgRx** e **NGXS** sono entrambe librerie valide, ciascuna con i propri punti di forza. La scelta dipende dalle esigenze del progetto e dal livello di familiarità del team con i concetti di gestione dello stato. NGXS è più semplice da usare e ideale per progetti piccoli e medi, mentre NgRx offre maggiore controllo e flessibilità per progetti complessi.

Se siete nuovi nel team, suggeriamo di iniziare con NGXS per comprendere i concetti base della gestione dello stato senza dover affrontare subito tutta la complessità di NgRx. Entrambe le librerie sono ottime opzioni, ma la chiave del successo sta nel capire quale si adatta meglio al vostro progetto specifico.

### Esempio di Utilizzo dello Store in un'App Angular

Di seguito un esempio di utilizzo di **NGXS** in un'applicazione Angular per gestire lo stato dell'elenco di prodotti:

1. **Configurazione del Modulo**: Importiamo `NgxsModule` e lo aggiungiamo al modulo principale dell'applicazione.

```tsx
import { NgxsModule } from '@ngxs/store';
import { ProductState } from './store/product.state';

@NgModule({
  declarations: [
    AppComponent,
    // altri componenti
  ],
  imports: [
    BrowserModule,
    NgxsModule.forRoot([ProductState]),
    // altri moduli
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

```

1. **Definizione dello Stato**: Creiamo una classe per gestire lo stato dei prodotti.

```tsx
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Product } from '../models/product.model';
import { AddProduct, RemoveProduct } from './product.actions';

export interface ProductStateModel {
  products: Product[];
}

@State<ProductStateModel>({
  name: 'products',
  defaults: {
    products: []
  }
})
export class ProductState {
  @Selector()
  static getProducts(state: ProductStateModel) {
    return state.products;
  }

  @Action(AddProduct)
  add({ getState, patchState }: StateContext<ProductStateModel>, { payload }: AddProduct) {
    const state = getState();
    patchState({
      products: [...state.products, payload]
    });
  }

  @Action(RemoveProduct)
  remove({ getState, patchState }: StateContext<ProductStateModel>, { payload }: RemoveProduct) {
    patchState({
      products: getState().products.filter(p => p.id !== payload)
    });
  }
}

```

1. **Azioni**: Definiamo le azioni per aggiungere e rimuovere i prodotti.

```tsx
export class AddProduct {
  static readonly type = '[Product] Add';
  constructor(public payload: Product) {}
}

export class RemoveProduct {
  static readonly type = '[Product] Remove';
  constructor(public payload: number) {}
}

```

1. **Utilizzo nei Componenti**: Nei componenti, possiamo utilizzare lo store per selezionare e modificare lo stato.

```tsx
import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Product } from './models/product.model';
import { AddProduct, RemoveProduct } from './store/product.actions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent {
  products$: Observable<Product[]> = this.store.select(state => state.products.products);

  constructor(private store: Store) {}

  addProduct(product: Product) {
    this.store.dispatch(new AddProduct(product));
  }

  removeProduct(productId: number) {
    this.store.dispatch(new RemoveProduct(productId));
  }
}

```

Questo esempio mostra come configurare e utilizzare NGXS per gestire lo stato di un elenco di prodotti. NGXS semplifica la gestione dello stato e riduce il codice boilerplate, rendendo più facile sviluppare e mantenere applicazioni Angular.