"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react"; // Nice for loading states

const formSchema = z.object({
  email: z.string().email("Invalid business email"),
  password: z.string().min(6, "Password must be 6+ characters"),
});

export default function SignInUi() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("http://localhost:8000/api/v1/auth/ownerLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Welcome back! Redirecting...");
        form.reset();
        router.push("/owner/dashboard");
      } else {
        toast.error(data.message || "Account not found. Please register.");
      }
    } catch (error) {
      toast.error("Connection failed. Is the backend running?");
      console.error("Auth Error:", error);
    }
  }

  return (
    <div className="p-6 min-h-[540] border border-slate-200 flex flex-col md:flex-row justify-center items-center gap-10 bg-white rounded-xl shadow-sm">
      <div className="flex-1 w-full max-w-sm">
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl font-bold tracking-tight">Owner Login</h1>
          <p className="text-sm text-slate-500">POS System • Store Management</p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FieldGroup>
            {/* Email Field */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Business Email</FieldLabel>
                  <Input {...field} id="ownerEmailForm" type="email" aria-invalid={fieldState.invalid} placeholder="owner@store.com" autoComplete="email" disabled={isSubmitting} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Password Field */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Password</FieldLabel> {/* Fixed typo here */}
                  <Input {...field} id="ownerPasswordForm" type="password" aria-invalid={fieldState.invalid} placeholder="••••••••" autoComplete="current-password" disabled={isSubmitting} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Authenticating...
              </>
            ) : (
              "Authenticate & Launch"
            )}
          </Button>
        </form>
      </div>

      {/* Visual Context Side */}
      <div className="hidden md:flex flex-1 h-full min-h-[400] bg-slate-50 border border-slate-200 rounded-lg flex-col justify-center items-center p-8 text-center border-dashed">
        <div className="space-y-3">
          <h2 className="text-lg font-medium text-slate-700">Business Intelligence</h2>
          <div className="h-px w-12 bg-slate-300 mx-auto" />
          <p className="text-sm text-slate-400 italic">
            Visualizing inventory performance <br /> & monthly profit analytics
          </p>
        </div>
      </div>
    </div>
  );
}
