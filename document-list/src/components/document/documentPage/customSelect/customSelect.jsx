import React from 'react';
import {Field} from 'formik'; 

import '../../../../bootatrap.css';

function CustomSelect(props){
    const {name,options,...rest} = props;
    return (
        <div className='form-control'>
            <Field as='select' id={name} name={name} {...rest}>
                {
                    options.map(option => {
                        return(
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





















// import React from 'react';
// import Select from 'react-select';

// const CustomSelect = ({ onChange, options, value}) => {

//     return (
//         <div>
//             <Select
//                 value={value}
//                 onChange={value => {
//                     onChange(value)

//                 }} options={options} />
//         </div>

//     )
// }

// export default CustomSelect;