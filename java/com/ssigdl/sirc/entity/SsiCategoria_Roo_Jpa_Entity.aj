// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.ssigdl.sirc.entity;

import com.ssigdl.sirc.entity.SsiCategoria;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

privileged aspect SsiCategoria_Roo_Jpa_Entity {
    
    declare @type: SsiCategoria: @Entity;
    
    declare @type: SsiCategoria: @Table(name = "ssi_categoria");
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "cat_id")
    private Integer SsiCategoria.catId;
    
    public Integer SsiCategoria.getCatId() {
        return this.catId;
    }
    
    public void SsiCategoria.setCatId(Integer id) {
        this.catId = id;
    }
    
}
