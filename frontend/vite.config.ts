import react from '@vitejs/plugin-react'; 

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Permite conexiones desde fuera del contenedor Docker
    port: 5173,
    strictPort: true,
    allowedHosts: [
      'proyecto-integrador-frontend-production.up.railway.app',
      '.railway.app',
      '.up.railway.app',
      'localhost',
      '127.0.0.1'
    ],
  },
  preview: {
    host: '0.0.0.0', // Necesario si usas 'vite preview' en el contenedor
    port: 5173,
    strictPort: true,
    allowedHosts: [
      'proyecto-integrador-frontend-production.up.railway.app',
      '.railway.app',
      '.up.railway.app',
      'localhost',
      '127.0.0.1'
    ],
  },
});

function defineConfig(arg0: {
  plugins: any[]; server: {
    host: string; // Permite conexiones desde fuera del contenedor Docker
    port: number; strictPort: boolean; allowedHosts: string[];
  }; preview: {
    host: string; // Necesario si usas 'vite preview' en el contenedor
    port: number; strictPort: boolean; allowedHosts: string[];
  };
}) {
  throw new Error("Function not implemented.");
}
