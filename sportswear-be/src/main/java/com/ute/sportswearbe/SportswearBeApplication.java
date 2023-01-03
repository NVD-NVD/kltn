package com.ute.sportswearbe;

import com.cloudinary.Cloudinary;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
public class SportswearBeApplication {

    public static void main(String[] args) {
        SpringApplication.run(SportswearBeApplication.class, args);
    }

}
