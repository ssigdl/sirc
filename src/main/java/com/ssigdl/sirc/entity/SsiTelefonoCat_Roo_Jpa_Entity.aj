// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.ssigdl.sirc.entity;

import com.ssigdl.sirc.entity.SsiTelefonoCat;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

privileged aspect SsiTelefonoCat_Roo_Jpa_Entity {
    
    declare @type: SsiTelefonoCat: @Entity;
    
    declare @type: SsiTelefonoCat: @Table(name = "ssi_telefono_cat");
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "telc_id")
    private Integer SsiTelefonoCat.telcId;
    
    public Integer SsiTelefonoCat.getTelcId() {
        return this.telcId;
    }
    
    public void SsiTelefonoCat.setTelcId(Integer id) {
        this.telcId = id;
    }
    
}
