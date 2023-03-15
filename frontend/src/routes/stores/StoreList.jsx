import mac from '../../img/mac.jpg';
import origins from '../../img/origins.jpg';
import AccessibleFeatures from './storeList/AccessibleFeatures';

const imageMap = {
    'mac': mac,
    'origins': origins,
};

const StoreList = (props) => {

    const stores = props.stores;
    console.log(stores);

    return (
        <ul
            role="list"
            className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8"
        >
            {stores.map((store) => (
                <li key={store.store_id} className="rounded-2xl bg-white border border-gray-200 py-10 px-8">
                    <img className="mx-auto h-48 w-48 rounded-md md:h-56 md:w-56" src={imageMap[store.brand]} alt="" />
                    <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight">{store.store_name}</h3>
                    <p className="text-sm leading-6 text-gray-400">{`${store.address.city}, ${store.address.state}`}</p>
                    <AccessibleFeatures features={store.accessibility_features} />
                </li>
            ))}
        </ul>
    );
};

export default StoreList;