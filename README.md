# fs-projectManager
 
Gestor de tareas y proyectos full stack para el Módulo 1.
 
<!-- BADGE_CI -->
 
## 🚀 Instalación local
 
```bash
git clone [https://github.com/RaulAlejandroChoqueValda/fs-projectManager.git](https://github.com/RaulAlejandroChoqueValda/fs-projectManager.git)
cd fs-projectManager
npm install
```
 
### Variables de entorno
Crea un archivo `.env` en la raíz con las siguientes claves (sin valores reales en este documento):
 
```text
DATABASE_URL=
JWT_SECRET=
PORT=
```
 
## 📜 Comandos disponibles
 
| Comando          | Descripción                              |
|------------------|-------------------------------------------|
| `npm run dev`    | Levanta el entorno de desarrollo           |
| `npm run build`  | Genera el build de producción              |
| `npm test`       | Corre las pruebas automatizadas (pendiente — Sesión 3) |
 
## 🗄️ Base de datos
 
PostgreSQL con migraciones y seeds gestionados con Prisma (ver Módulo 2).
