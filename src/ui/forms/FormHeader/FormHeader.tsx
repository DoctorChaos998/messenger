import React, {FC} from 'react';
import classes from "./FormHeader.module.scss";

interface IFormHeaderProps{
    text: string
}
const FormHeader: FC<IFormHeaderProps> = ({text}) => {
    return (
        <h2 className={classes.header}>
            {text}
        </h2>
    );
};

export default FormHeader;