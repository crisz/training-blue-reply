---
layout: page
title:  Applicazione di Design Patterns Utili
permalink: /teoria/backend/design-patterns
parent: Tecnologie di Backend
---

# Applicazione di Design Patterns Utili

I **design patterns** sono soluzioni consolidate a problemi comuni nella progettazione del software. Essi rappresentano delle buone pratiche per organizzare il codice in modo leggibile, modulare e riutilizzabile. In questa guida esploreremo alcuni dei design patterns più utili per il backend: **Factory**, **Singleton**, **Repository**, **Adapter**, e altri ancora. L'adozione di questi pattern può aiutare a sviluppare applicazioni più robuste e manutenibili.

## Design Pattern: Factory

Il **Factory Pattern** è utilizzato per creare oggetti senza esporre la logica di creazione al client. È particolarmente utile quando l'istanziazione di un oggetto è complessa o dipende da condizioni specifiche.

### Esempio di Factory Pattern in Java

```java
public class ShapeFactory {
    public Shape getShape(String shapeType) {
        if (shapeType == null) {
            return null;
        }
        if (shapeType.equalsIgnoreCase("CIRCLE")) {
            return new Circle();
        } else if (shapeType.equalsIgnoreCase("SQUARE")) {
            return new Square();
        }
        return null;
    }
}
```

Il client può semplicemente richiedere l'oggetto desiderato alla fabbrica, senza preoccuparsi della logica di creazione.

## Design Pattern: Singleton

Il **Singleton Pattern** assicura che una classe abbia una sola istanza e fornisce un punto di accesso globale a quella istanza. Questo pattern è utile quando è necessario coordinare azioni su un'unica risorsa condivisa, come una connessione al database.

### Esempio di Singleton Pattern in Java

```java
public class DatabaseConnection {
    private static DatabaseConnection instance;

    private DatabaseConnection() {
        // Codice per inizializzare la connessione
    }

    public static DatabaseConnection getInstance() {
        if (instance == null) {
            instance = new DatabaseConnection();
        }
        return instance;
    }
}
```

## Design Pattern: Repository

Il **Repository Pattern** è utilizzato per separare la logica di accesso ai dati dalla logica di business. Fornisce un'interfaccia per la comunicazione con la base di dati, permettendo di centralizzare le query e mantenere il codice più pulito.

### Esempio di Repository Pattern in Java

```java
public interface UtenteRepository {
    Utente findById(String id);
    void save(Utente utente);
}

public class UtenteRepositoryImpl implements UtenteRepository {
    // Implementazione delle operazioni di accesso ai dati
    public Utente findById(String id) {
        // Logica per recuperare l'utente dal database
    }
    
    public void save(Utente utente) {
        // Logica per salvare l'utente nel database
    }
}
```

## Design Pattern: Adapter

Il **Adapter Pattern** è utilizzato per permettere l'interazione tra classi con interfacce incompatibili. Converte l'interfaccia di una classe in un'altra aspettata dal client, permettendo di lavorare con classi altrimenti non compatibili.

### Esempio di Adapter Pattern in Java

```java
public interface MediaPlayer {
    void play(String audioType, String fileName);
}

public class AudioPlayer implements MediaPlayer {
    public void play(String audioType, String fileName) {
        if(audioType.equalsIgnoreCase("mp3")) {
            System.out.println("Playing mp3 file: " + fileName);
        } else {
            MediaAdapter adapter = new MediaAdapter(audioType);
            adapter.play(audioType, fileName);
        }
    }
}
```

L'adapter consente all'**AudioPlayer** di riprodurre anche altri tipi di file oltre agli MP3, come ad esempio i file **vlc** o **mp4**.

## Altri Design Patterns Utili

### **Builder Pattern**

Il **Builder Pattern** viene utilizzato per costruire oggetti complessi passo dopo passo. Questo pattern è particolarmente utile quando un costruttore ha molti parametri e alcune proprietà possono essere opzionali.

Esempio in Java:

```java
public class Utente {
    private String nome;
    private String cognome;
    private int eta;

    public static class Builder {
        private String nome;
        private String cognome;
        private int eta;

        public Builder nome(String nome) {
            this.nome = nome;
            return this;
        }

        public Builder cognome(String cognome) {
            this.cognome = cognome;
            return this;
        }

        public Builder eta(int eta) {
            this.eta = eta;
            return this;
        }

        public Utente build() {
            return new Utente(this);
        }
    }

    private Utente(Builder builder) {
        this.nome = builder.nome;
        this.cognome = builder.cognome;
        this.eta = builder.eta;
    }
}
```

### **Decorator Pattern**

Il **Decorator Pattern** è utilizzato per aggiungere nuove funzionalità a un oggetto esistente senza modificarne la struttura. Questo pattern è utile quando si vuole estendere il comportamento di una classe in modo flessibile.

Esempio in Java:

```java
public interface Shape {
    void draw();
}

public class Circle implements Shape {
    public void draw() {
        System.out.println("Drawing a Circle");
    }
}

public class RedShapeDecorator implements Shape {
    private Shape decoratedShape;

    public RedShapeDecorator(Shape decoratedShape) {
        this.decoratedShape = decoratedShape;
    }

    public void draw() {
        decoratedShape.draw();
        setRedBorder(decoratedShape);
    }

    private void setRedBorder(Shape decoratedShape) {
        System.out.println("Border Color: Red");
    }
}
```

## Collegamenti Esterni

Per ulteriori approfondimenti, puoi consultare i seguenti collegamenti:

- [Design Patterns - Tutorialspoint](https://www.tutorialspoint.com/design_pattern/index.htm)
- [Refactoring Guru - Design Patterns](https://refactoring.guru/design-patterns)
- [Core J2EE Patterns](https://www.oracle.com/java/technologies/core-j2ee-patterns.html)

## Conclusione

L'utilizzo dei design patterns è essenziale per scrivere codice pulito, modulare e manutenibile. Pattern come **Factory**, **Singleton**, **Repository**, **Adapter**, e molti altri, offrono soluzioni collaudate per affrontare problemi comuni nello sviluppo del software. Adottare questi pattern aiuta a garantire che il codice sia robusto, leggibile e adatto a evolversi con le esigenze dei clienti.
