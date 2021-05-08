import React from 'react';
import Select from 'react-select';

const CustomSelect = ({ onChange, options, value}) => {

    return (
        <div>
            <Select
                value={value}
                onChange={value => {
                    onChange(value)

                }} options={options} />
        </div>

    )
}

export default CustomSelect;