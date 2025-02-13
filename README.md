# 📊 Dashboard de Productos - Frontend

Este proyecto es una aplicación web desarrollada en **React** con **Redux Toolkit**, diseñada para gestionar productos mediante una **tabla interactiva** con **gráficos dinámicos** generados con `react-plotly.js`.

## 🚀 Tecnologías utilizadas

- **React.js** + TypeScript
- **Redux Toolkit** (Gestión de estado)
- **Axios** (Consumo de APIs)
- **React Hook Form + Zod** (Validaciones de formularios)
- **Tailwind CSS** (Estilos y UI)
- **react-plotly.js** (Visualización de datos)

---

## 📂 Estructura del proyecto

```plaintext
src/
│── components/           # Componentes UI personalizados
│   ├── common/           # Componentes reutilizables (tabla, modal, drop menu, cards)
│   ├── draws/            # Gráficos usando react-plotly.js
│   ├── icon/             # Iconos SVG como React components
│   ├── modal/            # Modales (crear, editar, ver, eliminar producto)
│   ├── schemas/          # Validaciones con Zod
│   ├── table/            # Tabla de productos
│
│── hooks/                # Hooks personalizados para Redux Toolkit
│── lib/                  # Configuración de API con Axios y store de Redux
│── pages/                # Página principal del dashboard
│── services/             # Servicios API con Axios
│── slices/               # Slices de Redux Toolkit
│── types/                # Tipados TypeScript del proyecto
│── App.tsx               # Configuración principal de la app
│── main.tsx              # Punto de entrada de la aplicación
```

---

## 📊 Funcionalidades del Dashboard

✅ **CRUD de productos** (Crear, Editar, Eliminar, Ver detalle, Ver todos)\
✅ **Filtrado y búsqueda avanzada** (Por nombre, precio y stock)\
✅ **Paginación personalizada**\
✅ **Gráficos dinámicos con métricas clave**\
✅ **Interfaz responsive y moderna**

### 📈 Métricas y Gráficos 📊

El dashboard muestra información clave sobre los productos en diferentes gráficos:

1️⃣ **Total de productos** - Indicador de cantidad total\
2️⃣ **Total de ingresos** - Indicador de revenue generado\
3️⃣ **Stock promedio** - Gráfico de barras\
4️⃣ **Distribución de precios** - Gráfico de barras\
5️⃣ **Relación Stock vs Precio** - Gráfico de dispersión\
6️⃣ **Top 5 productos más caros** - Gráfico de barras

---

## 🛠️ Instalación y ejecución

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo/frontend
```

### 2️⃣ Instalar dependencias

```bash
npm install
```

### 3️⃣ Ejecutar en modo desarrollo

```bash
npm run dev
```

El frontend estará disponible en `http://localhost:5173` 🚀

---

## 📝 Notas adicionales

- Asegúrate de que el backend está corriendo antes de iniciar el frontend.
- La UI está diseñada para ser **responsiva** y **moderna**.
- Se recomienda usar **Node.js 18+** para evitar problemas de dependencias.

---

## 📜 Licencia

Este proyecto está bajo la licencia **MIT**. Puedes usarlo, modificarlo y distribuirlo libremente.

---

🎉 **¡Gracias por usar este Dashboard de Productos!** 
