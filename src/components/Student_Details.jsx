import { useState, useEffect, useRef } from "react";
import about_data from "../json-content/student-profile";
import "@fortawesome/fontawesome-free/css/all.min.css";
import aboutFieldsData from "../json-content/Labelsjson/inputs-labels";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import FormField from "./CommonDialogs/FormField";
const StudentSection = ({ sectionKey, sectionTitle, showSummary }) => {
  const [abfoda, setAbfoda] = useState(about_data);
  const [aboutFields, setAboutFields] = useState(aboutFieldsData);
  const quillRef = useRef(null);
  const editorRef = useRef(null);


  useEffect(() => {
    if (showSummary && editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Enter summary...",
        modules: {
          toolbar: [
            ["bold", "italic", "underline"],
            [{ link: true }],
            [{ list: "ordered" }, { list: "bullet" }],
          ],
        },
      });
      quillRef.current.on("text-change", () => {
        const newText = quillRef.current.root.innerHTML;
        setAbfoda((prev) => ({
          ...prev,
          [0]: {
            ...prev[0],
            summary: {
              ...prev[0].summary,
              text: newText,
            },
          },
        }));
      });
    }
    if (
      showSummary &&
      quillRef.current &&
      quillRef.current.root.innerHTML !== abfoda[0].summary.text
    ) {
      quillRef.current.root.innerHTML = abfoda[0].summary.text || "";
    }
  }, [abfoda[0].summary.text, showSummary]);

  const handleEditClick = () => {
    setAbfoda((prev) => ({
      ...prev,
      [0]: {
        ...prev[0],
        [sectionKey]: { ...prev[0][sectionKey], isEditable: true },
      },
    }));
  };
  const handleSaveClick = () => {
    setAbfoda((prev) => ({
      ...prev,
      [0]: {
        ...prev[0],
        [sectionKey]: {
          ...prev[0][sectionKey],
          isFreezed: true,
          isEditable: false,
        },
      },
    }));
  };

  const handleInputChange = (e, field) => {
    let value = e.target.value;
    if (e.target.type === "checkbox") {
      value = e.target.checked ? "true" : "false";
    }
    if (
      sectionKey === "address" &&
      e.target.type === "checkbox" &&
      value === "true"
    ) {
      // When checkbox is checked, copy current address to permanent address
      setAbfoda((prev) => ({
        ...prev,
        0: {
          ...prev[0],
          address: {
            ...prev[0].address,
            isSameAs: "true",
            houseNumberPermanent: prev[0].address.houseNumberCurrent,
            line1Permanent: prev[0].address.line1Current,
            line2Permanent: prev[0].address.line2Current,
            cityPermanent: prev[0].address.cityCurrent,
            districtPermanent: prev[0].address.districtCurrent,
            statePermanent: prev[0].address.stateCurrent,
            zipCodePermanent: prev[0].address.zipCodeCurrent,
            countryPermanent: prev[0].address.countryCurrent,
          },
        },
      }));
      return;
    }
    setAbfoda((prev) => ({
      ...prev,
      0: {
        ...prev[0],
        [sectionKey]: {
          ...prev[0][sectionKey],
          [field]: value,
        },
      },
    }));
  };
  // useEffect(() => {
  //   console.log(abfoda[0].educationGap);
  //   console.log(abfoda[0].contactInfo);
  // }, [abfoda[0].educationGap,abfoda[0].contactInfo]);

  return (
    <div className="w-full p-6 bg-white rounded-xl shadow-md">
      <div className="w-full flex flex-wrap justify-evenly align-middle gap-6 mx-auto">
        <h2 className="text-2xl font-bold w-full flex justify-between items-center border-b pb-3">
          <span className="text-center flex-grow">{sectionTitle}</span>
          <i
            className={`fas ${
              abfoda[0][sectionKey].isFreezed
                ? "fa-lock text-gray-500"
                : "fa-pencil-alt text-blue-500"
            } text-lg cursor-pointer transition-transform duration-200 hover:scale-110`}
            onClick={() => {
              if (!abfoda[0][sectionKey].isFreezed) {
                handleEditClick();
              }
            }}
          />
        </h2>

        {aboutFields[sectionKey]?.map((field) => (
          <FormField
            key={field.keY}
            field={field}
            value={abfoda[0][sectionKey][field.keY]}
            onChange={(e) => handleInputChange(e, field.keY)}
            isEditable={
              [
                "houseNumberPermanent",
                "line1Permanent",
                "line2Permanent",
                "cityPermanent",
                "districtPermanent",
                "statePermanent",
                "zipCodePermanent",
                "countryPermanent",
              ].includes(field.keY) && abfoda[0][sectionKey].isSameAs === "true"
                ? false
                : abfoda[0][sectionKey].isEditable
            }
          />
        ))}

        <div className="w-full flex justify-center">
          {abfoda[0][sectionKey].isEditable && (
            <button
              onClick={handleSaveClick}
              className="bg-green-500 text-white px-8 py-2 rounded-full shadow-lg mt-4"
            >
              Save
            </button>
          )}
        </div>
        {showSummary && (
          <div className="mt-1 w-full md:w-10/12">
            <label className="text-sm font-semibold">Brief Summary :</label>
            <div
              ref={editorRef}
              className="border rounded bg-white overflow-auto h-auto max-h-20"
            />
          </div>
        )}
      </div>
    </div>
  );
};

