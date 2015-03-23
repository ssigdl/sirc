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

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.util.JSONPObject;
import com.ssigdl.sirc.entity.SsiCheque;
import com.ssigdl.sirc.helper.ResultListWrapper;
import com.ssigdl.sirc.validator.ChequeValidator;
import com.ssigdl.sirc.vo.ChequeVO;

@RequestMapping("/check")
@Controller
public class ChequeController {

	@RequestMapping(value = { "/manageCheck"})
	public ModelAndView readCreateCheck(Model model) {
		model.addAttribute("chequeVO", new ChequeVO());
		model.addAttribute("ssiCheque", new SsiCheque());
		return new ModelAndView("check/manageCheck");
	}

	//Se enviara a la pagina de create con un ID 
	@RequestMapping(value = { "/updateCheck"})
	public @ResponseBody SsiCheque updateCheck(@RequestParam("editCheId") int id) {
		return SsiCheque.findSsiCheque(id);
	}

	@RequestMapping(value = "/search", method = RequestMethod.POST)
	public @ResponseBody ResultListWrapper<SsiCheque> search(@Valid ChequeVO chequeVO,
			BindingResult result) {

		ResultListWrapper<SsiCheque> resultListWrapper = new ResultListWrapper<SsiCheque>();
		
		// ssiCheque.setCheReceptor(chequeVO.getCheReceptor());
		// ssiCheque.setCheNumero(chequeVO.getCheNumero());
		//
		// ChequeValidator chequeValidator = new ChequeValidator();
		// chequeValidator.setCheFecha(chequeVO.getCheFechas());
		// chequeValidator.validate(ssiCheque, result);

		if (result.getErrorCount() < 3) {
			resultListWrapper = SsiCheque.findSsiChequesByParameters(chequeVO);
		}

		// model.addAttribute("numero", ssiCheque.getCheNumero());
		// model.addAttribute("concepto", ssiCheque.getCheConcepto());
		// model.addAttribute("receptor", ssiCheque.getCheReceptor());
		return resultListWrapper;
	}

	@RequestMapping(value = "/add", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody String add(
			@RequestBody @Valid SsiCheque ssiCheque, BindingResult result) throws JSONException {
		JSONObject json = new JSONObject();
		try {
			if (result.hasErrors() == false) {
				ssiCheque.persist();
				json.put("success", true);
				json.put("cheId", ssiCheque.getCheId());
			} else {
				json.put("success", false);
				json.put("message", result.getFieldError().getField().substring(3, result.getFieldError().getField().length()) + " " + result.getFieldError().getDefaultMessage());
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			json.put("message", e.getMessage());
			e.printStackTrace();
		}
		return json.toString();
	}

	@RequestMapping(value = "/edit", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody String edit(
			@RequestBody @Valid SsiCheque ssiCheque, BindingResult result) throws JSONException {
		JSONObject json = new JSONObject();
		try {
			if (result.hasErrors() == false) {
				ssiCheque.merge();
				json.put("success", true);
			} else {
				json.put("success", false);
				json.put("message", result.getFieldError().getField().substring(3, result.getFieldError().getField().length()) + " " + result.getFieldError().getDefaultMessage());
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			json.put("message", e.getMessage());
			e.printStackTrace();
		}
		return json.toString();
	}
}
