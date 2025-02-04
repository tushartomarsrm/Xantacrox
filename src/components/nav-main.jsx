/* eslint-disable react/prop-types */

"use client";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavMain({ items }) {
  const navigate = useNavigate();
  // const handleClickPrevent = (e)=?
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              {item.items ? (
                <a
                  // href="#"
                  // onClick={(e) => {
                  //   e.preventDefault();
                  //   navigate(item.url);
                  // }}
                >
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}

                      <span>{item.title}</span>

                      {item.items && (
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                </a>
              ) : (
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.url);
                  }}
                >
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}

                    <span>{item.title}</span>

                    {item.items && (
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    )}
                  </SidebarMenuButton>
                </a>
              )}

              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            {
                              subItem.url
                                ? navigate(`${item.url}/${subItem.url}`)
                                : navigate(item.url);
                            }
                          }}
                        >
                          <span>{subItem.title}</span>
                          
                        </a>

                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
/* eslint-disable react/prop-types */


// "use client";
// import { ChevronRight } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import {
//   SidebarGroup,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSub,
//   SidebarMenuSubButton,
//   SidebarMenuSubItem,
// } from "@/components/ui/sidebar";

// export function NavMain({ items }) {
//   const navigate = useNavigate();

//   const renderMenuItems = (items, parentUrl = '') => {
//     return items.map((item) => {
//       // Construct the current item's URL based on the parent URL
//       const currentUrl = parentUrl ? `${parentUrl}/${item.url}` : item.url;

//       return (
//         <Collapsible
//           key={item.title}
//           asChild
//           defaultOpen={item.isActive}
//           className="group/collapsible"
//         >
//           <SidebarMenuItem>
//             {item.items ? (
//               <a
//                 // href="#"
//                 // onClick={(e) => {
//                 //   e.preventDefault();
//                 //   navigate(currentUrl);
//                 // }}
//               >
//                 <CollapsibleTrigger asChild>
//                   <SidebarMenuButton tooltip={item.title}>
//                     {item.icon && <item.icon />}

//                     <span>{item.title}</span>

//                     {item.items && (
//                       <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
//                     )}
//                   </SidebarMenuButton>
//                 </CollapsibleTrigger>
//               </a>
//             ) : (
//               <a
//                 href="#"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   navigate(currentUrl); // Navigate using the constructed URL
//                 }}
//               >
//                 <SidebarMenuButton tooltip={item.title}>
//                   {item.icon && <item.icon />}

//                   <span>{item.title}</span>

//                   {item.items && (
//                     <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
//                   )}
//                 </SidebarMenuButton>
//               </a>
//             )}

//             {item.items && (
//               <CollapsibleContent>
//                 <SidebarMenuSub>
//                   {renderMenuItems(item.items, currentUrl)} {/* Recursive rendering with updated URL */}
//                 </SidebarMenuSub>
//               </CollapsibleContent>
//             )}
//           </SidebarMenuItem>
//         </Collapsible>
//       );
//     });
//   };

//   return (
//     <SidebarGroup>
//       <SidebarGroupLabel>Platform</SidebarGroupLabel>
//       <SidebarMenu>{renderMenuItems(items)}</SidebarMenu>
//     </SidebarGroup>
//   );
// }
