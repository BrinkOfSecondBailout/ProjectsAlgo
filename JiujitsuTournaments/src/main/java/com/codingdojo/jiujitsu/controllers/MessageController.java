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

import com.codingdojo.jiujitsu.models.Message;
import com.codingdojo.jiujitsu.models.User;
import com.codingdojo.jiujitsu.services.MessageService;
import com.codingdojo.jiujitsu.services.UserService;

@Controller
public class MessageController {
	@Autowired
	private MessageService mServ;
	
	@Autowired
	private UserService uServ;
	
	@GetMapping("/messages/new/{id}")
	public String createMessage(@ModelAttribute("message") Message message, HttpSession session, @PathVariable("id") Long id, Model model) {
		if(session.getAttribute("userId") == null) {
			return "redirect:/";
		}
		User receiver = uServ.findUserById(id);
		model.addAttribute("receiver", receiver);
		return "newMessage.jsp";
	}
	
	@PostMapping("/messages/process/{id}")
	public String processMessage(@Valid @ModelAttribute("message") Message message, BindingResult result, @PathVariable("id") Long id, Model model, HttpSession session) {
		if(session.getAttribute("userId") == null) {
			return "redirect:/";
		} 
		User receiver = uServ.findUserById(id);
		if(result.hasErrors()) {
			model.addAttribute("receiver", receiver);
			return "newMessage.jsp";
		}
		Long senderId = (Long) session.getAttribute("userId");
		User creator = uServ.findUserById(senderId);
		mServ.create(message, creator, receiver);
		return "redirect:/dashboard";
	}
	
	@GetMapping("/messages/delete/{id}")
	public String deleteMessage(@PathVariable("id") Long id, HttpSession session) {
		if(session.getAttribute("userId") == null) {
			return "redirect:/";
		}
		Long userId = (Long) session.getAttribute("userId");
		Message message = mServ.findMessageById(id);
		if(!userId.equals(message.getRecipient().getId())) {
			return "redirect:/";
		} else {
			mServ.deleteMessage(id);
			return "redirect:/users/" + userId;
		}
		
	}
	
}
