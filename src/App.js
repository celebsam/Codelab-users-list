import UserList from './components/UserList';
import UserCard from "./components/UserCard"

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">User List</h1>
      <UserCard/>
      
      <UserList />
    </div>
  );
};

export default App;
