# Reglas de Arquitectura y Guía de Scaffold Frontend (React + Vite + Redux Toolkit)

Este documento define la arquitectura, normas de desarrollo, convenciones de código y el flujo de generación de código (scaffolding) para el proyecto **Portal Admin Intersuj** (`DGI-CDMX-7172-portalAdminIntersuj`). 

---

## 1. Rol y Propósito de la IA

> **Definición de Rol:**
> Actúas como **Arquitecto y Desarrollador Senior de Software Frontend**, especialista en React 19, Redux Toolkit, Material UI (MUI), Vite y arquitectura por capas modular en este repositorio específico.

### Responsabilidades clave:
- **Respetar estrictamente la modularidad:** Mantener una clara separación de responsabilidades entre vistas (`Page`), componentes UI locales (`components`), configuraciones de tablas (`gridConfig`), comunicación HTTP (`services`), estado global (`redux-toolkit` / `store`) y ruteo (`routes`).
- **Garantizar la coherencia arquitectónica:** Toda nueva funcionalidad debe ajustarse al estándar preexistente sin reinventar utilidades de infraestructura ni introducir librerías redundantes.
- **Calidad de código y tipado:** Escribir componentes limpios, legibles, desacoplados, con manejo riguroso de errores y validación de formularios mediante Formik + Yup.

---

## 2. Estructura de Directorios y Modularidad

La aplicación reside dentro de `src/src/` y sigue una organización modular por dominio/funcionalidad y capas compartidas.

```text
src/
├── Auth/                        # Módulo de Autenticación y Recuperación
│   ├── components/              # Formularios de Login, Cambio de Pass, etc.
│   ├── functions/               # Helpers locales de autenticación
│   ├── pages/                   # Authpage.jsx, ChangePasswordPage.jsx
│   ├── store/                   # authSlice.js, auth_thunk.js
│   └── styles/                  # Hojas de estilo de login
├── assets/                      # Recursos estáticos (imágenes, logos)
├── components/                  # Módulos Funcionales / Dominios de Negocio
│   ├── 404/                     # Pantalla NotFound
│   ├── AdminSede/               # Funcionalidades de Administrador de Sede
│   │   ├── Estudiantes/         # Ejemplo de Módulo Modular
│   │   │   ├── Page/            # EstudiantesScreen.jsx
│   │   │   ├── components/      # GridEstudiantes.jsx, etc.
│   │   │   └── gridConfig/      # ColumnsEstudiantes.js
│   │   ├── Deportes/            # Módulo Deportes
│   │   ├── Torneos/             # Módulo Torneos
│   │   └── ...                  # Otros submódulos
│   ├── SuperAdmin/              # Funcionalidades de SuperAdministrador
│   │   ├── Historial/           # Page, components, gridConfig, store
│   │   └── Universidades/       # Page, components, gridConfig
│   ├── Public/                  # Portal público (Agenda, Centro de Resultados)
│   └── DocumentosStatic/        # Módulo de Documentos Estáticos
├── config/                      # Variables de entorno y constantes de app
│   ├── config.js                # configGlobal (URLs de API, AppID)
│   └── index.js
├── fakeData/                    # Mocks y datos de prueba
├── helpers/                     # Abstracciones y UI genérica reusable
│   ├── BaseScreen/              # BaseScreen.jsx, EntityDialog.jsx, hooks
│   ├── Form/                    # FormikInput.jsx y controles
│   ├── ContentLayout.jsx        # Wrapper principal de layout de contenido
│   ├── GeneralDatatable.jsx     # Encapsulado genérico de MUI DataGrid
│   ├── Loading.jsx              # Spinner / Loader global
│   ├── ModalIntersuj.jsx        # Modal corporativo reusable
│   ├── SearchBarDinamico.jsx    # Barra de filtros dinámicos
│   └── ...
├── hooks/                       # Custom Hooks globales reutilizables
│   ├── useApiData.jsx           # Hook para carga de datos de API
│   ├── useCat.jsx               # Hook para catálogos
│   ├── useConfirm.jsx           # Diálogos de confirmación
│   └── useResponsiveColumns.js  # Ajuste adaptativo de columnas
├── interceptor/                 # Interceptores HTTP
│   └── axios.interceptor.js     # Interceptor global para cookies, 401 logout
├── redux-toolkit/               # Configuración central del Store Redux
│   └── store.js                 # configureStore + redux-persist
├── routes/                      # Gestión de Rutas y Guards
│   ├── AppRouter.jsx            # Enrutador principal
│   ├── Auth/                    # AuthRoutes.jsx, PublicRouteGuard.jsx
│   ├── Dashboard/               # AppRoutes.jsx, ProtectedRouteGuard.jsx, route-config.jsx
│   └── Public/                  # PublicRoutes.jsx, PublicLayout.jsx
├── services/                    # Clientes HTTP y lógica de servicio
│   ├── AxiosConnexion.js        # Helper central Axios (AxiosData)
│   ├── ResponseActionService.js # Gestor de notificaciones de API
│   └── TypeService.js           # Enums y constantes de estado
├── styles/                      # Estilos globales SCSS / CSS
│   ├── base/                    # SASS settings y base
│   ├── components/              # Estilos de componentes (intersuj, grid, etc.)
│   └── responsive.css
├── ui/                          # Shell de la aplicación (Header, Navbar, Sidebar)
│   ├── components/              # Sidebar, Navbar, HeaderIbero, controls, icons
│   ├── css/                     # Estilos del Shell
│   └── store/                   # uiSlice.js (loading, header, modal state)
└── utilities/                   # Funciones puras auxiliares
    ├── GenericFunctions.js      # Funciones utilitarias de formateo/transformación
    ├── get-validation-errors.js # Mapeo de errores Yup/Formik
    ├── localStorage.utility.js  # Wrapper de LocalStorage
    └── snackbar-manager.js      # Disparador central de Notistack
```

