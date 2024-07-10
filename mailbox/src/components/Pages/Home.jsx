import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { CircleBackslashIcon } from "@radix-ui/react-icons";
import ComposeMail from "./ComposeMail";
import { useEffect, useState } from "react";

export default function Home() {
  const navigate = useNavigate();
  const [toggleCompose, setToggleCompose] = useState(false);
  const [messageType, setMessageType] = useState("inbox"); // Add messageType state

  const toggleComposes = () => {
    setToggleCompose((prev) => !prev);
  };

  const handleNavClick = (type) => {
    setMessageType(type);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      {toggleCompose && <ComposeMail setToggleCompose={setToggleCompose} />}
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <div className="flex h-14 items-center justify-between px-4">
              <Link
                to="/inbox"
                onClick={() => handleNavClick("inbox")}
                className="flex items-center gap-2"
                prefetch={false}
              >
                <MailIcon className="h-6 w-6" />
                <span className="text-lg font-semibold">Acme Mail</span>
              </Link>
              <Button variant="ghost" size="icon" className="rounded-full">
                <XIcon className="h-5 w-5" />
              </Button>
            </div>
            <nav className="grid gap-2 px-4 py-6">
              <Link
                to="/inbox"
                onClick={() => handleNavClick("inbox")}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                prefetch={false}
              >
                <InboxIcon className="h-5 w-5" />
                Inbox
              </Link>
              <Link
                to="/sentMail"
                onClick={() => handleNavClick("sent")}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                prefetch={false}
              >
                <SendIcon className="h-5 w-5" />
                Sent
              </Link>
              <Link
                to="/drafts"
                onClick={() => handleNavClick("drafts")}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                prefetch={false}
              >
                <DraftingCompassIcon className="h-5 w-5" />
                Drafts
              </Link>
              <Link
                to="/trash"
                onClick={() => handleNavClick("trash")}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                prefetch={false}
              >
                <TrashIcon className="h-5 w-5" />
                Trash
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                prefetch={false}
              >
                <TagIcon className="h-5 w-5" />
                Labels
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <Link to="/" className="flex items-center gap-2" prefetch={false}>
          <MailIcon className="h-6 w-6" />
          <span className="text-lg font-semibold">MailBox</span>
        </Link>

        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <img
                  src="/placeholder.svg"
                  width={32}
                  height={32}
                  alt="Avatar"
                  className="rounded-full"
                />
                <span className="sr-only">User Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden border-r bg-background sm:block">
          <div className="flex flex-col gap-4 p-4">
            <Button className="w-full" onClick={toggleComposes}>
              <PlusIcon className="h-5 w-5 mr-2" />
              Compose
            </Button>
            <nav className="grid gap-1">
              <NavLink
                to="/inbox"
                onClick={() => handleNavClick("inbox")}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                prefetch={false}
              >
                <InboxIcon className="h-5 w-5" />
                Inbox
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  12
                </Badge>
              </NavLink>
              <NavLink
                to="/sentMail"
                onClick={() => handleNavClick("sent")}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                prefetch={false}
              >
                <SendIcon className="h-5 w-5" />
                Sent
              </NavLink>
              <Link
                to="/drafts"
                onClick={() => handleNavClick("drafts")}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                prefetch={false}
              >
                <DraftingCompassIcon className="h-5 w-5" />
                Drafts
              </Link>
              <Link
                to="/trash"
                onClick={() => handleNavClick("trash")}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                prefetch={false}
              >
                <TrashIcon className="h-5 w-5" />
                Trash
              </Link>
            </nav>
            <Separator />
            <nav className="grid gap-1">
              <Link
                href="#"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                prefetch={false}
              >
                <TagIcon className="h-5 w-5" />
                Work
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                prefetch={false}
              >
                <TagIcon className="h-5 w-5" />
                Personal
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                prefetch={false}
              >
                <TagIcon className="h-5 w-5" />
                Promotions
              </Link>
            </nav>
          </div>
        </aside>
        <main className="flex flex-1 flex-col">
          {/* <div className="px-6 py-4">
            <h1 className="text-2xl font-semibold">
              {messageType.charAt(0).toUpperCase() + messageType.slice(1)}{" "}
              Messages
            </h1>
          </div> */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
function DraftingCompassIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="5" r="2" />
      <path d="m3 21 8.02-14.26" />
      <path d="m12.99 6.74 1.93 3.44" />
      <path d="M19 12c-3.87 4-10.13 4-14 0" />
      <path d="m21 21-2.16-3.84" />
    </svg>
  );
}

function ForwardIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 17 20 12 15 7" />
      <path d="M4 18v-2a4 4 0 0 1 4-4h12" />
    </svg>
  );
}

function InboxIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  );
}

function MailIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function ReplyIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 17 4 12 9 7" />
      <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function SendIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function TagIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
      <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
    </svg>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
