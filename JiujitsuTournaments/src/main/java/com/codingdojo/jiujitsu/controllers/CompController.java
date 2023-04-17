package com.codingdojo.jiujitsu.controllers;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import com.codingdojo.jiujitsu.models.Comp;
import com.codingdojo.jiujitsu.models.User;
import com.codingdojo.jiujitsu.services.CompService;
import com.codingdojo.jiujitsu.services.UserService;

@Controller
public class CompController {
	@Autowired
	public UserService uServ;
	
	@Autowired
	public CompService cServ;
	
	@GetMapping("/comps/new")
	public String newComp(@ModelAttribute("comp") Comp comp, HttpSession session) {
		if(session.getAttribute("userId") == null) {
			return "redirect:/";
		}
		return "newComp.jsp";
	}
	
	@PostMapping("/comps/create")
	public String createComp(@Valid @ModelAttribute("comp") Comp comp, BindingResult result, HttpSession session) {
		if(session.getAttribute("userId") == null) {
			return "redirect:/";
		}
		if (result.hasErrors()) {
			return "newComp.jsp";
		} else {
			User user = uServ.findUserById((Long) session.getAttribute("userId"));
			cServ.create(comp, user);
			return "redirect:/dashboard";
		}
		
	}
	
	@GetMapping("/comps/{id}")
	public String compDisplay(@PathVariable("id") Long id, Model model, HttpSession session) {
		if(session.getAttribute("userId") == null) {
			return "redirect:/";
		}
		Long userId = (Long) session.getAttribute("userId");
		Comp comp = cServ.getOneComp(id);
		Boolean isParticipating = false;
		
		for (int i = 0; i < comp.getUsers().size(); i++) {
			if(comp.getUsers().get(i).getId().equals(userId)) {
				isParticipating = true;
			}
		}
		
		model.addAttribute("comp", comp);
		model.addAttribute("userId", userId);
		model.addAttribute("isParticipating", isParticipating);
		return "compDisplay.jsp";
	}
	
	@GetMapping("/comps/signup/{id}")
	public String signUp(@PathVariable("id") Long id, HttpSession session) {
		if(session.getAttribute("userId") == null) {
			return "redirect:/";
		}
		Long userId = (Long) session.getAttribute("userId");
		uServ.addUserToComp(id, userId);
		return "redirect:/comps/" + id;
	}
	
	@GetMapping("/comps/remove/{id}")
	public String remove(@PathVariable("id") Long id, HttpSession session) {
		if(session.getAttribute("userId") == null) {
			return "redirect:/";
		}
		Long userId = (Long) session.getAttribute("userId");
		uServ.removeUserFromComp(id, userId);
		return "redirect:/comps/" + id;
	}
	
	
	@GetMapping("/comps/delete/{id}")
	public String deleteComp(@PathVariable("id") Long id, HttpSession session) {
		if(session.getAttribute("userId") == null) {
			return "redirect:/";
		}
		Long userId = (Long) session.getAttribute("userId");
		Comp comp = cServ.getOneComp(id);
		if(!comp.getCreator().getId().equals(userId)) {
			return "redirect:/";
		}
		cServ.delete(id);
		return "redirect:/dashboard";
	}
	
	@GetMapping("/comps/edit/{id}")
	public String editComp(@PathVariable("id") Long id, HttpSession session, Model model) {
		if(session.getAttribute("userId") == null) {
			return "redirect:/";
		}
		Long userId = (Long) session.getAttribute("userId");
		Comp comp = cServ.getOneComp(id);
		if(!comp.getCreator().getId().equals(userId)) {
			return "redirect:/";
		}
		model.addAttribute("comp", comp);
		return "editComp.jsp";
	}
	
	@PutMapping("/comps/update/{id}")
	public String updateComp(@Valid @ModelAttribute("comp") Comp comp, BindingResult result, @PathVariable("id") Long id, HttpSession session) {
		if(session.getAttribute("userId") == null) {
			return "redirect:/";
		}
		if (result.hasErrors()) {
			return "editComp.jsp";
		} else {
			Long userId = (Long) session.getAttribute("userId");
			User user = uServ.findUserById(userId);
			cServ.update(comp, user);
			return "redirect:/comps/" + id;
		}
	}
	
}
