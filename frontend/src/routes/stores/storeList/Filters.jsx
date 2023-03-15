import Select from '../../../components/Select';

const brandOptions = [
    {
        name: "All",
        value: "*"
    },
    {
        name: "Aveda",
        value: "aveda"
    },
    {
        name: "Jo Malone",
        value: "jomalone"
    },
    {
        name: "MAC",
        value: "mac"
    },
    {
        name: "Origins",
        value: "origins"
    }
];

const Filters = () => {
    return (
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4 lg:gap-8">
            <Select id="brand" name="Brand" options={brandOptions} defaultValue="*" />
        </div>
    );
};

export default Filters;