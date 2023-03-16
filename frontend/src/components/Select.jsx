const Select = (props) => {

    const getOptions = () => {
        return props.options.map((option) => {
            return <option key={option.value} value={option.value}>{option.name}</option>;
        });
    };

    return (
        <div>
            <label htmlFor={props.id} className="block text-sm text-left font-medium leading-6 text-gray-900">
                {props.name}
            </label>
            <select
                id={props.id}
                name={props.id}
                className="mt-1 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6"
                defaultValue={props.defaultValue}
                onChange={props.handler}
            >
                {getOptions()}
            </select>
        </div>
    );
};

export default Select;