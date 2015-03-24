package com.ssigdl.sirc.controller;
import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
 
/**
 * Handles requests for the application home page.
 */
@Controller
public class SecurityController {
     
    private static final Logger logger = LoggerFactory.getLogger(SecurityController.class);
     
    /**
     * Simply selects the home view to render by returning its name.
     */
    @RequestMapping(value = "/doLogin", method = RequestMethod.POST)
    public ModelAndView doLogin() {
    	System.out.println("Welcome home! The client locale is {}.");
    	return new ModelAndView("redirect:/index");
    }
    
    @RequestMapping(value = "/arf", method = RequestMethod.GET)
    public String home(Locale locale, Model model) {
        System.out.println("Welcome home! The client locale is {}.");
         
        Date date = new Date();
        DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
         
        String formattedDate = dateFormat.format(date);
         
        model.addAttribute("serverTime", formattedDate );
         
        return "home";
    }

    @RequestMapping(value = "/blankFolder/**", method = RequestMethod.GET)
    public String index(Locale locale, Model model) {
        System.out.println("Custom page");
        
        return "blankFolder/index";
    }

    @RequestMapping(value = "/pages/ui/icons", method = RequestMethod.GET)
    public String icons(Locale locale, Model model) {
        System.out.println("Icons page");
        
        return "pages/ui/icons";
    }
     
}
