import React from 'react';
import {Field,ErrorMessage} from 'formik'; 

function CustomSelect(props){
    const {lable,name,options,...rest} = props;
    return (
        <div className='form-control'>
            <lable htmlFor={name}>{lable}</lable>
            <Field as='select' id={name} name={name} {...rest}>
                {
                    options.map(option => {
                        return(
                            <option key={option.value} value={option.value}>
                                {option.lable}
                            </option>
                        );
                    })
                }
            </Field>
            <ErrorMessage name={name} component='div' className='alert alert-warning'/>
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