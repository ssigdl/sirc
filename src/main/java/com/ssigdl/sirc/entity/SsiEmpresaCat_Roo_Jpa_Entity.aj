// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.ssigdl.sirc.entity;

import com.ssigdl.sirc.entity.SsiEmpresaCat;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

privileged aspect SsiEmpresaCat_Roo_Jpa_Entity {
    
    declare @type: SsiEmpresaCat: @Entity;
    
    declare @type: SsiEmpresaCat: @Table(name = "ssi_empresa_cat");
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "empc_id")
    private Integer SsiEmpresaCat.empcId;
    
    public Integer SsiEmpresaCat.getEmpcId() {
        return this.empcId;
    }
    
    public void SsiEmpresaCat.setEmpcId(Integer id) {
        this.empcId = id;
    }
    
}
