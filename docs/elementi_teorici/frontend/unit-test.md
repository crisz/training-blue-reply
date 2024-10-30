---
layout: page
title:  Unit Test
permalink: /teoria/frontend/unit-test
parent: Elementi Teorici Frontend
---

# Unit Test

**Lo unit test** fa parte di una metodologia di sviluppo software in cui i singoli componenti di un'applicazione, noti come **unità**, vengono testati separatamente per verificarne il corretto funzionamento. Un'unità può essere una funzione, un metodo, un modulo o un'altra parte del codice che può essere isolata e testata individualmente. Gli unit test sono fondamentali per assicurare che ogni parte del codice funzioni come previsto, identificando rapidamente eventuali problemi e migliorando la qualità complessiva del software.

### Obiettivi degli Unit Test

Gli unit test hanno l'obiettivo principale di verificare che ogni unità del codice funzioni correttamente in isolamento. Questa pratica è particolarmente utile durante il ciclo di sviluppo, poiché permette agli sviluppatori di individuare e correggere i bug nelle fasi iniziali, riducendo il costo e la complessità delle correzioni in seguito. L'automazione degli unit test contribuisce anche a rendere il processo di sviluppo più efficiente, consentendo di testare rapidamente modifiche al codice e di garantire che nuove funzionalità non introducano problemi nelle parti esistenti.

### Caratteristiche degli Unit Test

- **Isolamento**: Gli unit test devono essere eseguiti in isolamento, senza dipendenze esterne come database, servizi di rete o file system. Questo assicura che i test siano riproducibili e non influenzati da fattori esterni.
- **Ripetibilità**: I test devono poter essere eseguiti più volte e restituire sempre lo stesso risultato, a meno che non venga modificato il codice testato.
- **Velocità**: Gli unit test devono essere veloci da eseguire, così da poter essere eseguiti frequentemente durante lo sviluppo senza interrompere il flusso di lavoro degli sviluppatori.

### Benefici degli Unit Test

1. **Identificazione precoce dei bug**: Gli unit test consentono di rilevare i problemi subito dopo che sono stati introdotti. Ciò rende le correzioni più semplici ed economiche rispetto a quando i bug vengono scoperti nelle fasi più avanzate del ciclo di vita del software.
2. **Facilitano il refactoring**: Quando un codice viene modificato o rifattorizzato, gli unit test permettono di verificare che il comportamento del codice sia rimasto invariato, riducendo il rischio di introdurre errori.
3. **Documentazione del codice**: Gli unit test possono servire come una sorta di documentazione vivente per il codice, mostrando agli sviluppatori futuri come devono funzionare le diverse parti del sistema.
4. **Miglioramento della progettazione**: La necessità di scrivere unit test può portare a una progettazione del codice più modulare e coerente, favorendo la creazione di componenti indipendenti e facilmente testabili.

### Limitazioni degli Unit Test

Nonostante i numerosi vantaggi, gli unit test hanno alcune limitazioni:

- **Non garantiscono l'assenza di bug**: Gli unit test verificano solo le parti di codice specificate. Potrebbero non coprire tutte le situazioni possibili o tutte le combinazioni di input.
- **Richiedono tempo e risorse**: Scrivere e mantenere gli unit test richiede tempo, e questo potrebbe aumentare il costo iniziale di sviluppo. Tuttavia, questo investimento viene spesso ripagato con un codice più stabile e meno difetti in fase di produzione.
- **Copertura limitata**: Gli unit test verificano solo singole unità. Problemi che derivano dall'integrazione tra diversi componenti potrebbero non essere rilevati da questi test, ma richiederebbero test di integrazione o end-to-end.

### Differenze tra Unit Test, Integration Test e Test di Sistema

