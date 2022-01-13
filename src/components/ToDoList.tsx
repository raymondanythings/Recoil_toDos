import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Categories, categoryState, toDoSelector } from "../atom";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & hr {
    width: 100%;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  width: 100%;
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setCategory(value as any);
  };
  return (
    <Wrapper>
      <h1>To Dos</h1>
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
