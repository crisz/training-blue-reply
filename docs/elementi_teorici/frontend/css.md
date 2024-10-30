---
layout: page
title:  Flex/Grid
permalink: /teoria/frontend/scss
parent: Elementi Teorici Frontend
---

# Layout in CSS: Flex, Grid e SCSS

CSS, o **Cascading Style Sheets**, è il linguaggio che gestisce la parte estetica di un sito web, permettendo di definire come si presentano gli elementi su una pagina. Sebbene **HTML** sia responsabile della struttura dei contenuti, il CSS controlla il loro aspetto e il loro posizionamento, includendo colore, font, margini e layout.

Negli ultimi anni, le proprietà di layout in CSS hanno visto l’aggiunta di tecniche innovative come **Flexbox** e **Grid**, mentre l’uso di pre-processori come **SCSS** ha ampliato le potenzialità del CSS e migliorato la leggibilità del codice. In questa guida, esploreremo ciascuna di queste tecniche e vedremo quando e come utilizzarle per i progetti aziendali.

**Cos’è Flexbox?**

**Flexbox**, abbreviato in *flex*, è una modalità di layout progettata per disporre gli elementi su una riga o colonna, in maniera flessibile. È particolarmente utile per gestire gli spazi tra gli elementi, rendendoli fluidi e adattabili a seconda della dimensione dello schermo.

- **Principio di funzionamento**: Flexbox opera su un *container* e sugli *elementi figli* al suo interno. Definendo il container con `display: flex`, gli elementi figli reagiscono automaticamente in base alle dimensioni del container.
- **Applicazioni**: Flexbox è ideale per layout lineari, come barre di navigazione, file di pulsanti, o elementi che devono adattarsi in maniera dinamica a seconda della disponibilità di spazio.

**Esempio di utilizzo di Flexbox**:

```css
.container {
  display: flex;
  justify-content: space-between; /* Allinea gli elementi con spazio tra loro */
  align-items: center; /* Centra verticalmente gli elementi */
}
```

**Nota**: Flexbox eccelle nel posizionare elementi su un unico asse. Se il progetto richiede una disposizione più complessa su due assi (righe e colonne), può essere utile optare per Grid.

**Cos’è CSS Grid?**

**CSS Grid**, comunemente chiamato solo *Grid*, è un sistema di layout bidimensionale che consente di posizionare gli elementi su entrambi gli assi (orizzontale e verticale). Grid è stato progettato per creare layout avanzati e complessi in modo più semplice e intuitivo.

- **Principio di funzionamento**: Grid si basa su un container con `display: grid`, suddiviso in righe e colonne. Questo approccio permette una disposizione degli elementi molto precisa, definendo righe e colonne di dimensioni fisse o variabili.
- **Applicazioni**: Grid è perfetto per layout complessi che richiedono la disposizione di molti elementi su righe e colonne, come la struttura di un'intera pagina web o sezioni articolate di un'interfaccia.

**Esempio di utilizzo di Grid**:

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Tre colonne di uguale larghezza */
  grid-gap: 20px; /* Spazio tra gli elementi */
}

.item {
  grid-column: span 2; /* L'elemento occupa due colonne */
}
```

**Nota**: CSS Grid è progettato per layout bidimensionali, il che lo rende ideale per interfacce che richiedono un controllo preciso della disposizione su entrambi gli assi.

**Differenze principali tra Flexbox e Grid**

Sia Flexbox che Grid sono sistemi di layout molto potenti, ma ognuno ha i suoi casi d'uso preferenziali:

| **Caratteristica** | **Flexbox** | **Grid** |
| --- | --- | --- |
| **Dimensione** | Monodimensionale (un solo asse) | Bidimensionale (righe e colonne) |
| **Orientamento** | Righe o colonne | Righe e colonne insieme |
| **Controllo di allineamento** | Molto flessibile sui singoli elementi | Ottimale per layout completi |
| **Complessità del layout** | Adatto a layout più semplici | Perfetto per layout complessi |
| **Utilizzo tipico** | Barre di navigazione, gallerie | Pagine complete, sezioni articolate |

In breve, **usa Flexbox per gestire layout semplici e lineari** e **CSS Grid per layout più complessi e strutturati**.

**Performance: Flexbox vs Grid**

In termini di performance, sia Flexbox che Grid sono molto efficienti, ma l'uso corretto dipende dalla complessità del layout. Flexbox è generalmente più leggero quando si tratta di gestire layout lineari semplici, poiché richiede meno calcoli e quindi può risultare più performante su dispositivi con risorse limitate. D'altra parte, CSS Grid può richiedere più risorse a causa della sua natura bidimensionale, ma offre maggiore controllo e flessibilità per layout complessi. Pertanto, è importante scegliere lo strumento giusto in base alle esigenze specifiche del progetto: per layout più semplici, Flexbox tende a essere più veloce, mentre per layout complessi Grid garantisce una struttura più robusta e facilmente mantenibile.

**Cos’è SCSS?**

SCSS, o **Sassy CSS**, è una delle sintassi di **Sass** (Syntactically Awesome Style Sheets), un pre-processore CSS che aggiunge funzionalità avanzate e semplifica la scrittura del codice CSS. SCSS è compatibile con CSS, il che significa che puoi scrivere codice CSS standard insieme a SCSS.

**Caratteristiche principali di SCSS**:

•	**Nidificazione**: SCSS permette di scrivere regole CSS annidate, migliorando la leggibilità e l’organizzazione del codice.

•	**Variabili**: Permette di definire variabili per colori, dimensioni, font, ecc., riducendo la ripetizione e facilitando la gestione delle modifiche.

•	**Mixin e Funzioni**: Consente di creare blocchi di codice riutilizzabili, rendendo il codice più modulare e mantenibile.

•	**Condizioni e cicli**: SCSS supporta controlli di flusso come condizioni e cicli, permettendo di automatizzare la generazione di stili complessi.

**Esempio di utilizzo di SCSS**:

```scss
$primary-color: #3498db; /* Variabile */

.container {
  background-color: $primary-color;
  display: flex;

  .item {
    color: darken($primary-color, 10%); /* Funzione */
    margin: 10px;

    &:hover {
      color: lighten($primary-color, 10%);
    }
  }
}
```

**Perché usare SCSS?**

Usare SCSS in un progetto di sviluppo front-end aumenta la produttività e migliora la leggibilità del codice, riducendo la duplicazione e facilitando la gestione di progetti complessi. Grazie a funzionalità come le variabili e la nidificazione, SCSS rende il codice CSS più modulare e facilmente modificabile, un vantaggio significativo soprattutto per i team di sviluppo che lavorano su progetti di grandi dimensioni.

**Conclusione**

CSS, Flexbox, Grid e SCSS sono strumenti fondamentali per i web designer e sviluppatori front-end. Mentre **Flexbox** e **Grid** forniscono tecniche specifiche per creare layout moderni e reattivi, **SCSS** aumenta la potenza e l’efficienza del CSS. La conoscenza di queste tecniche ti aiuterà a costruire interfacce user-friendly e mantenibili.

## Collegamenti Esterni

Per ulteriori approfondimenti, puoi consultare i seguenti collegamenti:

- [grid vs flexbox performance?](https://techblog.smc.it/en/2020-08-03/grid-vs-flexbox-performance)
