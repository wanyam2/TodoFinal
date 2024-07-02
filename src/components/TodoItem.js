import "./TodoItem.css";
import React from "react";
import { FaTrash } from "react-icons/fa";

const TodoItem = ({ id, content, isDone, onUpdate, onDelete }) => {
    const handleUpdate = () => {
        onUpdate(id);
    };

    const handleDelete = () => {
        onDelete(id);
    };

    return (
        <div className="TodoItem">
            <div className="btn_col">
                <button></button>
            </div>
            <div className="title_col">{content}</div>
            <div className="delete_col">
                <FaTrash onClick={handleDelete}></FaTrash>
            </div>
            <div className="checkbox_col">
                <input checked={isDone} type="checkbox" onChange={handleUpdate} />
            </div>
        </div>
    );
};

export default TodoItem;


