import React from 'react';
import { Field } from 'formik';

import '../../../../bootatrap.css';

function CustomSelect(props) {
    const { name, options, value, ...rest } = props;
    return (
        <div>
            <Field as='select' id={name} name={name}  className='form-control' {...rest}>
                {
                    options.map(option => {
                        return (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        );
                    })
                }
            </Field>
        </div>
    );
}

export default CustomSelect;


















