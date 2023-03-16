import { useState } from 'react';
import Select from '../../../components/Select';

const brandOptions = [
    {
        name: "All",
        value: "*"
    },
    {
        name: "Aveda",
        value: "Aveda"
    },
    {
        name: "Jo Malone",
        value: "Jo Malone"
    },
    {
        name: "MAC",
        value: "MAC"
    },
    {
        name: "Origins",
        value: "Origins"
    }
];

const featureOptions = [
    {
        name: "Any",
        value: "*"
    },
    {
        name: "Accessible Parking",
        value: "Accessible parking"
    },
    {
        name: "Accessible Restroom",
        value: "Accessible restroom"
    },
    {
        name: "Assistive Listening System",
        value: "Assistive listening system"
    },
    {
        name: "Braille",
        value: "Braille"
    },
    {
        name: "Elevator Access",
        value: "Elevator access"
    },
    {
        name: "Sign Language",
        value: "Sign language"
    },
    {
        name: "Text-to-Speech Software",
        value: "Text-to-speech software"
    },
    {
        name: "Wheelchair Accessible",
        value: "Wheelchair accessible"
    }
];

const Filters = (props) => {

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        props.setFilters((prevalue) => {
            return {
                ...prevalue,
                [name]: value
            }
        });
    };

    return (
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4 lg:gap-8">
            <Select id="brand" name="Brand" handler={handleChange} options={brandOptions} defaultValue="*" />
            <Select id="features" name="Accessibility Features" handler={handleChange} options={featureOptions} defaultValue="*" />
        </div>
    );
};

export default Filters;