package com.ute.sportswearbe.services.mail;

import com.ute.sportswearbe.entities.Order;
import com.ute.sportswearbe.entities.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class MailSenderServiceImpl implements MailSenderService{
    @Override
    public void sendMailSignup(User user) {

    }

    @Override
    public void sendMailNewOrder(User user, Order order) {

    }

    @Override
    public void sendMailCallOffOrder(User user, Order order) {

    }

    @Override
    public void sendMailChangePassword(User user) {

    }

    @Override
    public void sendMailForgotPassword(User user) {

    }
}
