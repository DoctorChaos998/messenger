import React, {useState} from 'react';
import classes from "./ChatsSearcher.module.scss";

const ChatsSearcher = () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className={classes.container}>
            <label className={classes.label}>
                <span className="material-icons">
                    search
                </span>
                <input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)}/>
            </label>
        </div>
    );
};

export default ChatsSearcher;