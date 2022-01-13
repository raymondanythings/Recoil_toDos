import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, IToDo, toDoState } from "../atom";

const ToDoList = styled.li`
  list-style: none;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid white;
  & span {
    width: 100%;
    text-align: center;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = e;
    setToDos((prev) => {
      const targetIndex = prev.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      let newToDos;
      if (name === Categories.DELETE) {
        newToDos = [
          ...prev.slice(0, targetIndex),
          ...prev.slice(targetIndex + 1),
        ];
      } else {
        newToDos = [
          ...prev.slice(0, targetIndex),
          newToDo,
          ...prev.slice(targetIndex + 1),
        ];
      }
      localStorage.setItem("toDos", JSON.stringify(newToDos));
      return newToDos;
    });
  };
  return (
    <ToDoList>
      <span>{text}</span>
      <ButtonWrapper>
        {category !== Categories.DOING && (
          <button name={Categories.DOING} onClick={onClick}>
            Doing
          </button>
        )}
        {category !== Categories.TO_DO && (
          <button name={Categories.TO_DO} onClick={onClick}>
            To Do
          </button>
        )}
        {category !== Categories.DONE && (
          <button name={Categories.DONE} onClick={onClick}>
            Done
          </button>
        )}
        <button name={Categories.DELETE} onClick={onClick}>
          Delete
        </button>
      </ButtonWrapper>
    </ToDoList>
  );
}

export default ToDo;