- **Unit Test**: Come già descritto, si concentrano su singole unità di codice, testando in isolamento funzioni o metodi per garantirne il corretto comportamento.
- **Test di Integrazione**: Questi test verificano che diversi componenti di un sistema funzionino correttamente insieme. I test di integrazione possono evidenziare problemi che non possono essere rilevati tramite unit test, come la comunicazione tra moduli o l'accesso a risorse esterne.
- **Test di Sistema**: I test di sistema verificano il comportamento dell'intero sistema, simulando scenari d'uso reali per assicurarsi che tutte le parti dell'applicazione funzionino come previsto.

### Strumenti per gli Unit Test

### Unit Test in Angular con Jest

Quando si lavora con Angular, uno degli strumenti più efficaci per eseguire unit test è **Jest**. Jest è un framework di testing per JavaScript che offre una configurazione semplice, una sintassi intuitiva e prestazioni rapide. A differenza di strumenti come Karma e Jasmine, Jest è noto per la sua velocità e per le sue funzionalità avanzate, come la possibilità di eseguire test in parallelo e il supporto per il mocking automatico.

Jest può essere utilizzato in Angular per testare componenti, servizi e altre unità del codice. Uno dei vantaggi principali di Jest è che non richiede un browser reale per l'esecuzione dei test, riducendo il tempo necessario per il feedback rispetto a soluzioni che utilizzano Karma. Inoltre, Jest fornisce una sintassi concisa e potente per scrivere test, inclusi matcher avanzati per verificare l'output.

### Configurazione di Jest in Angular

Per iniziare a utilizzare Jest in un'applicazione Angular, puoi sostituire Karma e Jasmine con Jest seguendo alcuni semplici passaggi. Innanzitutto, devi installare Jest e le dipendenze necessarie:

```
npm install --save-dev jest @types/jest jest-preset-angular
```

Dopo aver installato le dipendenze, devi configurare Jest creando un file `setup-jest.ts` per la configurazione iniziale e aggiornare il file `angular.json` per utilizzare Jest come test runner. Una volta configurato, puoi eseguire i test utilizzando il comando:

```
npx jest
```

### Esempio di Unit Test con Jest

Supponiamo di avere un semplice servizio Angular chiamato `CalculatorService` che ha un metodo `add` per sommare due numeri. Di seguito è riportato un esempio di test utilizzando Jest:

**calculator.service.ts**

```
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  add(a: number, b: number): number {
    return a + b;
  }
}
```

**calculator.service.spec.ts** (Unit Test con Jest)

```
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    service = new CalculatorService();
  });

  it('should add two numbers correctly', () => {
    const result = service.add(2, 3);
    expect(result).toBe(5);
  });

  it('should return a negative value when adding a positive and a larger negative number', () => {
    const result = service.add(5, -10);
    expect(result).toBe(-5);
  });
});
```

In questo esempio, utilizziamo `describe` per raggruppare i test relativi al `CalculatorService` e `it` per definire ciascun caso di test. La funzione `expect` è utilizzata per verificare se il risultato del metodo `add` corrisponde al valore atteso.

### Vantaggi di Jest per Unit Test in Angular

- **Semplicità di Configurazione**: Jest richiede meno configurazione rispetto a Karma e Jasmine, semplificando il setup per i nuovi progetti Angular.
- **Velocità**: Esegue i test molto più velocemente, grazie al fatto che non utilizza un browser reale, ma un ambiente simulato.
- **Snapshot Testing**: Jest supporta il testing basato su snapshot, utile per verificare la struttura dei componenti Angular senza dover scrivere test dettagliati per ogni parte del template.
- **Mocking**: Jest ha funzionalità di mocking integrate che semplificano la simulazione di dipendenze, consentendo di isolare meglio le unità di codice durante i test.

### Karma e Jasmine vs Jest

**Karma e Jasmine** sono stati storicamente gli strumenti predefiniti per il testing delle applicazioni Angular. Karma esegue i test in un browser reale, il che garantisce che il codice venga testato in un ambiente simile a quello di produzione. Tuttavia, questo approccio può essere più lento e complesso da configurare.

