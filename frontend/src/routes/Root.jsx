import Header from './root/Header';
import { Outlet } from 'react-router-dom';

const Root = () => {
    return (
        <div className="relative bg-gray-50">
            <Header />

            <main className="lg:relative">
                <Outlet />
            </main>
        </div>
    );
}

export default Root;
