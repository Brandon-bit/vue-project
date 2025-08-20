import fs from 'fs/promises'
import path from 'path'
import {join} from 'path'

const capitalize = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1)
}

let targetPath = process.argv[2]
const targetPathCapitalize = targetPath.split('/').map(el => {
    return capitalize(el)
})
targetPath = targetPathCapitalize.join('/')

const baseName = path.basename(targetPath)
const joinPath = join(process.cwd(), '/src/modules/', targetPath)
const fullPathSplit = path.resolve(joinPath).split('\\')
fullPathSplit.pop()
const fullPath = `${fullPathSplit.join('/')}/${capitalize(baseName)}`


const foldersStructure = [
    {

        path: `views/${capitalize(baseName)}Views.vue`,
        content: `<script setup lang="ts">\n</script>\n<template>\n<h2>${capitalize(baseName)} View</h2>\n</template>\n<style>\n</style>`
    },
    {
        path: `validations/${baseName}Validation.ts`,
        content: `// Validations for ${baseName}`
    },
    {
        path: `types/${baseName}Types.ts`,
        content: `// Types for ${baseName}`
    },
    {
        path: `services/${baseName}Service.ts`,
        content: `// Services for ${baseName}`
    },
    {
        path: `components/`,
    },
    {
        path: `composables/`,
    }
]

for (const folder of foldersStructure) {
  const filePath = path.join(fullPath, folder.path);
  const isDirOnly = !folder.content;

  if (isDirOnly) {
    await fs.mkdir(filePath, { recursive: true });
    console.log(`Carpeta creada: ${filePath}`);
  } else {
    const dirPath = path.dirname(filePath);
    await fs.mkdir(dirPath, { recursive: true });

    await fs.writeFile(filePath, folder.content, { flag: 'wx' }).catch(err => {
      if (err.code === 'EEXIST') {
        console.warn(`El archivo ya existe: ${filePath}`);
      } else {
        throw err;
      }
    });

    console.log(`Archivo creado: ${filePath}`);
  }
}
