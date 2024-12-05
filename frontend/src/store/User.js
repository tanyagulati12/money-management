import { create } from "zustand";

export const User = create((set) => ({
    isLoggedIn: false,
    username: "",
    monthlyIncome: "",
    percentageOfInvestment: "",
    setLoggedIn: (loginState) => set({isLoggedIn: loginState}),
}))


export const Theme = create((set) => ({
    mode: "dark",
    toggle: () => set({mode: "light"})
}))