"use client";

import { useState } from "react";
import { Plus, Store, ArrowRight, Loader2 } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const shopSchema = z.object({
  shopName: z.string().min(3, "Shop name must be at least 3 characters"),
  category: z.string().min(2, "Please specify a category (e.g., Cafe, Retail)"),
});

export default function CreateShopUi() {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof shopSchema>>({
    resolver: zodResolver(shopSchema),
    defaultValues: {
      shopName: "",
      category: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof shopSchema>) {
    try {
      const response = await fetch("http://localhost:8000/api/v1/shop/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast.success("Shop created! Launching dashboard...");
        setOpen(false);
        // router.push("/owner/dashboard") would go here
      } else {
        toast.error("Failed to create shop");
      }
    } catch (error) {
      toast.error("Connection error to backend");
      console.error(error);
    }
  }

  return (
    <main className="flex w-full h-screen justify-center items-center bg-slate-50 p-8">
      <div className="text-center space-y-6">
        {/* Empty State UI */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-200">
            <Store className="text-slate-400" size={40} />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">No Shop Found</h1>
            <p className="text-slate-500">You haven&apos; t registered a business yet.</p>
          </div>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="h-16 px-8 text-lg rounded-2xl shadow-md gap-3 hover:scale-105 transition-transform">
            Create New Shop
            <Plus size={20} />
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425] p-8">
            <DialogHeader>
              <DialogTitle className="text-2xl">Register Business</DialogTitle>
              <DialogDescription>Set up your store details to start managing inventory.</DialogDescription>
            </DialogHeader>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
              <FieldGroup>
                <Controller
                  name="shopName"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Shop Name</FieldLabel>
                      <Input {...field} placeholder="e.g. Ember & Oak Cafe" disabled={isSubmitting} />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                <Controller
                  name="category"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Business Category</FieldLabel>
                      <Input {...field} placeholder="e.g. Food & Beverage" disabled={isSubmitting} />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>

              <Button type="submit" className="w-full h-12 gap-2" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <>
                    Launch Store <ArrowRight size={18} />
                  </>
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
