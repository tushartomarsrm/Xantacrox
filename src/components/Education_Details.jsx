// import { useState } from "react";
// import educa_details from "../json-content/education-details.json";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// const Education_Details = () => {
//   const [edData, setEdData] = useState(educa_details);
//   const [editedSections, setEditedSections] = useState({});

//   const handleEditClick = (section, index = null) => {
//     if (index !== null) {
//       // Prevent multiple edits for the same item in lists
//       if (
//         editedSections[`${section}-${index}`] ||
//         edData[section][index].isFrozen
//       )
//         return;

//       setEdData({
//         ...edData,
//         [section]: edData[section].map((item, idx) =>
//           idx === index ? { ...item, isEditable: true, isFrozen: false } : item
//         ),
//       });
//     } else {
//       if (editedSections[section] || edData[section].isFrozen) return;

//       setEdData({
//         ...edData,
//         [section]: {
//           ...edData[section],
//           isEditable: true,
//           isFrozen: false,
//         },
//       });
//     }
//   };

//   const handleSaveClick = (section, index = null) => {
//     setEditedSections({
//       ...editedSections,
//       [`${section}-${index !== null ? index : ""}`]: true,
//     });

//     if (section === "education") {
//       setEdData({
//         ...edData,
//         education: {
//           ...edData.education,
//           isEditable: false, // Mark it as not editable
//           isFrozen: true, // Set this to true to prevent further edits
//         },
//       });
//     } else {
//       if (index !== null) {
//         setEdData({
//           ...edData,
//           [section]: edData[section].map((item, idx) =>
//             idx === index
//               ? { ...item, isEditable: false, isFrozen: true }
//               : item
//           ),
//         });
//       } else {
//         setEdData({
//           ...edData,
//           [section]: {
//             ...edData[section],
//             isEditable: false, // Mark the section as not editable
//             isFrozen: true, // Set this to true to prevent further edits
//           },
//         });
//       }
//     }
//   };

//   const handleInputChange = (e, section, field, index = null) => {
//     const { value } = e.target;
//     if (index !== null) {
//       setEdData({
//         ...edData,
//         [section]: edData[section].map((item, idx) =>
//           idx === index ? { ...item, [field]: value } : item
//         ),
//       });
//     } else {
//       setEdData({
//         ...edData,
//         [section]: {
//           ...edData[section],
//           [field]: value,
//         },
//       });
//     }
//   };

//   const handleFileUpload = (e, section, index = null) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (index !== null) {
//         setEdData({
//           ...edData,
//           [section]: edData[section].map((item, idx) =>
//             idx === index ? { ...item, document: file.name } : item
//           ),
//         });
//       } else {
//         setEdData({
//           ...edData,
//           [section]: {
//             ...edData[section],
//             document: file.name,
//           },
//         });
//       }
//     }
//   };

//   if (!edData) return <div>Loading...</div>;

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
//       
//         <section className="space-y-6 mt-6">
//           <h2 className="text-2xl font-bold">Semester-wise Scores</h2>
//           <table className="w-full table-auto border-collapse border border-gray-300">
//             <thead>
//               <tr>
//                 <th className="border border-gray-300 p-2">Semester</th>
//                 <th className="border border-gray-300 p-2">CGPA</th>
//                 <th className="border border-gray-300 p-2">SGPA</th>
//                 <th className="border border-gray-300 p-2">Backlogs</th>
//                 <th className="border border-gray-300 p-2">Upload Degree</th>
//               </tr>
//             </thead>
//             <tbody>
//               {edData.semesterScores.map((score, index) => (
//                 <tr key={index}>
//                   <td className="border border-gray-300 p-2">
//                     {score.semester}
//                   </td>
//                   <td className="border border-gray-300 p-2">{score.cgpa}</td>
//                   <td className="border border-gray-300 p-2">{score.sgpa}</td>
//                   <td className="border border-gray-300 p-2">
//                     {score.backlogs}
//                   </td>
//                   <td className="border border-gray-300 p-2">
//                     <input
//                       type="file"
//                       accept=".pdf"
//                       onChange={(e) =>
//                         handleFileUpload(e, `semesterScores`, index)
//                       }
//                       disabled={!score.isEditable}
//                       className="p-2 border border-gray-300 rounded"
//                     />
//                   </td>
//                   <i
//                     className={`fas ${
//                       score.isFrozen
//                         ? "fa-lock text-gray-500"
//                         : "fa-pencil-alt text-blue-500"
//                     } float-right h-6 cursor-pointer mt-6`}
//                     onClick={() => handleEditClick("semesterScores", index)}
//                   />
//                   {score.isEditable && (
//                     <button
//                       type="button"
//                       onClick={() => handleSaveClick("semesterScores", index)}
//                       className="bg-green-500 text-white px-8 py-2 rounded-full shadow-lg mt-4"
//                     >
//                       Save
//                     </button>
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </section>
//      
//     </div>
//   );
// };

