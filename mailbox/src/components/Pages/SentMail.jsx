import React, { useEffect, useState } from "react";
import HtmlRenderer from "../HtmlRenderer";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { fetchSentEmails } from "../../slice/mailBoxSlice";
import { Link } from "react-router-dom";

const SentMail = () => {
  const sentMail = useSelector((state) => state.mailbox);
  const [sendMailData, setSentMailData] = useState([]);
  const dispatch = useDispatch();
  const getSentMails = async () => {
    const data = await dispatch(fetchSentEmails("rohittrimalle@gmail.com"));
    setSentMailData(data.payload);
  };
  useEffect(() => {
    getSentMails();
  }, []);

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="grid gap-4 p-4 md:p-6">
        <div className="flex items-center gap-2 ">
          <Input
            type="search"
            placeholder="Search emails..."
            className="flex-1 bg-muted text-muted-foreground rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="grid gap-2">
          {sendMailData.map((data) => {
            console.log(data.sender);
            const sender = data.sender;
            console.log(sender?.email);
            return (
              <Link to={`/sent/${data.id}`} key={data.id}>
                <article className="flex flex-col gap-2 p-4 border rounded-lg hover:bg-accent transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{sender?.displayName}</div>
                    <div className="text-xs text-muted-foreground"></div>
                  </div>
                  <div className="font-medium">{data?.subject}</div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    <HtmlRenderer htmlContent={data?.mail} />
                  </p>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default SentMail;
