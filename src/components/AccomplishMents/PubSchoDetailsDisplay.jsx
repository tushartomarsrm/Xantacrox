/* eslint-disable react/prop-types */
import { useState } from "react";
import CommonDialog from "../CommonDialogs/PubScho";
const PubSchoDetailsDisplay = ({f1,f2,f3,f4,f5,f6,f7}) =>{
    const [data, setData] = useState(f1);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [editIndex, setEditIndex] = useState(null);
  
    const handleAddItem = () => {
      setCurrentItem({ [f2]: "", [f3]: "", [f4]:"",[f5]: "", [f6]: "" }); 
      setEditIndex(null);
      setIsDialogOpen(true);
    };
  
    const handleSaveItem = (item) => {
      if (editIndex !== null) {
        const updatedData = [...data];
        updatedData[editIndex] = item;
        setData(updatedData);
      } else {
        setData([...data, item]);
      }
      setIsDialogOpen(false);
      console.log(data);
    };
  
    const handleEditItem = (index) => {
      setCurrentItem(data[index]);
      setEditIndex(index);
      setIsDialogOpen(true);
    };
  
    const handleDeleteItem = (index) => {
      setData(data.filter((_, i) => i !== index));
    };
  
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold">{f7}</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          onClick={handleAddItem}
        >
          Add {f7.slice(0,-1)}
        </button>
        <div className="mt-4">
          {data.length === 0 && <p>No {f7} added yet.</p>}
          {data.map((item, index) => (
            <div
              key={index}
              className="border p-4 rounded mt-4 bg-gray-100 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{item[f2]}</h3>
                <p className="text-sm">{item[f3]}</p>
                <p className="text-sm">{f7.slice(0,-1)} Date: {item[f5]}</p>
                <a className="text-sm text-blue-600" href={item[f4]}>{item[f4]}</a>
                <div
                  className="text-sm mt-2"
                  dangerouslySetInnerHTML={{ __html: item[f6] }}
                ></div>
              </div>
              <div className="flex space-x-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => handleEditItem(index)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDeleteItem(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        {isDialogOpen && (
          <CommonDialog
            item={currentItem}
            onSave={handleSaveItem}
            onCancel={() => setIsDialogOpen(false)}
            type={f7.slice(0,-1)}
          />
        )}
      </div>
    );
  };
  
  export default PubSchoDetailsDisplay;