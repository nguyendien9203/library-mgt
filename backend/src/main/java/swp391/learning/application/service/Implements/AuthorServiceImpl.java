package swp391.learning.application.service.Implements;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import swp391.learning.application.service.AuthorService;
import swp391.learning.domain.dto.request.admin.author.AuthorRequest;
import swp391.learning.domain.dto.response.admin.author.AuthorResponse;
import swp391.learning.domain.entity.Author;
import swp391.learning.domain.entity.User;
import swp391.learning.exception.DuplicateResourceException;
import swp391.learning.exception.ResourceNotFoundException;
import swp391.learning.repository.AuthorRepository;
import swp391.learning.repository.UserRepository;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Slf4j
public class AuthorServiceImpl implements AuthorService {


    private final AuthorRepository authorRepository;

    private final UserRepository userRepository;

    @Override
    public void addAuthor(AuthorRequest addAuthorRequest) {
        log.info("Adding author with name: {} and userId: {}", addAuthorRequest.getName(), addAuthorRequest.getUserId());

        User user = userRepository.findById(addAuthorRequest.getUserId());
        if (user == null) {
            log.info("User with id {} not found", addAuthorRequest.getUserId());
            throw new ResourceNotFoundException("Người dùng không tồn tại");
        }

        Author author = authorRepository.findAuthorByName(addAuthorRequest.getName());
        if (author != null) {
            log.error("Add Author failed: Author is existed");
            throw new DuplicateResourceException("Tác giả đã tồn tại");
        }

        Author newAuthor = new Author();
        newAuthor.setName(addAuthorRequest.getName());
        newAuthor.setDesc(addAuthorRequest.getDescription());
        newAuthor.setCreatedBy(user);
        newAuthor.setUpdatedBy(user);

        authorRepository.save(newAuthor);
        log.info("Author {} added successfully", newAuthor.getName());
    }

    @Override
    public void updateAuthor(int id, AuthorRequest updateAuthorRequest) {
        log.info("Updating author with id: {} and userId: {}", id, updateAuthorRequest.getUserId());

        Author author = authorRepository.findById(id);
        if (author == null) {
            log.info("Author with id {} not found", id);
            throw new ResourceNotFoundException("Tác giả không tồn tại");
        }

        User user = userRepository.findById(updateAuthorRequest.getUserId());
        if (user == null) {
            log.info("User with id {} not found", updateAuthorRequest.getUserId());
            throw new ResourceNotFoundException("Người dùng không tồn tại");
        }

        Author existedAuthor = authorRepository.findAuthorByName(updateAuthorRequest.getName());
        if (existedAuthor != null) {
            log.error("Add Author failed: Author is existed");
            throw new DuplicateResourceException("Tác giả đã tồn tại");
        }

        author.setName(updateAuthorRequest.getName());
        author.setDesc(updateAuthorRequest.getDescription());
        author.setUpdatedBy(user);

        authorRepository.save(author);
        log.info("Author {} updated successfully", author.getName());
    }

    @Override
    public void deleteAuthor(int id) {
        log.info("Deleting author with id: {}", id);
        Author author = authorRepository.findById(id);
        if (author == null) {
            log.info("Author with id {} not found", id);
            throw new ResourceNotFoundException("Tác giả không tồn tại");
        }

        authorRepository.delete(author);
        log.info("Author {} deleted successfully", author.getName());
    }

    @Override
    public List<AuthorResponse> findAllAuthor() {
        log.info("Getting all authors");
        List<Author> authors = authorRepository.findAll();

        List<AuthorResponse> authorResponses = authors.stream()
                .map(this::mapToAuthorResponse)
                .collect(Collectors.toList());

        log.info("Found {} authors", authors.size());
        return authorResponses;
    }

    public AuthorResponse getAuthorById(int id) {
        log.info("Getting author with id: {}", id);
        Author author = authorRepository.findById(id);
        if (author == null) {
            log.info("Author with id {} not found", id);
            throw new ResourceNotFoundException("Tác giả không tồn tại");
        }

        return mapToAuthorResponse(author);
    }

    private AuthorResponse mapToAuthorResponse(Author author) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime = author.getUpdatedAt().format(formatter);

        return AuthorResponse.builder()
                .id(author.getId())
                .userId(author.getCreatedBy().getId())
                .name(author.getName())
                .description(author.getDesc())
                .updatedBy(author.getUpdatedBy().getFullName())
                .updatedAt(formattedDateTime)
                .build();
    }


}
