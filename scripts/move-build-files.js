const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, '..', 'dist', 'importadora-web');
const browserPath = path.join(outputPath, 'browser');

// Verificar si existe la carpeta browser
if (fs.existsSync(browserPath)) {
  const files = fs.readdirSync(browserPath);
  
  // Mover todos los archivos de browser/ al nivel superior
  files.forEach(file => {
    const sourcePath = path.join(browserPath, file);
    const destPath = path.join(outputPath, file);
    
    // Si el destino ya existe (carpeta), eliminarlo primero
    if (fs.existsSync(destPath)) {
      fs.rmSync(destPath, { recursive: true, force: true });
    }
    
    fs.renameSync(sourcePath, destPath);
  });
  
  // Eliminar la carpeta browser vacía
  try {
    fs.rmdirSync(browserPath);
  } catch (err) {
    // Ignorar si no está vacía o hay algún error
  }
  
  console.log('✓ Archivos movidos de browser/ a dist/importadora-web/');
} else {
  console.log('⚠ No se encontró la carpeta browser/, puede que el build no se haya completado');
}

