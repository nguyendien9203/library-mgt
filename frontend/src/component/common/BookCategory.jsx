import React, { useState, useEffect } from 'react';
import CustomSelect from './CustomSelect';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategories } from '../../service/CategoryService';
import { getAllBooksBySubCategory, getBookImage, getBooksByCategory } from '../../service/BookService';
import BookCardList from './BookCardList';
import BookAll from './BookAll';

const BookCategory = () => {
    const navigate = useNavigate();
    const { parentCategoryId, subCategoryId } = useParams();
    const [parentCategory, setParentCategory] = useState(null);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(subCategoryId || '');
    const [subCategoryBooks, setSubCategoryBooks] = useState([]);
    const [bookCategory, setBookCategory] = useState([]);

    useEffect(() => {
        const fetchCategoryDetails = async () => {
            try {
                const response = await getCategories();

                if (response.status === 200) {
                    const categories = response.data;
                    const parent = categories.find(category => category.id === parseInt(parentCategoryId));

                    if (parent) {
                        setParentCategory(parent);

                        const subCats = categories.filter(category => category.parentId === parent.id);
                        setSubCategories(subCats);

                        if (subCategoryId) {
                            setSelectedSubCategoryId(parseInt(subCategoryId));
                        }
                    }
                } else {
                    console.error('Failed to fetch categories');
                }
            } catch (error) {
                console.error('Error fetching category details:', error);
            }
        };

        fetchCategoryDetails();
    }, [parentCategoryId, subCategoryId]);

    const handleChange = (selectedValue) => {
        const selectedSubCategoryId = selectedValue.target.value;
        setSelectedSubCategoryId(selectedSubCategoryId);
        if (selectedSubCategoryId) {
            const url = `/book/category/${parentCategoryId}/${selectedSubCategoryId}`;
            navigate(url);
        } else {
            const url = `/book/category/${parentCategoryId}`;
            navigate(url);
        }
    };

    useEffect(() => {
        const fetchSubCategoryBooks = async () => {
            try {
                const response = await getAllBooksBySubCategory(parentCategoryId);

                if (response.status === 200) {
                    const subCategoryBooksWithImage = await Promise.all(
                        response.data.map(async subCategoryBook => {
                            const booksWithImage = await Promise.all(
                                subCategoryBook.books.map(async book => {
                                    const imageResponse = await getBookImage(book.id);
                                    if (imageResponse.status === 200) {
                                        const contentDisposition = imageResponse.headers['content-disposition'];
                                        let fileName = 'unknown';
                                        if (contentDisposition) {
                                            const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
                                            if (fileNameMatch.length === 2) {
                                                fileName = fileNameMatch[1];
                                            }
                                        }
                                        const file = new File([imageResponse.data], fileName, { type: imageResponse.data.type });
                                        const imageUrl = URL.createObjectURL(file);
                                        return { ...book, imageUrl };
                                    } else {
                                        return { ...book, imageUrl: null };
                                    }
                                })
                            );

                            if (booksWithImage.length > 0) {
                                return { ...subCategoryBook, books: booksWithImage };
                            } else {
                                return null;
                            }
                        })
                    );

                    const filteredSubCategoryBooks = subCategoryBooksWithImage.filter(item => item !== null);

                    setSubCategoryBooks(filteredSubCategoryBooks);
                } else {
                    console.error('Failed to fetch sub category books');
                }
            } catch (error) {
                console.error('Error fetching sub category books:', error);
            }
        };

        fetchSubCategoryBooks();
    }, [parentCategoryId]);

    useEffect(() => {
        const fetchBooksByCategory = async () => {
            try {
                const response = await getBooksByCategory(subCategoryId);

                if (response.status === 200) {
                    const bookWithImage = await Promise.all(
                        response.data.map(async book => {
                            const imageResponse = await getBookImage(book.id);
                            if (imageResponse.status === 200) {
                                const contentDisposition = imageResponse.headers['content-disposition'];
                                let fileName = 'unknown';
                                if (contentDisposition) {
                                    const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
                                    if (fileNameMatch.length === 2) {
                                        fileName = fileNameMatch[1];
                                    }
                                }
                                const file = new File([imageResponse.data], fileName, { type: imageResponse.data.type });
                                const imageUrl = URL.createObjectURL(file);
                                return { ...book, imageUrl };
                            } else {
                                return { ...book, imageUrl: null };
                            }
                        })
                    );

                    setBookCategory(bookWithImage);
                } else {
                    console.error('Failed to fetch books by category');
                }
            } catch (error) {
                console.error('Error fetching books by category:', error);
            }
        };

        fetchBooksByCategory();
    }, [subCategoryId]);

    console.log('subCategoryBooks:', subCategoryBooks);
    console.log('bookCategory:', bookCategory);

    return (
        <>
            {parentCategory && (
                <div className='d-flex justify-content-flex-start align-items-center mb-4'>
                    <h5>{parentCategory.name}</h5>
                    <i className="bi bi-chevron-right m-2"></i>
                    <div style={{ width: '200px' }} >
                        <CustomSelect
                            name="subCategoryId"
                            value={selectedSubCategoryId}
                            onChange={handleChange}
                            placeholder="Chọn thể loại"
                            data={subCategories}
                            valueType="id"
                        />
                    </div>
                </div>
            )}

            {selectedSubCategoryId ? (
                bookCategory.length > 0 && (
                    <BookAll title="Tất cả các sách" books={bookCategory} />
                )
            ) : (
                subCategoryBooks.map(subCategory => (
                    <BookCardList key={subCategory.subCategoryName} title={subCategory.subCategoryName} books={subCategory.books} />
                ))
            )}
        </>
    )
};

export default BookCategory;
