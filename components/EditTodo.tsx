import React, { useState } from "react";
import { Modal, Space, Stack, Button, Group, Input } from "@mantine/core";
import { Edit } from "tabler-icons-react";

const EditTodo = ({ todo }: { todo: { id: number; description: string } }) => {
  const [opened, setOpened] = useState(false);
  const [description, setDescription] = useState(todo.description);

  const updateDescription = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const body = { description };
      await fetch(`http://localhost:3000/api/todo/${todo.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setOpened(false);
      window.location.href = "/";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => (setOpened(false), setDescription(todo.description))}
        title="Edit Todo"
      >
        <Stack>
          <form onSubmit={(value) => updateDescription(value)}>
            <Input
              type="text"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDescription(e.target.value)
              }
            />
            <Space my={20} />
            <Button color="teal" type="submit">
              Edit
            </Button>
          </form>
        </Stack>
      </Modal>
      <Group position="center">
        <Button
          leftIcon={<Edit />}
          variant="subtle"
          color="yellow"
          onClick={() => setOpened(true)}
        >
          Edit
        </Button>
      </Group>
    </>
  );
};

export default EditTodo;
