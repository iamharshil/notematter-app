"use client";

import {
	ArchiveX,
	ArrowDownUpIcon,
	ChevronRight,
	Command,
	File,
	Inbox,
	PlusCircleIcon,
	PlusIcon,
	Send,
	StarIcon,
	Trash2,
	UsersIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useState } from "react";
import { NavUser } from "@/components/nav-user";
import { Label } from "@/components/ui/label";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInput,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { useAuthStore } from "@/utils/store";
import { Button } from "./ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";

// This is sample data
interface Props {
	notes: any;
	handleNewNote: () => void;
	handleFetchNode: (id: string) => void;
}

export function AppSidebar({ notes, handleNewNote, handleFetchNode }: Props) {
	const user = useAuthStore((s) => s.user);
	const router = useRouter();
	// Note: I'm using state to show active item.
	// IRL you should use the url/router.
	// const { setOpen } = useSidebar();

	if (!user?.email || !user.username) {
		router.push("/login");
	}

	return (
		<Sidebar
			// collapsible="icon"
			className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
		>
			{/* This is the second sidebar */}
			{/* We disable collapsible and let it fill remaining space */}
			<Sidebar collapsible="none" className="hidden flex-1 md:flex">
				<SidebarHeader className="gap-3.5 p-4 pb-0">
					<div className="flex w-full items-center justify-between">
						<div className="text-foreground text-xl font-bold">NoteMatter</div>
						<Label className="flex items-center gap-2 text-sm">
							<Button variant="link">
								<ArrowDownUpIcon className="shadow-none" size={16} />
								{/* <span>Sort</span> */}
							</Button>
						</Label>
					</div>

					<SidebarInput placeholder="Type to search..." />
					<SidebarGroup className="mx-0 px-0">
						<SidebarMenu className="gap-1">
							<SidebarMenuItem className="my-1">
								<SidebarMenuButton asChild>
									<Button onClick={handleNewNote}>
											<PlusCircleIcon className="text-black" />
											New Note
									</Button>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<Collapsible asChild defaultOpen={false} className="group/collapsible mt-1">
								<SidebarMenuItem>
									<CollapsibleTrigger asChild>
										<SidebarMenuButton>
											<StarIcon />
											Starred
											<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
										</SidebarMenuButton>
									</CollapsibleTrigger>
									<CollapsibleContent>
										<SidebarMenuSub>
											<SidebarMenuSubItem className="py-1">
												<SidebarMenuSubButton asChild>
													<a href="#test">
														<span>
															This is my starred note. This is my starred note. This is my
															starred note. This is my starred note.
														</span>
													</a>
												</SidebarMenuSubButton>
											</SidebarMenuSubItem>
										</SidebarMenuSub>
									</CollapsibleContent>
								</SidebarMenuItem>
							</Collapsible>
							<Collapsible asChild defaultOpen={false} className="group/collapsible">
								<SidebarMenuItem>
									<CollapsibleTrigger asChild>
										<SidebarMenuButton>
											<UsersIcon />
											Shared
											<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
										</SidebarMenuButton>
									</CollapsibleTrigger>
									<CollapsibleContent>
										<SidebarMenuSub className="py-1">
											<SidebarMenuSubButton asChild>
												<a href="#test2">
													<span>
														This is my shared note. This is my shared note. This is my
														shared note. This is my shared note. This is my shared note.
													</span>
												</a>
											</SidebarMenuSubButton>
										</SidebarMenuSub>
									</CollapsibleContent>
								</SidebarMenuItem>
							</Collapsible>
						</SidebarMenu>
					</SidebarGroup>
				</SidebarHeader>
				<SidebarContent>
					<SidebarGroup className="px-0 mt-3 pt-0 border-none">
						<SidebarGroupLabel className="px-4 mt-2 mb-0">Recent notes</SidebarGroupLabel>
						<SidebarGroupContent className="px-2">
							{notes.map((note) => (
								<Button
									type="button"
									variant="link"
									key={note._id}
									className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex justify-between items-start gap-2 px-4 py-2 my-1 text-sm leading-tight whitespace-nowrap last:border-b-0 w-full hover:no-underline"
									onClick={() => handleFetchNode(note._id)}
								>
									<span>{note.name}</span>
									{note?.starred && <StarIcon size={14} />}
								</Button>
							))}
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
				<SidebarFooter className="border-t">
					<NavUser user={user} />
				</SidebarFooter>
			</Sidebar>
		</Sidebar>
	);
}
