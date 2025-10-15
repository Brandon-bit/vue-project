Crea una vista como el archivo de @src/ejemplo/AltaEmpresas.jsx, en lugar de que el formulario sea
por pasos como se muestra, hazlo como el módulo de @src/modules/Inventario/ConfiguracionDeInventario/CrearProducto/components/CreateProductForm.vue, cada paso hazlo
dentro de un accordion, el titulo del paso agregalo al titulo del accordion.
Toma como base los componentes de la carpeta shared, los names de los inputs en inglés y labels en español.
Los cards los tienes que hacer con un componente BaseCard, y el formulario hazlo en un
componente igual. Al final debes de tener 2 componentes principales, el card y el 
formulario, importa los 2 a la vista principal.
sigue la misma estructura:
carpeta views: en esta carpeta importaras los 2 componentes.
carpeta components :  aquí irán los 2 componentes.
carpeta composables: crea un archivo que contenga la funcion de editar y otra de crear, cada funcion 
deberá de apuntar a una instancia axios, agregale los tipos que consideres requeridos, que las funciones solo imppriman
console.log, y ya, no agregues logica.
aquí también crea un archivo mapping, que convierta de inglés a español las keys que vienen del backend
y viceversa. los DTO son para los names del formulario y los
carpeta store: ocupala solo si la consideras necesario, si se pude pasar algo
como prop, entonces la evitas.
para validaciones ocupa el archivo dentro de @src/shared/validations/globalValidations.ts y agregalo directo
en el componente de formulario
recuerda que el nombre de los archivos va en inglés.
Para el mapping toma como base el modulo @src/modules/Inventario/Operacion/EntradasDeInventario.
Sigue ocupando la misma lógica que llevamos para el manejo de formularios y sus validaciones. Vas a distinguir 
si la vista es para editar o crear como lo está haciendo @src/modules/Inventario/Operacion/EntradasDeInventario/views/CreateUpdateInventoryEntryView.vue
Analiza el módulo de manera detallada, @src/modules/Inventario/Operacion/EntradasDeInventario y 
@src/modules/Inventario/ConfiguracionDeInventario/CrearProducto/ y utiliza lo mejor de ambos. Sigue la misma
líneas que se lleva y solo adapta a lo que te pido.
Todo eso crealo en @src/modules/RRHH/AltaEmpresas.


vale, va muy bien, ahora hagamos lo siguiente, crea una vista donde tenga una tabla
y se enlisten las empresas, elimina el cards y deja el formulario de crear y editar solo
en la tabla enlista los datos que consideres relevantes, cada tabla debe de tener
un botón de editar, el boton de editar te deberá de llevar a la vista que creaste para editar,
y deberá llenar los campos del formulario que creaste, crea una funcion en el 
archivo composables que simule el get de los datos de editar, para que lo llenes 
de manera correcta. 
para crear una empresa, deberá haber un botón de "Nueva empresa".
Toma como base como está:
@src/modules/Inventario/ConfiguracionDeInventario/Productos/ProductosView.vue
unifica en la misma carpeta que estás haciendo para dar de alta la empresa.
El titulo de CreateUpdateCompanyView.vue es dinamico de acuerdo a si es editar o crear
Elimina el titulo de Registrar nueva empresa y Gestión de Empresas
Administra las entidades legales de tu organización, quita el contenedor, para que el acordeon
ocupe el espacio. 
El input de archivos tomalo igual de la carpeta @src/shared/components

me parece perfecto, vamos a seguir mejorando:

el accordion de estructura organizacional, reemplaza esos departamentos
por un selector multiple, igual el componentes ya se encuentras
en @src/shared/components/SelectMultiple.vue
Has el fetch simulado de los departamentos igual como hiciste el de editar.

me parece perfecto, vamos a seguir mejorando:

el accordion de estructura organizacional, reemplaza esos departamentos
por un selector multiple, igual el componentes ya se encuentras
en @src/shared/components/SelectMultiple.vue
Has el fetch simulado de los departamentos igual como hiciste el de editar.



final:

Crea un módulo completo de Alta de Empleados en @modules/RRHH/AltaEmpleados
en Vue 3 + TypeScript con la siguiente estructura:

1. Crea una vista de tabla (EmployeesListView.vue) que:
   - Use BaseTable de shared components
   - Tenga un botón "Nuevo empleado" que redirija a /rrhh/empleados/crear. Y un Botón
   de eliminar que muestre un modal de confirmación.
   - Cada fila tenga un botón "Editar" que redirija a /rrhh/empleados/editar/:id
   - Muestre columnas de información principal.

