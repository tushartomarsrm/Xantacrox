"use client"

// import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Welcome !",
    email: "xanthacrox@gmail.com",
    avatar: "/AppIcons/CoderImageAppIcon.gif",
  },
  teams: [
    {
      name: "Tushar Coders",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Mukul Coders",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: SquareTerminal,
      items:null
    },
    {
      title: "Jobs",
      url: "/",
      icon: SquareTerminal,
      items:null
    },
    
    {
      title: "Profile",
      url: "/profile",
      icon: Bot,
      isActive:true,
      items: [
        {
          title: "About",
          url: "",
        },
        {
          title: "Education",
          url: "education",
        },
        {
          title: "Work Experience",
          url: "experiences",
        },
        {
          title: "Skills & Proficiency",
          url: "skillsec",
        },
        {
          title: "Resposibilities",
          url: "responsibilities",
        },
        {
          title: "Projects",
          url: "projects",
        },
        {
          title: "Accomplishments",
          url: "accomplishments",
        },
        {
          title: "Volunteering",
          url: "volunteering",
        },
        {
          title: "Extra-curricular Details",
          url: "curricular",
        },
        {
          title: "Resume Section",
          url: "resume",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar(props) {
  return (
    <Sidebar collapsible="icon" {...props} variant="sidebar">
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );

}
