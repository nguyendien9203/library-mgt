import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BookCard = ({ bookId, imageUrl, mode, title, authors, publicationYear, rating, cardWidth, cardPadding }) => {

    const truncateValue = (value, maxLength) => {
        if (value.length > maxLength) {
            return value.substring(0, maxLength) + '...';
        }
        return value;
    };

    const formatAuthorsAndYear = (authors, publicationYear) => {
        if (!authors) return '';

        const authorNames = authors.map(author => author.name);
        const authorString = authorNames.join(', ');
        return `${authorString}, ${publicationYear}`;
    };



    const cardContent = (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                backgroundColor: '#fff',
                padding: cardPadding,
                borderRadius: '5px',
                width: cardWidth,
                height: '100%'
            }}
        >
            <Card
                style={{
                    border: 'none',
                    borderRadius: 'none'
                }}
            >
                {mode === 'imageShow' && (
                    <Card.Img
                        variant="top"
                        src={imageUrl}
                        style={{
                            borderRadius: '5px'
                        }}
                    />
                )}

                {mode === 'info' && (
                    <>
                        <Card.Img
                            src={imageUrl ? imageUrl : 'https://via.placeholder.com/150'}
                            style={{
                                borderRadius: '5px',
                                height: '8rem',
                                objectFit: 'contain'
                            }}
                        />
                        <Card.Body className="text-left" style={{ padding: '10px 0 0 0' }}>
                            <Card.Text className="text-left">
                                <div style={{ fontSize: 'small', margin: '0' }}>{truncateValue(title, 15)}</div>
                                <div style={{ fontSize: 'x-small', margin: '0' }}>{truncateValue(formatAuthorsAndYear(authors, publicationYear), 20)}</div>
                                <div style={{ fontSize: 'x-small', margin: '0' }}>{rating}/5</div>
                            </Card.Text>
                        </Card.Body>
                    </>
                )}
            </Card>
        </div>
    );

    return (
        mode === 'info' ? <Link to={`/book/detail/${bookId}`} style={{ textDecoration: 'none', color: 'inherit' }}>{cardContent}</Link> : cardContent
    );
};

export default BookCard;
