export type BlogPost = {
  slugEs: string;
  slugEn: string;
  titleEs: string;
  titleEn: string;
  excerptEs: string;
  excerptEn: string;
  youtubeUrl: string;
  bodyEs: string[];
  bodyEn: string[];
  keywords: string[];
  publishedAt: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slugEs: 'roadmap-ingeniero-ia-2026',
    slugEn: 'ai-engineer-roadmap-2026',
    titleEs: 'Roadmap para convertirte en Ingeniero IA en 2026',
    titleEn: 'AI Engineer Roadmap for 2026',
    excerptEs: 'Guía práctica con las habilidades, herramientas y proyectos clave que necesitas para trabajar como AI Engineer en 2026: LLMs, RAG, agentes, MLOps y más.',
    excerptEn: 'A practical guide to the skills, tools, and key projects you need to work as an AI Engineer in 2026: LLMs, RAG, agents, MLOps, and more.',
    youtubeUrl: '',
    bodyEs: [
      'El rol de AI Engineer ha evolucionado rápidamente en los últimos dos años. Ya no basta con saber Python y llamar a una API de OpenAI. Las empresas buscan perfiles capaces de diseñar, desplegar y mantener sistemas de IA en producción.',
      'En este roadmap comparto las áreas que considero fundamentales para 2026: dominar los fundamentos de los LLMs (contexto, temperatura, tokenización), entender cómo construir pipelines RAG robustos con embeddings y bases de datos vectoriales, y saber orquestar agentes con frameworks como LangGraph o CrewAI.',
      'En la capa de ingeniería, es esencial conocer MLOps: seguimiento de experimentos con MLflow, despliegue con Docker y CI/CD, y monitoreo de modelos en producción. El frontend también importa: ser capaz de construir interfaces con Angular o React para exponer los sistemas al usuario final marca la diferencia.',
      'Mi recomendación: construye proyectos reales desde el primer día. Un asistente RAG sobre documentos propios, un agente que automatice una tarea repetitiva, un pipeline de evaluación de respuestas LLM. El portfolio habla por encima del CV.',
    ],
    bodyEn: [
      'The AI Engineer role has evolved rapidly over the past two years. Knowing Python and calling an OpenAI API is no longer enough. Companies are looking for profiles capable of designing, deploying, and maintaining AI systems in production.',
      'In this roadmap I share the areas I consider fundamental for 2026: mastering LLM fundamentals (context, temperature, tokenization), understanding how to build robust RAG pipelines with embeddings and vector databases, and knowing how to orchestrate agents with frameworks like LangGraph or CrewAI.',
      'At the engineering layer, MLOps is essential: experiment tracking with MLflow, deployment with Docker and CI/CD, and monitoring models in production. The frontend also matters: being able to build interfaces with Angular or React to expose systems to end users makes a real difference.',
      'My recommendation: build real projects from day one. A RAG assistant on your own documents, an agent that automates a repetitive task, an LLM response evaluation pipeline. The portfolio speaks louder than the CV.',
    ],
    keywords: ['AI Engineer', 'Roadmap IA 2026', 'LLM', 'RAG', 'MLOps', 'Agentes IA', 'Angular', 'Alex Vicente'],
    publishedAt: '2026-05-03',
  },
  {
    slugEs: 'como-construyo-agentes-ia-en-producto',
    slugEn: 'how-i-build-ai-agents-for-product',
    titleEs: 'Cómo construyo agentes IA en producto real',
    titleEn: 'How I Build AI Agents for Real Products',
    excerptEs: 'Mi proceso para diseñar e implementar agentes IA en productos reales: desde la definición de herramientas y memoria hasta el manejo de errores y la evaluación en producción.',
    excerptEn: 'My process for designing and implementing AI agents in real products: from defining tools and memory to error handling and production evaluation.',
    youtubeUrl: '',
    bodyEs: [
      'Construir un agente IA para un demo es sencillo. Construirlo para producción es otro reto completamente distinto. En este post comparto el proceso que sigo cuando integro agentes en productos reales.',
      'Lo primero es definir con precisión qué problema resuelve el agente y qué herramientas necesita. Un agente sin herramientas bien definidas es un LLM con ilusión de autonomía. Uso LangGraph para orquestar el flujo, definiendo nodos claros para razonamiento, uso de herramientas y síntesis de respuesta.',
      'La memoria es el punto más subestimado. Separo memoria episódica (historial de conversación), semántica (base de conocimiento RAG) y procedimental (instrucciones del sistema). Cada una se gestiona de forma diferente y tiene un coste distinto.',
      'Para manejo de errores, implemento reintentos con backoff exponencial en llamadas a APIs externas y valido siempre la salida del LLM antes de ejecutar acciones con efecto secundario. En producción, monitoreo con trazas en LangSmith para detectar patrones de fallo y optimizar los prompts de forma iterativa.',
    ],
    bodyEn: [
      'Building an AI agent for a demo is easy. Building one for production is a completely different challenge. In this post I share the process I follow when integrating agents into real products.',
      'The first step is precisely defining what problem the agent solves and what tools it needs. An agent without well-defined tools is just an LLM with the illusion of autonomy. I use LangGraph to orchestrate the flow, defining clear nodes for reasoning, tool use, and response synthesis.',
      'Memory is the most underestimated piece. I separate episodic memory (conversation history), semantic memory (RAG knowledge base), and procedural memory (system instructions). Each is managed differently and has a different cost.',
      'For error handling, I implement retries with exponential backoff on external API calls and always validate LLM output before executing actions with side effects. In production, I monitor with traces in LangSmith to detect failure patterns and iteratively optimize prompts.',
    ],
    keywords: ['Agentes IA', 'LangGraph', 'LLM producción', 'RAG', 'AI Agent', 'LangSmith', 'Alex Vicente'],
    publishedAt: '2026-05-03',
  },
  {
    slugEs: 'angular-llm-rag-en-produccion',
    slugEn: 'angular-llm-rag-in-production',
    titleEs: 'Angular + LLM + RAG: mi stack en producción',
    titleEn: 'Angular + LLM + RAG: My Production Stack',
    excerptEs: 'Cómo combino Angular en el frontend con un backend LLM+RAG para construir aplicaciones de IA orientadas a negocio que funcionan de verdad en producción.',
    excerptEn: 'How I combine Angular on the frontend with an LLM+RAG backend to build business-oriented AI applications that actually work in production.',
    youtubeUrl: '',
    bodyEs: [
      'La mayoría de tutoriales de RAG muestran un Jupyter Notebook con cuatro líneas de Python. Pero cuando tienes que entregar un producto real a un cliente, el stack cambia completamente.',
      'En el frontend uso Angular 18 con componentes standalone y lazy loading. La comunicación con el backend se hace a través de Server-Sent Events para streaming de respuestas, lo que da una experiencia de usuario fluida sin bloquear la UI.',
      'El backend está construido con FastAPI + LangChain. El pipeline RAG usa embeddings de OpenAI, Chroma como vector store local (o Pinecone en cloud), y un retriever con reranking para mejorar la relevancia. El LLM se llama con streaming habilitado para que los tokens lleguen al frontend en tiempo real.',
      'Los puntos críticos en producción: gestión de costes (caché de embeddings, batching de requests), latencia (precomputar embeddings en ingest time, no en query time), y observabilidad (trazas completas request-to-response en LangSmith). Este stack me ha funcionado en varios proyectos de cliente en 2025.',
    ],
    bodyEn: [
      'Most RAG tutorials show a Jupyter Notebook with four lines of Python. But when you have to deliver a real product to a client, the stack changes completely.',
      'On the frontend I use Angular 18 with standalone components and lazy loading. Communication with the backend happens through Server-Sent Events for response streaming, giving a smooth user experience without blocking the UI.',
      'The backend is built with FastAPI + LangChain. The RAG pipeline uses OpenAI embeddings, Chroma as a local vector store (or Pinecone in cloud), and a retriever with reranking to improve relevance. The LLM is called with streaming enabled so tokens arrive at the frontend in real time.',
      'Critical production points: cost management (embedding cache, request batching), latency (precompute embeddings at ingest time, not query time), and observability (full request-to-response traces in LangSmith). This stack has worked for me on several client projects in 2025.',
    ],
    keywords: ['Angular', 'LLM', 'RAG', 'FastAPI', 'LangChain', 'producción', 'AI Developer', 'Alex Vicente'],
    publishedAt: '2026-05-03',
  },
  {
    slugEs: 'openclaw-llm-studio-local-guia-paso-a-paso',
    slugEn: 'openclaw-llm-studio-local-step-by-step-guide',
    titleEs: 'LLM Studio local con Ollama: guía paso a paso',
    titleEn: 'Local LLM Studio with Ollama: Step-by-Step Guide',
    excerptEs: 'Cómo montar tu propio entorno de LLMs local con Ollama, Open WebUI y modelos como Llama 3 o Mistral. Sin coste, sin privacidad comprometida, con control total.',
    excerptEn: 'How to set up your own local LLM environment with Ollama, Open WebUI, and models like Llama 3 or Mistral. No cost, no privacy compromises, full control.',
    youtubeUrl: '',
    bodyEs: [
      'Tener un LLM corriendo en local tiene ventajas claras: cero coste por token, privacidad total de los datos y posibilidad de experimentar sin límites. Con Ollama, montar este entorno tarda menos de 20 minutos.',
      'Paso 1: instala Ollama desde ollama.com. Soporta macOS, Linux y Windows. Una vez instalado, descarga un modelo con ollama pull llama3. Para hardware modesto recomiendo Mistral 7B o Phi-3 Mini; si tienes una GPU con 16GB de VRAM, Llama 3 8B o Gemma 2 9B funcionan muy bien.',
      'Paso 2: instala Open WebUI con Docker. Es una interfaz web que replica la experiencia de ChatGPT pero conectada a tus modelos locales. Permite gestionar conversaciones, cargar documentos para RAG básico y comparar respuestas entre modelos.',
      'Paso 3: conecta con tu código. Ollama expone una API REST compatible con la API de OpenAI, así que cualquier cliente que uses (LangChain, LlamaIndex, código propio) funciona apuntando a localhost:11434 sin cambiar casi nada. Ideal para desarrollar sin costes y pasar a cloud solo cuando sea necesario.',
    ],
    bodyEn: [
      'Running an LLM locally has clear advantages: zero cost per token, full data privacy, and the ability to experiment without limits. With Ollama, setting up this environment takes less than 20 minutes.',
      'Step 1: install Ollama from ollama.com. It supports macOS, Linux, and Windows. Once installed, download a model with ollama pull llama3. For modest hardware I recommend Mistral 7B or Phi-3 Mini; if you have a GPU with 16GB VRAM, Llama 3 8B or Gemma 2 9B work very well.',
      'Step 2: install Open WebUI with Docker. It is a web interface that replicates the ChatGPT experience but connected to your local models. It lets you manage conversations, load documents for basic RAG, and compare responses between models.',
      'Step 3: connect with your code. Ollama exposes a REST API compatible with the OpenAI API, so any client you use (LangChain, LlamaIndex, custom code) works by pointing to localhost:11434 without changing almost anything. Ideal for developing without costs and moving to cloud only when necessary.',
    ],
    keywords: ['Ollama', 'LLM local', 'Open WebUI', 'Llama 3', 'Mistral', 'LLM Studio', 'AI local', 'Alex Vicente'],
    publishedAt: '2026-05-03',
  },
];
