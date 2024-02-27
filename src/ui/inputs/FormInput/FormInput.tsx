import React, {FC, InputHTMLAttributes} from 'react';
import classes from "./FormInput.module.scss";
import {useAppSelector} from "@/lib/hooks";
interface IFormInputProps extends InputHTMLAttributes<HTMLInputElement>{
    withIcon: boolean,
    icon?: string
}
const FormInput: FC<IFormInputProps> = ({withIcon, icon, ...props}) => {
    return (
        <label className={classes.container}>
            {withIcon &&
                <span className={`material-icons `}>
                    {icon}
                </span>
            }
            <input className={classes.input} {...props}/>
        </label>
    );
};

export default FormInput;