"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

// Custom Google Icon Component
const GoogleIcon = () => (
  <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
    <path
      fill="currentColor"
      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
    ></path>
  </svg>
);

const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/);

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid business email"),
  password: z.string().min(6, "Password must be 8+ characters"),
  phoneNumber: z.string().regex(phoneRegex, "Invalid Number!"),
});

export default function SignUpUi() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
    },
    mode: "onBlur",
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("http://localhost:8000/api/v1/auth/signUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      console.log("data: ", data);

      console.log("response Data : ", response);

      if (response.ok) {
        toast.success("Account created successfully!");
        // form.reset();
        router.push("/form/login");
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error("error :", error);
      toast.error("Connection error");
    }
  }

  return (
    <div className="p-6 h-[720] border-2 border-slate-200 flex flex-col md:flex-row justify-center items-center gap-10 bg-white rounded-xl shadow-sm">
      <div className="flex-1 w-full max-w-sm">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Owner Sign Up</h1>
          <p className="text-sm text-slate-500">POS System • Register your business</p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Full Name</FieldLabel>
                  <Input {...field} id="ownerNameForm" placeholder="Business Owner Name" disabled={isSubmitting} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Business Email</FieldLabel>
                  <Input {...field} type="email" id="ownerEmailForm" placeholder="owner@store.com" disabled={isSubmitting} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="phoneNumber"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Phone Number</FieldLabel>
                  <Input {...field} id="ownerPhoneForm" placeholder="+62..." disabled={isSubmitting} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Password</FieldLabel>
                  <Input {...field} type="password" id="ownerPasswordForm" placeholder="••••••••" disabled={isSubmitting} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
          <Button type="submit" className="w-full mt-2" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Account"}
          </Button>

          <div className="relative flex justify-center text-xs uppercase items-center">
            <span className="h-[1] border w-20"></span>
            <span className="bg-white px-2 text-slate-500 font-medium">Or continue with Google</span>
            <span className="h-[1] border w-20"></span>
          </div>

          <Button variant="outline" className="w-full mb-6 py-6" onClick={() => console.log("Google Login Clicked")}>
            <GoogleIcon />
            Continue with Google
          </Button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
          </div>
        </form>
      </div>
      <div className="hidden md:flex flex-1 h-[600] bg-slate-50 border rounded-lg flex-col justify-center items-center p-8 text-center border-dashed">
        <div className="space-y-3">
          <h2 className="text-lg font-medium text-slate-800">Operational Excellence</h2>
          <div className="h-[1] w-12 bg-slate-300 mx-auto" />
          <p className="text-sm text-slate-400 italic">
            Track inventory performance <br /> & monthly profit analytics
          </p>
        </div>
      </div>
    </div>
  );
}