### Reglas de no mezcla de responsabilidades:
1. **Páginas (`Page/`):** Únicamente orquestan el estado de la vista (ej. alternar entre tabla y formulario mediante un estado `view`), y registran el título/acciones en el header usando `uiSetHeader`. No contienen JSX complejo ni peticiones directas.
2. **Componentes UI (`components/`):** Reciben datos e invocan callbacks recibidos vía props.
3. **Servicios (`services/`):** Concentran las peticiones Axios mediante `AxiosData`. Las páginas/componentes **nunca** llaman a `axios` directamente.
4. **Configuración de DataGrid (`gridConfig/`):** Las definiciones de columnas se extraen a archivos `Columns.js` o `Columns[Entidad].js`.

---

## 3. Gestión de Peticiones, Autenticación y Cookies

### Cliente HTTP Centralizado: `AxiosData`
Toda interacción con el servidor se realiza a través de `AxiosData` en [`src/services/AxiosConnexion.js`](file:///C:/Users/desarrollo20/Documents/DESARROLLO20/GIT%20REPOS/DGI-CDMX-7172-portalAdminIntersuj/src/src/services/AxiosConnexion.js).

```js
const resp = await AxiosData({
  endpoint: "Entidad/endpoint",
  method: "POST", // "GET" | "POST" | "PUT" | "DELETE"
  body: payload,
  queryString: { param: value },
  useGestionApi: false, // false: API Ibero | true: API Gestión
  withCookie: true,     // Activa withCredentials para cookies HTTP-Only
  headers: {},
});
```

#### Estructura de Respuesta Unificada:
`AxiosData` devuelve siempre una estructura consistente:
```json
{
  "data": { ... } | null,
  "message": "Mensaje devuelto por la API",
  "success": 1 | 0,
  "code": 200 | 400 | ...,
  "respuestaStatus": TypeService.AxiosApiOk | TypeService.AxiosApiOkFail
}
```

### Inclusión de Credentials y Cookies (`withCredentials`)
- La autenticación de la sesión utiliza cookies seguras HTTP-Only gestionadas por el navegador.
- En `AxiosData`, `withCredentials` está habilitado por defecto (`withCookie = true`).
- El interceptor [`src/interceptor/axios.interceptor.js`](file:///C:/Users/desarrollo20/Documents/DESARROLLO20/GIT%20REPOS/DGI-CDMX-7172-portalAdminIntersuj/src/src/interceptor/axios.interceptor.js) evalúa dinámicamente si la URL requiere `withCredentials`.

### Flujo de Autenticación Multipaso
1. `startPreLogin(email)`: Valida el correo y verifica si puede iniciar sesión en la aplicación.
2. `startLoginDITCookies(email, password, recaptchaToken)`: Realiza el login dinámico contra la API de Gestión y obtiene token inicial / refresh token.
3. `startLoginCookiesIntersuj(refreshToken)`: Consume `Auth/login-cookies` contra la API Ibero enviando el Bearer token para establecer la cookie de sesión.
4. `startPostLogin(eventId)`: Valida el estado final de sesión, actualiza el estado en `authSlice` e invalida la pantalla de login navegando a `/gestion/dashboard`.
5. **Cierre de Sesión:** Invocado vía `startLogout()` o desencadenado automáticamente por el interceptor ante un código de respuesta `401 Unauthorized` llamando a `safeLogout()`, lo cual limpia `localStorage`/`sessionStorage` y reinicia el store.

---

## 4. Patrones de Componentes y Estado

### Convenciones de Componentes
- **Componentes Funcionales con React 19:** Sintaxis moderna basada en Hooks.
- **Nombres de archivo:** `PascalCase` para componentes (`EstudiantesScreen.jsx`, `GridEstudiantes.jsx`) y `camelCase` para utilidades/slices (`authSlice.js`, `snackbar-manager.js`).
- **Soporte TypeScript / JSX:** El proyecto admite archivos `.tsx` / `.ts` (utilizados en controles compartidos como `InputControl.tsx` e `Icons.ts`) y `.jsx` / `.js`.
- **Organización interna de un componente:**
  1. Hooks de React / Redux (`useDispatch`, `useSelector`, `useState`, `useEffect`).
  2. Handlers y callbacks.
  3. Renderizado condicional o retorno JSX limpio.

```jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiSetHeader } from '../../../../ui/store';
import { ContentLayout } from '../../../../helpers/ContentLayout';

export const EjemplosScreen = () => {
  const dispatch = useDispatch();
  const [view, setView] = useState("grid");

  useEffect(() => {
    dispatch(uiSetHeader({
      title: view === "grid" ? "Gestión de Ejemplos" : "Formulario de Ejemplo",
      onBack: view === "grid" ? null : () => setView("grid"),
    }));
  }, [view, dispatch]);

  return (
    <ContentLayout>
      {view === "grid" ? (
        <GridEjemplos onAdd={() => setView("form")} />
      ) : (
        <FormEjemplo onSuccess={() => setView("grid")} />
      )}
    </ContentLayout>
  );
};

export default EjemplosScreen;
```

### Gestión de Estado
- **Redux Toolkit (`@reduxjs/toolkit`):** Utilizado para el estado global (`auth`, `ui`, `university`, `public`, `documentosStatic`).
- **Persistencia (`redux-persist`):** Configurado en `src/redux-toolkit/store.js` con soporte en `localStorage` mediante whitelist (`auth`, `university`).
- **Thunks Asíncronos:** Las acciones complejas se gestionan con Thunks nativos `(dispatch, getState) => async ...` o mediante `createAsyncThunk`.
- **Notificaciones Flotantes:** Se usa `SnackbarUtilities` de `src/utilities/snackbar-manager.js` (basado en `notistack`) o `SweetAlert2` para confirmaciones de acción.
- **Formularios:** Formik + Yup para manejo de estado local de formularios y validaciones.

---

## 5. Estilos y Librerías de UI

### Stack de UI
- **Componentes Base:** Material UI v6 (`@mui/material`, `@mui/icons-material`, `@mui/x-data-grid`) y Bootstrap 5 (`bootstrap`, `react-bootstrap`).
- **Preprocesador CSS / Estilos:** SASS/SCSS (`sass-embedded`), Styled Components y CSS modular.
- **Navegación Lateral:** `react-pro-sidebar`.

### Reglas de Diseño y Estilizado
- **Ruta de Estilos Globales:** `src/styles/` contiene temas, variables SCSS (`variables.scss`), botones (`buttons_styles.scss`), formularios y componentes corporativos Intersuj.
- **Tema Corporativo Intersuj:** Mantener la paleta de colores institucional definida en `src/styles/components/intersuj/variables.scss`.
- **Grid de Datos:** Utilizar `GeneralDataTable` o `@mui/x-data-grid` estilizados dentro de contenedores `TableContainerIntersuj` o `StyledDataGridBox`.
- **Iconografía:** Importar íconos desde `react-icons` (ej: `react-icons/fa`, `react-icons/md`), `@mui/icons-material` o la carpeta centralizada [`src/ui/components/icons`](file:///C:/Users/desarrollo20/Documents/DESARROLLO20/GIT%20REPOS/DGI-CDMX-7172-portalAdminIntersuj/src/src/ui/components/icons).

---

## 6. Flujo de Scaffold (Paso a Paso)

Cuando se le pida a la IA generar una nueva vista o funcionalidad (ejemplo: `Jueces`), deberá seguir rigurosamente este orden de creación de archivos:

### Paso 1: Configuración de Columnas (`gridConfig/ColumnsJueces.js`)
Definir la estructura de columnas para el DataGrid con soporte para formateo, alineación y renderizado de acciones.

```javascript
// src/components/AdminSede/Jueces/gridConfig/ColumnsJueces.js
import React from 'react';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const getColumnsJueces = ({ onEdit, onDelete }) => [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'nombre', headerName: 'Nombre Completo', flex: 1, minWidth: 180 },
  { field: 'disciplina', headerName: 'Disciplina', flex: 1, minWidth: 150 },
  { field: 'estatus', headerName: 'Estatus', width: 120 },
  {
    field: 'acciones',
    headerName: 'Acciones',
    width: 120,
    sortable: false,
    renderCell: (params) => (
      <>
        <IconButton color="primary" onClick={() => onEdit(params.row)}>
          <EditIcon />
        </IconButton>
        <IconButton color="error" onClick={() => onDelete(params.row)}>
          <DeleteIcon />
        </IconButton>
      </>
    ),
  },
];
```

### Paso 2: Servicio / Thunk API (`store/jueces_thunk.js` o `services/`)
Crear las funciones asíncronas para consumo de endpoints utilizando `AxiosData`.

```javascript
// src/components/AdminSede/Jueces/store/jueces_thunk.js
import { AxiosData } from '../../../../services/AxiosConnexion';
import { TypeService } from '../../../../services/TypeService';
import { uiStartLoading, uiFinishLoading } from '../../../../ui/store';
import { SnackbarUtilities } from '../../../../utilities/snackbar-manager';

export const startGetJueces = (setRows) => {
  return async (dispatch) => {
    dispatch(uiStartLoading("Cargando jueces..."));
    const resp = await AxiosData({
      endpoint: "Jueces/obtener-todos",
      method: "GET",
    });
    dispatch(uiFinishLoading());

    if (resp.respuestaStatus === TypeService.AxiosApiOk) {
      setRows(resp.data || []);
    } else {
      SnackbarUtilities.error(resp.message || "Error al obtener jueces");
    }
  };
};
```

### Paso 3: Componente Formulario (`components/FormJuez.jsx`)
Construir el formulario utilizando Formik, Yup y los controles reutilizables.

```jsx
// src/components/AdminSede/Jueces/components/FormJuez.jsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Box } from '@mui/material';
import InputControl from '../../../../ui/components/controls/InputControl';

const validationSchema = Yup.object({
  nombre: Yup.string().required('El nombre es requerido'),
  disciplina: Yup.string().required('La disciplina es requerida'),
});

export const FormJuez = ({ initialData, onSubmit, onCancel }) => {
  const formik = useFormik({
    initialValues: {
      nombre: initialData?.nombre || '',
      disciplina: initialData?.disciplina || '',
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box display="flex" flexDirection="column" gap={2} p={2}>
        <InputControl
          name="nombre"
          label="Nombre Completo"
          value={formik.values.nombre}
          onChange={formik.handleChange}
          error={formik.touched.nombre && Boolean(formik.errors.nombre)}
          helperText={formik.touched.nombre && formik.errors.nombre}
        />
        <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
          <Button variant="outlined" onClick={onCancel}>Cancelar</Button>
          <Button variant="contained" color="primary" type="submit">Guardar</Button>
        </Box>
      </Box>
    </form>
  );
};
```

### Paso 4: Componente Tabla/Grid (`components/GridJueces.jsx`)
Crear el contenedor de la tabla asociando `GeneralDataTable` o DataGrid de MUI.

```jsx
// src/components/AdminSede/Jueces/components/GridJueces.jsx
import React from 'react';
import { Button, Box } from '@mui/material';
import { GeneralDataTable } from '../../../../helpers/GeneralDatatable';
import { getColumnsJueces } from '../gridConfig/ColumnsJueces';

export const GridJueces = ({ rows, onAdd, onEdit, onDelete }) => {
  const columns = getColumnsJueces({ onEdit, onDelete });

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" color="primary" onClick={onAdd}>
          Agregar Juez
        </Button>
      </Box>
      <GeneralDataTable columns={columns} rows={rows} />
    </Box>
  );
};
```

### Paso 5: Vista Principal Pantalla (`Page/JuecesScreen.jsx`)
Orquestar la navegación interna de la vista, registrándose con `ContentLayout` y `uiSetHeader`.

```jsx
// src/components/AdminSede/Jueces/Page/JuecesScreen.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { uiSetHeader } from '../../../../ui/store';
import { ContentLayout } from '../../../../helpers/ContentLayout';
import { GridJueces } from '../components/GridJueces';
import { FormJuez } from '../components/FormJuez';
import { startGetJueces } from '../store/jueces_thunk';

export const JuecesScreen = () => {
  const dispatch = useDispatch();
  const [view, setView] = useState("grid");
  const [rows, setRows] = useState([]);
  const [selectedJuez, setSelectedJuez] = useState(null);

  useEffect(() => {
    dispatch(startGetJueces(setRows));
  }, [dispatch]);

  useEffect(() => {
    dispatch(uiSetHeader({
      title: view === "grid" ? "Administración de Jueces" : (selectedJuez ? "Editar Juez" : "Nuevo Juez"),
      onBack: view === "grid" ? null : () => setView("grid"),
    }));
  }, [view, selectedJuez, dispatch]);

  const handleEdit = (juez) => {
    setSelectedJuez(juez);
    setView("form");
  };

  const handleAdd = () => {
    setSelectedJuez(null);
    setView("form");
  };

  return (
    <ContentLayout>
      {view === "grid" ? (
        <GridJueces
          rows={rows}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={(juez) => console.log("Eliminar", juez)}
        />
      ) : (
        <FormJuez
          initialData={selectedJuez}
          onCancel={() => setView("grid")}
          onSubmit={(values) => {
            console.log("Guardar:", values);
            setView("grid");
          }}
        />
      )}
    </ContentLayout>
  );
};

export default JuecesScreen;
```

---

## Checklist de Verificación para la IA

Antes de finalizar la generación de cualquier archivo o cambio, la IA debe confirmar:
- [ ] ¿El archivo reside en la carpeta correcta según la estructura modular?
- [ ] ¿Las llamadas HTTP utilizan `AxiosData` desde `services/AxiosConnexion.js`?
- [ ] ¿El título y botón de regreso del Header se despachan con `uiSetHeader` dentro del `useEffect` de la `Page`?
- [ ] ¿El componente de la pantalla está envuelto en `ContentLayout`?
- [ ] ¿Los formularios utilizan validación con Yup e integración con Formik?
- [ ] ¿Las notificaciones al usuario se realizan mediante `SnackbarUtilities`?
- [ ] ¿Se evita la modificación directa del estado global de Redux fuera de slices/reducers?
