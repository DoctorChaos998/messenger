import React, {ButtonHTMLAttributes, FC} from 'react';
import classes from "./FormButton.module.scss";

interface IFormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    text: string
}
const FormButton: FC<IFormButtonProps> = ({text, disabled, ...props}) => {
    return (
        <button {...props} disabled={disabled} className={`${disabled?classes.buttonInactive:classes.button}`}>
            {text}
        </button>
    );
};

export default FormButton;