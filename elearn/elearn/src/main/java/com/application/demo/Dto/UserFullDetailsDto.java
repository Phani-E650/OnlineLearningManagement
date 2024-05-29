package com.application.demo.Dto;

import jakarta.persistence.Column;

public class UserFullDetailsDto {
	private String currentPassword;
	private String newPassword;
	public UserFullDetailsDto() {
		super();
		// TODO Auto-generated constructor stub
	}
	public UserFullDetailsDto(String currentPassword, String newPassword) {
		super();
		this.currentPassword = currentPassword;
		this.newPassword = newPassword;
	}
	public String getCurrentPassword() {
		return currentPassword;
	}
	public void setCurrentPassword(String currentPassword) {
		this.currentPassword = currentPassword;
	}
	public String getNewPassword() {
		return newPassword;
	}
	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}

	
	

}
