import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    MicrophoneIcon
} from '@heroicons/react/24/solid';
import world from '../img/world.png';
import salon from '../img/salon.png';

const Index = () => {

    const [zip, setZip] = useState("");
    const [zipError, setZipError] = useState(false);

    return (
        <>
            <div className="mx-auto w-full max-w-7xl pt-16 pb-20 text-center lg:py-48 lg:text-left">
                <div className="lg:w-1/2" style={{ backgroundImage: `url(${world})` }}>
                    <div className="px-6 sm:px-8 xl:pr-16">
                        <p className="mx-auto mt-3 max-w-md text-lg text-primary font-medium md:mt-5 md:max-w-3xl">
                            The new way to discover what's right for you!
                        </p>
                        <h1 className="mt-4 text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                            <span className="block xl:inline">Making Beauty</span>{' '}
                            <span className="block xl:inline">Accessible Globally</span>
                        </h1>
                        <p className="mx-auto mt-6 max-w-md text-lg font-light sm:text-xl md:mt-6 md:max-w-3xl">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                        <div className="relative mt-10 rounded-md shadow-sm">
                            <input
                                type="text"
                                name="zip"
                                id="zip"
                                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                placeholder="ZIP Code"
                                aria-invalid="true"
                                aria-describedby="zip-error"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-3"
                            >
                                <MicrophoneIcon className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>
                        {zipError && <p className="mt-2 text-sm text-red-600" id="zip-error">
                            Not a valid ZIP code.
                        </p>}
                        <div className="mt-4 sm:flex sm:justify-center lg:justify-start">
                            <div className="rounded-md shadow">
                                <Link
                                    to="/stores"
                                    className="flex w-full items-center justify-center rounded-md border border-black bg-secondary px-8 py-2 text-base font-medium hover:bg-secondary md:py-2 md:px-10 md:text-lg"
                                >
                                    EXPLORE
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative h-64 w-full sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2">
                <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src={salon}
                    alt=""
                />
            </div>
        </>
    );
}

export default Index;