# BarberApp 

Aplicación móvil desarrollada en React Native para la gestión de reservas de barbería.  
Permite a los clientes reservar citas y al administrador gestionar barberos, horarios y reservas de forma segura y organizada.

---

# Características Principales

## Clientes

- Ver barberos disponibles.
- Seleccionar fecha y horario.
- Reservar citas.
- Validación de datos del cliente.
- Bloqueo de horarios ocupados.
- Bloqueo de horarios pasados del día actual.
- Navegación automática al inicio después de reservar.

---

## Administrador

- Inicio de sesión administrador.
- Gestión completa de reservas.
- Filtrado de reservas:
  - Todas
  - Pendientes
  - Completadas
  - Canceladas
- Gestión de barberos:
  - Agregar
  - Eliminar
  - Activar
  - Desactivar
- Configuración de horarios.
- Validación de horarios permitidos.
- Bloqueo de cambios de horario con reservas pendientes.
- Bloqueo de eliminación de barberos con reservas activas.
- Bloqueo de desactivación de barberos con reservas activas.
- Cierre automático de sesión tras 3 minutos de inactividad.

---

# Tecnologías Utilizadas

# Tecnologías Utilizadas

- React Native
- Expo
- JavaScript
- Node.js
- npm
- Supabase
- React Navigation
---

# Estructura del Proyecto

```bash
src/
│
├── components/
│   └── CustomButton.js
│
├── hooks/
│   └── useAdminTimeout.js
│
├── screens/
│   │
│   ├── admin/
│   │   ├── AdminLoginScreen.js
│   │   ├── AdminDashboardScreen.js
│   │   ├── AdminBookingsScreen.js
│   │   ├── AdminBarbersScreen.js
│   │   └── AdminScheduleScreen.js
│   │
│   ├── client/
│   │   ├── HomeScreen.js
│   │   ├── BarberListScreen.js
│   │   ├── TimeSlotScreen.js
│   │   ├── BookingScreen.js
│   │   └── ConfirmationScreen.js
│
├── services/
│   └── supabase.js
│
├── navigation/
│   └── AppNavigator.js
│
└── App.js

Instalación
1. Clonar repositorio
git clone https://github.com/usuario/barberapp.git
2. Instalar dependencias
npm install
3. Ejecutar proyecto
npx expo start
Configuración de Supabase

El proyecto utiliza Supabase como base de datos y backend.

Tabla: barbers
Campo	Tipo
id	int
name	text
specialty	text
chair_number	int
is_active	boolean
start_hour	int
end_hour	int
Tabla: appointments
Campo	Tipo
id	int
customer_name	text
phone	text
barber_id	int
barber_name	text
appointment_date	text
appointment_time	text
status	text
Acceso Administrador
Usuario administrador
admin
Contraseña administrador
1234

Las credenciales pueden modificarse desde el código o desde Supabase según la implementación utilizada.

Validaciones Implementadas
Validaciones Cliente
Nombre mínimo de 3 letras.
Teléfono únicamente numérico.
Teléfono obligatorio de 10 dígitos.
Restricción de horarios ocupados.
Restricción de horarios ya pasados.
Validaciones Administrador
No eliminar barberos con reservas pendientes.
No desactivar barberos con reservas pendientes.
No modificar horarios con reservas fuera del nuevo rango.
Horarios permitidos únicamente entre 6 AM y 8 PM.
Cierre automático de sesión por inactividad.
Seguridad
Protección de acceso administrador.
Restricción de acciones críticas.
Validaciones de disponibilidad.
Control automático de sesión.
Mejoras Implementadas
Sistema dinámico de horarios.
Filtrado avanzado de reservas.
Control de disponibilidad en tiempo real.
Navegación automática después de reservar.
Gestión de estados de reservas.
Manejo de horarios en formato 24 horas.
Validaciones administrativas avanzadas.
Funcionamiento General
El cliente selecciona un barbero.
Escoge una fecha disponible.
Selecciona un horario libre.
Completa sus datos.
La reserva se guarda en Supabase.
El administrador puede visualizar y gestionar las reservas desde el panel administrativo.
Autor

Victor Jesus Duarte García

Licencia

Proyecto académico desarrollado con fines educativos.