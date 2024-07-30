import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/style/UsageItemComponent.css';

const UsageItemComponent = ({ title, value, icon, link }) => {
    return (
        <Link to={link} className="usage-item">
            <div className="usage-item-content">
                <i className={`bi ${icon} usage-item-icon`}></i>
                <div className="usage-item-details">
                    <p className="usage-item-value">{value}</p>
                    <h3 className="usage-item-title">{title}</h3>
                </div>
            </div>
        </Link>
    );
};

export default UsageItemComponent;
