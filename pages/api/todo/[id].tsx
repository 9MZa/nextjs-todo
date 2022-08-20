import type { NextApiRequest, NextApiResponse } from "next";
import pool from "../../../db";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const Method = req.method;
  const ID = req.query.id;

  // Get by ID
  async function getTodo() {
    try {
      const todo = await pool.query("SELECT * FROM todo WHERE id = $1", [ID]);
      if (todo.rowCount !== 0) {
        res.json(todo.rows[0]);
      } else {
        res.json("Not have this ID.");
      }
    } catch (error) {
      console.log(error);
      res.json("hi");
    }
  }

  // Update by ID
  async function updateTodo() {
    try {
      const { description } = req.body;
      await pool.query("UPDATE todo SET description = $1 WHERE id = $2", [
        description,
        ID,
      ]);
      res.json(`todo id:${ID} was updated!`);
    } catch (err) {
      console.log(err);
    }
  }

  // Delete by ID
  async function deleteTodo() {
    try {
      await pool.query("DELETE FROM todo WHERE id = $1", [ID]);
      res.json(`to id:${ID} is deleted.`);
    } catch (err) {
      console.log(err);
    }
  }

  switch (Method) {
    case "GET":
      getTodo();
      break;
    case "PATCH":
      updateTodo();
      break;
    case "DELETE":
      deleteTodo();
      break;
    default:
      res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
      res.status(405).end(`Method ${Method} Not Allowed`);
      break;
  }
}
