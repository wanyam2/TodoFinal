import { useState } from "react";
import TodoItem from './TodoItem';
import "./TodoList.css";

const TodoList = ({ todos = [], onUpdate, onDelete }) => {
    const [search, setSearch] = useState("");

    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleSearch = () => {
        const searchResult = getSearchResult();
        console.log("검색 결과:", searchResult);
    };

    const getSearchResult = () => {
        return search === ""
            ? todos
            : todos.filter((it) =>
                it.content && it.content.toLowerCase().includes(search.toLowerCase())
            );
    };

    return (
        <div className="TodoList">
            <div className="search">
                <input
                    value={search}
                    onChange={onChangeSearch}
                    className="searchbar"
                    placeholder="검색어를 입력하세요"
                />
                <button onClick={handleSearch} className="searchButton">
                    🔍
                </button>
            </div>
            <div className="list_wrapper">
                {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        id={todo.id}
                        content={todo.content}
                        isDone={todo.isDone}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                    />
                    ))}
            </div>
        </div>
    );
};

export default TodoList;
