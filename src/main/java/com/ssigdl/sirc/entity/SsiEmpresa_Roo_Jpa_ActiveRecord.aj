// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.ssigdl.sirc.entity;

import com.ssigdl.sirc.entity.SsiEmpresa;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;

privileged aspect SsiEmpresa_Roo_Jpa_ActiveRecord {
    
    @PersistenceContext
    transient EntityManager SsiEmpresa.entityManager;
    
    public static final List<String> SsiEmpresa.fieldNames4OrderClauseFilter = java.util.Arrays.asList("");
    
    public static final EntityManager SsiEmpresa.entityManager() {
        EntityManager em = new SsiEmpresa().entityManager;
        if (em == null) throw new IllegalStateException("Entity manager has not been injected (is the Spring Aspects JAR configured as an AJC/AJDT aspects library?)");
        return em;
    }
    
    public static long SsiEmpresa.countSsiEmpresas() {
        return entityManager().createQuery("SELECT COUNT(o) FROM SsiEmpresa o", Long.class).getSingleResult();
    }
    
    public static List<SsiEmpresa> SsiEmpresa.findAllSsiEmpresas() {
        return entityManager().createQuery("SELECT o FROM SsiEmpresa o", SsiEmpresa.class).getResultList();
    }
    
    public static List<SsiEmpresa> SsiEmpresa.findAllSsiEmpresas(String sortFieldName, String sortOrder) {
        String jpaQuery = "SELECT o FROM SsiEmpresa o";
        if (fieldNames4OrderClauseFilter.contains(sortFieldName)) {
            jpaQuery = jpaQuery + " ORDER BY " + sortFieldName;
            if ("ASC".equalsIgnoreCase(sortOrder) || "DESC".equalsIgnoreCase(sortOrder)) {
                jpaQuery = jpaQuery + " " + sortOrder;
            }
        }
        return entityManager().createQuery(jpaQuery, SsiEmpresa.class).getResultList();
    }
    
    public static SsiEmpresa SsiEmpresa.findSsiEmpresa(Integer empId) {
        if (empId == null) return null;
        return entityManager().find(SsiEmpresa.class, empId);
    }
    
    public static List<SsiEmpresa> SsiEmpresa.findSsiEmpresaEntries(int firstResult, int maxResults) {
        return entityManager().createQuery("SELECT o FROM SsiEmpresa o", SsiEmpresa.class).setFirstResult(firstResult).setMaxResults(maxResults).getResultList();
    }
    
    public static List<SsiEmpresa> SsiEmpresa.findSsiEmpresaEntries(int firstResult, int maxResults, String sortFieldName, String sortOrder) {
        String jpaQuery = "SELECT o FROM SsiEmpresa o";
        if (fieldNames4OrderClauseFilter.contains(sortFieldName)) {
            jpaQuery = jpaQuery + " ORDER BY " + sortFieldName;
            if ("ASC".equalsIgnoreCase(sortOrder) || "DESC".equalsIgnoreCase(sortOrder)) {
                jpaQuery = jpaQuery + " " + sortOrder;
            }
        }
        return entityManager().createQuery(jpaQuery, SsiEmpresa.class).setFirstResult(firstResult).setMaxResults(maxResults).getResultList();
    }
    
    @Transactional
    public void SsiEmpresa.persist() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.persist(this);
    }
    
    @Transactional
    public void SsiEmpresa.remove() {
        if (this.entityManager == null) this.entityManager = entityManager();
        if (this.entityManager.contains(this)) {
            this.entityManager.remove(this);
        } else {
            SsiEmpresa attached = SsiEmpresa.findSsiEmpresa(this.empId);
            this.entityManager.remove(attached);
        }
    }
    
    @Transactional
    public void SsiEmpresa.flush() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.flush();
    }
    
    @Transactional
    public void SsiEmpresa.clear() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.clear();
    }
    
    @Transactional
    public SsiEmpresa SsiEmpresa.merge() {
        if (this.entityManager == null) this.entityManager = entityManager();
        SsiEmpresa merged = this.entityManager.merge(this);
        this.entityManager.flush();
        return merged;
    }
    
}
