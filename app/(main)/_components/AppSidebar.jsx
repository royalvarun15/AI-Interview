"use client"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SideBarOptions } from "@/services/Constants"
import { Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function AppSidebar() {

  const path=usePathname();
  console.log(path);
  return (
    <Sidebar>
      <SidebarHeader className='flex items-center mt-5'>
        <Image src={'/HireMind.png'} alt="logo" width={200} height={100}
        className="w-[150px]" />
        <Link href={'/dashboard/create-interview'} className='cursor-pointer'>
        <Button className='w-full mt-5'> <Plus/> Create New Interview </Button>
        </Link>
        </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
            <SidebarContent>
              <SidebarMenu>
                {SideBarOptions.map((Option,index)=>(
                  <SidebarMenuItem key={index} className='p-1'>
                    <SidebarMenuButton asChild className={`p-5 ${path==Option.path&&'bg-violet-200'}`}>
                      <Link href={Option.path}>
                      <Option.icon className={`${path==Option.path&&'text-primary'}`}/>
                      <span className={`text-[16px] font-medium ${path==Option.path&&'text-primary'}`}>{Option.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}