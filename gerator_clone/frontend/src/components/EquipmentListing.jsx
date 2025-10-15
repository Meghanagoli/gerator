import React from 'react';
import './EquipmentListing.css';

const EquipmentListing = ({ devices }) => {
    if (!devices || devices.length === 0) {
        return <p>No devices found.</p>;
    }

    // Helper to format price with commas
    const formatPrice = (price) => {
        if (!price) return '';
        return '$' + Number(price).toLocaleString();
    };

    // Helper to format date
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateStr).toLocaleDateString(undefined, options);
    };

    return (
        <>
            {devices.map((device) => (
                <div key={device.id} className="equipment-listing">
                    <div className="listing-content">
                        <div className="listing-image">
                            <img
                                src="https://s3.us-east-2.amazonaws.com/asset.gerator/images/1756187672337-IGUL1MJseR.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAZMT7BJM2SERREFR7%2F20251013%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20251013T144129Z&X-Amz-Expires=604800&X-Amz-Signature=b892b91ec2998983729f4409aa97a2d8179383ea0e192cbabfdc002c74c7efd8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject"
                                alt={device.title}
                                referrerPolicy="no-referrer"
                            />
                        </div>

                        <div className="listing-details">
                            <div className="listing-header">
                                <h2 className="listing-title">{device.title}</h2>
                                <div className="listing-price-section">
                                    {device.transaction_type && (
                                        <span className="sale-badge">{device.transaction_type}</span>
                                    )}

                                    <div className="price-info">
                                        <span className="price">
                                            {formatPrice(device.price)}
                                        </span>
                                        <span className="currency">
                                            {device.currency || 'USD'} - Per Unit
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="listing-meta">
                                {device.post_status && (
                                    <span className="status-badge">{device.post_status}</span>
                                )}
                                <div className="id-date">
                                    <span className="listing-id">ID# {device.id}</span>

                                </div>
                                <div className="location-date">
                                    <svg
                                        className="location-icon"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                    <span>{device.location}</span>
                                </div>
                                <span className="published-date">
                                    <svg
                                        className="calendar-icon"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                    <span>{formatDate(device.post_publish_date)}</span>
                                </span>
                            </div>

                            <div className="listing-tags">
                                {device.tags &&
                                    device.tags.split(',').map((tag, index) => (
                                        <span key={index} className="tag">
                                            {tag.trim()}
                                        </span>
                                    ))}
                            </div>
                        </div>
                    </div>

                    <div className="seller-info">
                        <div className="seller-details">
                            <div className="seller-name">{device.seller_name}</div>
                            <div className="seller-company">{device.seller_role}</div>
                        </div>
                        <div className="seller-actions">
                            <svg
                                className="external-link-icon"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15,3 21,3 21,9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default EquipmentListing;
