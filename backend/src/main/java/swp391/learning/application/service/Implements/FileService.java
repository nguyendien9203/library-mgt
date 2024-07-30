package swp391.learning.application.service.Implements;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import swp391.learning.exception.ResourceNotFoundException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@Slf4j
public class FileService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    public String saveImage(MultipartFile file, String folderName) {
        try {
            log.info("Starting to save image...");

            // Đường dẫn đầy đủ của thư mục lưu trữ file
            Path uploadDirectory = Paths.get(uploadDir, folderName);

            if (!Files.exists(uploadDirectory)) {
                log.info("Creating directory: " + uploadDirectory.toString());
                Files.createDirectories(uploadDirectory);
            }

            // Lấy tên file gốc
            String fileName = file.getOriginalFilename();
            String fileExtension = fileName.substring(fileName.lastIndexOf("."));
            String newFileName = System.currentTimeMillis() + fileExtension;
            Path filePath = uploadDirectory.resolve(newFileName);

            // Lưu file vào thư mục
            Files.copy(file.getInputStream(), filePath);

            log.info("File saved at: " + filePath.toString());

            return newFileName;
        } catch (IOException e) {
            throw new RuntimeException("Could not store file " + file.getOriginalFilename(), e);
        }
    }

    public Resource getImage(String folderName, String fileName) {
        try {
            // Đường dẫn đầy đủ của thư mục lưu trữ file
            Path uploadDirectory = Paths.get(uploadDir, folderName);

            // Đường dẫn đầy đủ của file
            Path filePath = uploadDirectory.resolve(fileName).normalize();

            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists()) {
                log.info("File found: " + resource);
                return resource;
            } else {
                throw new ResourceNotFoundException("File not found: " + fileName);
            }
        } catch (IOException e) {
            throw new RuntimeException("File not found: " + fileName, e);
        }
    }

    public void deleteImage(String folderName, String fileName) {
        try {
            // Đường dẫn đầy đủ của thư mục lưu trữ file
            Path uploadDirectory = Paths.get(uploadDir, folderName);

            // Đường dẫn đầy đủ của file
            Path filePath = uploadDirectory.resolve(fileName).normalize();

            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists()) {
                // Xóa file
                Files.delete(filePath);
                log.info("File deleted: " + fileName);
            } else {
                throw new ResourceNotFoundException("File not found: " + fileName);
            }
        } catch (IOException e) {
            throw new RuntimeException("Could not delete file: " + fileName, e);
        }
    }

}
