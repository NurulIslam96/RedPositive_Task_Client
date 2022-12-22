import "./App.css";
import Navbar from "./components/Navbar";
import Table from "./components/Table";

function App() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <Table></Table>
      </div>
    </div>
  );
}

export default App;
