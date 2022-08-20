import {
  Button,
  Container,
  Text,
  Grid,
  Space,
  Title,
  Group,
} from "@mantine/core";
import { useState, useEffect } from "react";
import EditTodo from "./EditTodo";
import { TrashX, PlaylistX } from "tabler-icons-react";

export interface TodoProps {
  id: number;
  description: string;
}

const ListTodos = () => {
  const [todos, setTodos] = useState<TodoProps[]>();

  //   get all todo
  const getTodos = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/todos");
      const data = await res.json();
      setTodos(data);
    } catch (err) {}
  };

  useEffect(() => {
    getTodos();
  }, []);

  //   delete toto
  const deleteTodo = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/api/todo/${id}`, {
        method: "DELETE",
      });
      setTodos(todos?.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container
      sx={(theme) => ({
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
      })}
    >
      <Space h="md" />

      <Title
        order={2}
        sx={(theme) => ({
          textAlign: "center",
          color: theme.colors.gray[7],
          borderBottom: `1px solid ${theme.colors.gray[2]}`,
        })}
      >
        ListTodos
      </Title>
      <Space h="lg" />
      {todos?.length === 0 ? (
        <Text
          sx={(theme) => ({
            textAlign: "center",
          })}
        >
          <Group position="center">
            <PlaylistX />
            Nothing Todo.
          </Group>
        </Text>
      ) : (
        todos
          ?.sort((a, b) => b.id - a.id)
          .map((item: TodoProps) => {
            return (
              <Grid columns={24} key={item.id}>
                <Grid.Col span={18}> {item.description} </Grid.Col>
                <Grid.Col span={3}>
                  <EditTodo todo={item} />
                </Grid.Col>
                <Grid.Col span={3}>
                  <Button
                    leftIcon={<TrashX />}
                    variant="light"
                    onClick={() => deleteTodo(item.id)}
                    color="red"
                  >
                    Delete
                  </Button>
                </Grid.Col>
              </Grid>
            );
          })
      )}
    </Container>
  );
};

export default ListTodos;
