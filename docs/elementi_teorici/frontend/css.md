---
layout: page
title:  Layout in CSS
permalink: /teoria/frontend/scss
parent: Tecnologie di Frontend
---

# Layout in CSS

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


CSS, Flexbox, Grid e SCSS sono strumenti fondamentali per i web designer e sviluppatori front-end. Mentre **Flexbox** e **Grid** forniscono tecniche specifiche per creare layout moderni e reattivi, **SCSS** aumenta la potenza e l’efficienza del CSS. La conoscenza di queste tecniche ti aiuterà a costruire interfacce user-friendly e mantenibili.

**Unità di Misura in CSS: px, rem e altre Opzioni**

Nel mondo dello sviluppo web, è anche importante conoscere le unità di misura in CSS; è essenziale per creare interfacce belle e funzionali. Le unità come **px** e **rem** sono tra le più utilizzate, e comprendere le differenze tra loro è fondamentale per costruire layout responsive che si adattino bene a vari dispositivi.

### Cos'è un "px"?

**px** è l'abbreviazione di **pixel**. In CSS, il pixel è un'unità fissa che rappresenta un singolo punto sullo schermo. Essendo un'unità assoluta, **px** è comunemente utilizzato per definire dimensioni precise. Tuttavia, questo approccio può diventare problemativo quando si tratta di gestire diverse risoluzioni e dimensioni degli schermi. Ad esempio, ciò che appare perfettamente proporzionato su un monitor desktop potrebbe sembrare eccessivamente piccolo o grande su uno smartphone.

### Cos'è un "rem"?