**Jest**, d'altra parte, offre un'esperienza più veloce e moderna, poiché utilizza un ambiente simulato e parallelizza l'esecuzione dei test. La configurazione è generalmente più semplice e le funzionalità di mocking sono integrate direttamente nel framework, rendendolo una scelta popolare per le applicazioni Angular moderne.

### Best Practices per Unit Test in Angular con Jest

1. **Configurazione Corretta**: Assicurati di configurare correttamente Jest per l'ambiente Angular, utilizzando `jest-preset-angular` per gestire le specificità del framework.
2. **Test Modulari**: Testa componenti, servizi e pipe singolarmente, utilizzando il mocking per isolare le dipendenze.
3. **Snapshot Testing per i Componenti**: Utilizza gli snapshot per verificare facilmente i template dei componenti. Questo è utile per individuare cambiamenti imprevisti nella struttura HTML.
4. **Utilizza `beforeEach` per la Preparazione**: Usa `beforeEach` per creare istanze dei servizi o componenti che vuoi testare, garantendo che ogni test inizi con uno stato pulito.

### Conclusione

Gli **unit test** sono uno strumento fondamentale per garantire la qualità del software, e l'uso di Jest in Angular rappresenta un modo moderno e potente per eseguire questi test. Sebbene Karma e Jasmine siano ancora ampiamente utilizzati, Jest offre vantaggi significativi in termini di velocità, semplicità di configurazione e funzionalità avanzate. Utilizzare Jest per il testing delle applicazioni Angular consente agli sviluppatori di ottenere feedback rapidi e migliorare la qualità del codice con meno sforzo.Esistono diversi strumenti e framework che facilitano la scrittura e l'esecuzione degli unit test. Tra i più popolari troviamo:

- **JUnit**: Uno dei framework più utilizzati per il testing di applicazioni Java. Fornisce un ambiente semplice per creare ed eseguire test.
- **Jest**: Un framework di test JavaScript, spesso utilizzato per applicazioni scritte in React e Node.js. Jest è noto per la sua facilità d'uso e per la capacità di eseguire test rapidi.
- **JUnit (per Java)**, **PyTest (per Python)**, e **Mocha (per JavaScript)** sono altri esempi di strumenti utilizzati per la verifica unitaria in vari linguaggi.
- **Karma e Jasmine**: Strumenti spesso usati insieme per eseguire unit test nelle applicazioni Angular.

### Best Practices per gli Unit Test

1. **Testa solo una cosa alla volta**: Ogni unit test deve essere focalizzato su un singolo comportamento del codice, verificando uno scenario specifico.
2. **Assicurati che i test siano indipendenti**: Ogni test deve poter essere eseguito senza dipendere dall'esito di altri test. Ciò assicura che eventuali problemi siano facilmente isolabili.
3. **Mantieni il codice del test semplice**: Gli unit test devono essere semplici e facili da leggere, in modo che possano servire da documentazione aggiuntiva per il codice.
4. **Usa il mocking per le dipendenze**: Per testare un'unità di codice in isolamento, le dipendenze esterne devono essere simulate o sostituite con oggetti fittizi, noti come **mock**.

### Conclusione

Gli **unit test** sono uno strumento fondamentale per garantire la qualità del software. Sebbene richiedano uno sforzo aggiuntivo durante la fase di sviluppo, i benefici in termini di stabilità, affidabilità e manutenibilità del codice superano di gran lunga i costi iniziali. Utilizzare gli unit test in modo efficace permette di affrontare le complessità del software moderno con maggiore fiducia, riducendo il rischio di bug e favorendo una progettazione del codice più robusta e modulare.

## Collegamenti Esterni

Per ulteriori approfondimenti, puoi consultare i seguenti collegamenti:

- [Unit testing Angular with Jest](https://albertobasalo.medium.com/unit-testing-angular-with-jest-7de62ae2acd8)

- [Unit testing](https://it.wikipedia.org/wiki/Unit_testing)