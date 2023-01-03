package com.ute.sportswearbe.services.cloudinary;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CloudinaryService {
    String uploadFile(MultipartFile file);

    List<String> uploadListImages(MultipartFile[] images);
}
