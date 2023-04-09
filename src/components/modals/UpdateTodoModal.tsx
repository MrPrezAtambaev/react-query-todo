import { useFetchTodoById } from "@/services/fetchTodoById";
import { Title } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";
import TodoForm, { TodoFormValues } from "../TodoForm";
import { useUpdateTodo } from "@/services/updateTodo";

type Props = ContextModalProps<{
	todoId: string;
}>;

const UpdateTodoModal = ({ context, id, innerProps }: Props) => {
	const [todo, { isLoading, isError }] = useFetchTodoById({
		id: innerProps.todoId,
	});

	const [updateTodo] = useUpdateTodo();

	const handleSubmit = (data: TodoFormValues) => {
		updateTodo({ data, id: innerProps.todoId });
		context.closeModal(id);
	};

	if (isLoading) return <Title color="red">Loading...</Title>;
	if (isError) return <Title color="red">Error!!</Title>;
	if (!todo) return <Title color="red">Not found!!</Title>;

	return (
		<TodoForm
			defaultValues={{
				title: todo.title,
				completed: todo.completed,
			}}
			onSubmit={handleSubmit}
		/>
	);
};

export default UpdateTodoModal;
