import React from 'react';
import Sidebar from './sidebar';
import Header from './header';

function Dashboard() {
    return (
        <main class="dashboard">
            <Sidebar />
            <div class="content">
                <Header title='Hợp đồng' />

            </div>
        </main>
    );
}

export default Dashboard;