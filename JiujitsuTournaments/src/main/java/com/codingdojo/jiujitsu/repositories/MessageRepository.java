package com.codingdojo.jiujitsu.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.codingdojo.jiujitsu.models.Message;

public interface MessageRepository extends CrudRepository <Message, Long>{
	public List <Message> findAllByRecipient(Long id);
	public Optional<Message> findById(Long id);
}
