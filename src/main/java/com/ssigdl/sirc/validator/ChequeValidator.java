package com.ssigdl.sirc.validator;

import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import com.ssigdl.sirc.entity.SsiCheque;

public class ChequeValidator implements Validator {

    private String cheFechas;
    

    @Override
    public boolean supports(Class<?> clazz) {
        // TODO Auto-generated method stub
        return SsiCheque.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        SsiCheque ssiCheque = (SsiCheque) target;
        
//        
        if(cheFechas != null && cheFechas.equals("")){
            errors.rejectValue("cheFechas", "empty");
        }
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "cheNumero", "empty");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "cheReceptor", "empty");
//        else if()
    }
    
    public String getCheFecha() {
        return cheFechas;
    }
    
    public void setCheFecha(String cheFecha) {
        this.cheFechas = cheFecha;
    }
}
