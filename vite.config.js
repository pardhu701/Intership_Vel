import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),]
  // server: {
  //   host: true, // make the server accessible externally
  //   port: 5173, // your dev server port
  //   allowedHosts: [
  //     '3666b7b25737.ngrok-free.app'  // add your ngrok domain here
  //   ]
  // }
})