2. Crea una vista de formulario (CreateUpdateEmployeeView.vue) que:
   - Solo muestre el formulario de @src/ejemplo/AltaEmpleados.jsx, sin cards adicionales ni títulos decorativos
   - El formulario debe ocupar todo el espacio disponible

3. Crea el componente EmployeeForm.vue con:
   - Título dinámico según el modo
   - Toma los mismos inputs que ocupa el archivo @src/ejemplo/AltaEmpleados.jsx.
   Crea un collapse por cada paso.
   - En modo crear: formulario vacío
   - En modo editar: cargar datos con getEmployeeById(id) y prellenar todos los campos

4. Crea useEmployeeActions.ts con funciones simuladas (mock data):
   - getEmployees(page, pageSize): retorna lista paginada de empleados
   - getEmployeeById(id): retorna empleado con datos ya predefinidos
   - createEmployee(data): simula creación
   - updateEmployee(id, data): simula actualización

5. Crea useEmployees.ts con:
   - Configuración de columnas para BaseTable
   - Botón de editar con redirección y eliminar que muestra modal.

6. Crea validaciones con Zod

7. Crea mappingCompanies.ts:
   - mapEmployeeRequest(): convierte frontend (inglés) a backend (español)
   - mapEmployeeDTO(): convierte backend a frontend
   - Crea mas si lo consideras correcto

8. Define tipos en employeeTypes.ts:

Toma como base el patrón de @inventario/ConfiguracionDeInventario/Productos/ProductosView.vue y usa componentes de @/shared/components/ y también el 
@src/modules/RRHH/AltaEmpresas/.
El modal tomalo de @src/shared/components/BaseModal.vue
Sigue la misma linea que usa el proyecto para los modales. Si ves necesario crear
mas componentes, sin ser excesivo, hazlo.

------------------------------------------------------------------------------------
Crea un módulo completo de Catalogo de Cuentas en @modules/Contabilidad/CatalogoDeCuentas en Vue 3 + TypeScript con la siguiente estructura:

1. Basandote en el componente @src/react/CatalogoCuentas.tsx crea una vista de tabla (AccountsCatalogView.vue) que:
   - En lugar de la tabla que se muestra crea una tabla con estilos similares al componente BaseTable de shared/components, no se usara ese componente como tal porque esta tabla no contiene paginacion, se mostraran todos los registros existentes respetando la funcion de acordion que tiene la tabla del componente de react
   - Tenga un botón "Agregar Cuenta" que abra el modal de crear.
   - Cada fila tenga un botón "Editar" que abra el mismo modal pero en lugar de mostrar 
   el formulario, solo muestre la informacion del activo y un boton de "Eliminar" que abra un modal de confirmacion.
   - Muestre columnas de información principal.

2. Crea una vista de formulario (CreateUpdateAccountView.vue) que:
   - Solo muestre el formulario de @src/react/CatalogoCuentas.tsx, sin cards adicionales ni títulos decorativos
   - El formulario debe ocupar todo el espacio disponible

3. Crea el componente AccountForm.vue, este es el formulario que se usara en el modal:
   - Toma los mismos inputs que ocupa el archivo @src/react/CatalogoCuentas.tsx.
   - En modo crear: formulario vacío
   - En modo editar: cargar datos con getAccountById(id) y prellenar todos los campos

4. Crea useAccountCatalogActions.ts con funciones simuladas (mock data):
   - getAccountsCatalog(): retorna lista de las cuentas en el catalogo
   - getAccountById(id): retorna la cuenta con datos ya predefinidos
   - createAccount(data): simula creación
   - updateAccount(id, data): simula actualización

5. Crea useAccountCatalog.ts con:
   - Configuración de columnas para la tabla

6. Crea validaciones con Zod

7. Crea mappingAccountsCatalogData.ts:
   - mapAccountRequest(): convierte frontend (inglés) a backend (español)
   - mapAccount(): convierte backend a frontend
   - Crea mas si lo consideras correcto

8. Define tipos en accountsCatalogTypes.ts:

Toma como base el patrón de @inventario/ConfiguracionDeInventario/Productos/ProductosView.vue o @inventario/ConfiguracionDeInventario/Categorias/CategoriasView.vue  y usa componentes de @/shared/components/.
El modal tomalo de @src/shared/components/BaseModal.vue
Sigue la misma linea que usa el proyecto para los modales. Si ves necesario crear
mas componentes, sin ser excesivo, hazlo.