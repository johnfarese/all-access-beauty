const Filters = () => {
    return (
        <div x-data="multiselect" >
            <select multiple>
                {/* <optgroup label="Names"> */}
                <option value="John">John</option>
                <option value="Peter">Peter</option>
                <option value="Jane">Jane</option>
                {/* </optgroup> */}
            </select>
        </div >
    );
};

export default Filters;