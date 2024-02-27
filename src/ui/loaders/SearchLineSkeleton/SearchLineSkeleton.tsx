import React from 'react';
import classes from "./SearchLineSkeleton.module.scss";

const SearchLineSkeleton = () => {
    return (
        <div className={classes.container}>
            <div className={classes.skeletonSearch}/>
        </div>
    );
};

export default SearchLineSkeleton;