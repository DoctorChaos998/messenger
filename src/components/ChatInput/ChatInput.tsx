import React, {useState} from 'react';
import classes from "./ChatInput.module.scss";

const ChatInput = () => {
    const [text, setText] = useState('');
    const handleSendMessage = () => {

    }
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
        event.target.style.height = 'auto';
        event.target.style.height = event.target.scrollHeight + 'px';
    };
    return (
        <div className={classes.container}>
            <textarea placeholder={'Write message...'} className={classes.textInput} value={text} onChange={handleChange}/>
            <button className={classes.button} onClick={handleSendMessage}>
                <span className={`material-icons ${classes.icon}`}>
                    send
                </span>
            </button>
        </div>
    );
};

export default ChatInput;