package swp391.learning.application.service;

import swp391.learning.domain.dto.request.admin.author.AuthorRequest;
import swp391.learning.domain.dto.response.admin.author.AuthorResponse;

import java.util.List;


public interface AuthorService {
    void addAuthor(AuthorRequest addAuthorRequest);

    void updateAuthor(int id, AuthorRequest updateAuthorRequest);

    void deleteAuthor(int id);

    List<AuthorResponse> findAllAuthor();

    AuthorResponse getAuthorById(int id);

}
