// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.ssigdl.sirc.domain;

import com.ssigdl.sirc.domain.SsiEmpresaDataOnDemand;
import com.ssigdl.sirc.domain.SsiFacturaDataOnDemand;
import com.ssigdl.sirc.entity.SsiEmpresa;
import com.ssigdl.sirc.entity.SsiFactura;

import java.math.BigDecimal;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Iterator;
import java.util.List;
import java.util.Random;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

privileged aspect SsiFacturaDataOnDemand_Roo_DataOnDemand {
    
    declare @type: SsiFacturaDataOnDemand: @Component;
    
    private Random SsiFacturaDataOnDemand.rnd = new SecureRandom();
    
    private List<SsiFactura> SsiFacturaDataOnDemand.data;
    
    @Autowired
    SsiEmpresaDataOnDemand SsiFacturaDataOnDemand.ssiEmpresaDataOnDemand;
    
    public SsiFactura SsiFacturaDataOnDemand.getNewTransientSsiFactura(int index) {
        SsiFactura obj = new SsiFactura();
        setFactConcepto(obj, index);
        setFactEmpIdFk(obj, index);
        setFactFecha(obj, index);
        setFactLugarExpedicion(obj, index);
        setFactNumero(obj, index);
        setFactTotal(obj, index);
        return obj;
    }
    
    public void SsiFacturaDataOnDemand.setFactConcepto(SsiFactura obj, int index) {
        String factConcepto = "factConcepto_" + index;
        if (factConcepto.length() > 100) {
            factConcepto = factConcepto.substring(0, 100);
        }
        obj.setFactConcepto(factConcepto);
    }
    
    public void SsiFacturaDataOnDemand.setFactEmpIdFk(SsiFactura obj, int index) {
        SsiEmpresa factEmpIdFk = ssiEmpresaDataOnDemand.getRandomSsiEmpresa();
        obj.setFactEmpIdFk(factEmpIdFk);
    }
    
    public void SsiFacturaDataOnDemand.setFactFecha(SsiFactura obj, int index) {
        Date factFecha = new GregorianCalendar(Calendar.getInstance().get(Calendar.YEAR), Calendar.getInstance().get(Calendar.MONTH), Calendar.getInstance().get(Calendar.DAY_OF_MONTH), Calendar.getInstance().get(Calendar.HOUR_OF_DAY), Calendar.getInstance().get(Calendar.MINUTE), Calendar.getInstance().get(Calendar.SECOND) + new Double(Math.random() * 1000).intValue()).getTime();
        obj.setFactFecha(factFecha);
    }
    
    public void SsiFacturaDataOnDemand.setFactLugarExpedicion(SsiFactura obj, int index) {
        String factLugarExpedicion = "factLugarExpedicion_" + index;
        if (factLugarExpedicion.length() > 100) {
            factLugarExpedicion = factLugarExpedicion.substring(0, 100);
        }
        obj.setFactLugarExpedicion(factLugarExpedicion);
    }
    
    public void SsiFacturaDataOnDemand.setFactNumero(SsiFactura obj, int index) {
        String factNumero = "factNumero_" + index;
        if (factNumero.length() > 30) {
            factNumero = factNumero.substring(0, 30);
        }
        obj.setFactNumero(factNumero);
    }
    
    public void SsiFacturaDataOnDemand.setFactTotal(SsiFactura obj, int index) {
        BigDecimal factTotal = BigDecimal.valueOf(index);
        if (factTotal.compareTo(new BigDecimal("99999999.99")) == 1) {
            factTotal = new BigDecimal("99999999.99");
        }
        obj.setFactTotal(factTotal);
    }
    
    public SsiFactura SsiFacturaDataOnDemand.getSpecificSsiFactura(int index) {
        init();
        if (index < 0) {
            index = 0;
        }
        if (index > (data.size() - 1)) {
            index = data.size() - 1;
        }
        SsiFactura obj = data.get(index);
        Integer id = obj.getFactId();
        return SsiFactura.findSsiFactura(id);
    }
    
    public SsiFactura SsiFacturaDataOnDemand.getRandomSsiFactura() {
        init();
        SsiFactura obj = data.get(rnd.nextInt(data.size()));
        Integer id = obj.getFactId();
        return SsiFactura.findSsiFactura(id);
    }
    
    public boolean SsiFacturaDataOnDemand.modifySsiFactura(SsiFactura obj) {
        return false;
    }
    
    public void SsiFacturaDataOnDemand.init() {
        int from = 0;
        int to = 10;
        data = SsiFactura.findSsiFacturaEntries(from, to);
        if (data == null) {
            throw new IllegalStateException("Find entries implementation for 'SsiFactura' illegally returned null");
        }
        if (!data.isEmpty()) {
            return;
        }
        
        data = new ArrayList<SsiFactura>();
        for (int i = 0; i < 10; i++) {
            SsiFactura obj = getNewTransientSsiFactura(i);
            try {
                obj.persist();
            } catch (final ConstraintViolationException e) {
                final StringBuilder msg = new StringBuilder();
                for (Iterator<ConstraintViolation<?>> iter = e.getConstraintViolations().iterator(); iter.hasNext();) {
                    final ConstraintViolation<?> cv = iter.next();
                    msg.append("[").append(cv.getRootBean().getClass().getName()).append(".").append(cv.getPropertyPath()).append(": ").append(cv.getMessage()).append(" (invalid value = ").append(cv.getInvalidValue()).append(")").append("]");
                }
                throw new IllegalStateException(msg.toString(), e);
            }
            obj.flush();
            data.add(obj);
        }
    }
    
}
