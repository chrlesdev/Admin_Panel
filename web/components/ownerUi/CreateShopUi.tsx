"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Store, Percent, CircleDollarSign, Loader2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const shopSchema = z.object({
  shopName: z.string().min(3, "Shop name is required"),
  platformName: z.string().min(3, "Platform name is required"),
  feePercent: z.coerce.number().min(1, "Cannot be negative, Required"),
  fixedFee: z.coerce.number().min(1, "Cannot be negative, Required"),
});

type ShopFormValues = {
  shopName: string;
  platformName: string;
  feePercent: number;
  fixedFee: number;
};

export default function CreateShopUi() {
  const form = useForm<ShopFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(shopSchema) as any,
    defaultValues: {
      shopName: "",
      platformName: "",
      feePercent: 0,
      fixedFee: 0,
    },
  });

  const router = useRouter();

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof shopSchema>) {
    try {
      const response = await fetch("http://localhost:8000/api/v1/shop/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast.success("Shop created successfully!");
        router.push("/owner/dashboard");
      } else {
        toast.error("Failed to create shop");
      }
    } catch (error) {
      toast.error("Connection error to backend");
      console.error(error);
    }
  }

  return (
    <main className="flex flex-col justify-center items-center bg-slate-50 min-h-screen w-full p-4">
      <div className="bg-white border border-slate-200 shadow-xl rounded-2xl p-8 w-full max-w-[550]">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="p-3 bg-blue-50 rounded-full mb-4">
            <Store className="text-blue-600" size={32} />
          </div>
          <h1 className="font-bold text-3xl text-slate-900">Setup Your Store</h1>
          <p className="text-slate-500 mt-2">Configure your shop details and platform fees</p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FieldGroup className="space-y-5">
            <Controller
              name="shopName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-slate-700 font-medium">Owner Store Name</FieldLabel>
                  <Input {...field} placeholder="e.g. Tangerang Central Coffee" disabled={isSubmitting} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="platformName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-slate-700 font-medium">Platform Name</FieldLabel>
                  <Input {...field} placeholder="e.g. GoFood, GrabFood, or Offline" disabled={isSubmitting} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="feePercent"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-slate-700 font-medium flex items-center gap-2">
                      <Percent size={14} /> Fee Percentage
                    </FieldLabel>
                    <Input {...field} type="number" placeholder="20" disabled={isSubmitting} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="fixedFee"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-slate-700 font-medium flex items-center gap-2">
                      <CircleDollarSign size={14} /> Fixed Fee
                    </FieldLabel>
                    <Input {...field} type="number" placeholder="1000" disabled={isSubmitting} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>
          </FieldGroup>

          <Button type="submit" className="w-full h-12 text-lg font-semibold mt-4 shadow-sm" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="animate-spin mr-2" />
            ) : (
              <span className="flex items-center gap-2">
                Create Shop & Launch <ArrowRight size={18} />
              </span>
            )}
          </Button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-8 uppercase tracking-widest">POS System Management v1.0</p>
      </div>
    </main>
  );
}
