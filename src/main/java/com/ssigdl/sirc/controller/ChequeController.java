package com.ssigdl.sirc.controller;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.ssigdl.sirc.entity.SsiCheque;
import com.ssigdl.sirc.validator.ChequeValidator;
import com.ssigdl.sirc.vo.ChequeVO;

@RequestMapping("/cheque")
@Controller
public class ChequeController {

    @RequestMapping(method = RequestMethod.POST, value = "{id}")
    public void post(@PathVariable Long id, ModelMap modelMap, HttpServletRequest request, HttpServletResponse response) {

    }

    @RequestMapping(value = { "/", "/index" })
    public ModelAndView index() {
        return new ModelAndView("cheque/index", "ssiCheque", new SsiCheque());
    }

    @RequestMapping(value = "/searchChecks", method = RequestMethod.POST)
    public @ResponseBody List<SsiCheque> searchChecks(@Valid ChequeVO chequeVO, BindingResult result) {

        // ModelAndView mav = new ModelAndView("cheque/index");
        SsiCheque ssiCheque = new SsiCheque();
//        ssiCheque.setCheReceptor(chequeVO.getCheReceptor());
//        ssiCheque.setCheNumero(chequeVO.getCheNumero());
//        
//        ChequeValidator chequeValidator = new ChequeValidator();
//        chequeValidator.setCheFecha(chequeVO.getCheFechas());
//        chequeValidator.validate(ssiCheque, result);

        
        List<SsiCheque> lstCheques = new ArrayList();
//        HashMap<String, String> cheParameters = new HashMap();
//        if (result.hasFieldErrors("cheNumero") == false) {
//            System.out.println("1");
//            cheParameters.put("cheNumero", ssiCheque.getCheNumero());
//        } 
//        if (result.hasFieldErrors("cheReceptor") == false) {
//            System.out.println("2");
//            cheParameters.put("cheReceptor", ssiCheque.getCheReceptor());
//        } 
//        if (result.hasFieldErrors("cheFechas") == false) {
//            System.out.println("3");
//            cheParameters.put("cheFechas", chequeVO.getCheFechas());
//        }

        if (result.getErrorCount() < 3) {
            lstCheques = ssiCheque.findSsiChequesByParameters(chequeVO);
        }

        // model.addAttribute("numero", ssiCheque.getCheNumero());
        // model.addAttribute("concepto", ssiCheque.getCheConcepto());
        // model.addAttribute("receptor", ssiCheque.getCheReceptor());
        //

        return lstCheques;
    }
    
    @RequestMapping(value = "/addCheck", method = RequestMethod.POST)
    public @ResponseBody SsiCheque addChecks(@Valid SsiCheque ssiCheque, BindingResult result) {
        
    	//ssiCheque.persist();
        System.out.println("agregar " + result.getErrorCount());
        return ssiCheque;
    }
}
