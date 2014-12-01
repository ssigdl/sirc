// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.ssigdl.sirc.entity;

import com.ssigdl.sirc.entity.SsiTelefonoCat;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;

privileged aspect SsiTelefonoCat_Roo_Jpa_ActiveRecord {
    
    @PersistenceContext
    transient EntityManager SsiTelefonoCat.entityManager;
    
    public static final List<String> SsiTelefonoCat.fieldNames4OrderClauseFilter = java.util.Arrays.asList("");
    
    public static final EntityManager SsiTelefonoCat.entityManager() {
        EntityManager em = new SsiTelefonoCat().entityManager;
        if (em == null) throw new IllegalStateException("Entity manager has not been injected (is the Spring Aspects JAR configured as an AJC/AJDT aspects library?)");
        return em;
    }
    
    public static long SsiTelefonoCat.countSsiTelefonoCats() {
        return entityManager().createQuery("SELECT COUNT(o) FROM SsiTelefonoCat o", Long.class).getSingleResult();
    }
    
    public static List<SsiTelefonoCat> SsiTelefonoCat.findAllSsiTelefonoCats() {
        return entityManager().createQuery("SELECT o FROM SsiTelefonoCat o", SsiTelefonoCat.class).getResultList();
    }
    
    public static List<SsiTelefonoCat> SsiTelefonoCat.findAllSsiTelefonoCats(String sortFieldName, String sortOrder) {
        String jpaQuery = "SELECT o FROM SsiTelefonoCat o";
        if (fieldNames4OrderClauseFilter.contains(sortFieldName)) {
            jpaQuery = jpaQuery + " ORDER BY " + sortFieldName;
            if ("ASC".equalsIgnoreCase(sortOrder) || "DESC".equalsIgnoreCase(sortOrder)) {
                jpaQuery = jpaQuery + " " + sortOrder;
            }
        }
        return entityManager().createQuery(jpaQuery, SsiTelefonoCat.class).getResultList();
    }
    
    public static SsiTelefonoCat SsiTelefonoCat.findSsiTelefonoCat(Integer telcId) {
        if (telcId == null) return null;
        return entityManager().find(SsiTelefonoCat.class, telcId);
    }
    
    public static List<SsiTelefonoCat> SsiTelefonoCat.findSsiTelefonoCatEntries(int firstResult, int maxResults) {
        return entityManager().createQuery("SELECT o FROM SsiTelefonoCat o", SsiTelefonoCat.class).setFirstResult(firstResult).setMaxResults(maxResults).getResultList();
    }
    
    public static List<SsiTelefonoCat> SsiTelefonoCat.findSsiTelefonoCatEntries(int firstResult, int maxResults, String sortFieldName, String sortOrder) {
        String jpaQuery = "SELECT o FROM SsiTelefonoCat o";
        if (fieldNames4OrderClauseFilter.contains(sortFieldName)) {
            jpaQuery = jpaQuery + " ORDER BY " + sortFieldName;
            if ("ASC".equalsIgnoreCase(sortOrder) || "DESC".equalsIgnoreCase(sortOrder)) {
                jpaQuery = jpaQuery + " " + sortOrder;
            }
        }
        return entityManager().createQuery(jpaQuery, SsiTelefonoCat.class).setFirstResult(firstResult).setMaxResults(maxResults).getResultList();
    }
    
    @Transactional
    public void SsiTelefonoCat.persist() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.persist(this);
    }
    
    @Transactional
    public void SsiTelefonoCat.remove() {
        if (this.entityManager == null) this.entityManager = entityManager();
        if (this.entityManager.contains(this)) {
            this.entityManager.remove(this);
        } else {
            SsiTelefonoCat attached = SsiTelefonoCat.findSsiTelefonoCat(this.telcId);
            this.entityManager.remove(attached);
        }
    }
    
    @Transactional
    public void SsiTelefonoCat.flush() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.flush();
    }
    
    @Transactional
    public void SsiTelefonoCat.clear() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.clear();
    }
    
    @Transactional
    public SsiTelefonoCat SsiTelefonoCat.merge() {
        if (this.entityManager == null) this.entityManager = entityManager();
        SsiTelefonoCat merged = this.entityManager.merge(this);
        this.entityManager.flush();
        return merged;
    }
    
}
