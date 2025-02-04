import axios from "axios";
import { useState,useEffect } from "react";
export default function ProfileSection() {
//   const [profilePic, setProfilePic] = useState(null);
  const [placementStats, setPlacementStats] = useState({
    eligibleJobs: 10,
    appliedJobs: 7,
    eligibleNotApplied: 3,
    notEligible: 5,
    offers: 2,
  });
  const [dialogData, setDialogData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const userData = {
    name: "Tushar",
    age: 23,
    campus: "XYZ Campus",
    batch: "2023",
    course: "Computer Science",
    specialization: "AI & Machine Learning",
  };

  const handleFileChange = async (e) => {
    // const file = e.target.files[0];
    // if (file) {
    //   setProfilePic(URL.createObjectURL(file));
    // }
    const file = e.target.files[0]; // Restrict to a single file
    if (!file) return;
    // Preview the selected image

    // Automatically upload the file upon selection
    const formData = new FormData();
    formData.append("folder", "profilepic");
    formData.append("customName", "profilepic");
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:3000/upload", formData);
      alert("File uploaded successfully!");

    } catch (error) {
      console.error("Failed to upload file", error);
      alert("Failed to upload file. Please try again.");
    }
  };

  const placementRows = [
    {
      type: "Eligible Jobs",
      count: placementStats.eligibleJobs,
      details: [
        {
          companyName: "Company A",
          role: "Software Engineer",
          ctc: "12 LPA",
          type: "ILP",
        },
        {
          companyName: "Company B",
          role: "Data Scientist",
          ctc: "15 LPA",
          type: "Full-Time",
        },
      ],
    },
    {
      type: "Applied Jobs",
      count: placementStats.appliedJobs,
      details: [
        {
          companyName: "Company C",
          role: "Frontend Developer",
          ctc: "9 LPA",
          type: "Full-Time",
        },
        {
          companyName: "Company D",
          role: "Backend Developer",
          ctc: "11 LPA",
          type: "ILP",
        },
        {
          companyName: "Company D",
          role: "Backend Developer",
          ctc: "11 LPA",
          type: "ILP",
        },
        {
          companyName: "Company D",
          role: "Backend Developer",
          ctc: "11 LPA",
          type: "ILP",
        },
        {
          companyName: "Company D",
          role: "Backend Developer",
          ctc: "11 LPA",
          type: "ILP",
        },
        {
          companyName: "Company D",
          role: "Backend Developer",
          ctc: "11 LPA",
          type: "ILP",
        },
        {
          companyName: "Company D",
          role: "Backend Developer",
          ctc: "11 LPA",
          type: "ILP",
        },
        {
          companyName: "Company D",
          role: "Backend Developer",
          ctc: "11 LPA",
          type: "ILP",
        },
        {
          companyName: "Company D",
          role: "Backend Developer",
          ctc: "11 LPA",
          type: "ILP",
        },
        {
          companyName: "Company D",
          role: "Backend Developer",
          ctc: "11 LPA",
          type: "ILP",
        },
        {
          companyName: "Company D",
          role: "Backend Developer",
          ctc: "11 LPA",
          type: "ILP",
        },
        {
          companyName: "Company D",
          role: "Backend Developer",
          ctc: "11 LPA",
          type: "ILP",
        },
        {
          companyName: "Company D",
          role: "Backend Developer",
          ctc: "11 LPA",
          type: "ILP",
        },
        {
          companyName: "Company D",
          role: "Backend Developer",
          ctc: "11 LPA",
          type: "ILP",
        },
        {
          companyName: "Company D",
          role: "Backend Developer",
          ctc: "11 LPA",
          type: "ILP",
        },
      ],
    },
    {
      type: "Not Applied",
      count: placementStats.eligibleNotApplied,
      details: [
        {
          companyName: "Company E",
          role: "UI/UX Designer",
          ctc: "8 LPA",
          type: "Full-Time",
        },
        {
          companyName: "Company F",
          role: "Business Analyst",
          ctc: "10 LPA",
          type: "ILP",
        },
      ],
    },
    {
      type: "Not Eligible",
      count: placementStats.notEligible,
      details: [
        {
          companyName: "Company G",
          role: "Tech Support",
          ctc: "6 LPA",
          type: "Internship",
        },
        {
          companyName: "Company H",
          role: "Sales Executive",
          ctc: "7 LPA",
          type: "Internship",
        },
      ],
    },
    {
      type: "Offers",
      count: placementStats.offers,
      details: [
        {
          companyName: "Company I",
          role: "Product Manager",
          ctc: "18 LPA",
          type: "Full-Time",
        },
      ],
    },
  ];

  const openDialog = (row) => {
    setDialogData(row);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setDialogData(null);
  };
  return (
    <>
      {/* Profile Picture Section */}
      <div className="flex justify-center mb-6">
        <div className="relative w-32 aspect-square rounded-full border-2 border-gray-400 ">
          <img
            src="/ProfilePic/profilepiic.jpg"
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
          <label
            htmlFor="file-upload"
            className="absolute bottom-0 right-0 bg-gray-200  text-gray-800 rounded-full p-2 cursor-pointer"
          >
            <i className="fas fa-camera"></i>
          </label>
        </div>

        <input
          type="file"
          id="file-upload"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          multiple = {false}
        />
      </div>

      {/* User Details Section */}
      <div className="text-center mb-3">
        <h2 className="text-xl font-bold mb-2">{userData.name}</h2>
        <p className="text-xs text-gray-600">Age: {userData.age}</p>
        <p className="text-xs text-gray-600">Campus: {userData.campus}</p>
        <p className="text-xs text-gray-600">Batch: {userData.batch}</p>
        <p className="text-xs text-gray-600">Course: {userData.course}</p>
        <p className="text-xs text-gray-600">
          Specialization: {userData.specialization}
        </p>
      </div>

      {/* Placement Stats Section */}
      <div className="p-2 rounded-lg shadow-md bg-white">
        <h3 className="text-lg font-semibold mb-1 text-gray-700 text-center">
          Placement Stats
        </h3>
        {placementRows.map((row, index) => (
          <div
            key={index}
            className="mb-0.5 px-2 bg-gray-50 rounded-lg cursor-pointer transition-colors hover:bg-gray-200"
            onClick={() => openDialog(row)}
          >
            <div className="flex justify-between items-center">
              <p className="text-gray-700 text-sm">{row.type}</p>
              <span className="text-gray-500 text-sm">{row.count}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 p-6 rounded shadow-lg bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div
            className="bg-white  max-w-xl p-3 rounded shadow-xl transform transition-all duration-300 ease-in-out scale-105 max-h-[80vh] overflow-y-auto"
            style={{ scrollbarWidth: "thin" }}
          >
            <div className="flex items-center mb-4">
              <h3 className="text-lg font-semibold  flex-grow text-center">
                {dialogData.type} Details
              </h3>
              <i
                className="hover:bg-gray-100 cursor-pointer text-gray-600 p-2 rounded-full transition-colors duration-200 ease-in-out"
                onClick={closeDialog}
              >
                X
              </i>
            </div>

            {/* Conditionally render content */}
            {dialogData.details.length > 0 ? (
              <div className="flex flex-wrap justify-center gap-6">
                {dialogData.details.map((job, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out  xs:w-1/3 sm:w-1/4 min-w-[200px]"
                  >
                    <p className="text-md font-semibold text-gray-800">
                      {job.companyName}
                    </p>
                    <p className="text-sm text-gray-700">{job.role}</p>
                    <p className="text-xs text-gray-500">{job.ctc}</p>
                    <p className="text-xs text-gray-500">{job.type}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-lg text-gray-600">
                <span>😔 No items to show!</span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