function About() {
  return (
    <>
      <StudentSection
        sectionKey="about"
        sectionTitle="About"
        showSummary={true}
      />
    </>
  );
}
function EducationGap() {
  return (
    <>
      <StudentSection
        sectionKey="educationGap"
        sectionTitle="Education Gap"
        showSummary={false}
      />
    </>
  );
}
function ContactInfo() {
  return (
    <>
      <StudentSection
        sectionKey="contactInfo"
        sectionTitle="Contact Info"
        showSummary={false}
      />
    </>
  );
}
function AdditionalInfo() {
  return (
    <>
      <StudentSection
        sectionKey="additionalInfo"
        sectionTitle="Additional Info"
        showSummary={false}
      />
    </>
  );
}
function FamilyInformation() {
  return (
    <>
      <StudentSection
        sectionKey="familyInformation"
        sectionTitle="Family Information"
        showSummary={false}
      />
    </>
  );
}
function AddressForm() {
  return (
    <StudentSection
      sectionKey="address"
      sectionTitle="Address"
      showSummary={false}
    />
  );
}

export {
  About,
  EducationGap,
  ContactInfo,
  AdditionalInfo,
  FamilyInformation,
  AddressForm,
};

import validator from 'validator';

const SocialMedia = () => {
  const [socialMedia, setSocialMedia] = useState(about_data[0].socialMedia);

  const [newPlatform, setNewPlatform] = useState('');
  const [newLink, setNewLink] = useState('');
  const [error, setError] = useState('');

  const handleEdit = (index) => {
    const updatedSocialMedia = [...socialMedia];
    updatedSocialMedia[index].editing = !updatedSocialMedia[index].editing;
    setSocialMedia(updatedSocialMedia);
  };

  const handleSave = (index) => {
    const updatedSocialMedia = [...socialMedia];
    updatedSocialMedia[index].editing = false;
    setSocialMedia(updatedSocialMedia);
  };

  const handleDelete = (index) => {
    const updatedSocialMedia = socialMedia.filter((_, i) => i !== index);
    setSocialMedia(updatedSocialMedia);
  };

  const handleAdd = () => {
    // Check if the platform name is valid (at least 2 characters long)
    if (!newPlatform || newPlatform.length < 2) {
      setError('Platform name must be at least 2 characters long.');
      return;
    }
  
    // Check if the URL is valid using validator
    if (!newLink || !validator.isURL(newLink)) {
      setError('Please provide a valid URL.');
      return;
    }
  
    // Check if the URL has a reasonable minimum length
    if (newLink.length < 10) {
      setError('URL is too short. Please provide a complete link.');
      return;
    }
  
    // Reset error and add the new social media entry
    const newEntry = { platform: newPlatform, link: newLink, editing: false };
    setSocialMedia([...socialMedia, newEntry]);
    setNewPlatform('');
    setNewLink('');
    setError('');
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Social Media Links</h3>
      
      <div className="space-y-4">
        {socialMedia.map((social, index) => (
          <div key={index} className="flex flex-col bg-white p-4 rounded-lg shadow-lg border border-gray-200">
            {social.editing ? (
              <div className="flex flex-col space-y-2 w-full">
                <input
                  type="text"
                  value={social.platform}
                  onChange={(e) => {
                    const updatedSocialMedia = [...socialMedia];
                    updatedSocialMedia[index].platform = e.target.value;
                    setSocialMedia(updatedSocialMedia);
                  }}
                  className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="url"
                  value={social.link}
                  onChange={(e) => {
                    const updatedSocialMedia = [...socialMedia];
                    updatedSocialMedia[index].link = e.target.value;
                    setSocialMedia(updatedSocialMedia);
                  }}
                  className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <div className="flex items-center space-x-3 mt-3">
                  <button 
                    onClick={() => handleSave(index)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-xl font-semibold text-gray-800 truncate">{social.platform}</h4>
                  <div className="flex flex-nowrap">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-blue-500 hover:text-blue-700 transition ml-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-500 hover:text-red-700 transition ml-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <a
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline block truncate w-full"
                >
                  {social.link}
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <h4 className="text-xl font-semibold text-gray-800 mb-4">Add New Social Media Platform</h4>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Platform Name"
            value={newPlatform}
            onChange={(e) => setNewPlatform(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="url"
            placeholder="Platform Link"
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {error && <p className="text-red-600">{error}</p>}
          <button
            onClick={handleAdd}
            className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
export  {SocialMedia};
