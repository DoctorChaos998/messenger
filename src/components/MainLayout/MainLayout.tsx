import React, {FC, PropsWithChildren} from 'react';
import classes from "./MainLayout.module.scss";

const MainLayout: FC<PropsWithChildren> = ({children}) => {
    return (
            <main className={classes.main}>
                {children}
            </main>
    );
};

export default MainLayout;