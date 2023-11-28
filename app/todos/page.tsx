import { Button } from "@/components/ui/button";
import readUserSession from "@/lib/actions";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
import { deleteTodoById, readTodos, updateTodoById } from "./actions";
import CreateForm from "./components/CreateForm";
import SignOut from "./components/SignOut";

export default async function Page() {
    const { data } = await readUserSession();

    if (!data.session) {
        return redirect("/auth-server-action");
    }

    const { data: todos } = await readTodos();

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-96 space-y-5">
                <SignOut />
                <CreateForm />

                {todos?.map((todo) => {
                    const deleteTodo = deleteTodoById.bind(null, todo.id);
                    const updateTodo = updateTodoById.bind(
                        null,
                        todo.id,
                        !todo.completed
                    );

                    return (
                        <div key={todo.id} className="flex items-center gap-6">
                            <h1
                                className={cn({
                                    "line-through": todo.completed,
                                })}
                            >
                                {todo.title}
                            </h1>
                            <form action={deleteTodo}>
                                <Button>delete</Button>
                            </form>
                            <form action={updateTodo}>
                                <Button>Update</Button>
                            </form>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
