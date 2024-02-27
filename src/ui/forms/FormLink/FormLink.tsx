import React, {FC} from 'react';
import classes from "./FormLink.module.scss";
import Link from "next/link";
interface IFormLinkProps{
    text: string,
    linkText: string,
    link: string
}
const FormLink: FC<IFormLinkProps> = ({text, linkText, link}) => {
    return (
        <span className={classes.container}>
            {text}
            <Link className={classes.link} href={link}>
                {linkText}
            </Link>
        </span>
    );
};

export default FormLink;