import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import flowbiteReact from "flowbite-react/plugin/vite";

export default defineConfig({
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:3500",
                secure: false,
            },
        },
    },
    plugins: [tailwindcss(), react(), flowbiteReact()],
});
