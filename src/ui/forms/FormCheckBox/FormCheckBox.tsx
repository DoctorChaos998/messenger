import React, {FC, InputHTMLAttributes} from 'react';
import classes from "./FormCheckBox.module.scss";

interface IFormCheckBoxProps extends InputHTMLAttributes<HTMLInputElement>{
    text: string
}
const FormCheckBox: FC<IFormCheckBoxProps> = ({text, ...props}) => {
    return (
        <span className={classes.container}>
            {text}
            <input {...props}/>
        </span>
    );
};

export default FormCheckBox;