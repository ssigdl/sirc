// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.ssigdl.sirc.entity;

import com.ssigdl.sirc.entity.SsiTelefono;
import com.ssigdl.sirc.entity.SsiTelefonoCat;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.OneToMany;

privileged aspect SsiTelefonoCat_Roo_DbManaged {
    
    @OneToMany(mappedBy = "telTelcIdFk")
    private Set<SsiTelefono> SsiTelefonoCat.ssiTelefonoes;
    
    @Column(name = "telc_descripcion", length = 100)
    private String SsiTelefonoCat.telcDescripcion;
    
    public Set<SsiTelefono> SsiTelefonoCat.getSsiTelefonoes() {
        return ssiTelefonoes;
    }
    
    public void SsiTelefonoCat.setSsiTelefonoes(Set<SsiTelefono> ssiTelefonoes) {
        this.ssiTelefonoes = ssiTelefonoes;
    }
    
    public String SsiTelefonoCat.getTelcDescripcion() {
        return telcDescripcion;
    }
    
    public void SsiTelefonoCat.setTelcDescripcion(String telcDescripcion) {
        this.telcDescripcion = telcDescripcion;
    }
    
}