**rem** sta per **root em** ed è un'unità relativa. Questo significa che la dimensione di un elemento definita in rem si basa sulla dimensione del font dell'elemento radice del documento (solitamente l'elemento `<html>`). Se la dimensione del font sull'elemento `<html>` è impostata, ad esempio, a **16px**, un valore di **1rem** corrisponderà a **16px**. Utilizzare **rem** è molto utile quando si desidera mantenere la consistenza in tutta l'applicazione, rendendo più semplice scalare l'interfaccia a seconda delle necessità degli utenti o delle impostazioni del browser.

Facciamo un esempio pratico per chiarire il concetto di consistenza. Immagina di avere un sito web con diverse sezioni, come header, body e footer. Se imposti la dimensione del font dell'elemento `<html>` a **16px**, tutti gli elementi che usano **rem** come unità si baseranno su questo valore. Ad esempio, un titolo con una dimensione di **2rem** sarà **32px** (2 × 16px). Ora, se in un secondo momento decidi di aumentare la dimensione del font dell'elemento `<html>` a **18px** per migliorare la leggibilità, il titolo diventerà automaticamente **36px** (2 × 18px). Questo permette di mantenere proporzioni coerenti e una scala consistente in tutta l'applicazione senza dover modificare ogni singolo elemento manualmente. In questo modo, l'interfaccia rimane uniforme e facilmente adattabile alle preferenze degli utenti.

### Cos'è il Viewport?

Il **viewport** è la parte visibile della pagina web nel browser, ovvero l'area della finestra del browser in cui viene mostrato il contenuto del sito. Nei dispositivi mobili, il **viewport** può variare notevolmente in dimensioni rispetto a un desktop, quindi è importante definire come il contenuto debba adattarsi a questa area visibile.

Il **meta tag viewport** serve a controllare le dimensioni del viewport e la sua scalatura. Ad esempio, impostando:

```html
<meta name="viewport" content="width=device-width, initial-scale=1">

```

stai dicendo al browser di utilizzare la larghezza effettiva del dispositivo per il rendering del contenuto, senza ridimensionamenti predefiniti, e di impostare la scala iniziale a 1 (ossia, senza zoom). Questo è particolarmente importante per i dispositivi mobili, poiché senza questo tag, il browser potrebbe cercare di ridimensionare automaticamente il contenuto, portando a una visualizzazione non ottimale, con testi troppo piccoli o elementi fuori dallo schermo.

### Altre Unità di Misura Comuni

- **em**: simile al rem, ma l'unità si basa sulla dimensione del font dell'elemento padre piuttosto che su quello radice. Questo può causare comportamenti non sempre prevedibili, soprattutto in casi di nidificazione profonda.
- **% (percentuale)**: spesso usata per larghezza e altezza, la percentuale è relativa all'elemento contenitore. Questa unità è utile per creare layout flessibili che si adattino alla dimensione del contenitore.
- **vw e vh**: **viewport width** e **viewport height** sono unità relative alla dimensione della finestra del browser. **1vw** è pari all'1% della larghezza del viewport, mentre **1vh** è pari all'1% dell'altezza del viewport.
- **vmin e vmax**: rappresentano rispettivamente il valore minimo o massimo tra la larghezza e l'altezza del viewport, e sono utili per creare elementi che si adattino bene alle proporzioni del dispositivo.

### Confronto tra px e rem

Il principale vantaggio dell'uso dei **rem** rispetto ai **px** è la loro capacità di migliorare l'accessibilità e la scalabilità del sito. Utilizzando **rem**, è facile adattare la dimensione degli elementi al variare delle impostazioni dell'utente, poiché il valore radice può essere modificato e tutti gli elementi relativi si adatteranno di conseguenza. Questo è particolarmente importante per rendere il sito utilizzabile da persone con esigenze diverse, come utenti che preferiscono ingrandire il testo per una migliore leggibilità.

Al contrario, i **px** offrono un controllo più preciso e immediato sulle dimensioni degli elementi, ma sono meno flessibili e possono rendere la tua applicazione meno responsiva e meno accessibile. Spesso, una combinazione di **px** e **rem** è una buona strategia: **rem** per la maggior parte dei layout e della tipografia, e **px** per dettagli specifici che necessitano di dimensioni fisse.

### Best Practices per un'App Responsive

1. **Utilizza Unità Relative**: Preferisci **rem**, **em**, e **%** per dimensionare elementi e font, in modo da facilitare la gestione delle diverse dimensioni dello schermo e delle preferenze degli utenti.
2. **Media Queries**: Usa le **media queries** per definire stili specifici in base alla risoluzione dello schermo. Ad esempio, cambia la disposizione degli elementi quando il dispositivo ha una larghezza inferiore a 768px, tipica dei tablet.
3. **Flexbox e Grid**: Utilizza **Flexbox** e **CSS Grid** per strutturare il layout. Questi strumenti sono stati progettati per creare layout flessibili e ridimensionabili, rendendo molto più semplice costruire interfacce responsive rispetto all'utilizzo di **float** o di posizionamenti manuali.
4. **Viewport Meta Tag**: Non dimenticare di includere il meta tag viewport nel tuo HTML per assicurarti che il tuo sito sia visualizzato correttamente su dispositivi mobili:
Questo assicura che il contenuto sia adattato alle dimensioni del dispositivo.
    
    ```html
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    ```
    
5. **Test su Dispositivi Reali**: Non affidarti solo agli strumenti di simulazione del browser. Testa il tuo sito su dispositivi reali per assicurarti che l'esperienza utente sia ottimale su tutte le risoluzioni.
6. **Dimensionamento Tipografico in rem**: Imposta la dimensione del font del root (solitamente il tag `<html>`) per controllare facilmente l'intera scala tipografica del sito. Per esempio, puoi iniziare con **font-size: 16px** sull'elemento `<html>` e poi definire il resto delle dimensioni in **rem**.

Seguendo queste best practices, sarai in grado di creare un'applicazione che non solo sembri bella, ma che sia anche facilmente utilizzabile su qualunque dispositivo. Un design responsive è fondamentale per offrire una buona esperienza utente, soprattutto nell'era degli smartphone e dei tablet.

## Collegamenti Esterni

Per ulteriori approfondimenti, puoi consultare i seguenti collegamenti:

- [grid vs flexbox performance?](https://techblog.smc.it/en/2020-08-03/grid-vs-flexbox-performance)
.[REM and Pixel: what is the difference on your site?](https://www.digidop.fr/en/blog/rem-pixel-what-a-difference-site)
