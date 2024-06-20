// Import the necessary modules from Shadcn UI
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../ui/input";
import { Link } from "react-router-dom";
import { Label } from "../ui/label";
import { login } from "../../slice/userSlice";

// Define the form schema using Shadcn UI
const FormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(8, { message: "Password is too short" })
    .max(20, { message: "Password is too long" }),
});

export function Signin() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const dispatch = useDispatch();
  const onSubmit = async (values) => {
    const { email, password } = values;

    console.log(values);
    try {
      const data = await dispatch(login({ email, password }));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="w-full flex items-center justify-between">
        <div className="justify-self-start mx-auto flex items-center justify-center py-12">
          <div className="mx-auto  space-y-6">
            <div>
              <div className="flex flex-col items-center justify-center bg-gray-50 py-12 px-4 dark:bg-gray-950">
                <div className="lg:hidden">
                  <img
                    src="https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/112-gmail_email_mail-512.png"
                    alt="Image"
                    className="h-12 w-12 object-cover"
                  />
                </div>
                <div className="mx-auto w-full max-w-md space-y-10">
                  <div>
                    <h2
                      className={`mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50`}
                    >
                      Login
                    </h2>
                    <p
                      className={`mt-2 text-center text-sm text-gray-600 dark:text-gray-400`}
                    >
                      Enter your credentials to access your account
                    </p>
                    <p
                      className={`text-center mt-4 -mb-3 text-[0.8rem] font-medium text-destructive`}
                    >
                      error
                    </p>
                  </div>
                  <div>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 "
                      >
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input
                                  type="password"
                                  placeholder=""
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div>
                          <Link
                            to="/forget-password"
                            className="text-sm text-start text-red-500 "
                          >
                            Forget Password
                          </Link>
                        </div>

                        <Button type="submit" className="w-full">
                          Verify User
                        </Button>
                      </form>
                      <div className="text-sm text-center mt-2">
                        Already have an Account?
                        <Link to="/signup" className="text-blue-800 ml-2">
                          Signup
                        </Link>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
