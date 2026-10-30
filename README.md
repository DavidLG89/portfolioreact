# Tu Máquina Retro Dev · TP2

Aplicación grupal desarrollada en React que continúa el proyecto arcade de TP1. Presenta al equipo y sus perfiles, un catálogo local de recursos con búsqueda y filtro, información de una API pública, el árbol de componentes y la bitácora.

## Índice

- [Proyecto](#proyecto)
- [Capturas](#capturas)
- [Recursos visuales](#recursos-visuales)
- [Ejecución local](#ejecución-local)
- [Integrantes y responsabilidades](#integrantes-y-responsabilidades)
- [Publicación](#publicación)
- [Declaración de uso de IA](#declaración-de-uso-de-ia)

## Proyecto

La aplicación conserva la identidad visual arcade del equipo y organiza sus secciones mediante una barra lateral compartida. Incluye perfiles individuales, un catálogo leído desde un JSON local, una consulta a la API pública FreeToGame y una bitácora del proceso.

## Recursos visuales

El equipo creó o adaptó para el proyecto estas imágenes personalizadas:

- **Ilustración del equipo** ([PortadaDevTeam.png](public/img/PortadoDevTeam.png)), para la identidad arcade.
- **Retrato arcade de David** ([david retro.webp](public/img/david%20retro.webp)), para el perfil P1.
- Los cuatro retratos conservan sus fotografías originales y reciben en la app un tratamiento común de color, marco y scanlines.

## Capturas

**Portada**

![Portada de Tu Máquina Retro Dev](docs/screenshots/portada.png)

**Árbol de componentes**

![Árbol de componentes de la aplicación](docs/screenshots/componentes.png)

## Ejecución local

Requiere Node.js y npm.

```bash
npm install
npm run dev
```

Para generar la versión de publicación:

```bash
npm run build
```

El resultado queda en `dist/`.

## Integrantes y responsabilidades

| Integrante | Perfil | Responsabilidad en el proyecto |
|---|---|---|
| [David Thomen](https://github.com/DavidLG89) | Backend Java / Spring Boot | Diseño de APIs y organización de los contenidos técnicos del catálogo. |
| [Rocío Palagano](https://github.com/RPalagano) | Desarrollo Full-Stack | Integración de datos y revisión del flujo entre interfaz y servicios. |
| [Dante Pufahl](https://github.com/DantePufahl) | Frontend y UX/UI | Componentes React, estilos de interfaz y adaptación visual. |
| [Candela Daubler](https://github.com/CandeDaubler) | Interaction Design & Gameplay | Interacciones y coherencia de la experiencia arcade. |

## Publicación

[Ver la aplicación en Vercel](https://portfolioreact-g27.vercel.app)

## Declaración de uso de IA

Como equipo usamos **GitHub Copilot en Visual Studio Code**, con **Claude** como modelo, para consultar dudas, explorar alternativas, comprender y depurar errores, y revisar propuestas de componentes, estilos y consumo de datos.

| Integrante | Aplicación y modelo | Tareas en las que se usó como apoyo |
|---|---|---|
| David Thomen | GitHub Copilot · Claude; OpenAI Codex · GPT-6 | Apoyo en revisión y mejoras de React, catálogo y documentación. |
| Rocío Palagano | GitHub Copilot · Claude | Dudas de integración full-stack y consumo de datos. |
| Dante Pufahl | GitHub Copilot · Claude | Componentes React, JSX, estilos y experiencia de interfaz. |
| Candela Daubler | GitHub Copilot · Claude | Ideas de interacción, presentación visual y experiencia arcade. |


Las decisiones, la selección de propuestas y la revisión e integración de los cambios estuvieron a cargo del equipo. La IA fue un recurso de apoyo.
