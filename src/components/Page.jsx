import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import "../App.css";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MDCRipple } from "@material/ripple";
import {
  About,
  EducationGap,
  ContactInfo,
  AdditionalInfo,
  FamilyInformation,
  AddressForm,
  SocialMedia,
} from "./Student_Details";
import {
  ChevronDown,
  ChevronUp,
  Settings,
  Home,
  Info,
  Mail,
  Phone,
  User,
  HelpCircle,
  Bell,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Navbar from "./Navbar";

import Education_Details from "./Education_Details";
import SkillsAndProficiency from "./SkillsAndProficiency";
import PdfManager from "./PdfManager";
import TestScores from "./AccomplishMents/TestScores";
import {
  Projects,
  Publications,
  ExtraCurriculars,
  Scholarships,
  Conferences,
  Patents,
  Volunteerings,
  ProfessionalExp,
  Competitions,
  Certifications,
  AwardRecognition,
  Responsibilities,
} from "./AccomplishMents/AddPuSc";
import { Routes, Route, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import ProfileSection from "./ProfileSection";

export default function Page() {
  

  const sections = [
    "/profile/basicinfo",
    "/profile/education",
    "/profile/experiences",
    "/profile/skillsec",
    "/profile/responsibilities",
    "/profile/projects",
    "/profile/accomplishments",
    "/profile/volunteering",
    "/profile/curricular",
    "/profile/resume",
  ];
  const location = useLocation();
  const [showContent1, setShowContent1] = useState(false);
  const [showContent2, setShowContent2] = useState(false);
  const [showContent3, setShowContent3] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const newIndex = sections.indexOf(location.pathname);
    if (newIndex !== -1) {
      setCurrentIndex(newIndex);
    }
    setShowContent1(location.pathname.includes("profile/accomplishments"));
    setShowContent2(location.pathname.includes("profile/basicinfo"));
    setShowContent3(location.pathname.includes("profile"));
  }, [location.pathname]);
  useEffect(() => {
    const fabElement = document.querySelector(".mdc-fab");
    if (fabElement) {
      new MDCRipple(fabElement);
    }
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const accomNavigator = [
    { patH: "/profile/accomplishments", label: "Award&Recognitions" },
    {
      patH: "/profile/accomplishments/certifications",
      label: "Certifications",
    },
    { patH: "/profile/accomplishments/competitions", label: "Competitions" },
    { patH: "/profile/accomplishments/conferences", label: "Conferences" },
    { patH: "/profile/accomplishments/testscores", label: "TestScores" },
    { patH: "/profile/accomplishments/patents", label: "Patents" },
    { patH: "/profile/accomplishments/publications", label: "Publications" },
    { patH: "/profile/accomplishments/scholarships", label: "Scholarships" },
  ];
  const aboutNavigator = [
    { patH: "/profile/basicinfo", label: "About" },
    { patH: "/profile/basicinfo/gap", label: "Education Gap" },
    { patH: "/profile/basicinfo/contacts", label: "Contact Details" },
    { patH: "/profile/basicinfo/extradetails", label: "Additional Info" },
    { patH: "/profile/basicinfo/familyinfo", label: "Family Details" },
    { patH: "/profile/basicinfo/address", label: "Address Details" },
    { patH: "/profile/basicinfo/sociallinks", label: "Social Media" },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < sections.length - 1) {
      setCurrentIndex(currentIndex + 1);
      navigate(sections[currentIndex + 1]);
    }
  };
  const getVisiblePages = () => {
    let start = Math.max(0, currentIndex - 1);
    let end = Math.min(sections.length, start + 3);
    return sections.slice(start, end).map((_, i) => start + i);
  };
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      navigate(sections[currentIndex - 1]);
    }
  };
  const navigate = useNavigate();
  const [blury, setB] = useState(true);
  setTimeout(() => {
    setB(false);
  }, 3000);
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Navbar />
        <header className="relative  flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Basic Details</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          {/* {showContent && (
            <motion.button
              onClick={toggleMenu}
              className="absolute right-2 flex items-center justify-center w-14 h-14 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 focus:outline-none mdc-fab"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Floating Action Button"
            >
              {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </motion.button>
          )} */}
        </header>
        {blury ? (
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
          </div>
        ) : (
          // <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          //   <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          //   <div className="space-y-2">
          //     <Skeleton className="h-4 w-[250px]" />
          //     <Skeleton className="h-4 w-[200px]" />
          //   </div>
          // </div>
          // <MainFramer />
          <>
            <div className="relative w-full h-full  border-t-4 ">
              <div
                className="flex flex-col md:w-1/4 md:block hidden absolute left-0 h-full bg-white p-8 shadow-lg rounded-lg overflow-auto"
                style={{ scrollbarWidth: "thin" }}
              >
                <ProfileSection/>
              </div>
              <div className="w-full md:w-3/4 absolute right-0  overflow-y-auto custom-scroll h-full px-1 border-2 border-white">
                {showContent1 && (
                  <div
                    className="w-full overflow-x-scroll whitespace-nowrap p-2  flex "
                    id="color-scrollbar"
                  >
                    <div className="flex mx-auto gap-3 ">
                      {accomNavigator.map((aNI, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 bg-transparent outline-none focus:outline-none focus:ring-2 focus:ring-gray-500 border border-gray-300 focus:border-gray-500 hover:border-gray-600 hover:text-gray-800 focus:ring-opacity-50 transition-all shadow-sm cursor-pointer transform hover:scale-105 hover:shadow-lg"
                          onClick={() => navigate(aNI.patH)}
                        >
                          {aNI.label}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {showContent2 && (
                  <div
                    className="w-full overflow-x-scroll whitespace-nowrap p-2 shadow-md flex  "
                    id="color-scrollbar"
                  >
                    <div className="flex mx-auto gap-3">
                      {aboutNavigator.map((aNI, index) => (
                        <div
                          key={index}
                          className="
                          px-4 py-2 rounded-full text-sm font-medium text-gray-700 bg-transparent outline-none focus:outline-none focus:ring-2 focus:ring-gray-500 border border-gray-300 focus:border-gray-500 hover:border-gray-600 hover:text-gray-800 focus:ring-opacity-50 transition-all shadow-sm cursor-pointer transform hover:scale-105 hover:shadow-lg"
                          onClick={() => navigate(aNI.patH)}
                        >
                          {aNI.label}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="w-full flex justify-center items-center">
                  <Routes>
                    <Route path="/profile/basicinfo" element={<About />} />
                    <Route
                      path="/profile/basicinfo/gap"
                      element={<EducationGap />}
                    />
                    <Route
                      path="/profile/basicinfo/contacts"
                      element={<ContactInfo />}
                    />
                    <Route
                      path="/profile/basicinfo/extradetails"
                      element={<AdditionalInfo />}
                    />
                    <Route
                      path="/profile/basicinfo/familyinfo"
                      element={<FamilyInformation />}
                    />
                    <Route
                      path="/profile/basicinfo/address"
                      element={<AddressForm />}
                    />
                    <Route
                      path="/profile/basicinfo/sociallinks"
                      element={<SocialMedia />}
                    />
                    <Route
                      path="/profile/education"
                      element={<Education_Details />}
                    />
                    <Route
                      path="/profile/experiences"
                      element={<ProfessionalExp />}
                    />
                    <Route
                      path="/profile/skillsec"
                      element={<SkillsAndProficiency />}
                    />
                    <Route
                      path="/profile/responsibilities"
                      element={<Responsibilities />}
                    />
                    <Route path="/profile/projects" element={<Projects />} />
                    <Route
                      path="/profile/accomplishments"
                      element={<AwardRecognition />}
                    />
                    <Route
                      path="/profile/accomplishments/certifications"
                      element={<Certifications />}
                    />
                    <Route
                      path="/profile/accomplishments/competitions"
                      element={<Competitions />}
                    />
                    <Route
                      path="/profile/accomplishments/conferences"
                      element={<Conferences />}
                    />
                    <Route
                      path="/profile/accomplishments/testscores"
                      element={<TestScores />}
                    />
                    <Route
                      path="/profile/accomplishments/patents"
                      element={<Patents />}
                    />
                    <Route
                      path="/profile/accomplishments/publications"
                      element={<Publications />}
                    />
                    <Route
                      path="/profile/accomplishments/scholarships"
                      element={<Scholarships />}
                    />
                    <Route
                      path="/profile/volunteering"
                      element={<Volunteerings />}
                    />
                    <Route
                      path="/profile/curricular"
                      element={<ExtraCurriculars />}
                    />
                    <Route path="/profile/resume" element={<PdfManager />} />
                  </Routes>
                </div>
                {showContent3 && (
                  <div className="w-full flex justify-center items-center my-4">
                    <Button
                      onClick={handlePrev}
                      disabled={currentIndex === 0}
                      className="mx-4"
                    >
                      « Prev
                    </Button>
                    {getVisiblePages().map((index) => (
                      <Button
                        key={index}
                        onClick={() => {
                          setCurrentIndex(index);
                          navigate(sections[index]);
                        }}
                        variant={index === currentIndex ? "default" : "outline"}
                      >
                        {index + 1}
                      </Button>
                    ))}
                    <Button
                      onClick={handleNext}
                      disabled={currentIndex === sections.length - 1}
                      className="mx-4"
                    >
                      Next »
                    </Button>
                  </div>
                )}
              </div>

              {/* {showContent && (
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      style={{ width: "15rem" }}
                      className="absolute right-2 top-2  flex flex-col gap-4 bg-white p-4 rounded-xl shadow-xl border border-gray-200"
                    >
                      {accomNavigator.map(({label},index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-4 hover:bg-gray-100 px-4 py-2 rounded-lg cursor-pointer"
                        >
                    
                          <span className="text-gray-700 font-medium">
                            {label}
                          </span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              
            )} */}
            </div>
          </>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}
