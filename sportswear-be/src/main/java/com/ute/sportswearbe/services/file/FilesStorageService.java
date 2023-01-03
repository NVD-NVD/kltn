package com.ute.sportswearbe.services.file;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Path;
import java.util.List;
import java.util.stream.Stream;

public interface FilesStorageService {

    String uploadFile(MultipartFile files, String directory, String fileName);

    List<String> uploadFiles(MultipartFile[] files, String directory, String fileName);

    Resource loadFile(String filePath);

    List<String> getFileName();
}
