import React, { FC, ReactElement, useReducer, useEffect } from 'react';
import Input from './Input';
import List from './List';
import { todoReducer } from './reducer';
import { ACTION_TYPE, ITodo } from './typings';

const TodoList: FC = (): ReactElement => {
  const [state, dispatch] = useReducer(todoReducer, { todoList: [] });

  useEffect(() => {
    const todoList = JSON.parse(localStorage.getItem('todolist') || '[]');
    dispatch({
      type: ACTION_TYPE.INIT_TODO,
      payload: todoList,
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('todolist', JSON.stringify(state.todoList));
  }, [state.todoList]);

  const addTodo = (todo: ITodo) => {
    dispatch({
      type: ACTION_TYPE.ADD_TODO,
      payload: todo,
    });
  };

  const toggleTodo = (id: number): void => {
    dispatch({
      type: ACTION_TYPE.TOGGLE_TODO,
      payload: id,
    });
  };

  const removeTodo = (id: number): void => {
    dispatch({
      type: ACTION_TYPE.REMOVE_TODO,
      payload: id,
    });
  };

  return (
    <div>
      <Input addTodo={addTodo} todoList={state.todoList} />
      <List
        todoList={state.todoList}
        toggleTodo={toggleTodo}
        removeTodo={removeTodo}
      />
    </div>
  );
};

export default TodoList;
