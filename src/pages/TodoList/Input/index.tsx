import React, { FC, ReactElement, useRef } from 'react';
import { ITodo } from '@/pages/TodoList/typings';

interface IProps {
  addTodo: (todo: ITodo) => void;
  todoList: ITodo[];
}

const Input: FC<IProps> = ({ todoList, addTodo }): ReactElement => {
  const inputRef = useRef<HTMLInputElement>(null);

  const addItem = (): void => {
    const value: string = inputRef.current!.value.trim();

    if (value.length) {
      const isExist = todoList.find((item) => item.content === value);

      if (isExist) {
        alert('已存在该项！');
        return;
      }

      addTodo({
        id: Date.now(),
        content: value,
        completed: false,
      });

      inputRef.current!.value = '';
    }
  };

  return (
    <div>
      <input type="text" placeholder="请输入待办事项" ref={inputRef} />
      <button onClick={addItem}>添加</button>
    </div>
  );
};

export default Input;
