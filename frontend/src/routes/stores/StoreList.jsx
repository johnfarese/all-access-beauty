import { useState, useEffect } from 'react';
import mac from '../../img/mac.jpg';
import origins from '../../img/origins.jpg';
import aveda from '../../img/aveda.png';
import jomalone from '../../img/jomalone.jpg';
import bobbibrown from '../../img/bobbibrown.png';
import { sortObject } from '../../utils/sortObject';
import Filters from './storeList/Filters';
import AccessibleFeatures from './storeList/AccessibleFeatures';

const imageMap = {
    'MAC': mac,
    'Origins': origins,
    'Aveda': aveda,
    'Jo Malone': jomalone,
    'Bobbi Brown': bobbibrown,
};

const StoreList = (props) => {

    const [filters, setFilters] = useState({
        brand: '*',
        features: '*'
    });

    const stores = props.stores;
    const storesSorted = sortObject(stores, "distance");

    const checkVisibility = (store) => {
        console.log(store);
        if (
            (filters.brand === "*" || filters.brand === store.brand)
            &&
            (filters.features === "*" || store.accessibility_features.some(e => e.feature_name === filters.features))
        ) {
            console.log(true);
            return true;
        }
        console.log(false);
        return false;
    };

    return (
        <>
            <Filters setFilters={setFilters} className="mt-10" />
            <ul
                role="list"
                className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8"
            >
                {storesSorted.map((store) => (
                    <li key={store.store_id} className={"rounded-2xl bg-white border border-gray-200 py-10 px-8 " + (checkVisibility(store) ? 'visible' : 'hidden')}>
                        <img className="mx-auto h-48 w-48 rounded-md md:h-56 md:w-56" src={imageMap[store.brand]} alt="" />
                        <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight">{`${store.brand} ${store.store_name}`}</h3>
                        <div className="bg-primary min-w-min w-1/3 px-1 my-2 mx-auto">
                            <h3 className="text-white leading-7 tracking-tight">{`${store.distance >= 10 ? Math.round(store.distance) : Math.round(store.distance * 100) / 100} miles`}</h3>
                        </div>
                        <a href={store.google_link} className="text-sm leading-6 text-gray-400" target="_blank">
                            <span className="block text-sm leading-6 text-gray-400">{`${store.address.street_number} ${store.address.street_name}`}</span>{' '}
                            <span className="block text-sm leading-6 text-gray-400">{`${store.address.city}, ${store.address.state}`}</span>
                        </a>
                        <AccessibleFeatures features={store.accessibility_features} />
                    </li>
                ))}
            </ul>
        </>
    );
};

export default StoreList;