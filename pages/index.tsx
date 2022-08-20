import type { NextPage } from "next";
import Todos from "../components/Todos";
import Layout from "../components/Layout";
import InputTodo from "../components/InputTodo";

const Home: NextPage = () => {
  return (
    <Layout>
      <InputTodo />
      <Todos />
    </Layout>
  );
};

export default Home;
