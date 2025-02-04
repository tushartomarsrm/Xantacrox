/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import ReusableDialog from "../CommonDialogs/ReusableDialog";
import labels from "../../json-content/Labelsjson/inputs-labels.json";
const PatentDetailsDisplay = ({
  f1,
  f2,
  f3,
  f4,
  f5,
  f6,
  f7,
  f8,
  f9,
  f10,
  f11,
}) => {
  const [labelsData, setLabelsData] = useState(labels[f11]);
  const [data, setData] = useState(f1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const config = {
    descriptionField: f10,
    dateFields: [f6, f7],
    urlField: f9,
    defaultState: {
      [f2]: "",
      [f3]: "",
      [f4]: "",
      [f5]: "",
      [f6]: "",
      [f7]: "",
      [f8]: "",
      [f9]: "",
      [f10]: "",
    },
  };

  const handleAddItem = () => {
    setCurrentItem(null);
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
      <h2 className="text-2xl font-bold text-center">{f11}</h2>
      <div className="flex justify-between items-center mt-4">
      <button
  className="flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-600 text-white px-5 py-2 rounded-full shadow-md hover:shadow-xl hover:bg-gradient-to-r hover:from-blue-400 hover:to-teal-500 transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
  onClick={handleAddItem}
>
  <span className="text-sm font-bold mr-2">+</span>
  <span className="font-medium text-sm">{f11.slice(0, -1)}</span>
</button>

      </div>
      <div className="mt-8">
        {data.length === 0 && <p>No {f11} added yet.</p>}
        {data.map((item, index) => (
          <div key={index} className="border p-4 rounded-lg bg-gray-100 mt-6">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg flex-1 truncate max-w-full mr-2">
                {item[f2]}
              </h3>
              <div className="flex space-x-2">
                <button
                  className="bg-blue-500 text-white p-1 rounded-full"
                  onClick={() => handleEditItem(index)}
                >
                  {" "}
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
            <p className="text-sm text-gray-600 line-clamp-2 mt-2 break-words">
              {item[f3]}
            </p>
            <p className="text-sm text-gray-600">
              {labelsData.l3}: {item[f4]}
            </p>
            <p className="text-sm text-gray-600">
              {labelsData.l4}: {item[f5]}
            </p>
            <p className="text-sm text-gray-600">
              {labelsData.l5}: {item[f6]}
            </p>
            {f8 === "githubUrl" && (
              <p className="text-sm flex items-center">
                <div style={{ textWrap: "nowrap" }}>{labelsData.l8}:</div>
                <a
                  href={item[f8]}
                  className="text-sm target text-blue-500 break-all line-clamp-1 ml-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  {item[f8]}
                </a>
              </p>
            )}
            <p className="text-sm flex items-center">
              <div style={{ textWrap: "nowrap" }}>{labelsData.l7}:</div>
              <a
                href={item[f9]}
                className="text-sm target text-blue-500 break-all line-clamp-1 ml-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item[f9]}
              </a>
            </p>
            <div
              className="text-sm mt-2 max-w-full overflow-hidden line-clamp-1"
              dangerouslySetInnerHTML={{ __html: item[f10] }}
            ></div>
          </div>
        ))}
      </div>
      {isDialogOpen && (
        <ReusableDialog
          item={currentItem}
          onSave={handleSaveItem}
          onCancel={() => setIsDialogOpen(false)}
          type={f11.slice(0, -1)}
          config={config}
        />
      )}
    </div>
  );
};

export default PatentDetailsDisplay;
