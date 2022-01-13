import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atom";
import { useForm } from "react-hook-form";
interface IForm {
  toDo: string;
}
function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { handleSubmit, register, setValue } = useForm<IForm>();
  const onSubmit = ({ toDo }: IForm) => {
    setToDos((prev) => {
      const newToDos = [{ text: toDo, id: Date.now(), category }, ...prev];
      localStorage.setItem("toDos", JSON.stringify(newToDos));
      return newToDos;
    });
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="Write a to do"
        {...register("toDo", {
          required: "Please Write a To Do.",
        })}
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
