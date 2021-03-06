// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.ssigdl.sirc.entity;

import com.ssigdl.sirc.entity.SsiInformacionPersonal;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;

privileged aspect SsiInformacionPersonal_Roo_Jpa_ActiveRecord {
    
    @PersistenceContext
    transient EntityManager SsiInformacionPersonal.entityManager;
    
    public static final List<String> SsiInformacionPersonal.fieldNames4OrderClauseFilter = java.util.Arrays.asList("");
    
    public static final EntityManager SsiInformacionPersonal.entityManager() {
        EntityManager em = new SsiInformacionPersonal().entityManager;
        if (em == null) throw new IllegalStateException("Entity manager has not been injected (is the Spring Aspects JAR configured as an AJC/AJDT aspects library?)");
        return em;
    }
    
    public static long SsiInformacionPersonal.countSsiInformacionPersonals() {
        return entityManager().createQuery("SELECT COUNT(o) FROM SsiInformacionPersonal o", Long.class).getSingleResult();
    }
    
    public static List<SsiInformacionPersonal> SsiInformacionPersonal.findAllSsiInformacionPersonals() {
        return entityManager().createQuery("SELECT o FROM SsiInformacionPersonal o", SsiInformacionPersonal.class).getResultList();
    }
    
    public static List<SsiInformacionPersonal> SsiInformacionPersonal.findAllSsiInformacionPersonals(String sortFieldName, String sortOrder) {
        String jpaQuery = "SELECT o FROM SsiInformacionPersonal o";
        if (fieldNames4OrderClauseFilter.contains(sortFieldName)) {
            jpaQuery = jpaQuery + " ORDER BY " + sortFieldName;
            if ("ASC".equalsIgnoreCase(sortOrder) || "DESC".equalsIgnoreCase(sortOrder)) {
                jpaQuery = jpaQuery + " " + sortOrder;
            }
        }
        return entityManager().createQuery(jpaQuery, SsiInformacionPersonal.class).getResultList();
    }
    
    public static SsiInformacionPersonal SsiInformacionPersonal.findSsiInformacionPersonal(Integer infpId) {
        if (infpId == null) return null;
        return entityManager().find(SsiInformacionPersonal.class, infpId);
    }
    
    public static List<SsiInformacionPersonal> SsiInformacionPersonal.findSsiInformacionPersonalEntries(int firstResult, int maxResults) {
        return entityManager().createQuery("SELECT o FROM SsiInformacionPersonal o", SsiInformacionPersonal.class).setFirstResult(firstResult).setMaxResults(maxResults).getResultList();
    }
    
    public static List<SsiInformacionPersonal> SsiInformacionPersonal.findSsiInformacionPersonalEntries(int firstResult, int maxResults, String sortFieldName, String sortOrder) {
        String jpaQuery = "SELECT o FROM SsiInformacionPersonal o";
        if (fieldNames4OrderClauseFilter.contains(sortFieldName)) {
            jpaQuery = jpaQuery + " ORDER BY " + sortFieldName;
            if ("ASC".equalsIgnoreCase(sortOrder) || "DESC".equalsIgnoreCase(sortOrder)) {
                jpaQuery = jpaQuery + " " + sortOrder;
            }
        }
        return entityManager().createQuery(jpaQuery, SsiInformacionPersonal.class).setFirstResult(firstResult).setMaxResults(maxResults).getResultList();
    }
    
    @Transactional
    public void SsiInformacionPersonal.persist() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.persist(this);
    }
    
    @Transactional
    public void SsiInformacionPersonal.remove() {
        if (this.entityManager == null) this.entityManager = entityManager();
        if (this.entityManager.contains(this)) {
            this.entityManager.remove(this);
        } else {
            SsiInformacionPersonal attached = SsiInformacionPersonal.findSsiInformacionPersonal(this.infpId);
            this.entityManager.remove(attached);
        }
    }
    
    @Transactional
    public void SsiInformacionPersonal.flush() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.flush();
    }
    
    @Transactional
    public void SsiInformacionPersonal.clear() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.clear();
    }
    
    @Transactional
    public SsiInformacionPersonal SsiInformacionPersonal.merge() {
        if (this.entityManager == null) this.entityManager = entityManager();
        SsiInformacionPersonal merged = this.entityManager.merge(this);
        this.entityManager.flush();
        return merged;
    }
    
}
