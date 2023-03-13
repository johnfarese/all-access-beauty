import Header from './root/Header';
import Hero from './root/Hero';

const Root = () => {
    return (
        <div className="relative bg-gray-50">
            <Header />

            <main className="lg:relative">
                <Hero />
            </main>
        </div>
    );
}

export default Root;
