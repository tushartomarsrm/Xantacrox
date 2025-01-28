import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Navbar from "./Navbar";
import Student_Details from "./Student_Details";
import Education_Details from "./Education_Details";
import SkillsAndProficiency from "./SkillsAndProficiency";
import { useState } from "react";
import PdfManager from "./PdfManager"
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
import { Routes, Route } from "react-router-dom";
export default function Page() {
  const [blury, setB] = useState(true);
  setTimeout(() => {
    setB(false);
  }, 3000);
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Navbar />
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
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
          // <MainFramer />
        ) : (
          <>
            <Routes>
              <Route path="/profile" element={<Student_Details />} />
              <Route
                path="/profile/education"
                element={<Education_Details />}
              />
              <Route path="/profile/experiences" element={<ProfessionalExp />} />
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
                element={<Volunteerings/>}
              />
              <Route
                path="/profile/curricular"
                element={<ExtraCurriculars/>}
              />
              <Route
                path="/profile/resume"
                element={<PdfManager/>}
              />
            </Routes>
          </>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}
