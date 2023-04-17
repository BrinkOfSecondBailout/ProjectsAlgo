package com.codingdojo.jiujitsu.models;

import java.util.Date;
import java.util.List;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.format.annotation.DateTimeFormat;



@Entity
@Table(name="users")
public class User {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@NotEmpty(message="Name cannot be empty")
	private String name;
	
	@Email
	@NotEmpty(message="Email cannot be empty")
	private String email;
	
	@Value("White")
	private String belt;
	
	@Size(min=5, message="Password must contain at least 5 characters")
	private String password;
	
	@Transient
	private String confirmPw;
	
	@Column(updatable=false)
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date createdAt;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date updatedAt;
    
    
    
    @ManyToMany(fetch=FetchType.LAZY)
    @JoinTable(
    		name="users_comps",
    		joinColumns=@JoinColumn(name="user_id"),
    		inverseJoinColumns=@JoinColumn(name="comp_id")
    )
    private List<Comp> comps;
    
    @OneToMany(mappedBy="creator", fetch = FetchType.LAZY)
    private List<Comp> comps_made;
    
    
    
    
    
    
    @OneToMany(mappedBy="creator", fetch=FetchType.LAZY)
    private List <Message> messages_made;
    
    
    @OneToMany(mappedBy="recipient", fetch=FetchType.LAZY)
    private List <Message> messages;
    
    
    
    
    
	public User() {}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	

	public String getBelt() {
		return belt;
	}

	public void setBelt(String belt) {
		this.belt = belt;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getConfirmPw() {
		return confirmPw;
	}

	public void setConfirmPw(String confirmPw) {
		this.confirmPw = confirmPw;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public List<Comp> getComps() {
		return comps;
	}

	public void setComps(List<Comp> comps) {
		this.comps = comps;
	}

	public List<Comp> getComps_made() {
		return comps_made;
	}

	public void setComps_made(List<Comp> comps_made) {
		this.comps_made = comps_made;
	}

	public List<Message> getMessages_made() {
		return messages_made;
	}

	public void setMessages_made(List<Message> messages_made) {
		this.messages_made = messages_made;
	}

	public List<Message> getMessages() {
		return messages;
	}

	public void setMessages(List<Message> messages) {
		this.messages = messages;
	}

	
	
	
    
    
    
    
}
