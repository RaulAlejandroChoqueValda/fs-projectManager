# fs-projectManager
 
Gestor de tareas y proyectos full stack para el Módulo 1.
 
<!-- BADGE_CI -->
 
## 🚀 Instalación local

bash
git clone https://github.com/RaulAlejandroChoqueValda/fs-projectManager.git
cd fs-projectManager
npm install

### Variables de entorno

DATABASE_URL="postgres://usuario:password@localhost:5432/miproyecto"
JWT_SECRET="pass1234"
PORT=3000

## 📜 Comandos disponibles
 
| Comando          | Descripción                              |
|------------------|-------------------------------------------|
| `npm run dev`    | Levanta el entorno de desarrollo           |
| `npm run build`  | Genera el build de producción              |
| `npm test`       | Corre las pruebas automatizadas (pendiente — Sesión 3) |
 
## 🗄️ Base de datos
 
PostgreSQL con migraciones y seeds gestionados con Prisma (ver Módulo 2).

