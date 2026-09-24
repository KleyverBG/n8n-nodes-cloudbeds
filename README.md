# n8n-nodes-cloudbeds

<p align="center">
  <img src="https://raw.githubusercontent.com/KleyverBG/n8n-nodes-cloudbeds/main/nodes/Cloudbeds/cloudbeds_logo_stacked.svg" alt="Cloudbeds" height="80">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-logo.png" alt="n8n" height="80">
</p>

Este paquete contiene un nodo de n8n para integrarse con la **API de Cloudbeds** - el sistema de gestión hotelera (PMS) líder en la industria.

[Cloudbeds](https://www.cloudbeds.com/) es una plataforma de gestión hotelera todo-en-uno que ayuda a hoteles, hostels y propiedades de alquiler a gestionar reservas, huéspedes, habitaciones y más.

## Instalación

### En n8n (Community Nodes)

1. Ve a **Settings** → **Community Nodes**
2. Selecciona **Install**
3. Ingresa `n8n-nodes-cloudbeds`
4. Acepta los riesgos y haz clic en **Install**

### Manual

```bash
cd ~/.n8n/nodes
npm install n8n-nodes-cloudbeds
```

Reinicia n8n después de la instalación.

## Credenciales

Este nodo soporta dos métodos de autenticación:

### API Key
1. Inicia sesión en tu cuenta de Cloudbeds
2. Ve a **Settings** → **API** → **API Credentials**
3. Genera una nueva API Key
4. Copia la API Key y pégala en las credenciales de n8n

### OAuth2
1. Registra tu aplicación en el portal de desarrolladores de Cloudbeds
2. Obtén el Client ID y Client Secret
3. Configura las credenciales OAuth2 en n8n

## Recursos y Operaciones

### 📅 Reservation (Reservas)
| Operación | Descripción |
|-----------|-------------|
| Create | Crear nueva reserva |
| Get | Obtener una reserva por ID |
| Get Many | Listar reservas con filtros |
| Update Room | Actualizar la asignación de habitación |
| Update Status | Cambiar el estado de la reserva |

### 👤 Guest (Huéspedes)
| Operación | Descripción |
|-----------|-------------|
| Create | Crear nuevo huésped |
| Get | Obtener huésped por ID |
| Get Many | Listar huéspedes |
| Search | Buscar huéspedes |
| Update | Actualizar huésped |

### 🛏️ Room (Habitaciones)
| Operación | Descripción |
|-----------|-------------|
| Block Room | Bloquear una habitación en un rango de fechas |
| Get Available | Obtener tipos de habitación disponibles |
| Get Many | Listar habitaciones |
| Get Room Types | Obtener tipos de habitación |
| Get Unassigned | Obtener habitaciones no asignadas |
| Unblock Room | Desbloquear una habitación |

### 🏨 Property (Propiedad)
| Operación | Descripción |
|-----------|-------------|
| Get System Info | Obtener versiones de componentes del sistema |

### 🧹 Housekeeping (Limpieza)
| Operación | Descripción |
|-----------|-------------|
| Get Status | Ver estado de limpieza |
| Get Assignments | Ver asignaciones |
| Update Room Condition | Actualizar condición de la habitación |

### ➕ Addon (Extras)
| Operación | Descripción |
|-----------|-------------|
| Get Many | Listar addons |
| Add to Reservation | Agregar a reserva |

### 📦 Item (Inventario)
| Operación | Descripción |
|-----------|-------------|
| Add to Reservation | Agregar item a una reserva |
| Get | Obtener item por ID |
| Get Categories | Obtener categorías de items |
| Get Many | Listar artículos |

### 📅 Event (Eventos)
| Operación | Descripción |
|-----------|-------------|
| Create | Crear evento |
| Delete | Eliminar evento |
| Get | Obtener evento por ID |
| Get Many | Listar eventos |
| Update | Actualizar evento |

### 🔐 Door Lock (Cerraduras)
| Operación | Descripción |
|-----------|-------------|
| Create Key | Crear llave digital |
| Delete Key | Eliminar llave |
| Delete Keys (Batch) | Eliminar múltiples llaves |
| Delete Settings | Eliminar configuración |
| Get Keys | Listar llaves |
| Get Settings | Obtener configuración |
| Update Key | Actualizar llave |
| Upsert Settings | Crear/actualizar config |

### 📊 Market Segmentation
| Operación | Descripción |
|-----------|-------------|
| Create Group / Segment | Crear grupos y segmentos |
| Get Group / Groups | Consultar grupos |
| Get Segment / Segments | Consultar segmentos |
| Get Segment Reservations | Obtener reservas ligadas a un segmento |
| Update Group / Segment | Actualizar grupos y segmentos |
| Delete Group / Segment | Eliminar grupos y segmentos |
| Enable / Disable Group / Segment | Activar o desactivar grupos y segmentos |
| Set Default Segment | Marcar un segmento por defecto |

### 🔗 Integration Event
| Operación | Descripción |
|-----------|-------------|
| Create | Crear evento de integración |
| Get Many | Listar eventos de integración |
| Retry | Reintentar evento fallido |
| Update | Actualizar evento de integración |

### 💳 Payment
| Operación | Descripción |
|-----------|-------------|
| Create Pay By Link | Generar link de pago para una reserva |
| Get Pay By Link | Consultar un link de pago existente |

### 💲 Rate (Tarifas)
| Operación | Descripción |
|-----------|-------------|
| Get Many | Obtener tarifas por rango de fechas y tipo de habitación |
| Get Rate Plans | Listar planes de tarifa |
| Update Rate | Actualizar el precio de una tarifa por día de la semana |

### 🪝 Webhook
| Operación | Descripción |
|-----------|-------------|
| Create | Crear suscripciones de webhook en Cloudbeds |
| Get Many | Listar suscripciones existentes |
| Delete | Eliminar una suscripción por ID |

El recurso Webhook permite seleccionar varios eventos en una sola ejecución. El nodo crea una suscripción independiente por cada evento seleccionado.

## Ejemplo de Uso

### Obtener reservas del día

1. Agrega el nodo **Cloudbeds**
2. Selecciona recurso: **Reservation**
3. Selecciona operación: **Get Many**
4. Configura filtros de fecha

### Automatizar check-in

```
Webhook → Cloudbeds (Get Reservation) → Cloudbeds (Assign Room) → Email
```

### Registrar webhooks de Cloudbeds

1. Agrega el nodo Cloudbeds
2. Selecciona recurso: Webhook
3. Selecciona operación: Create
4. Elige uno o varios eventos
5. Ingresa la URL de tu endpoint de n8n

## Compatibilidad

- **n8n versión**: 1.0.0 o superior
- **API de Cloudbeds**: v1.3

## Documentación

- [Documentación de la API de Cloudbeds](https://developers.cloudbeds.com/reference)
- [Documentación de n8n](https://docs.n8n.io/)

## Autor

**Kleyver Benitez**

- 📧 Email: kleyverm.benitez.es@gmail.com
- 💻 GitHub: [@KleyverBG](https://github.com/KleyverBG)

## Licencia

[MIT](LICENSE.md)

## Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request en el repositorio de GitHub.

---

**¿Problemas o sugerencias?** Abre un [issue en GitHub](https://github.com/KleyverBG/n8n-nodes-cloudbeds/issues).
