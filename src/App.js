import './App.css';
import Header from "./components/Header";
import TodoEditor from "./components/TodoEditor";
import TodoList from "./components/TodoList";
import {TodoAPI} from "./api/todoApi";
import {useEffect, useRef, useState} from "react";

function App() {
    const [todo, setTodo] = useState([]);
    const idRef = useRef(0);

    // TodoList를 불러오는 비동기 함수
    const loadTodo = async () => {
        try {
            // API 호출을 통해 모든 할 일 목록 가져오기
            const todos = await TodoAPI.getAllTodos();
            const newTodos = todos.map(todo => ({
                id: todo.id,
                content: todo.content,
                // isDone 값을 JSON 문자열에서 boolean으로 변환
                isDone: todo.isDone ? JSON.parse(todo.isDone) : false,
                createdDate: todo.createdDate,
            }));
            // 생성일 기준으로 정렬
            newTodos.sort((a, b) => b.createdDate - a.createdDate);
            // 상태 업데이트
            setTodo(newTodos);
            // 가장 큰 id 값에 1을 더하여 idRef의 현재 값을 설정
            if (todos.length > 0) {
                idRef.current = Math.max(...todos.map(todo => todo.id)) + 1;
            }
        } catch (error) {
            // 오류가 발생 시 로그 출력
            console.error('Failed to load todos:', error);
        }

    }

    // 컴포넌트가 처음 마운트될 때 할 일 목록 불러오기
    useEffect(() => {
        loadTodo().then(() => {
            console.log("Todo Loaded");
        });
    }, []);

    // 생성
    const onCreate = async (content) => {
        try {
            const newItem = {
                id: idRef.current, // 현재 idRef 값을 사용
                content,
                isDone: false,
                createdDate: new Date().getTime(), // 현재 시간을 생성일로 설정
            };
            // 새로운 할 일을 서버에 저장
            const newTodo = await TodoAPI.createTodo(newItem);
            // 상태를 업데이트하여 새 할 일을 추가
            setTodo([newTodo, ...todo]);
            // idRef 값 증가
            idRef.current += 1;
        } catch (error) {
            // 오류가 발생 시 로그 출력
            console.error('Failed to create todo:', error);
        }
    };

    // 수정
    const onUpdate = async (targetId) => {
        try {
            const updatedTodos = todo.map(it => {
                if (it.id === targetId) {
                    return { ...it, isDone: !it.isDone }; // 완료 상태 토글
                }
                return it;
            });
            setTodo(updatedTodos); // 상태 업데이트
            // 변경된 할 일을 서버에 저장
            const targetTodo = updatedTodos.find(it => it.id === targetId);
            const updatedTodo = await TodoAPI.updateTodo(targetId, targetTodo);
            console.info("Updated todo", updatedTodo);
        } catch (error) {
            // 오류 발생 시 로그 출력
            console.error('Failed to update todo:', error);
        }
    };

    // 삭제
    const onDelete = async (targetId) => {
        try {
            // 상태를 업데이트하여 해당 id의 할 일 제거
            setTodo(todo.filter(it => it.id !== targetId));
            // 서버에서 해당 할 일을 삭제
            await TodoAPI.deleteTodo(targetId);
        } catch (error) {
            // 오류가 발생 시 로그 출력
            console.error('Failed to delete todo:', error);
        }
    };

    return (
        <div className="App">
            <Header/>
            <TodoList todo={todo} onUpdate={onUpdate} onDelete={onDelete}/>
            <TodoEditor onCreate={onCreate}/>
        </div>
    );
}

export default App;