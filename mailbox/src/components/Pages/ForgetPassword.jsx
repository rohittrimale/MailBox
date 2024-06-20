import { Button } from "../ui/button";

import { Input } from "../ui/input";
import { Link } from "react-router-dom";
import { Label } from "../ui/label";
import { useState } from "react";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(email);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 px-4 dark:bg-gray-950">
      <div className="mx-auto w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Forgot your password?
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Enter the email address associated with your account and we'll send
            you a link to reset your password.
          </p>
        </div>
        <form className="space-y-6" onSubmit={submitHandler}>
          <div>
            <Label htmlFor="email" className="sr-only">
              Email address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Email address"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <Button type="submit" className="w-full">
            Reset password
          </Button>
        </form>
        <div className="flex justify-center">
          <Link
            to="/login"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
