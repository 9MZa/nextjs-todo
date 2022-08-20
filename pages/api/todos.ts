import pool from "../../db";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const Method = req.method;

  // Get all Todos
  async function getAllTodo() {
    try {
      const allTodo = await pool.query("SELECT * FROM todo");
      res.json(allTodo.rows);
    } catch (err) {
      console.log(err);
    }
  }

  // Insert a todo
  async function insertTodo() {
    try {
      const { description } = req.body;
      const addedOn = new Date().toISOString();
      const newTodo = await pool.query(
        "INSERT INTO todo (description,added) VALUES($1, $2) RETURNING *",
        [description, addedOn]
      );
      res.json(newTodo);
    } catch (err) {
      console.log(err);
    }
  }

  switch (Method) {
    case "GET":
      getAllTodo();
      break;
    case "POST":
      insertTodo();
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${Method} Not Allowed`);
      break;
  }
}
