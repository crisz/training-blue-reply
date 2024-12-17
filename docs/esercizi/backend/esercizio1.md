---
layout: page  
title: Ex1 ~ Spring & JPA  
permalink: /esercizi/backend/esercizio1  
parent: Esercizi Backend  
nav_order: 1  
---

# Esercizio 1  

## Spring & JPA  
In questo esercizio verranno affrontate tematiche relative all’implementazione di nuovi servizi di backend utilizzando **Spring** e **JPA**. Sarà necessario modificare servizi esistenti e implementare un servizio aggiuntivo utilizzando MyBatis per la gestione della categoria degli eventi.  

## Temi trattati  
Spring  
{: .label }  

JPA  
{: .label }  

Integration Test  
{: .label }  

MyBatis  
{: .label }  

## Procedimento  
1. **Modifica il servizio di creazione evento**  
   - Endpoint esistente: `POST /event`  
   - Aggiungere un nuovo campo “categoria” (String) nella richiesta e persisterlo nel database.  

2. **Modifica il servizio di recupero eventi**  
   - Endpoint esistente: `GET /events`  
   - Restituire il nuovo campo “categoria” nel payload della risposta.  

3. **Implementare un nuovo servizio**  
   - Endpoint: `PATCH /event/{id}`  
   - Funzionalità: Consente di aggiornare la categoria di un evento specifico identificato tramite ID.  

## Domande  
- Come si configura MyBatis per integrarsi con un progetto Spring?  
- Quali sono le differenze principali tra JPA e MyBatis?  
- Come implementeresti un Integration Test per il servizio `PATCH /event/{id}`?  

## Risoluzione  
<details>  
<summary>Visualizza soluzione</summary>  
<b>Modifica del servizio POST</b><br>
Aggiungere il campo "categoria" nell’Entity `Event`.  



<pre><code class="language-java">
@Entity  
public class Event {  
    @Id  
    @GeneratedValue(strategy = GenerationType.IDENTITY)  
    private Long id;  
    private String name;  
    private String categoria;
}  
</code></pre>


</details>  
