import UserList from "./components/UserList";

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-center font-bold mb-4">Users List</h1>
      <UserList />
    </div>
  );
};

export default App;
