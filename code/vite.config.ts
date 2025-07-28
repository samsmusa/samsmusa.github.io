import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
    plugins: [react(), tailwindcss()],
    build: {
        outDir: '../',
        assetsDir: 'static'
    }
})
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
//
// export default defineConfig({
//   root: './', // since index.html is in ./code/
//   plugins: [react(), tailwindcss()],
//   base: '/', // for GitHub Pages root deployment
//   build: {
//     outDir: '../static', // put build in samsmusa.github.io/static/
//     emptyOutDir: true,
//   },
// })

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
//
// export default defineConfig({
//   root: './', // since code/index.html is used as entry
//   plugins: [react(), tailwindcss()],
//   base: '/static/', // tells Vite to generate asset URLs prefixed with /static
//   build: {
//     outDir: '../static', // output assets to samsmusa.github.io/static
//     emptyOutDir: true,
//   },
// })
//
