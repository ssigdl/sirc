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
    private String cheFechaFrom;
    @NotNull
    private String cheFechaTo;
    @NotNull
    private Integer pageIndex;
    
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
	public String getCheFechaFrom() {
		return cheFechaFrom;
	}
	public void setCheFechaFrom(String cheFechaFrom) {
		this.cheFechaFrom = cheFechaFrom;
	}
	public String getCheFechaTo() {
		return cheFechaTo;
	}
	public void setCheFechaTo(String cheFechaTo) {
		this.cheFechaTo = cheFechaTo;
	}
	public Integer getPageIndex() {
		return pageIndex;
	}
	public void setPageIndex(Integer pageIndex) {
		this.pageIndex = pageIndex;
	}

}
