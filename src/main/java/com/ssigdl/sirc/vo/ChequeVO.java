package com.ssigdl.sirc.vo;

import java.io.Serializable;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class ChequeVO implements Serializable{

    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    @NotNull
    @Size(min=7, max=7)
    private String cheNumero;
    @NotNull
    private String cheReceptor;
    @NotNull
    private String cheFechas;
    
    public String getCheNumero() {
        return cheNumero;
    }
    public void setCheNumero(String cheNumero) {
        this.cheNumero = cheNumero;
    }
    public String getCheReceptor() {
        return cheReceptor;
    }
    public void setCheReceptor(String cheReceptor) {
        this.cheReceptor = cheReceptor;
    }
    public String getCheFechas() {
        return cheFechas;
    }
    public void setCheFechas(String cheFechas) {
        this.cheFechas = cheFechas;
    }
}
