"use client";

import { ArchiveX, Inbox, Send, Trash2 } from "lucide-react";
import { useState } from "react";
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
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { apiCall } from "@/utils/apis";

export const data = [
  {
    _id: 1,
    name: "Note one",
    starred: false,
    slug: "note-one",
  },
  {
    _id: 2,
    name: "Project ideas",
    starred: true,
    slug: "project-ideas",
  },
  {
    _id: 3,
    name: "Shopping list",
    starred: false,
    slug: "shopping-list",
  },
  {
    _id: 4,
    name: "Learning goals",
    starred: true,
    slug: "learning-goals",
  },
  {
    _id: 5,
    name: "Workout plan",
    starred: false,
    slug: "workout-plan",
  },
  {
    _id: 6,
    name: "Travel checklist",
    starred: false,
    slug: "travel-checklist",
  },
  {
    _id: 7,
    name: "Book notes",
    starred: true,
    slug: "book-notes",
  },
  {
    _id: 8,
    name: "Meeting summary",
    starred: false,
    slug: "meeting-summary",
  },
  {
    _id: 9,
    name: "UI ideas",
    starred: true,
    slug: "ui-ideas",
  },
  {
    _id: 10,
    name: "Brain dump",
    starred: false,
    slug: "brain-dump",
  },
];

const newNote = {
	name: "New Note",
	starred: false,
	slug: "new-note",
}

export default function Page() {
	const [notes, setNotes] = useState(data);
	// const [note, setNote] = useState("");
	// const [preview, setPreview] = useState(false);

	const handleNewNote = async () => {
		console.log("new note");
		setNotes((prev) => [{...newNote, _id: prev.length + 1}, ...prev]);
	};

	// store notes with debounce on input.
	const handleFetchNote = async (id: string) => {
		const result = await apiCall(`/notes/${id}`);
		console.log("fetch note", result);
	}

	return (
		<SidebarProvider
			style={
				{
					"--sidebar-width": "350px",
				} as React.CSSProperties
			}
		>
			<AppSidebar notes={notes} handleNewNote={handleNewNote} handleFetchNode={handleFetchNote} />
			<SidebarInset>
				<header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink href="#">All Inboxes</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block" />
							<BreadcrumbItem>
								<BreadcrumbPage>Inbox</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4">
					{Array.from({ length: 24 }).map((_, index) => (
						<div key={index} className="bg-muted/50 aspect-video h-12 w-full rounded-lg" />
					))}
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
