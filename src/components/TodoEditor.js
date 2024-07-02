import React, { useState, useRef } from "react";
import "./TodoEditor.css";

const TodoEditor = ({ onCreate }) => {
    const [content, setContent] = useState("");
    const inputRef = useRef(null);

    const onChangeContent = (e) => {
        setContent(e.target.value);
    };

    const onSubmit = () => {
        if (!content.trim()) {
            inputRef.current.focus();
        } else {
            onCreate(content.trim());
            setContent("");
        }
    };

    const onKeyDown = (e) => {
        if (e.key === "Enter") {
            onSubmit();
        }
    };

    const handleButtonClick = () => {
        onSubmit();
    };

    return (
        <div className="TodoEditor">
            <h4>새로운 Todo 작성하기 ✏️</h4>
            <div className="editor_wrapper">
                <input
                    ref={inputRef}
                    value={content}
                    onChange={onChangeContent}
                    onKeyDown={onKeyDown}
                    placeholder="새로운 Todo..."
                />
                <button onClick={handleButtonClick}>추가</button>
            </div>
        </div>
    );
};

export default TodoEditor;
