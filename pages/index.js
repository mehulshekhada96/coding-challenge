import { useState, useEffect } from "react";
import InputComponent from "../components/inputComponent";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function Home() {
  const [toDisplay, setToDisplay] = useState([]);
  const [content, setContent] = useState();
  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(toDisplay);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setToDisplay(items);
  }
  const displayPlanets = toDisplay.map((item, index) => (
    <Draggable key={index} draggableId={item[0].name + index} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="container max-w-2xl mx-auto px-4 sm:px-6"
        >
          {item[0].snippet()}
        </div>
      )}
    </Draggable>
  ));
  const handleSaveToPC = () => {
    const fileData = content;
    const blob = new Blob([fileData], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `export-${(new Date()).toUTCString()}.html`;
    link.href = url;
    link.click();
  };
  useEffect(() => {
    const htmlContent = document.body.innerHTML;
    // console.log(htmlContent);
    setContent(htmlContent);
  });
  return (
    <div className="container max-w-5xl mx-auto px-4 sm:px-6 ">
      <InputComponent setToDisplay={setToDisplay} />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="planets">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {displayPlanets}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button
        type="button"
        className="group  relative  max-w-lg mx-auto flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={handleSaveToPC}
      >
        Download this File
      </button>
    </div>
  );
}
