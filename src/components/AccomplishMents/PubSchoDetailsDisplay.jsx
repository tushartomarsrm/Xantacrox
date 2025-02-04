/* eslint-disable react/prop-types */
import { useState } from "react";
import CommonDialog from "../CommonDialogs/PubScho";
const PubSchoDetailsDisplay = ({ f1, f2, f3, f4, f5, f6, f7 }) => {
  const [data, setData] = useState(f1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddItem = () => {
    setCurrentItem({ [f2]: "", [f3]: "", [f4]: "", [f5]: "", [f6]: "" });
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
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md w-full">
      <h2 className="text-2xl font-bold text-center">{f7}</h2>
      <div className="flex justify-between items-center mt-4">
      <button
  className="flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-600 text-white px-5 py-2 rounded-full shadow-md hover:shadow-xl hover:bg-gradient-to-r hover:from-blue-400 hover:to-teal-500 transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
  onClick={handleAddItem}
>
  <span className="text-sm font-bold mr-2">+</span>
  <span className="font-medium text-sm">{f7.slice(0, -1)}</span>
</button></div>
     
      <div className="mt-8">
        {data.length === 0 && <p>No {f7} added yet.</p>}
        {data.map((item, index) => (
          <div key={index} className="border p-4 rounded-lg bg-gray-100 mt-6">
            <div className="flex justify-between items-center">
              {/* Title and Action Buttons */}
              <h3 className="font-semibold text-lg flex-1 truncate mr-2">
                {item[f2]}
              </h3>
              <div className="flex space-x-2">
                <button
                  className="bg-blue-500 text-white p-1 rounded-full"
                  onClick={() => handleEditItem(index)}
                >
                  <i className="fas fa-pencil-alt"></i>
                </button>
                <button
                  className="bg-red-500 text-white p-1 rounded-full"
                  onClick={() => handleDeleteItem(index)}
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2 mt-2">
              {item[f3]}
            </p>
            {f7 === "Extra-CurricularSkills" ? (
              <p className="text-sm text-gray-600">{item[f5]}</p>
            ) : (
              <p className="text-sm text-gray-600">
                {f7.slice(0, -1)} Date: {item[f5]}
              </p>
            )}
            <a
              className="text-sm text-blue-600 break-all line-clamp-1"
              href={item[f4]}
            >
              {item[f4]}
            </a>
            
            <div
  className="text-sm mt-2 max-w-full overflow-hidden line-clamp-1"
  dangerouslySetInnerHTML={{ __html: item[f6] }}
></div>
          </div>
        ))}
      </div>

      {isDialogOpen && (
        <CommonDialog
          item={currentItem}
          onSave={handleSaveItem}
          onCancel={() => setIsDialogOpen(false)}
          type={f7.slice(0, -1)}
        />
      )}
    </div>
  );
};

export default PubSchoDetailsDisplay;
