// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.ssigdl.sirc.entity;

import com.ssigdl.sirc.entity.SsiFactura;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

privileged aspect SsiFactura_Roo_Jpa_Entity {
    
    declare @type: SsiFactura: @Entity;
    
    declare @type: SsiFactura: @Table(name = "ssi_factura");
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "fact_id")
    private Integer SsiFactura.factId;
    
    public Integer SsiFactura.getFactId() {
        return this.factId;
    }
    
    public void SsiFactura.setFactId(Integer id) {
        this.factId = id;
    }
    
}
