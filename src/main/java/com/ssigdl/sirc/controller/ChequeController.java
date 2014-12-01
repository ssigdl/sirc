package com.ssigdl.sirc.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

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
    public @ResponseBody SsiCheque searchChecks(@ModelAttribute(value="chequeVO") ChequeVO chequeVO, BindingResult result) {

        // ModelAndView mav = new ModelAndView("cheque/index");
        System.out.println(chequeVO.getCheNumero() + " - " + chequeVO.getCheReceptor() + " - " + chequeVO.getCheFechas());
        SsiCheque ssiCheque = new SsiCheque();
        ssiCheque.setCheReceptor(chequeVO.getCheReceptor());
        ssiCheque.setCheNumero(chequeVO.getCheNumero());
        
//        ChequeValidator chequeValidator = new ChequeValidator();
//        chequeValidator.setCheFecha(chequeVO.getCheFechas());
//        chequeValidator.validate(ssiCheque, result);

        List<SsiCheque> lstCheques = new ArrayList();
        HashMap<String, String> cheParameters = new HashMap();
        
        if (result.hasFieldErrors("cheNumero") == false) {
            cheParameters.put("cheNumero", ssiCheque.getCheNumero());
        } else if (result.hasFieldErrors("cheReceptor") == false) {
            cheParameters.put("cheReceptor", ssiCheque.getCheReceptor());
        } 
//        else if (result.hasFieldErrors("cheFecha") == false) {
//            cheParameters.put("cheFechas", chequeVO.getCheFechas());
//        }

        System.out.println(cheParameters);
        
//        if (cheParameters.size()  0) {
            lstCheques = ssiCheque.findSsiChequesByParameters(cheParameters);
            System.out.println(lstCheques.size());
            for(SsiCheque c : lstCheques){
                System.out.println(c.getCheNumero());
            }
//        }

        // model.addAttribute("numero", ssiCheque.getCheNumero());
        // model.addAttribute("concepto", ssiCheque.getCheConcepto());
        // model.addAttribute("receptor", ssiCheque.getCheReceptor());
        //

        System.out.println("busqueda");
        return ssiCheque;
    }
}
