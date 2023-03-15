import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import StoreList from './stores/StoreList';

export const getStores = async () => {
    const response = await fetch('data/stores.json', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    return response.json();
};

const Stores = () => {

    const { stores } = useLoaderData();

    return (
        <div className="bg-gray-50 py-12 min-h-screen">
            <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
                <div className="mx-auto max-w-2xl">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Search Results</h2>
                    <p className="mt-4 text-lg leading-8 font-light">
                        Results based on your location
                    </p>
                </div>
                <StoreList stores={stores} />
            </div>
        </div>
    );
};

export default Stores;