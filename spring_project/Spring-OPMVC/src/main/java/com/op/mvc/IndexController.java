package com.op.mvc;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexController {
	
	@RequestMapping("/index")
	public String index() {
		
//		String str = null;
//		str.toString();
		
		return "index";
	}
	
	
	@ExceptionHandler(NullPointerException.class)
	public String handleNullPointerException(NullPointerException e) {
		
		return "error/nullPointer";
	}
	

}