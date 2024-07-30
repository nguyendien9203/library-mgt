import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';

const AuthorsTab = ({ authors }) => {

    const [expanded, setExpanded] = useState({});

    const toggleExpand = (authorId) => {
        setExpanded(prevState => ({
            ...prevState,
            [authorId]: !prevState[authorId]
        }));
    }

    const formatAuthor = (author) => {
        return author.description && author.description.length > 200 ? `${author.description.slice(0, 200)}...` : author.description;
    }

    return (
        <div style={{ margin: '10px 0' }}>
            {authors && authors.length > 0 ? (
                <ListGroup>
                    {authors.map((author) => (
                        <ListGroup.Item key={author.id} style={{ border: 'none', padding: '0', margin: '10px 0' }}>
                            <h6 style={{ marginBottom: '20px' }}>{author.name}</h6>

                            <p style={{ textAlign: 'justify', fontSize: 'small' }}>
                                {expanded[author.id] ? author.description : formatAuthor(author)}
                                {formatAuthor(author) && (
                                    <span
                                        style={{ color: '#F87555', cursor: 'pointer', marginLeft: '5px' }}
                                        onClick={() => toggleExpand(author.id)}
                                    >
                                        {expanded[author.id] ? 'Thu gọn' : 'Xem thêm'}
                                    </span>
                                )}

                            </p>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            ) : (
                <div style={{ fontSize: 'small' }}>Chưa có tác giả nào</div>
            )}
        </div>
    );
};

export default AuthorsTab;
