package com.codingdojo.jiujitsu.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.codingdojo.jiujitsu.models.Comp;
import com.codingdojo.jiujitsu.models.User;
import com.codingdojo.jiujitsu.repositories.CompRepository;

@Service
public class CompService {
	@Autowired
	public CompRepository compRepo;
	
	public CompService (CompRepository compRepo) {
		this.compRepo = compRepo;
	}
	
	public List <Comp> findCompsByDates() {
		return compRepo.findAllCompsByDates();
	}
	
	
	public Comp create(Comp comp, User user) {
		comp.setCreator(user);
		return compRepo.save(comp);
	}
	
	public Comp update(Comp comp, User user) {
		comp.setCreator(user);
		return compRepo.save(comp);
	}
	
	public void delete(Long id) {
		compRepo.deleteById(id);
	}
	
	public List <Comp> getAllComps() {
		return compRepo.findAll();
	}
	
	public Comp getOneComp(Long id) {
		Optional <Comp> potentialComp = compRepo.findById(id);
		if (potentialComp.isEmpty()) {
			return null;
		} else {
			return potentialComp.get();
		}
		
	}
	
	
}
