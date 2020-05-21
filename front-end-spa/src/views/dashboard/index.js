import React from 'react';
import Sidebar from './sidebar';
import Header from './header';

function Dashboard() {
    return (
        <main className="dashboard">
            <Sidebar />
            <div className="content">
                <Header title='Hợp đồng' />
            </div>
        </main>
    );
}

export default Dashboard;