// export default Education_Details;

// {
  //   "semesterScores": [
  //     {
  //       "isFrozen": false,
  //       "semester": "1",
  //       "cgpa": "9.32",
  //       "sgpa": "10",
  //       "backlogs": 0
  //     },
  //     {
  //       "isFrozen": false,
  //       "semester": "2",
  //       "cgpa": "9.05",
  //       "sgpa": "9.05",
  //       "backlogs": 0
  //     },
  //     {
  //       "isFrozen": false,
  //       "semester": "3",
  //       "cgpa": "9.5",
  //       "sgpa": "9.5",
  //       "backlogs": 0
  //     },
  //     {
  //       "isFrozen": false,
  //       "semester": "4",
  //       "cgpa": "9.12",
  //       "sgpa": "9.12",
  //       "backlogs": 0
  //     },
  //     {
  //       "isFrozen": false,
  //       "semester": "5",
  //       "cgpa": "9",
  //       "sgpa": "9",
  //       "backlogs": 0
  //     }
  //   ]
  // }
  

import { useState } from "react";
import { Plus ,Trash2} from "lucide-react";
import initialEducation from "../json-content/education-details.json";


const educationFields = {
  default: [
    { name: "institution", type: "text", required: true },
    { name: "percentage", type: "number", required: true, min: 0, max: 100 },
    { name: "board", type: "text", required: false },
    { name: "location", type: "text", required: true },
  ],
  advanced: [
    { name: "program", type: "text", required: true },
    { name: "campus", type: "text", required: false },
    { name: "batch", type: "text", required: true },
    { name: "department", type: "text", required: false },
    { name: "specialization", type: "text", required: false },
    { name: "section", type: "text", required: false },
    { name: "startYear", type: "text", required: true },
    { name: "endYear", type: "text", required: true },
    { name: "cgpa", type: "number", required: false, min: 0, max: 10 },
  ],
  selectable: {
    department: ["CSE", "CSE Core", "ECE", "ME", "Civil"],
    campus:["SRM Modinagar","SRM Kattankulathur","SRM Vadapalani","SRM Sonepat"],
    specialization:["AIML","AI","ML","IT"],
    batch:["2018","2019","2020","2021","2022","2023","2024","2025","2026","2027","2028"],
  },
};

