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
      'El rol de AI Engineer ha evolucionado rápido. Ya no basta con Python y llamar a OpenAI — las empresas buscan perfiles capaces de diseñar, desplegar y mantener sistemas de IA en producción.',
      'Las áreas clave para 2026: fundamentos de LLMs (contexto, temperatura, tokenización), pipelines RAG con embeddings y bases de datos vectoriales, y orquestación de agentes con LangGraph o CrewAI. En la capa de ingeniería, MLOps con MLflow, Docker y CI/CD.',
      'Mi recomendación: construye proyectos reales desde el primer día. Un asistente RAG sobre documentos propios o un agente que automatice una tarea repetitiva. El portfolio habla por encima del CV. Para empezar: `npm install -g langchain-cli && pip install langchain langgraph mlflow`',
    ],
    bodyEn: [
      'The AI Engineer role has evolved fast. Knowing Python and calling an OpenAI API is no longer enough — companies want profiles capable of designing, deploying, and maintaining AI systems in production.',
      'Key areas for 2026: LLM fundamentals (context, temperature, tokenization), RAG pipelines with embeddings and vector databases, and agent orchestration with LangGraph or CrewAI. At the engineering layer, MLOps with MLflow, Docker, and CI/CD.',
      'My recommendation: build real projects from day one. A RAG assistant on your own documents or an agent that automates a repetitive task. The portfolio speaks louder than the CV. To get started: `npm install -g langchain-cli && pip install langchain langgraph mlflow`',
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
      'Construir un agente para producción es otro reto completamente distinto al demo. Lo primero: definir con precisión qué problema resuelve y qué herramientas necesita. Un agente sin herramientas bien definidas es un LLM con ilusión de autonomía.',
      'Uso LangGraph para orquestar el flujo con nodos claros. La memoria es el punto más subestimado: separo episódica (historial), semántica (RAG) y procedimental (instrucciones del sistema). Para errores, reintentos con backoff exponencial y trazas en LangSmith para detectar patrones de fallo.',
      'Instala el stack completo con: `pip install langgraph langsmith langchain-openai`',
    ],
    bodyEn: [
      'Building an agent for production is a completely different challenge from a demo. First: precisely define what problem it solves and what tools it needs. An agent without well-defined tools is just an LLM with the illusion of autonomy.',
      'I use LangGraph to orchestrate the flow with clear nodes. Memory is the most underestimated piece: I separate episodic (history), semantic (RAG), and procedural (system instructions). For errors, retries with exponential backoff and LangSmith traces to detect failure patterns.',
      'Install the full stack with: `pip install langgraph langsmith langchain-openai && npm install -g @langchain/cli`',
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
      'Cuando tienes que entregar un producto real, el stack RAG cambia completamente respecto a los tutoriales. En el frontend uso Angular 18 con standalone components y Server-Sent Events para streaming de respuestas sin bloquear la UI.',
      'El backend: FastAPI + LangChain, embeddings de OpenAI, Chroma como vector store local (o Pinecone en cloud) y retriever con reranking. Los puntos críticos en producción son coste (caché de embeddings), latencia (precomputar en ingest time) y observabilidad con LangSmith.',
      'Instala el backend con: `pip install fastapi langchain chromadb openai langsmith && npm install @angular/core@18`',
    ],
    bodyEn: [
      'When you have to deliver a real product, the RAG stack changes completely from tutorials. On the frontend I use Angular 18 with standalone components and Server-Sent Events for response streaming without blocking the UI.',
      'The backend: FastAPI + LangChain, OpenAI embeddings, Chroma as local vector store (or Pinecone in cloud), and retriever with reranking. Critical production points: cost (embedding cache), latency (precompute at ingest time), and observability with LangSmith.',
      'Install the backend with: `pip install fastapi langchain chromadb openai langsmith && npm install @angular/core@18`',
    ],
    keywords: ['Angular', 'LLM', 'RAG', 'FastAPI', 'LangChain', 'producción', 'AI Developer', 'Alex Vicente'],
    publishedAt: '2026-05-03',
  },
  {
    slugEs: 'headroom-netflix-compresion-contexto-agentes-ia',
    slugEn: 'headroom-netflix-context-compression-ai-agents',
    titleEs: 'Headroom: cómo Netflix redujo un 92% el coste de sus agentes IA',
    titleEn: 'Headroom: How Netflix Cut AI Agent Token Costs by 92%',
    excerptEs: 'Un ingeniero de Netflix estaba quemando 200 dólares al día en tokens. Su solución open source comprime el contexto antes de enviarlo al LLM y lo ha reducido a 30 dólares. Aquí te explico cómo funciona y cómo aplicarlo a tus proyectos.',
    excerptEn: 'A Netflix engineer was burning $200/day on tokens. His open source solution compresses context before sending it to the LLM, cutting costs to $30/day. Here\'s how it works and how to apply it to your projects.',
    youtubeUrl: '',
    bodyEs: [
      'Tejas Chopra (Netflix) quemaba 200 dólares al día en tokens con sus agentes IA. No era un problema de modelo — era puro volumen de contexto. Cada llamada a herramienta, cada log, cada resultado de búsqueda se acumulaba hasta hacer inmanejable la ventana. Su solución: Headroom, una capa de compresión open source entre tu agente y el LLM.',
      'Headroom comprime el contexto usando seis métodos según el tipo: AST para código (tree-sitter), SmartCrusher para JSON, y un modelo HuggingFace para prosa. Resultados reales: 17.765 → 1.408 tokens en búsqueda de código (92%). Coste: de 200 a 30 dólares diarios. Sin degradación en benchmarks de precisión.',
      'Instala y activa con: `npm install -g headroom-ai && headroom wrap claude`',
    ],
    bodyEn: [
      'Tejas Chopra (Netflix) was burning $200/day on tokens with his AI agents. Not a model problem — pure context volume. Every tool call, log, and search result accumulated until the window became unmanageable. His solution: Headroom, an open source compression layer between your agent and the LLM.',
      'Headroom compresses context using six methods by type: AST for code (tree-sitter), SmartCrusher for JSON, and a HuggingFace model for prose. Real results: 17,765 → 1,408 tokens in code search (92%). Cost: from $200 to $30/day. No degradation on accuracy benchmarks.',
      'Install and activate with: `npm install -g headroom-ai && headroom wrap claude`',
    ],
    keywords: ['Headroom', 'Netflix', 'compresión de contexto', 'tokens LLM', 'agentes IA', 'reducción de costes', 'MCP', 'open source', 'Alex Vicente'],
    publishedAt: '2026-06-01',
  },
  {
    slugEs: 'codegraph-codigo-sin-busquedas-ciegas',
    slugEn: 'codegraph-code-without-blind-searches',
    titleEs: 'CodeGraph: deja de buscar código a ciegas con tus agentes IA',
    titleEn: 'CodeGraph: Stop Searching Code Blindly with Your AI Agents',
    excerptEs: 'Los agentes IA pierden hasta un 40% de su ventana de contexto buscando código con grep y cat. CodeGraph construye un grafo de conocimiento de tu repositorio con tree-sitter y responde en milisegundos qué llama a qué, qué romperías si cambias X, y dónde está definida cada función.',
    excerptEn: 'AI agents waste up to 40% of their context window searching code with grep and cat. CodeGraph builds a knowledge graph of your repo with tree-sitter and answers in milliseconds what calls what, what you\'d break if you change X, and where each function is defined.',
    youtubeUrl: '',
    bodyEs: [
      'Sin CodeGraph, el patrón de un agente en tu repo es siempre el mismo: grep, cat, grep, read... miles de tokens antes de escribir una línea. CodeGraph construye un grafo AST de todo tu repositorio con tree-sitter y lo expone como servidor MCP para consultas en milisegundos.',
      '"¿Qué pasaría si cambio esta función?" con grep: 4-8 llamadas y 5.000 tokens. Con codegraph_impact: 1 llamada y 200 tokens. codegraph_explore devuelve código de múltiples ficheros en una sola llamada — de 15.000 a 3.000 tokens para entender un sistema completo. Índice SQLite local, sin servidor externo.',
      'Instala con: `npm install -g codegraph && codegraph init -i`',
    ],
    bodyEn: [
      'Without CodeGraph, the pattern of an agent in your repo is always the same: grep, cat, grep, read... thousands of tokens before writing a line. CodeGraph builds an AST graph of your entire repository with tree-sitter and exposes it as an MCP server for millisecond queries.',
      '"What would happen if I change this function?" with grep: 4-8 calls and 5,000 tokens. With codegraph_impact: 1 call and 200 tokens. codegraph_explore returns code from multiple files in a single call — from 15,000 to 3,000 tokens to understand a complete system. Local SQLite index, no external server.',
      'Install with: `npm install -g codegraph && codegraph init -i`',
    ],
    keywords: ['CodeGraph', 'MCP', 'agentes IA', 'Claude Code', 'tree-sitter', 'análisis de código', 'refactoring', 'tokens', 'AST', 'Alex Vicente'],
    publishedAt: '2026-06-05',
  },
  {
    slugEs: 'agent-skills-autoskills-supercharge-claude-code',
    slugEn: 'agent-skills-autoskills-supercharge-claude-code',
    titleEs: 'Agent Skills y autoskills: cómo potenciar tu agente IA en 30 segundos',
    titleEn: 'Agent Skills and autoskills: How to Supercharge Your AI Agent in 30 Seconds',
    excerptEs: 'Los Agent Skills son la forma más rápida de dar superpoderes a Claude Code, Cursor o Codex. Y con autoskills, una herramienta detecta automáticamente tu stack y te instala los mejores. Aquí te explico qué son, cómo funcionan y cuáles no deberían faltarte.',
    excerptEn: 'Agent Skills are the fastest way to give superpowers to Claude Code, Cursor, or Codex. And with autoskills, a tool automatically detects your stack and installs the best ones. Here\'s what they are, how they work, and which ones you shouldn\'t miss.',
    youtubeUrl: '',
    bodyEs: [
      'Un Agent Skill es un fichero Markdown con YAML frontmatter que le dice al agente cuándo activarse, qué herramientas usar y cómo secuenciar el trabajo. A diferencia de un MCP server (que gestiona la integración técnica), el Skill contiene el know-how: cuándo usarlo, en qué orden, cómo formatear el resultado. Funciona en Claude Code, Codex, Cursor y OpenCode sin cambios.',
      'El punto de entrada más rápido es `npx autoskills` en la raíz del proyecto: detecta tu stack y te instala los skills más relevantes en 30 segundos. Los imprescindibles: `geo-seo-claude`, `code-review`, `codegraph`, `security-review` y `verify`. Un skill bien escrito ahorra 5-10 mensajes de ida y vuelta por tarea.',
      'Instala el gestor de skills con: `npm install -g @anthropic-ai/claude-code && npx autoskills`',
    ],
    bodyEn: [
      'An Agent Skill is a Markdown file with YAML frontmatter that tells the agent when to activate, which tools to use, and how to sequence the work. Unlike an MCP server (which handles technical integration), the Skill contains the know-how: when to use it, in what order, how to format the result. Works in Claude Code, Codex, Cursor, and OpenCode without changes.',
      'The fastest entry point is `npx autoskills` in your project root: it detects your stack and installs the most relevant skills in 30 seconds. Must-haves: `geo-seo-claude`, `code-review`, `codegraph`, `security-review`, and `verify`. A well-written skill saves 5-10 round trips per task.',
      'Install the skills manager with: `npm install -g @anthropic-ai/claude-code && npx autoskills`',
    ],
    keywords: ['Agent Skills', 'autoskills', 'Claude Code', 'Cursor', 'Codex', 'MCP', 'agentes IA', 'productividad developer', 'npx', 'Alex Vicente'],
    publishedAt: '2026-06-08',
  },
  {
    slugEs: 'geo-aeo-seo-optimizar-web-para-ia-chatgpt-perplexity',
    slugEn: 'geo-aeo-seo-optimize-web-for-ai-chatgpt-perplexity',
    titleEs: 'GEO, AEO y SEO: cómo optimizar tu web para que la IA te cite',
    titleEn: 'GEO, AEO, and SEO: How to Optimize Your Web for AI Citation',
    excerptEs: 'El tráfico referido por IA creció un 527% en el último año, pero solo el 23% de los desarrolladores optimiza para este canal. GEO (Generative Engine Optimization) no es reemplazar el SEO clásico — es añadir una capa que hace tu contenido citable por ChatGPT, Perplexity, Claude y Google AI Overviews.',
    excerptEn: 'AI-referred traffic grew 527% in the past year, but only 23% of developers optimize for this channel. GEO (Generative Engine Optimization) isn\'t replacing classic SEO — it\'s adding a layer that makes your content citable by ChatGPT, Perplexity, Claude, and Google AI Overviews.',
    youtubeUrl: '',
    bodyEs: [
      'Georgia Tech, Princeton e IIT Delhi demostraron que optimizar para citabilidad IA da entre un 30% y 115% más de visibilidad en respuestas de LLMs. El tráfico referido por IA crece al 527% interanual, pero la mayoría de webs de developers siguen solo en SEO clásico.',
      'Las tres palancas técnicas clave: 1) `llms.txt` en la raíz del dominio — describe en lenguaje natural quién eres y qué páginas tienes. 2) Schema `FAQPage` con preguntas reales — los LLMs extraen las respuestas directamente. 3) Permitir GPTBot, ClaudeBot y PerplexityBot en tu `robots.txt`. Si tu web es una SPA sin SSR, ese es el primer fix.',
      'Audita tu web con: `npx install github.com/zubair-trabzada/geo-seo-claude` y luego `/geo audit tu-dominio.com`',
    ],
    bodyEn: [
      'Georgia Tech, Princeton, and IIT Delhi showed that optimizing for AI citability gives 30-115% more visibility in LLM responses. AI-referred traffic grows at 527% year-over-year, but most developer websites are still only optimized for classic SEO.',
      'The three key technical levers: 1) `llms.txt` in your domain root — describes in natural language who you are and what pages you have. 2) `FAQPage` schema with real questions — LLMs extract answers directly. 3) Allow GPTBot, ClaudeBot, and PerplexityBot in your `robots.txt`. If your site is an SPA without SSR, that\'s the first fix.',
      'Audit your site with: `npx install github.com/zubair-trabzada/geo-seo-claude` and then `/geo audit your-domain.com`',
    ],
    keywords: ['GEO', 'AEO', 'SEO', 'Generative Engine Optimization', 'ChatGPT', 'Perplexity', 'llms.txt', 'schema markup', 'citabilidad IA', 'Alex Vicente'],
    publishedAt: '2026-06-12',
  },
  {
    slugEs: 'como-revisar-prs-automaticamente-con-agentes-ia',
    slugEn: 'how-to-review-prs-automatically-with-ai-agents',
    titleEs: 'Cómo revisar PRs automáticamente con agentes IA (y no morir en el intento)',
    titleEn: 'How to Review PRs Automatically with AI Agents (and Not Die Trying)',
    excerptEs: 'Revisar pull requests es el cuello de botella de cualquier equipo de desarrollo. Los agentes IA pueden hacer la primera pasada: detectar bugs, señalar código muerto, verificar convenciones y comprobar que los tests cubren lo que deben. Te cuento cómo montarlo con Claude Code y cuándo no delegar.',
    excerptEn: 'Reviewing pull requests is the bottleneck of any development team. AI agents can do the first pass: detect bugs, flag dead code, verify conventions, and check that tests cover what they should. Here\'s how to set it up with Claude Code and when not to delegate.',
    youtubeUrl: '',
    bodyEs: [
      'En equipos con ciclos rápidos los PRs se acumulan y el review superficial se vuelve la norma. Los agentes IA no reemplazan el juicio humano — pero pueden hacer la primera pasada y liberar al reviewer para decisiones de arquitectura.',
      'El workflow en tres capas: `code-review ultra` analiza el diff completo, detecta bugs de corrección y deja comentarios inline con `--comment`. `security-review` corre sobre cambios en autenticación y validación. `verify` comprueba que la corrección no introduce regresiones abriendo el navegador. Regla: delega detección de bugs al agente, reserva diseño y lógica de negocio al humano.',
      'Instala los skills con: `npm install -g @anthropic-ai/claude-code && npx autoskills`',
    ],
    bodyEn: [
      'In teams with fast cycles, PRs pile up and superficial review becomes the norm. AI agents don\'t replace human judgment — but they can do the first pass and free the reviewer for architecture decisions.',
      'The three-layer workflow: `code-review ultra` analyzes the complete diff, detects correctness bugs, and leaves inline comments with `--comment`. `security-review` runs on auth and validation changes. `verify` checks that the fix doesn\'t introduce regressions by opening the browser. Rule: delegate bug detection to the agent, reserve design and business logic for the human.',
      'Install the skills with: `npm install -g @anthropic-ai/claude-code && npx autoskills`',
    ],
    keywords: ['code review', 'pull request', 'agentes IA', 'Claude Code', 'code-review skill', 'security review', 'verify skill', 'automatización', 'developer workflow', 'Alex Vicente'],
    publishedAt: '2026-06-15',
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
      'Ollama te da un LLM local en menos de 20 minutos: cero coste por token, privacidad total y experimentación sin límites. Soporta macOS, Linux y Windows.',
      'Descarga un modelo con `ollama pull llama3`. Para hardware modesto: Mistral 7B o Phi-3 Mini. Con GPU de 16GB VRAM: Llama 3 8B o Gemma 2 9B. Open WebUI (Docker) añade una interfaz tipo ChatGPT conectada a tus modelos. Ollama expone una API compatible con OpenAI en localhost:11434 — cualquier cliente (LangChain, LlamaIndex) funciona sin cambios.',
      'Instala con: `npm install -g ollama && ollama pull llama3 && docker run -d -p 3000:8080 ghcr.io/open-webui/open-webui:main`',
    ],
    bodyEn: [
      'Ollama gives you a local LLM in under 20 minutes: zero cost per token, full privacy, and unlimited experimentation. Supports macOS, Linux, and Windows.',
      'Download a model with `ollama pull llama3`. For modest hardware: Mistral 7B or Phi-3 Mini. With 16GB VRAM GPU: Llama 3 8B or Gemma 2 9B. Open WebUI (Docker) adds a ChatGPT-like interface connected to your local models. Ollama exposes an OpenAI-compatible API at localhost:11434 — any client (LangChain, LlamaIndex) works without changes.',
      'Install with: `npm install -g ollama && ollama pull llama3 && docker run -d -p 3000:8080 ghcr.io/open-webui/open-webui:main`',
    ],
    keywords: ['Ollama', 'LLM local', 'Open WebUI', 'Llama 3', 'Mistral', 'LLM Studio', 'AI local', 'Alex Vicente'],
    publishedAt: '2026-05-03',
  },
];
