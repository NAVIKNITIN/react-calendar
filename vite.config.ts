import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const isLibraryBuild = command === 'build' && mode === 'production'
  
  const config: any = {
    plugins: [react()],
  }
  
  if (isLibraryBuild) {
    config.plugins.push(
      dts({
        insertTypesEntry: true,
        include: ['src/index.ts', 'src/components/Calendar.tsx'],
        exclude: ['src/**/*.test.tsx', 'src/**/*.test.ts', 'src/main.tsx'],
        outDir: 'dist',
        copyDtsFiles: false,
      })
    )
    config.build = {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'ReactCalendar',
        formats: ['es'],
        fileName: () => `index.js`,
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'react/jsx-runtime'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react/jsx-runtime': 'react/jsx-runtime',
          },
          assetFileNames: (assetInfo: any) => {
            if (assetInfo.name && assetInfo.name.endsWith('.css')) {
              return 'style.css'
            }
            // Exclude vite.svg and other non-essential assets
            if (assetInfo.name && assetInfo.name.includes('vite.svg')) {
              return 'ignored'
            }
            return assetInfo.name || 'asset'
          },
        },
      },
      cssCodeSplit: false,
      sourcemap: true,
      emptyOutDir: true,
    }
  }
  
  // @ts-expect-error - test property is defined by vitest
  config.test = {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './src/test/setup.ts',
  }
  
  return config
})
