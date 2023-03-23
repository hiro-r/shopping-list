import './App.css';
import ShoppingList from "./ShoppingList"
import { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function App() {

  const [items, setItems] = useState(
    () => JSON.parse(localStorage.getItem("allItems")) || []
  )

  useEffect(() => {
    localStorage.setItem("allItems", JSON.stringify(items))
  }, [items])

  const itemRef = useRef();

  const addItem = () => {
    const addedItem = itemRef.current.value;
    if(addedItem === "") {
      return;
    } else {
      setItems(prevItem => [...prevItem, {id: uuidv4(), name: addedItem, completed: false}])
    }
    itemRef.current.value = null;
  }

  const deleteItem = () => {
    setItems(prevItems => prevItems.filter(item => !item.completed))
  }

  const deleteAllItems = () => {
    setItems([]);
    localStorage.clear();
  }

  const toggleItem = (id) => {
    setItems(prevItems => prevItems.map(item => {
      return item.id === id ? {...item, completed: !item.completed} : item
    }))
  }

  const itemLeft = items.filter(item => !item.completed).length;

  return (
    <div className="container">
      <h1>Shopping List</h1>
      <div className="item-left">Item Left: <span className={itemLeft !== 0 ? "red" : ""}>{itemLeft}</span></div>
      <div className="input-container">
        <input 
          type="text"
          placeholder="What do I need?"
          ref={itemRef}
        />
        <div className="input-container-btns">
          <button onClick={addItem}>Add</button>
          <button onClick={deleteItem}>Delete</button>
          <button onClick={deleteAllItems} className="delete-all-btn">Delete List</button>
        </div>
      </div>
      <ShoppingList items={items} toggleItem={toggleItem}/>
    </div>
  );
}