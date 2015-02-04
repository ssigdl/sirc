// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.ssigdl.sirc.entity;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.ssigdl.sirc.serializer.CurrencySerializer;
import com.ssigdl.sirc.serializer.CustomDateSerializer;

privileged aspect SsiCheque_Roo_DbManaged {
    
    @JsonProperty("cheNumero")
    @NotNull
    @Column(name = "che_numero", length = 30)
    private String SsiCheque.cheNumero;
    
    @JsonProperty("cheFecha")
    @NotNull
    @Column(name = "che_fecha")
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(style = "M-")
    private Date SsiCheque.cheFecha;
    
    @JsonProperty("cheMonto")
    @NotNull
    @JsonSerialize(using = CurrencySerializer.class)
    @Column(name = "che_monto", precision = 10, scale = 2)
    private BigDecimal SsiCheque.cheMonto;
    
    @JsonProperty("cheReceptor")
    @Column(name = "che_receptor", length = 100)
    private String SsiCheque.cheReceptor;
    
    @JsonProperty("cheConcepto")
    @Column(name = "che_concepto", length = 100)
    private String SsiCheque.cheConcepto;
    
    public String SsiCheque.getCheNumero() {
        return cheNumero;
    }
    
    public void SsiCheque.setCheNumero(String cheNumero) {
        this.cheNumero = cheNumero;
    }
    
    @JsonSerialize(using = CustomDateSerializer.class)
    public Date SsiCheque.getCheFecha() {
        return cheFecha;
    }
    
    public void SsiCheque.setCheFecha(Date cheFecha) {
        this.cheFecha = cheFecha;
    }
    
    public BigDecimal SsiCheque.getCheMonto() {
        return cheMonto;
    }
    
    public void SsiCheque.setCheMonto(BigDecimal cheMonto) {
        this.cheMonto = cheMonto;
    }
    
    public String SsiCheque.getCheReceptor() {
        return cheReceptor;
    }
    
    public void SsiCheque.setCheReceptor(String cheReceptor) {
        this.cheReceptor = cheReceptor;
    }
    
    public String SsiCheque.getCheConcepto() {
        return cheConcepto;
    }
    
    public void SsiCheque.setCheConcepto(String cheConcepto) {
        this.cheConcepto = cheConcepto;
    }
    
}
