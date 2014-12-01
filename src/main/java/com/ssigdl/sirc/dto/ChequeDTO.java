package com.ssigdl.sirc.dto;

import java.io.Serializable;

public class ChequeDTO implements Serializable{

    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    private String cheNumero;
    private String cheReceptor;
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
