import { useForm, useFieldArray } from "react-hook-form";

export default function VariantForm() {
  const { register, control, watch } = useForm();

  // Dynamic array management
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const hasVariants = watch("hasVariants");

  return (
    <form>
      <input {...register("productName")} placeholder="Product Name" />

      <label>
        <input type="checkbox" {...register("hasVariants")} /> Has Variants?
      </label>

      {hasVariants && (
        <div>
          <h4>Variants List</h4>
          {fields.map((field, index) => (
            <div key={field.id} style={{ display: "flex", gap: "8px" }}>
              <input {...register(`variants.${index}.size`)} placeholder="Size (e.g., L)" />
              <input {...register(`variants.${index}.color`)} placeholder="Color (e.g., Red)" />
              <input type="number" {...register(`variants.${index}.stock`)} placeholder="Stock" />
              <input type="number" {...register(`variants.${index}.price`)} placeholder="Price" />
              <button type="button" onClick={() => remove(index)}>
                Remove
              </button>
            </div>
          ))}

          <button type="button" onClick={() => append({ size: "L", color: "Red", price: 0, stock: 0 })}>
            + Add Variant
          </button>
        </div>
      )}
    </form>
  );
}
