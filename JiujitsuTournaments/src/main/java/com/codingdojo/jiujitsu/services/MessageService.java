package com.codingdojo.jiujitsu.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.codingdojo.jiujitsu.models.Message;
import com.codingdojo.jiujitsu.models.User;
import com.codingdojo.jiujitsu.repositories.MessageRepository;

@Service
public class MessageService {
	@Autowired
	private MessageRepository messageRepo;
	
	public MessageService(MessageRepository messageRepo) {
		this.messageRepo = messageRepo;
	}
	
	public List <Message> findAllMessagesByReceiver(Long uId) {
		return messageRepo.findAllByRecipient(uId);
	}
	
	public Message create(Message m, User creator, User receiver) {
		m.setCreator(creator);
		m.setRecipient(receiver);
		return messageRepo.save(m);
	}
	
	public Message findMessageById(Long id) {
		Optional <Message> potentialMessage = messageRepo.findById(id);
		if (potentialMessage.isEmpty()) {
			return null;
		} else {
			return potentialMessage.get();
		}
	}
	
	public void deleteMessage(Long id) {
		messageRepo.deleteById(id);
	}
}
