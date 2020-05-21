import React from 'react';

function DashboardSidebar() {
    return (
        <aside className="menu">
            <a href="./create-contract.html" className="btn btn-yellow">
                <i className="icontract-new"></i>
                Tạo mới
            </a>
            <ul className="menu-list">
                <li className="active">
                    <a><i className="icontract-docs"></i>Hợp đồng</a>
                </li>
                <li className="active">
                    <a><i className="icontract-briefcase"></i> Hợp đồng đã ký</a>
                </li>
            </ul>
            <p className="menu-label">Xem nhanh</p>
            <ul className="menu-list">
                <li>
                    <a><i className="icontract-action"></i>Cần ký</a>
                </li>
                <li>
                    <a><i className="icontract-waiting"></i>Đang chờ</a>
                </li>
                <li>
                    <a><i className="icontract-complete"></i>Đã hoàn thành</a>
                </li>
            </ul>
        </aside>
    );
}

export default DashboardSidebar;