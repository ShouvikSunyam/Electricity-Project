package com.tarifvergleich.electricity.util;

import org.springframework.stereotype.Component;

@Component
public class EmailTemplate {

	public String createOtpEmailBody(String name, String otp) {
	    return "<div style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>" +
	           "<h2>Welcome to Tarifvergleich Electricity!</h2>" +
	           "<p>Hello " + name + ",</p>" +
	           "<p>Thank you for signing up. To complete your registration and start comparing energy tariffs, please use the following One-Time Password (OTP):</p>" +
	           "<div style='background: #0085e0; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #2e7d32; border-radius: 5px;'>" +
	           otp +
	           "</div>"+
	           "<br>" +
	           "<p>Best Regards,<br><strong>Tarifvergleich Support Team</strong></p>" +
	           "</div>";
	}
	
	public String createForgotPasswordEmailBody(String name, String otp) {
	    return "<div style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>" +
	           "<h2>Password Reset Request</h2>" +
	           "<p>Hello " + name + ",</p>" +
	           "<p>We received a request to reset the password for your <strong>Tarifvergleich Electricity</strong> account.</p>" +
	           "<p>Please use the following One-Time Password (OTP) to proceed with resetting your password:</p>" +
	           "<div style='background: #f4f4f4; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #d32f2f; border-radius: 5px;'>" +
	           otp +
	           "</div>" +
//	           "<p><strong>Note:</strong> This code is valid for 10 minutes. If you did not request a password reset, you can safely ignore this email; your account remains secure.</p>" +
	           "<br>" +
	           "<p>Best Regards,<br><strong>Tarifvergleich Security Team</strong></p>" +
	           "</div>";
	}
	
	public String createPasswordResetSuccessEmailBody(String salutation, String lastName, String firstName, String email, String dateTime) {
	    return "<div style='font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; border: 1px solid #eee; padding: 20px;'>" +
	           "<h2 style='color: #2e7d32;'>You have successfully reset your password!</h2>" +
	           "<p>Dear " + salutation + " " + lastName + ",</p>" +
	           "<p>" + firstName + " " + lastName + "</p>" +
	           "<p>You successfully reset your password for the email address <strong>" + email + "</strong> on " + dateTime + ".</p>" +
	           
	           "<p>If you changed your password yourself, you don't need to do anything else.</p>" +
	           
	           "<div style='margin-top: 25px; padding: 15px; background-color: #fff3e0; border-left: 4px solid #ff9800;'>" +
	           "<p style='margin: 0; font-weight: bold;'>You did not carry out this action yourself?</p>" +
	           "<p style='margin: 10px 0 0 0;'>In this case, please reset your password immediately to secure your account.</p>" +
	           "</div>" +
	           
	           "<br>" +
	           "<p>Best Regards,<br><strong>Tarifvergleich Security Team</strong></p>" +
	           "</div>";
	}
}
