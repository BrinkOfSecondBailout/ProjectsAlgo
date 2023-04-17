package com.codingdojo.jiujitsu.controllers;

import java.util.List;

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
import com.codingdojo.jiujitsu.models.LoginUser;
import com.codingdojo.jiujitsu.models.Message;
import com.codingdojo.jiujitsu.models.User;
import com.codingdojo.jiujitsu.services.CompService;
import com.codingdojo.jiujitsu.services.MessageService;
import com.codingdojo.jiujitsu.services.UserService;

@Controller
public class MainController {
	@Autowired
	public UserService uServ;
	
	@Autowired
	public CompService cServ;
	
	@Autowired
	public MessageService mServ;
	
	@GetMapping("/")
	public String index(Model model) {
		model.addAttribute("newUser", new User());
		model.addAttribute("newLogin", new LoginUser());
		return "index.jsp";
	}
	
	@PostMapping("/register")
	public String register(@Valid @ModelAttribute("newUser") User user, BindingResult result, Model model, HttpSession session) {
		User newUser = uServ.register(user, result);
		if (result.hasErrors()) {
			model.addAttribute("newLogin", new LoginUser());
			return "index.jsp";
		} else {
			session.setAttribute("userId", newUser.getId());
			return "redirect:/dashboard";
		}
	}
	
	
	
	
	@PostMapping("/login")
	public String login(@Valid @ModelAttribute("newLogin") LoginUser newLogin, BindingResult result, Model model, HttpSession session) {
		User user = uServ.login(newLogin, result);
		if (result.hasErrors()) {
			model.addAttribute("newUser", new User());
			return "index.jsp";
		} else {
			session.setAttribute("userId", user.getId());
			return "redirect:/dashboard";
		}
	}
	
	@GetMapping("/dashboard")
	public String dashboard(HttpSession session, Model model) {
		if(session.getAttribute("userId") == null) {
			return "redirect:/";
		} else {
			User user = uServ.findUserById((Long) session.getAttribute("userId"));
			List <Comp> comps = cServ.findCompsByDates();
			Long userId = (Long) session.getAttribute("userId");
			List <User> users = uServ.findAllUsers();
			model.addAttribute("user", user);
			model.addAttribute("users", users);
			model.addAttribute("comps", comps);
			model.addAttribute("userId", userId);
			return "dashboard.jsp";			
		}
	}
	
	@GetMapping("/logout")
	public String logout(HttpSession session) {
		session.removeAttribute("userId");
		return "redirect:/";
	}
	
	@GetMapping("/users/edit/{id}")
	public String editUser(@PathVariable("id") Long id, HttpSession session, Model model) {
		if(session.getAttribute("userId") == null) {
			return "redirect:/";
		}
		Long uId = (Long) session.getAttribute("userId");
		if(!uId.equals(id)) {
			return "redirect:/dashboard";
		} else {
			User user = uServ.findUserById((Long) session.getAttribute("userId"));
			model.addAttribute("user", user);
			return "editUser.jsp";
		}
	}
	
	@PutMapping("/users/update/{id}")
	public String updateUser(@Valid @ModelAttribute("user") User user, BindingResult result, HttpSession session) {
		if(session.getAttribute("userId") == null) {
			return "redirect:/";
		} else {
			if(result.hasErrors()) {
				return "editUser.jsp";
			} else {
				uServ.updateUser(user);
				return "redirect:/dashboard";
			}
		}
	}
	
	@GetMapping("/users/password/{id}")
	public String changePassword(@PathVariable("id") Long id, HttpSession session, Model model) {
		if(session.getAttribute("userId") == null) {
			return "redirect:/";
		}
		Long uId = (Long) session.getAttribute("userId");
		if(!uId.equals(id)) {
			return "redirect:/dashboard";
		} else {
			User user = uServ.findUserById((Long) session.getAttribute("userId"));
			user.setPassword("");
			model.addAttribute("user", user);
			return "pwChange.jsp";
		}
	}
	
	@PutMapping("/users/update/password/{id}")
	public String updatePassword(@Valid @ModelAttribute("user") User user, BindingResult result, HttpSession session, Model model) {
		if(session.getAttribute("userId") == null) {
			return "redirect:/";
		} else {
			uServ.changePw(user, result);
			if (result.hasErrors()) {
				return "pwChange.jsp";
			}
			return "redirect:/dashboard";
		}
	}
	
	@GetMapping("/users/delete/{id}")
	public String deleteUser(@PathVariable("id") Long id, HttpSession session) {
		if(session.getAttribute("userId") == null) {
			return "redirect:/";
		}
		Long uId = (Long) session.getAttribute("userId");
		if(!uId.equals(id)) {
			return "redirect:/dashboard";
		} else {
			User user = uServ.findUserById(uId);
			
			for (Comp comp:user.getComps_made()) {
				cServ.delete(comp.getId());
			}
			
			for (Message message_made:user.getMessages_made()) {
				mServ.deleteMessage(message_made.getId());
			}
			
			for (Message message:user.getMessages()) {
				mServ.deleteMessage(message.getId());
			}
			
			uServ.delete(id);
			return "redirect:/";
		}
	}
	
	@GetMapping("/users/{id}")
	public String showUser(@PathVariable("id") Long id, HttpSession session, Model model) {
		if(session.getAttribute("userId") == null) {
			return "redirect:/";
		}
		User user = uServ.findUserById(id);
		Long userId = (Long) session.getAttribute("userId");
		model.addAttribute("userId", userId);
		model.addAttribute("user", user);
		return "userDisplay.jsp";
	}
	
	@GetMapping("/users/comps/remove/{id}")
	public String remove(@PathVariable("id") Long id, HttpSession session) {
		if(session.getAttribute("userId") == null) {
			return "redirect:/";
		}
		Long userId = (Long) session.getAttribute("userId");
		uServ.removeUserFromComp(id, userId);
		return "redirect:/users/" + userId;
	}
	
}
