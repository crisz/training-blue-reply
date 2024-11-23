---
layout: page
title:  SQL e NoSQL
permalink: /teoria/backend/sql-nosql
parent: Tecnologie di Backend
---

# SQL e NoSQL

I database sono una componente cruciale nella progettazione e nello sviluppo delle applicazioni moderne. Esistono diversi tipi di database, ciascuno con caratteristiche e applicazioni specifiche. In questa guida esamineremo i database relazionali e NoSQL, la connessione a database tramite Spring, l'uso di ORM (Object-Relational Mapping), e il linguaggio SQL con DDL, MDL e PL-SQL.

## SQL e Database Relazionali

**SQL (Structured Query Language)** è un linguaggio di programmazione utilizzato per gestire e manipolare i dati all'interno di un **database relazionale**. I database relazionali strutturano i dati in tabelle con righe e colonne, consentendo di eseguire operazioni di lettura, scrittura, aggiornamento e cancellazione.

### **DDL, MDL e DML**

- **DDL (Data Definition Language)**: Include comandi come `CREATE`, `ALTER` e `DROP`, utilizzati per definire e modificare la struttura del database, come tabelle e indici.
- **DML (Data Manipulation Language)**: Include comandi come `INSERT`, `UPDATE`, `DELETE` e `SELECT`, utilizzati per manipolare i dati all'interno delle tabelle.
- **MDL (Metadata Definition Language)**: Spesso indicato come parte del DDL, viene utilizzato per definire metadati del database.

### **PL-SQL**

**PL-SQL** (Procedural Language/SQL) è un'estensione del linguaggio SQL, utilizzata principalmente nei database **Oracle** per scrivere procedure e funzioni che possono essere eseguite nel database. PL-SQL permette di creare codice più complesso, con cicli e condizioni, per la manipolazione dei dati.

Esempio di una semplice funzione PL-SQL:

```sql
CREATE OR REPLACE FUNCTION saluto(nome VARCHAR2) RETURN VARCHAR2 AS
BEGIN
    RETURN 'Ciao, ' || nome;
END;
```

## Connessione a Database con Driver (Spring)

Spring offre un supporto completo per la connessione ai database tramite **Spring Data** e l'uso dei driver JDBC. Questo permette di connettere facilmente un'applicazione Java a un database e di eseguire query in modo semplificato.

### Esempio di Connessione con Spring Boot

Per connettere un'applicazione Spring Boot a un database, è necessario configurare il file `application.properties` o `application.yml` come segue:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/miodatabase
    username: utente
    password: password
    driver-class-name: com.mysql.cj.jdbc.Driver
```

L'utilizzo delle annotazioni come `@Autowired` permette poi di iniettare il `DataSource` all'interno delle classi per l'accesso ai dati.



## MyBatis

**MyBatis** è un framework di mapping SQL che permette di mappare le dichiarazioni SQL personalizzate direttamente agli oggetti Java, offrendo un'alternativa agli ORM come JPA/Hibernate. A differenza degli ORM, MyBatis permette un controllo più fine delle query SQL, mantenendo comunque un certo grado di astrazione.

### Caratteristiche di MyBatis

- **Mapping Manuale**: A differenza di JPA, MyBatis non mappa automaticamente gli oggetti Java alle tabelle del database. Questo approccio consente un maggiore controllo sulle query SQL.
- **XML-based Configuration**: MyBatis utilizza file XML per configurare le query SQL, il che permette di scrivere SQL personalizzato mantenendo l'ordine del codice.
- **Integrare con Spring**: MyBatis si integra bene con il framework Spring, utilizzando annotazioni o file XML per definire le operazioni sui dati.

### Esempio di Configurazione con MyBatis

Per configurare MyBatis in un progetto Spring Boot, aggiungere la dipendenza nel `pom.xml`:

```xml
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.2.0</version>
</dependency>
```

Definire un mapper XML per le operazioni di database:

```xml
<mapper namespace="com.example.mapper.UtenteMapper">
    <select id="findById" resultType="com.example.model.Utente">
        SELECT * FROM utenti WHERE id = #{id}
    </select>
</mapper>
```

Definire un'interfaccia mapper in Java:

```java
@Mapper
public interface UtenteMapper {
    Utente findById(Long id);
}
```


## NoSQL

I **database NoSQL** sono una tipologia di database che non utilizzano il modello relazionale. Sono progettati per gestire grandi volumi di dati non strutturati o semi-strutturati e sono spesso utilizzati per applicazioni che richiedono alta scalabilità e flessibilità.

### Tipi di Database NoSQL

1. **Document-based**: Memorizzano i dati come documenti JSON, BSON o simili. **MongoDB** è uno dei database NoSQL più conosciuti di questo tipo.
2. **Key-Value**: I dati vengono memorizzati come coppie chiave-valore. **Redis** è un esempio di database NoSQL key-value.
3. **Column-family**: I dati sono memorizzati in colonne invece che in righe. **Cassandra** è un esempio di database NoSQL di tipo column-family.
4. **Graph**: Memorizzano i dati sotto forma di grafi, ideali per rappresentare relazioni complesse tra entità. **Neo4j** è un esempio di database a grafo.

### Esempio di Utilizzo di MongoDB con Spring Data

Spring Data offre supporto per l'integrazione con database NoSQL come MongoDB. La configurazione è simile a quella per i database relazionali e consente di definire i repository e le entità utilizzando annotazioni.

Esempio di entità MongoDB:

```java
@Document(collection = "utenti")
public class Utente {
    @Id
    private String id;
    private String nome;
    private String cognome;

    // Getters e Setters
}
```

Definizione di un repository MongoDB:

```java
public interface UtenteRepository extends MongoRepository<Utente, String> {
    List<Utente> findByNome(String nome);
}
```

## Collegamenti Esterni

Per ulteriori approfondimenti, puoi consultare i seguenti collegamenti:

- [SQL Tutorial - W3Schools](https://www.w3schools.com/sql/)
- [Hibernate ORM Documentation](https://hibernate.org/orm/documentation/)
- [Spring Data JPA Reference Guide](https://spring.io/projects/spring-data-jpa)
- [MongoDB Documentation](https://docs.mongodb.com/)

## Conclusione

La scelta tra **SQL** e **NoSQL** dipende dalle esigenze specifiche dell'applicazione. Mentre SQL è ideale per dati strutturati e transazioni complesse, NoSQL è adatto per dati non strutturati e per applicazioni che richiedono alta scalabilità. Strumenti come **JPA** e **Spring Data** semplificano l'interazione con i database, fornendo una base solida per lo sviluppo di applicazioni moderne e scalabili.
