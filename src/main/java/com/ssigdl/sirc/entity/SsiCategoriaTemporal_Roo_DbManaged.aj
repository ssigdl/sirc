// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.ssigdl.sirc.entity;

import com.ssigdl.sirc.entity.SsiCategoriaTemporal;

import javax.persistence.Column;

privileged aspect SsiCategoriaTemporal_Roo_DbManaged {
    
    @Column(name = "catt_id_padre")
    private Integer SsiCategoriaTemporal.cattIdPadre;
    
    @Column(name = "catt_id_hijo")
    private Integer SsiCategoriaTemporal.cattIdHijo;
    
    @Column(name = "catt_nivel")
    private Integer SsiCategoriaTemporal.cattNivel;
    
    public Integer SsiCategoriaTemporal.getCattIdPadre() {
        return cattIdPadre;
    }
    
    public void SsiCategoriaTemporal.setCattIdPadre(Integer cattIdPadre) {
        this.cattIdPadre = cattIdPadre;
    }
    
    public Integer SsiCategoriaTemporal.getCattIdHijo() {
        return cattIdHijo;
    }
    
    public void SsiCategoriaTemporal.setCattIdHijo(Integer cattIdHijo) {
        this.cattIdHijo = cattIdHijo;
    }
    
    public Integer SsiCategoriaTemporal.getCattNivel() {
        return cattNivel;
    }
    
    public void SsiCategoriaTemporal.setCattNivel(Integer cattNivel) {
        this.cattNivel = cattNivel;
    }
    
}
