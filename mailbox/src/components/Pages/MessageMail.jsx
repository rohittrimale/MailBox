import { Button } from "../../components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "../../components/ui/card";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../components/ui/avatar";
import { useEffect, useState } from "react";
import axios from "axios";
import HtmlRenderer from "../HtmlRenderer";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSentMessage,
  updateEmailReadStatus,
} from "../../slice/mailBoxSlice";

export default function MessageMail() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { messageId } = useParams();
  const user = useSelector((state) => state.user.user);
  const [messageData, setMessageData] = useState();
  console.log(location.pathname);

  const getMessageData = async () => {
    console.log(location.pathname);
    let data;
    if (location.pathname.includes("sent")) {
      data = await dispatch(
        fetchSentMessage({ email: user.email, id: messageId, type: "sentMail" })
      );
    } else {
      data = await dispatch(
        fetchSentMessage({
          email: user.email,
          id: messageId,
          type: "receivedMail",
        })
      );
      const updateReadStatus = dispatch(
        updateEmailReadStatus({
          email: user.email,
          id: messageId,
          readStatus: true,
        })
      );
    }
    setMessageData(data.payload);
  };

  useEffect(() => {
    getMessageData();
  }, [location, messageId]);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <main className="flex-1 p-4 sm:p-6">
        <div className="mt-6 grid gap-6">
          <Card>
            <CardHeader className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10 border">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>
                    <p>{messageData?.sender?.displayName.charAt(0)}</p>
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-medium">
                    {messageData?.sender?.displayName}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {messageData?.sender?.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <ReplyIcon className="h-5 w-5" />
                  <span className="sr-only">Reply</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <ForwardIcon className="h-5 w-5" />
                  <span className="sr-only">Forward</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <MoveVerticalIcon className="h-5 w-5" />
                  <span className="sr-only">More</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive"
                >
                  <Trash2Icon className="h-5 w-5" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 py-6">
              <h2 className="text-2xl font-medium">{messageData?.subject}</h2>
              <p className="text-muted-foreground">
                <HtmlRenderer htmlContent={messageData?.mail} />
              </p>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t pt-4">
              <div className="text-sm text-muted-foreground">
                Received on <time dateTime="2023-04-15">April 15, 2023</time>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <PaperclipIcon className="h-5 w-5" />
                  <span className="sr-only">Attachments</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <StarIcon className="h-5 w-5" />
                  <span className="sr-only">Star</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6">
          <Button size="icon" className="rounded-full">
            <PlusIcon className="h-6 w-6" />
            <span className="sr-only">Compose</span>
          </Button>
        </div>
      </main>
    </div>
  );
}

function ArchiveIcon(props) {
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
      <rect width="20" height="5" x="2" y="3" rx="1" />
      <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
      <path d="M10 12h4" />
    </svg>
  );
}

function ArchiveXIcon(props) {
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
      <rect width="20" height="5" x="2" y="3" rx="1" />
      <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
      <path d="m9.5 17 5-5" />
      <path d="m9.5 12 5 5" />
    </svg>
  );
}

function FileIcon(props) {
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
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
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
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11Z" />
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
      <path d="M22 12v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7" />
      <path d="M22 5V3a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2" />
      <path d="M2 10l10 7 10-7" />
    </svg>
  );
}

function MoveVerticalIcon(props) {
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
      <polyline points="8 18 12 22 16 18" />
      <polyline points="8 6 12 2 16 6" />
      <line x1="12" y1="2" x2="12" y2="22" />
    </svg>
  );
}

function PaperclipIcon(props) {
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
      <path d="M21.44 11.05 12.8 19.69a5 5 0 1 1-7.07-7.07l9.19-9.19a3 3 0 0 1 4.24 4.24L8.56 16.88a1 1 0 1 1-1.42-1.42L15.6 6.99" />
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
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
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
      <path d="M20 18v-1a4 4 0 0 0-4-4H4" />
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

function Trash2Icon(props) {
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
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
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
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
