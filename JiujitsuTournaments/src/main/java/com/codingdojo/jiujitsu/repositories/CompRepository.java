package com.codingdojo.jiujitsu.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.codingdojo.jiujitsu.models.Comp;


public interface CompRepository extends CrudRepository <Comp, Long>{
	public Optional<Comp> findById(Long id);
	public List<Comp> findAll();
	public Comp findCompById(Long id);
	
	@Query(value="SELECT * FROM comps WHERE user_id = ?1", nativeQuery = true)
	public List<Comp> findAllCompsByUser(Long id);
	
	@Query(value = "SELECT * FROM comps ORDER BY date ASC", nativeQuery = true)
	public List<Comp> findAllCompsByDates();
	
	
}
