import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "../../assets/style/CategoryMenu.css"; // Ensure your CSS file is correctly imported
import { getCategories } from "../../service/CategoryService";

const CategoryMenu = () => {
    const [parentCategories, setParentCategories] = useState([]);
    const [subCategories, setSubCategories] = useState({});

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();

                if (response.status === 200) {
                    const categories = response.data;

                    const parentCategories = categories.filter(
                        (category) => category.parentId === 0
                    );
                    const subCategories = categories.reduce((acc, category) => {
                        if (category.parentId !== 0) {
                            if (!acc[category.parentId]) {
                                acc[category.parentId] = [];
                            }
                            acc[category.parentId].push(category);
                        }
                        return acc;
                    }, {});

                    setParentCategories(parentCategories);
                    setSubCategories(subCategories);
                } else {
                    console.error(response.message);
                }
            } catch (error) {
                console.error("Lỗi khi lấy danh sách danh mục:", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <Nav className="category-menu d-flex justify-content-between">
            {parentCategories.map((parentCategory) => (
                <div key={parentCategory.id} className="nav-item dropdown">
                    <Nav.Link
                        as={Link}
                        to={`/book/category/${parentCategory.id}`}
                        className="nav-link"
                        style={{
                            border: "none",
                            color: "#000",
                            fontSize: "small",
                            height: "35px",
                            backgroundColor: "#fff"
                        }}
                    >
                        {parentCategory.name}
                    </Nav.Link>
                    <div className="dropdown-menu"
                        style={{
                            fontSize: "small",
                            borderRadius: "5px",
                            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                            border: "1px solid #DEDEE1",
                            color: "#000",
                            backgroundColor: "#fff",
                        }}
                    >
                        {subCategories[parentCategory.id]?.map((subCategory) => (
                            <Nav.Link
                                as={Link}
                                key={subCategory.id}
                                className="dropdown-item"
                                to={`/book/category/${parentCategory.id}/${subCategory.id}`}
                            >
                                {subCategory.name}
                            </Nav.Link>
                        ))}
                    </div>
                </div>
            ))}
        </Nav>
    );
};

export default CategoryMenu;
