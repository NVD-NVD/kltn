package com.ute.sportswearbe.services.file;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.IIOException;
import java.io.IOException;

import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Slf4j
@Service
public class FilesStorageServiceImpl implements FilesStorageService {
    @Value("${upload.path}")
    private String uploadFolder;

    private final String currentDirectory = System.getProperty("user.dir");

    @Override
    public String uploadFile(MultipartFile file, String directory, String id) {
        String part = currentDirectory + uploadFolder + directory;
        Path uploadPart = Paths.get(part);
        try {
            if (!Files.exists(uploadPart)) {
                Files.createDirectories(uploadPart);
            }
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            fileName = id + "_" + new Date().getTime() + fileName.substring(fileName.lastIndexOf("."));
            Files.copy(file.getInputStream(), uploadPart.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);
            return directory+ "/" + fileName;
        } catch (Exception e) {
            throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
        }
    }

    @Override
    public List<String> uploadFiles(MultipartFile[] files, String directory, String id) {
        List<String> list = new ArrayList<>();
        for (int i = 0; i < files.length; i++) {
            list.add(i, uploadFile(files[i], directory, id+"_"+i));
        }
        return list;
    }

    @Override
    public Resource loadFile(String filePath) {
        try {
            String uri = currentDirectory + uploadFolder + filePath;
            System.out.println(uri);
            Path path = Paths.get(uri);
            Resource resource = new UrlResource(path.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @Override
    public List<String> getFileName() {
        String dir  = currentDirectory + uploadFolder + "products";
        List<String> listFileName = new ArrayList<>();
        try {
            listFileName = listFilesUsingFilesList(dir);
        }
        catch (IOException ex){
        }
        return listFileName;
    }
    private List<String> listFilesUsingFilesList(String dir) throws IOException {
        try (Stream<Path> stream = Files.list(Paths.get(dir))) {
            return stream
                    .filter(file -> !Files.isDirectory(file))
                    .map(Path::getFileName)
                    .map(Path::toString)
                    .collect(Collectors.toList());
        }
    }
}
