package com.codingdojo.jiujitsu.repositories;

import java.util.List;
import java.util.Optional;


import org.springframework.data.repository.CrudRepository;


import com.codingdojo.jiujitsu.models.User;



public interface UserRepository extends CrudRepository <User, Long>{
	public Optional <User> findByEmail(String email);
	public Optional <User> findById(Long id);
	public User findUserById(Long id);
	public List <User> findAll();
	
	
	public void deleteById(Long id);
}
