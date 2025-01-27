

import scholarshipData from "../../json-content/Accomplishments/scholarship-data.json";
import conferenceData from "../../json-content/Accomplishments/conferences-data.json";
import awardRecognitionData from "../../json-content/Accomplishments/award-recognition.json";
//f1-publicationData scholarshipData
//f2-title,name
//f3-publisher,awardedBy
//f4-publicationurl,proofurl
//f5-publicationdate,dateAwarded
//f6-description,desciption
//f7-Publications,Scholarships
import competitionData from "../../json-content/Accomplishments/competitions-data.json";
import publicationData from "../../json-content/Accomplishments/publication-data.json";
import PubSchoDetailsDisplay from "./PubSchoDetailsDisplay";
import patentData from "../../json-content/Accomplishments/patent-data.json";
import PatentDetailsDisplay from "./PatentDetailsDisplay";
import professionalExperiences from "../../json-content/professional-experience";
import projectsDetail from "../../json-content/projects-information";
import certificationData from "../../json-content/Accomplishments/certification-data.json"

   
const Projects = () =>{
    return (
        <PatentDetailsDisplay
        f1={projectsDetail}
        f2="title"
        f3="domain"
        f4="individualOrGroup"
        f5="associatedWith"
        f6="startDate"
        f7="issueDate"
        f8="githubUrl"
        f9="workingUrl"
        f10="description"
        f11="Projects"
        />
    )
} 

  
const Certifications = () =>{
    return (
        <PatentDetailsDisplay
        f1={certificationData}
        f2="name"
        f3="authority"
        f4="modeOfExam"
        f5="score"
        f6="dateOfIssue"
        f7="issueDate"
        f8="license_number"
        f9="url"
        f10="description"
        f11="Certifications"
        />
    )
} 
const Competitions = ()=>{
    return (
        <PatentDetailsDisplay 
        f1={competitionData}
        f2="name"
        f3="location"
        f4="organizer"
        f5="groupOrIndividual"
        f6="startDate"
        f7="issueDate"
        f8="prizes"
        f9="url"
        f10="description"
        f11="Competitions"
        />
    
    )
}
const ProfessionalExp = ()=>{
    return (
        <PatentDetailsDisplay 
        f1={professionalExperiences}
        f2="companyName"
        f3="companySector"
        f4="jobTitle"
        f5="jobLocation"
        f6="startDate"
        f7="issueDate"
        f8="positionType"
        f9="projectUrl"
        f10="description"
        f11="Experiences"
        />
    )
}
        
const Patents = () => {
    return (
      <PatentDetailsDisplay
        f1={patentData}
        f2="patentTitle"
        f3="patentOffice"
        f4="applicationStatus"
        f5="patentStatus"
        f6="filingDate"
        f7="issueDate"
        f8="patentNumber"
        f9="patentUrl"
        f10="description"
        f11="Patents"
      />
    );
  };
  
const Publications = ()=>{
    return (
        <PubSchoDetailsDisplay 
        f1={publicationData}
        f2="title"
        f3="publisher"
        f4="publicationurl"
        f5="publicationdate"
        f6="description"
        f7="Publications"
        />
    )
}
const Scholarships = ()=>{
    return (
        <PubSchoDetailsDisplay 
        f1={scholarshipData}
        f2="name"
        f3="awardedBy"
        f4="proofurl"
        f5="dateAwarded"
        f6="description"
        f7="Scholarships"
        />
    )
}
const Conferences = ()=>{
    return (
        <PubSchoDetailsDisplay 
        f1={conferenceData}
        f2="title"
        f3="organiser"
        f4="google_drive_link"
        f5="event_date"
        f6="description"
        f7="Conferences"
        />
    )
}
const AwardRecognition = ()=>{
    return (
        <PubSchoDetailsDisplay 
        f1={awardRecognitionData}
        f2="title"
        f3="issuer"
        f4="proofUrl"
        f5="issueDate"
        f6="description"
        f7="Award/Recognitions"
        />
    )
}
export {Publications,Scholarships,Conferences,Patents,ProfessionalExp,Competitions,Certifications,AwardRecognition,Projects};



