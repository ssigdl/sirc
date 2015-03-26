package com.ssigdl.sirc.controller;

import javax.validation.Valid;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.ssigdl.sirc.entity.SsiCheque;
import com.ssigdl.sirc.util.ResultListWrapper;
import com.ssigdl.sirc.vo.ChequeVO;

@RequestMapping("/check")
@Controller
public class ChequeController {

	@RequestMapping(value = { "/manageCheck" })
	public ModelAndView readCreateCheck(Model model) {
		model.addAttribute("chequeVO", new ChequeVO());
		model.addAttribute("ssiCheque", new SsiCheque());
		return new ModelAndView("check/manageCheck");
	}

	// Valida el ID y la informacion seleccionada para editar
	@RequestMapping(value = { "/updateCheck" }, method = RequestMethod.POST)
	public @ResponseBody SsiCheque updateCheck(@RequestBody SsiCheque ssiCHeque) {
		return SsiCheque.findSsiCheque(ssiCHeque.getCheId());
	}

	@RequestMapping(value = "/generateCheckReport", method = RequestMethod.POST)
	ModelAndView generatePdf(@Valid ChequeVO chequeVO, BindingResult result) throws Exception {

		ModelAndView modelAndView = new ModelAndView("pdfView");
		
		if (result.getErrorCount() < 3) {
			modelAndView.addObject("reportItems", SsiCheque.findSsiChequesByParameters(chequeVO));
		}

		return modelAndView;
	}

	@RequestMapping(value = "/search", method = RequestMethod.POST)
	public @ResponseBody ResultListWrapper<SsiCheque> search(
			@Valid ChequeVO chequeVO, BindingResult result) {

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
	public @ResponseBody String add(@RequestBody @Valid SsiCheque ssiCheque,
			BindingResult result) throws JSONException {
		JSONObject json = new JSONObject();
		try {
			if (result.hasErrors() == false) {
				ssiCheque.persist();
				json.put("success", true);
				json.put("cheId", ssiCheque.getCheId());
			} else {
				json.put("success", false);
				json.put(
						"message",
						result.getFieldError()
								.getField()
								.substring(
										3,
										result.getFieldError().getField()
												.length())
								+ " "
								+ result.getFieldError().getDefaultMessage());
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			json.put("message", e.getMessage());
			e.printStackTrace();
		}
		return json.toString();
	}

	@RequestMapping(value = "/edit", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody String edit(@RequestBody @Valid SsiCheque ssiCheque,
			BindingResult result) throws JSONException {
		JSONObject json = new JSONObject();
		try {
			if (result.hasErrors() == false) {
				ssiCheque.merge();
				json.put("success", true);
			} else {
				json.put("success", false);
				json.put(
						"message",
						result.getFieldError()
								.getField()
								.substring(
										3,
										result.getFieldError().getField()
												.length())
								+ " "
								+ result.getFieldError().getDefaultMessage());
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			json.put("message", e.getMessage());
			e.printStackTrace();
		}
		return json.toString();
	}

	@RequestMapping(value = "/delete", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody String delete(@RequestBody SsiCheque ssiCheque)
			throws JSONException {
		JSONObject json = new JSONObject();
		try {
			ssiCheque.remove();
			json.put("success", true);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			json.put("message", e.getMessage());
			e.printStackTrace();
		}
		return json.toString();
	}
}