export default function EducationSection() {
  const [education, setEducation] = useState(initialEducation);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("UG");
  const [newEntry, setNewEntry] = useState({});
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    let newErrors = {};
    const fields = [
      ...educationFields.default,
      ...(currentSection === "UG" || currentSection === "PG" || currentSection === "Others"
        ? educationFields.advanced
        : []),
    ];
    fields.forEach((field) => {
      if (
        field.required &&
        (!newEntry[field.name] || newEntry[field.name].toString().trim() === "")
      ) {
        newErrors[field.name] = "This field is required";
      }
      if (field.type === "number" && newEntry[field.name] !== undefined) {
        const value = parseFloat(newEntry[field.name]);
        if (
          (field.min !== undefined && value < field.min) ||
          (field.max !== undefined && value > field.max)
        ) {
          newErrors[
            field.name
          ] = `Value should be between ${field.min} and ${field.max}`;
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddEntry = () => {
    if (!validateFields()) return;
    setEducation((prev) => ({
      ...prev,
      [currentSection]: [...prev[currentSection], newEntry],
    }));
    setIsDialogOpen(false);
    setNewEntry({});
    setErrors({});
  };
  const handleDeleteEntry = (section, index) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;
    setEducation((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };
  return (
    <div className="p-6 relative w-full flex justify-center flex-col">
      <div><h7></h7></div>
      <h2 className="text-2xl font-bold w-full flex justify-center items-center border-b pb-3">
          <span className="text-center">Education</span>
        </h2>
      {Object.keys(education).map((section) => (
        <div key={section} className="mb-6 ">
          <h2 className="text-xl font-semibold mb-2">{section}</h2>
          {education[section].length > 0 ? (
            education[section].map((entry, index) => (
              <div
                key={index}
                className="border p-4 mb-2 rounded shadow bg-white"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(entry).map(([key, value]) =>
                    value ? (
                      <div key={key} className="flex items-center gap-2">
                        <strong className="whitespace-nowrap text-gray-600">
                          {key.charAt(0).toUpperCase() + key.slice(1)}:
                        </strong>
                        <span className="truncate text-sm text-gray-800">
                          {value}
                        </span>
                      </div>
                    ) : null
                  )}
                </div>
                <button
                  onClick={() => handleDeleteEntry(section, index)}
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded flex items-center"
                >
                  <Trash2 size={16} className="mr-2" /> Delete
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Nothing to show</p>
          )}
          <button
            onClick={() => {
              setCurrentSection(section);
              setIsDialogOpen(true);
            }}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded flex items-center"
          >
            <Plus size={16} className="mr-2" /> Add New
          </button>
        </div>
      ))}

      {isDialogOpen && (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-6 rounded shadow-lg w-96 max-h-[90vh] overflow-y-auto" style={{scrollbarWidth:'thin'}}>
          <div className="mb-4 flex flex-nowrap justify-between">
            <h3 className="text-lg font-semibold">
              Add {currentSection} Details
            </h3>
            <i
              style={{ cursor: "pointer" }}
              onClick={() => {
                setIsDialogOpen(false);
                setErrors({});
              }}
            >
              X
            </i>
          </div>
      
          {[...educationFields.default, ...(currentSection === "UG" || currentSection === "PG" ||currentSection === "Others" ? educationFields.advanced : [])].map((field) => (
            <div key={field.name} className="my-2">
              {educationFields.selectable[field.name] && currentSection!=="Others"  ? (
                <select
                  className="p-2 w-full border rounded"
                  value={newEntry[field.name] || ""}
                  onChange={(e) =>
                    setNewEntry({ ...newEntry, [field.name]: e.target.value })
                  }
                >
                  <option value="">Select {field.name}</option>
                  {educationFields.selectable[field.name].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  placeholder={
                    field.name.replace(/([A-Z])/g, " $1").trim() +
                    (field.required ? " *" : "")
                  }
                  className="p-2 w-full border rounded"
                  value={newEntry[field.name] || ""}
                  onChange={(e) =>
                    setNewEntry({ ...newEntry, [field.name]: e.target.value })
                  }
                />
              )}
      
              {errors[field.name] && (
                <p className="text-red-500 text-sm">{errors[field.name]}</p>
              )}
            </div>
          ))}
      
          <button
            onClick={handleAddEntry}
            className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded"
          >
            Add Entry
          </button>
        </div>
      </div>
      
      )}
    </div>
  );
}
