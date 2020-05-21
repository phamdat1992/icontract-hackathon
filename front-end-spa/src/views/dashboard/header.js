import React from 'react';

function DashboardHeader({ title }) {
    return (
        <div className="content-header">
            <h3 className="title">{title}</h3>
            <div className="user">
                <div className="user-info">
                    <span className="avatar">
                        <i className="icontract-user"></i>
                    </span>
                    Đạt Nguyễn
                </div>
            </div>
            <div className="filter">
                <div className="filter-by">
                    <span>Được lọc bởi:</span> 01 ngày trước
                </div>
                <div className="filter-actions">
                    <div className="input-group">
                        <input type="email" className="form-control" placeholder="Tìm kiếm hợp đồng" />
                        <div className="input-group-append">
                            <button className="btn btn-light-2 border">
                                Tìm kiếm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardHeader;