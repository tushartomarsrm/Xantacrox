/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { FaTimes } from "react-icons/fa";

const ReusableDialog = ({ item, onSave, onCancel, type, config }) => {
  const [formState, setFormState] = useState(item || config.defaultState || {});
  const labelOfFinish = {
    "Patent":{"lastDateLabel":"IssueDate","checkboxLabel":"Not Issued Yet"},
    "Experience":{"lastDateLabel":"EndDate","checkboxLabel":"Currently Working Here"},
    "Competition":{"lastDateLabel":"EndDate","checkboxLabel":"OnGoing"},
    "Certification":{"lastDateLabel":"ExpiryDate","checkboxLabel":"DoNotHaveExpiry"},
    "Project":{"lastDateLabel":"EndDate","checkboxLabel":"WorkingOnIt"}
  }
  const [isDateNotIssued, setIsDateNotIssued] = useState(
    (item?.issueDate || config.defaultState?.issueDate) === "N/A"
  ); // Initialize based on issueDate value
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    const initialState = item || config.defaultState || {};
    setFormState(initialState);
    setIsDateNotIssued(initialState.issueDate === "N/A"); // Sync with initial state
  }, [item, config]);

  useEffect(() => {
    if (!quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Enter description...",
        modules: {
          toolbar: [
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ link: true }],
          ],
        },
      });

      quillRef.current.on("text-change", () => {
        setFormState((prev) => ({
          ...prev,
          [config.descriptionField]: quillRef.current.root.innerHTML,
        }));
      });
    }

    if (
      quillRef.current &&
      quillRef.current.root.innerHTML !== formState[config.descriptionField]
    ) {
      quillRef.current.root.innerHTML =
        formState[config.descriptionField] || "";
    }
  }, [formState, config]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = () => {
    setIsDateNotIssued((prev) => {
      const newValue = !prev;
      setFormState((prevState) => ({
        ...prevState,
        issueDate: newValue ? "N/A" : new Date().toISOString().split("T")[0],
      }));
      return newValue;
    });
  };

  const handleSave = () => onSave(formState);

  const renderInputField = (key, value) => {
    if (config.dateFields?.includes(key)) {
      return (
        <div key={key}>
          <label className="text-sm font-semibold">
            {key[0].toUpperCase() + key.slice(1)}:
          </label>
          <input
            type="date"
            name={key}
            value={value || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      );
    }
    if (key == config.urlField || key === "githubUrl" )  {
      return (
        <div key={key}>
          <label className="text-sm font-semibold">
            {key[0].toUpperCase() + key.slice(1)}:
          </label>
          <input
            type="url"
            name={key}
            value={value || ""}
            placeholder="Enter Url"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      );
    }
    return (
      <div key={key}>
        <label className="text-sm font-semibold">
          {key[0].toUpperCase() + key.slice(1)}:
        </label>
        <input
          type="text"
          name={key}
          value={value || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-5 overflow-scroll"
      onClick={onCancel}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-md w-full sm:max-w-full md:max-w-lg lg:max-w-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
          onClick={onCancel}
        >
          <FaTimes size={24} />
        </button>
        <h2 className="text-xl font-bold mb-4">{`Add/Edit ${type}`}</h2>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 m-4">
          {Object.keys(formState).map((key) => {
            if (key === config.descriptionField) {
              return (
                <div key={key} className="mt-1 col-span-2">
                  <label className="text-sm font-semibold">Description:</label>
                  <div
                    ref={editorRef}
                    className="border rounded bg-white overflow-auto h-auto max-h-20"
                  />
                </div>
              );
            }

            if (key === "issueDate") {
              return (
                <div key={key}>
                  <label className="text-sm font-semibold">
                  {labelOfFinish[type].lastDateLabel}:
                  </label>
                  {!isDateNotIssued && (
                    <input
                      type="date"
                      name="issueDate"
                      value={formState.issueDate}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                    />
                  )}
                  <div className="mt-2">
                    <label className="inline-flex items-center text-sm">
                      <input
                        type="checkbox"
                        checked={isDateNotIssued}
                        onChange={handleCheckboxChange}
                        className="mr-2"
                      />
                        {labelOfFinish[type].checkboxLabel}
                    </label>
                  </div>
                </div>
              );
            }

            return renderInputField(key, formState[key]);
          })}
        </div>
      </div>
    </div>
  );
};

export default ReusableDialog;
