package com.ute.sportswearbe.services.mail;

import com.ute.sportswearbe.entities.Order;
import com.ute.sportswearbe.entities.User;

public interface MailSenderService {

    void sendMailSignup(User user);

    void sendMailNewOrder(User user, Order order);

    void sendMailCallOffOrder(User user, Order order);

    void sendMailChangePassword(User user);

    void sendMailForgotPassword(User user);
}