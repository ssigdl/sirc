// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.ssigdl.sirc.entity;

import com.ssigdl.sirc.entity.SsiFactura;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;

privileged aspect SsiFactura_Roo_Jpa_ActiveRecord {
    
    @PersistenceContext
    transient EntityManager SsiFactura.entityManager;
    
    public static final List<String> SsiFactura.fieldNames4OrderClauseFilter = java.util.Arrays.asList("");
    
    public static final EntityManager SsiFactura.entityManager() {
        EntityManager em = new SsiFactura().entityManager;
        if (em == null) throw new IllegalStateException("Entity manager has not been injected (is the Spring Aspects JAR configured as an AJC/AJDT aspects library?)");
        return em;
    }
    
    public static long SsiFactura.countSsiFacturas() {
        return entityManager().createQuery("SELECT COUNT(o) FROM SsiFactura o", Long.class).getSingleResult();
    }
    
    public static List<SsiFactura> SsiFactura.findAllSsiFacturas() {
        return entityManager().createQuery("SELECT o FROM SsiFactura o", SsiFactura.class).getResultList();
    }
    
    public static List<SsiFactura> SsiFactura.findAllSsiFacturas(String sortFieldName, String sortOrder) {
        String jpaQuery = "SELECT o FROM SsiFactura o";
        if (fieldNames4OrderClauseFilter.contains(sortFieldName)) {
            jpaQuery = jpaQuery + " ORDER BY " + sortFieldName;
            if ("ASC".equalsIgnoreCase(sortOrder) || "DESC".equalsIgnoreCase(sortOrder)) {
                jpaQuery = jpaQuery + " " + sortOrder;
            }
        }
        return entityManager().createQuery(jpaQuery, SsiFactura.class).getResultList();
    }
    
    public static SsiFactura SsiFactura.findSsiFactura(Integer factId) {
        if (factId == null) return null;
        return entityManager().find(SsiFactura.class, factId);
    }
    
    public static List<SsiFactura> SsiFactura.findSsiFacturaEntries(int firstResult, int maxResults) {
        return entityManager().createQuery("SELECT o FROM SsiFactura o", SsiFactura.class).setFirstResult(firstResult).setMaxResults(maxResults).getResultList();
    }
    
    public static List<SsiFactura> SsiFactura.findSsiFacturaEntries(int firstResult, int maxResults, String sortFieldName, String sortOrder) {
        String jpaQuery = "SELECT o FROM SsiFactura o";
        if (fieldNames4OrderClauseFilter.contains(sortFieldName)) {
            jpaQuery = jpaQuery + " ORDER BY " + sortFieldName;
            if ("ASC".equalsIgnoreCase(sortOrder) || "DESC".equalsIgnoreCase(sortOrder)) {
                jpaQuery = jpaQuery + " " + sortOrder;
            }
        }
        return entityManager().createQuery(jpaQuery, SsiFactura.class).setFirstResult(firstResult).setMaxResults(maxResults).getResultList();
    }
    
    @Transactional
    public void SsiFactura.persist() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.persist(this);
    }
    
    @Transactional
    public void SsiFactura.remove() {
        if (this.entityManager == null) this.entityManager = entityManager();
        if (this.entityManager.contains(this)) {
            this.entityManager.remove(this);
        } else {
            SsiFactura attached = SsiFactura.findSsiFactura(this.factId);
            this.entityManager.remove(attached);
        }
    }
    
    @Transactional
    public void SsiFactura.flush() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.flush();
    }
    
    @Transactional
    public void SsiFactura.clear() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.clear();
    }
    
    @Transactional
    public SsiFactura SsiFactura.merge() {
        if (this.entityManager == null) this.entityManager = entityManager();
        SsiFactura merged = this.entityManager.merge(this);
        this.entityManager.flush();
        return merged;
    }
    
}
