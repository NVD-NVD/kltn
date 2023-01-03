package com.ute.sportswearbe.controllers;

import com.ute.sportswearbe.services.file.FilesStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.data.annotation.AccessType;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@RestController
@RequestMapping("/rest/image")
public class ImageController {
    @Value("${upload.path}")
    private String uploadFolder;

    private final String currentDirectory = System.getProperty("user.dir");
    @Autowired
    private FilesStorageService storageService;
    @GetMapping("/{type}/{filename}")
    public ResponseEntity<?> getImage(
            @PathVariable("type") String type, @PathVariable("filename") String filenam){
        Resource resource = getImageFromLocal(type, filenam);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);
        return new ResponseEntity<>(resource, headers, HttpStatus.OK);
    }

    @GetMapping("/download")
    public void downloadImage(HttpServletResponse response){
        response.setContentType("application/octet-stream");
        response.setHeader("Content-Disposition", "attachment;filename=download.zip");
        response.setStatus(HttpServletResponse.SC_OK);

        List<String> fileNames = storageService.getFileName();

        System.out.println("############# file size ###########" + fileNames.size());
        String dir  = currentDirectory + uploadFolder + "products";

        try (ZipOutputStream zippedOut = new ZipOutputStream(response.getOutputStream())) {
            for (String file : fileNames) {
                FileSystemResource resource = new FileSystemResource(dir+"/"+file);
                ZipEntry e = new ZipEntry(resource.getFilename());
                // Configure the zip entry, the properties of the file
                e.setSize(resource.contentLength());
                e.setTime(System.currentTimeMillis());
                // etc.
                zippedOut.putNextEntry(e);
                // And the content of the resource:
                StreamUtils.copy(resource.getInputStream(), zippedOut);
                zippedOut.closeEntry();
            }
            zippedOut.finish();
        } catch (Exception e) {
            // Exception handling goes here
        }
    }
    private Resource getImageFromLocal(String type, String filename){
        if (type.equals("avatar")){
            return getAvatar(filename);
        }
        if (type.equals("products")){
            return getProduct(filename);
        }
        return null;
    }
    private Resource getAvatar(String filename){
        String filePath = "avatar/" + filename;
        Resource resource = storageService.loadFile(filePath);
        return resource;
    }
    private Resource getProduct(String filename){
        String filePath = "products/" + filename;
        Resource resource = storageService.loadFile(filePath);
        return resource;
    }
}
