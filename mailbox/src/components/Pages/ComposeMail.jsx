import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";

export default function ComposeMail() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [formData, setFormData] = useState({
    to: "",
    cc: "",
    subject: "",
    body: "",
  });

  const onEditorStateChange = (newState) => {
    setEditorState(newState);
    setFormData({
      ...formData,
      body: draftToHtml(convertToRaw(newState.getCurrentContent())),
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const sendMail = async () => {
    try {
      const res = await axios.post(
        "https://satiya-585fe-default-rtdb.firebaseio.com/mail.json",
        formData
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMail();

    // Process the form data, e.g., send an email
    console.log(formData);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Compose Email</CardTitle>
          <CardDescription>Fill out the form to send an email.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="to">To</Label>
                <Input
                  id="to"
                  placeholder="Enter email addresses"
                  value={formData.to}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cc">CC</Label>
                <Input
                  id="cc"
                  placeholder="Enter email addresses"
                  value={formData.cc}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Enter subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="body">Body</Label>
              <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit">Send</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
