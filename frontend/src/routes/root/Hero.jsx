const Hero = () => {
    return (
        <>
            <div className="mx-auto w-full max-w-7xl pt-16 pb-20 text-center lg:py-48 lg:text-left">
                <div className="px-6 sm:px-8 lg:w-1/2 xl:pr-16">
                    <p className="mx-auto mt-3 max-w-md text-lg text-primary font-medium md:mt-5 md:max-w-3xl">
                        The new way to discover what's right for you!
                    </p>
                    <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                        <span className="block xl:inline">Making Beauty</span>{' '}
                        <span className="block xl:inline">Accessible Globally</span>
                    </h1>
                    <p className="mx-auto mt-6 max-w-md text-lg font-light sm:text-xl md:mt-6 md:max-w-3xl">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.
                    </p>
                    <div className="mt-12 sm:flex sm:justify-center lg:justify-start">
                        <div className="rounded-md shadow">
                            <a
                                href="#"
                                className="flex w-full items-center justify-center rounded-md border border-black bg-secondary px-8 py-3 text-base font-medium hover:bg-secondary md:py-3 md:px-10 md:text-lg"
                            >
                                EXPLORE
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative h-64 w-full sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2">
                <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src="https://images.pexels.com/photos/853427/pexels-photo-853427.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt=""
                />
            </div>
        </>
    );
}

export default Hero;