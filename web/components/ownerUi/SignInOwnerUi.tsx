"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useState, useEffect } from "react";

// Your specific imports
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  email: z.string().email("Invalid business email"),
  password: z.string().min(6, "Password must be 6+ characters"),
});

export default function SignInUi() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("🛠️ Testing API Endpoint:", values);
    // fetch("/api/v1/auth/login", { ... })
  }

  return (
    <div className="p-6 h-[720] border-2 border-red-500 flex flex-col md:flex-row justify-center items-center gap-10 bg-white rounded-xl">
      {/* Left Section: Functional Auth Form */}
      <div className="flex-1 w-full max-w-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Owner Login</h1>
          <p className="text-sm text-slate-500">POS System • Store Management</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FieldGroup>
            {/* Email Field with InputGroup */}
            <Field>
              <FieldLabel>Business Email</FieldLabel>
              <InputGroup>
                {/* Example of an Addon if you want one (like an @ icon) */}
                <Input type="email" placeholder="owner@store.com" {...register("email")} />
              </InputGroup>
              <FieldDescription>Use your registered work email.</FieldDescription>
              {errors.email && <FieldError>{errors.email.message}</FieldError>}
            </Field>

            {/* Password Field */}
            <Field>
              <FieldLabel>Password</FieldLabel>
              <InputGroup>
                <Input type="password" placeholder="••••••••" {...register("password")} />
              </InputGroup>
              {errors.password && <FieldError>{errors.password.message}</FieldError>}
            </Field>
          </FieldGroup>

          <Link href="/owner/dashboard">
            <Button type="submit" className="w-full">
              Authenticate & Launch
            </Button>
          </Link>
        </form>
      </div>

      {/* Right Section: Branding Placeholder */}
      <div className="hidden md:flex flex-1 h-full bg-slate-50 border rounded-lg flex-col justify-center items-center p-8 text-center border-dashed">
        <div className="space-y-3">
          <h2 className="text-lg font-medium">Business Context</h2>
          <div className="h-px w-12 bg-slate-300 mx-auto" />
          <p className="text-sm text-slate-400 italic">
            Visualizing What we sell <br />& Profit Analytics
          </p>
        </div>
      </div>
    </div>
  );
}
