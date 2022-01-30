import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, IToDo, toDoState } from "../atom";
import { BsTrash } from "react-icons/bs";
import { GiCheckMark } from "react-icons/gi";
import { VscDebugStart } from "react-icons/vsc";
import { IoNewspaperOutline } from "react-icons/io5";
const ToDoList = styled.li`
  list-style: none;
  padding: 10px;
  /* display: flex;
  justify-content: space-between;
  align-items: center; */
  display: grid;
  grid-template-columns: 20% 70% 10%;
  width: 100%;
  border-bottom: 1px solid white;
  & span {
    width: 100%;
    text-align: center;
  }
  & * {
    align-self: center;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  button {
    border: none;
    margin: 2px 0;
    padding: 5px 10px;
    border-radius: 5px;
    white-space: nowrap;
  }
`;

const ToDoText = styled.div`
  word-wrap: break-word;
  padding: 0 10px;
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
      <span>{new Date(id).toLocaleDateString()}</span>
      <ToDoText>{text}</ToDoText>
      <ButtonWrapper>
        {category !== Categories.DOING && (
          <button name={Categories.DOING} onClick={onClick}>
            <VscDebugStart />
          </button>
        )}
        {category !== Categories.TO_DO && (
          <button name={Categories.TO_DO} onClick={onClick}>
            <IoNewspaperOutline />
          </button>
        )}
        {category !== Categories.DONE && (
          <button name={Categories.DONE} onClick={onClick}>
            <GiCheckMark />
          </button>
        )}
        <button name={Categories.DELETE} onClick={onClick}>
          <BsTrash />
        </button>
      </ButtonWrapper>
    </ToDoList>
  );
}

export default ToDo;
