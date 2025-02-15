import { create } from "zustand";
interface FormField {
    id: string;
    type: string;
    label: string;
}
interface FormStore {
    formFields: FormField[];
    addField: (field: FormField) => void;
}
export const useFormStore = create<FormStore>((set) => ({
    formFields: [],
    addField: (field) => set((state) => ({
        formFields: [...state.formFields, field]
    })),
}));