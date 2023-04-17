package com.codingdojo.jiujitsu.services;

import java.util.List;
import java.util.Optional;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import com.codingdojo.jiujitsu.models.Comp;
import com.codingdojo.jiujitsu.models.LoginUser;
import com.codingdojo.jiujitsu.models.User;
import com.codingdojo.jiujitsu.repositories.CompRepository;
import com.codingdojo.jiujitsu.repositories.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private CompRepository compRepo;
	
	public UserService (UserRepository userRepo) {
		this.userRepo = userRepo;
	}
	
	public List <User> findAllUsers() {
		return userRepo.findAll();
	}
	
	
	public User getByEmail (String email) {
		Optional <User> optUser = userRepo.findByEmail(email);
		if (optUser.isEmpty()) {
			return null;
		} else {
			return optUser.get();
		}
	}
	
	public User register (User newUser, BindingResult result) {
		String emailTyped = newUser.getEmail();
		Optional <User> potentialUser = userRepo.findByEmail(emailTyped);
		if (potentialUser.isPresent()) {
			result.rejectValue("email", "Matches", "This email already exists in our database");
		} 
		if (!newUser.getPassword().equals(newUser.getConfirmPw())) {
			result.rejectValue("password", "Matches", "Please make sure passwords are matching");
		}
		if (result.hasErrors()) {
			return null;
		}
		String hashed = BCrypt.hashpw(newUser.getPassword(), BCrypt.gensalt());
		newUser.setPassword(hashed);
		return userRepo.save(newUser);
	}
	
	public User changePw (User newUser, BindingResult result) {
		if (!newUser.getPassword().equals(newUser.getConfirmPw())) {
			result.rejectValue("password", "Matches", "Please make sure passwords are matching");
		}
		if (result.hasErrors()) {
			return null;
		}
		String hashed = BCrypt.hashpw(newUser.getPassword(), BCrypt.gensalt());
		newUser.setPassword(hashed);
		return userRepo.save(newUser);
	}
	
	public User login (LoginUser newLogin, BindingResult result) {
		String emailTyped = newLogin.getEmail();
		Optional <User> potentialUser = userRepo.findByEmail(emailTyped);
		if (potentialUser.isEmpty()) {
			result.rejectValue("email", "Matches", "No user with that email exists");
			return null;
		}
		User user = potentialUser.get();
		if (!BCrypt.checkpw(newLogin.getPassword(), user.getPassword())) {
			result.rejectValue("password", "Matches", "Invalid password, please try again");
			return null;
		}
		if (result.hasErrors()) {
			return null;
		}
		return user;
	}
	
	
	
	public User findUserById (Long id) {
		Optional <User> potentialUser = userRepo.findById(id);
		if (potentialUser.isEmpty()) {
			return null;
		} else {
			return potentialUser.get();
		}
	}
	
	public User updateUser (User user) {
		return userRepo.save(user);
	}
	
	public void delete (Long id) {
		userRepo.deleteById(id);
	}
	
	public User addUserToComp(Long compId, Long uId) {
		User thisUser = userRepo.findUserById(uId);
		Comp thisComp = compRepo.findCompById(compId);
		thisUser.getComps().add(thisComp);
		return userRepo.save(thisUser);
	}
	
	public User removeUserFromComp(Long compId, Long uId) {
		User thisUser = userRepo.findUserById(uId);
		Comp thisComp = compRepo.findCompById(compId);
		thisUser.getComps().remove(thisComp);
		return userRepo.save(thisUser);
	}
	
}
