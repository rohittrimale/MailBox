import React, { useEffect, useState } from "react";
import SentMail from "./SentMail";
import HtmlRenderer from "../HtmlRenderer";
import { fetchEmails } from "../../slice/mailBoxSlice";
import { useDispatch } from "react-redux";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ComposeMail from "./ComposeMail";
import { Link } from "react-router-dom";

const IndexMail = () => {
  const dispatch = useDispatch();
  const [mailData, setMailData] = useState([]);

  const getInboxData = async () => {
    const data = await dispatch(fetchEmails("rohittrimalle@gmail.com"));
    console.log(data);
    setMailData(data.payload);
  };
  const [toggleCompose, setToggleCompose] = useState(false);

  const toggleComposes = () => {
    setToggleCompose(true);
  };

  useEffect(() => {
    getInboxData();
  }, []);
  return (
    <main className="flex-1 overflow-y-auto">
      {toggleCompose && <ComposeMail setToggleCompose={setToggleCompose} />}
      <div className="grid gap-4 p-4 md:p-6">
        <div className="flex items-center gap-2 ">
          <Input
            type="search"
            placeholder="Search emails..."
            className="flex-1 bg-muted text-muted-foreground rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <Button onClick={toggleComposes} className="block md:hidden">
            Compose
          </Button>
        </div>

        <div className="grid gap-2">
          {mailData.map((data) => {
            console.log(data.sender);
            const sender = data.sender;
            console.log(sender?.email);
            return (
              <Link to={`/inbox/${data.id}`} key={data.id}>
                <article className="flex gap-2 p-4 border rounded-lg hover:bg-accent transition-colors">
                  {!data?.read && (
                    <div className="w-2 h-2 rounded-full mt-2 bg-blue-950"></div>
                  )}
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{sender?.displayName}</div>
                      <div className="text-xs text-muted-foreground"></div>
                    </div>
                    <div className="font-medium">{data?.subject}</div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      <HtmlRenderer htmlContent={data?.mail} />
                    </p>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default IndexMail;
