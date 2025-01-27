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
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold">{f11}</h2>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleAddItem}
      >
        Add {f11.slice(0, -1)}
      </button>
      <div className="mt-4">
        {data.length === 0 && <p>No {f11} added yet.</p>}
        {data.map((item, index) => (
          <div
            key={index}
            className="border p-4 rounded mt-4 bg-gray-100 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{item[f2]}</h3>
              <p className="text-sm">{item[f3]}</p>
              <p className="text-sm">
                {labelsData.l3}: {item[f4]}
              </p>
              <p className="text-sm">
                {labelsData.l4}: {item[f5]}
              </p>
              <p className="text-sm">
                {labelsData.l5}: {item[f6]}
              </p>
              {f8 === "githubUrl" && (
                <p className="text-sm">
                  {labelsData.l8}:
                  <a
                    href={item[f8]}
                    className="text-sm target text-blue-500"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    {item[f8]}
                  </a>
                </p>
              )}

              <p className="text-sm">
                {labelsData.l7}:
                <a
                  href={item[f9]}
                  className="text-sm target text-blue-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  {item[f9]}
                </a>
              </p>
              <div
                className="text-sm mt-2"
                dangerouslySetInnerHTML={{ __html: item[f10] }}
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
