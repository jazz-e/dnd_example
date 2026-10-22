import { useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import Card from "./components/Card.tsx";
import DropZone from "./components/DropZone.tsx";

//Person definition
type Person = {
  id: string;
  name: string;
  age: number;
  location: string;
};

//Create initial data for Cards includes id for Draggable ID
const initialPeople: Person[] = [
  { id: "ritchie", name: "Ritchie", age: 55, location: "Wolverhampton" },
  { id: "perry", name: "Perry", age: 32, location: "Bearwood" },
  { id: "molly", name: "Molly", age: 31, location: "Halesowen" },
];
//App function main entry point
function App() {
  const [people, setPeople] = useState(initialPeople); // Creates a state variable based on current array
  const [droppedPeople, setDroppedPeople] = useState<Person[]>([]); // Another state variable for the dropzone

  return (
    // DragDrop Provider component start
    <DragDropProvider
      // onDragEnd Callback function - event holds information about the drag operation
      // such which item dragged, target for drop or ooperation cancelled
      onDragEnd={(event) => {
        if (event.canceled) return; // check if the drag operation is cancelled

        const sourceId = String(event.operation.source?.id); // Gets the Item being dragged ID
        const targetId = event.operation.target?.id; // Gets the drop target ID

        // Dropped into the DropZone
        if (targetId === "dropzone") {
          const person = people.find((p) => p.id === sourceId); // Is the item dragged over dropzone

          if (person) {
            setDroppedPeople((previous) => [...previous, person]); // Adds person to all the other drop zone people
            // Removes the dragged person from Active Cards by setting People to all but removed item
            setPeople((previous) => previous.filter((p) => p.id !== sourceId));
          }

          return; // only impacts DropZone
        }

        // Dragged out of the DropZone and released elsewhere
        const droppedPerson = droppedPeople.find((p) => p.id === sourceId); // Find the person if in DropZone

        if (droppedPerson) {
          // If true
          setDroppedPeople((previous) =>
            previous.filter((p) => p.id !== sourceId),
          ); // Remove DroppedPerson out of the array

          setPeople((previous) => [...previous, droppedPerson]); // replace them in available cards
        }
      }}
    >
      <h2>Available Cards</h2>

      {people.map((person) => (
        <Card
          key={person.id}
          id={person.id}
          name={person.name}
          age={person.age}
          location={person.location}
        />
      ))}

      <h2>Drop Zone</h2>

      <DropZone id="dropzone">
        {droppedPeople.map((person) => (
          <Card
            key={person.id}
            id={person.id}
            name={person.name}
            age={person.age}
            location={person.location}
          />
        ))}
      </DropZone>
    </DragDropProvider>
  );
}

export default App;
