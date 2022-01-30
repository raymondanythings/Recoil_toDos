import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Categories, categoryState, toDoSelector } from "../atom";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
  border-radius: 15px;
  padding: 30px;
  width: 100%;
  & hr {
    width: 100%;
  }
  h1 {
    font-size: 48px;
    font-weight: 500;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  width: 100%;
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [title, setTitle] = useState("TO DO");
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setCategory(value as any);
    setTitle(value.replace("_", " "));
  };
  return (
    <Wrapper>
      <h1>{title}</h1>
      <hr />
      <Header>
        <form>
          <select value={category} onInput={onInput}>
            <option value={Categories.TO_DO}>To Do</option>
            <option value={Categories.DOING}>Doing</option>
            <option value={Categories.DONE}>Done</option>
          </select>
        </form>
        <CreateToDo />
      </Header>

      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </Wrapper>
  );
}

export default ToDoList;
