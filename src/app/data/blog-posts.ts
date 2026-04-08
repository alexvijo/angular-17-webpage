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
    titleEs: 'Roadmap Desarrollo con agentes IA 2026: habilidades que si contratan',
    titleEn: 'AI Engineer Roadmap 2026: skills that get hired',
    excerptEs: 'Ruta practica para destacar como Desarrollo con agentes IA en producto: LLM, RAG, evaluacion, despliegue y MLOps.',
    excerptEn: 'A practical path to stand out as an AI Engineer in product: LLM, RAG, evaluation, deployment, and MLOps.',
    youtubeUrl: 'https://www.youtube.com/watch?v=zjkBMFhNj_g',
    bodyEs: [
      'Un Desarrollo con agentes IA no solo entrena modelos: entrega valor en produccion. Las empresas buscan perfiles que conecten negocio, software e inteligencia artificial.',
      'Las competencias mas relevantes en 2026 son: diseno de sistemas con LLM, evaluacion automatizada, RAG con buenas practicas de retrieval, observabilidad y despliegue continuo.',
      'En entrevistas tecnicas, preparar casos reales acelera resultados: asistentes internos, clasificacion documental, automatizacion con agentes y control de calidad de prompts.'
    ],
    bodyEn: [
      'An AI Engineer does more than train models: they ship business value in production. Companies prioritize profiles that connect business, software, and AI.',
      'The most relevant skills in 2026 are: LLM system design, automated evaluation, RAG best practices, observability, and continuous delivery.',
      'In technical interviews, real case studies accelerate hiring outcomes: internal copilots, document classification, agentic automations, and prompt quality control.'
    ],
    keywords: ['AI Engineer', 'Desarrollo con agentes IA', 'LLM', 'RAG', 'MLOps'],
    publishedAt: '2026-04-08'
  },
  {
    slugEs: 'como-construyo-agentes-ia-en-producto',
    slugEn: 'how-i-build-ai-agents-for-product',
    titleEs: 'Como construyo agentes IA para producto sin perder control',
    titleEn: 'How I build AI agents for product without losing control',
    excerptEs: 'Arquitectura de agentes con guardrails, herramientas y evaluacion para equipos que necesitan fiabilidad.',
    excerptEn: 'Agent architecture with guardrails, tools, and evaluation for teams that need reliability.',
    youtubeUrl: 'https://www.youtube.com/results?search_query=ai+agents+architecture+production',
    bodyEs: [
      'Para entornos reales, cada agente necesita un marco claro: objetivo, herramientas permitidas, limites y trazabilidad.',
      'Uso evaluacion por lotes, dataset de pruebas y telemetria para medir precision, latencia y costo. Esto evita sorpresas al escalar.',
      'La clave no es solo responder bien, sino responder de forma segura, explicable y repetible para cada flujo de negocio.'
    ],
    bodyEn: [
      'In production environments, every agent needs a clear framework: objective, allowed tools, boundaries, and traceability.',
      'I use batch evaluation, test datasets, and telemetry to measure accuracy, latency, and cost. That prevents scaling surprises.',
      'The key is not only good answers, but safe, explainable, and repeatable behavior in every business workflow.'
    ],
    keywords: ['AI Agents', 'Agentic AI', 'Evaluation', 'Prompt Engineering', 'Observability'],
    publishedAt: '2026-04-08'
  },
  {
    slugEs: 'angular-llm-rag-en-produccion',
    slugEn: 'angular-llm-rag-in-production',
    titleEs: 'Angular + LLM + RAG en produccion: patron simple y robusto',
    titleEn: 'Angular + LLM + RAG in production: a simple robust pattern',
    excerptEs: 'Implementacion full-stack para experiencias IA con frontend Angular y backend preparado para RAG empresarial.',
    excerptEn: 'Full-stack implementation for AI experiences with Angular frontend and a backend ready for enterprise RAG.',
    youtubeUrl: 'https://www.youtube.com/results?search_query=rag+explained+for+developers',
    bodyEs: [
      'Angular permite construir interfaces rapidas y mantenibles para copilotos internos, asistentes y buscadores semanticos.',
      'Con un backend desacoplado para embeddings, retrieval y generacion, se obtiene control del sistema y una mejor evolucion del producto.',
      'El enfoque recomendado combina trazabilidad, pruebas de prompts y monitoreo para asegurar calidad continua en cada release.'
    ],
    bodyEn: [
      'Angular enables fast and maintainable interfaces for internal copilots, assistants, and semantic search tools.',
      'With a decoupled backend for embeddings, retrieval, and generation, teams gain control and better product evolution.',
      'The recommended approach combines traceability, prompt testing, and monitoring to ensure continuous quality in every release.'
    ],
    keywords: ['Angular', 'LLM', 'RAG', 'TypeScript', 'AI Product'],
    publishedAt: '2026-04-08'
  },
  {
    slugEs: 'openclaw-llm-studio-local-guia-paso-a-paso',
    slugEn: 'openclaw-llm-studio-local-step-by-step-guide',
    titleEs: 'Openclaw + LM Studio en local: guia paso a paso por hardware',
    titleEn: 'Openclaw + LM Studio local setup: step-by-step by hardware',
    excerptEs: 'Instalacion local de Openclaw con LM Studio, comandos practicos y recomendaciones de modelos segun RAM, CPU y GPU.',
    excerptEn: 'Local Openclaw setup with LM Studio, practical commands, and model recommendations based on RAM, CPU, and GPU.',
    youtubeUrl: 'https://www.youtube.com/results?search_query=lm+studio+local+llm+tutorial+openclaw',
    bodyEs: [
      'Si quieres probar agentes en local sin depender de APIs externas, Openclaw + LM Studio es una combinacion rapida y util para prototipado.',
      'Prerequisitos minimos: 16 GB RAM, 20 GB libres en disco y sistema actualizado. Recomendado para fluidez: 32 GB RAM y GPU con 8 GB VRAM o mas.',
      'Paso 1 - Instalar LM Studio: descarga desde https://lmstudio.ai e instala la aplicacion para tu sistema.',
      'Paso 2 - Levantar servidor local de inferencia en LM Studio: en terminal ejecuta `lms server start --port 1234`.',
      'Paso 3 - Verificar endpoint OpenAI-compatible: `curl http://127.0.0.1:1234/v1/models`.',
      'Paso 4 - Instalar Openclaw (ejemplo con Python): `git clone https://github.com/openclaw/openclaw.git` y luego `cd openclaw`.',
      'Paso 5 - Crear entorno e instalar dependencias: `python -m venv .venv`; en Windows `./.venv/Scripts/activate`; en macOS/Linux `source .venv/bin/activate`; despues `pip install -r requirements.txt`.',
      'Paso 6 - Configurar variables de entorno para LM Studio: `set OPENAI_BASE_URL=http://127.0.0.1:1234/v1` y `set OPENAI_API_KEY=lm-studio` (en PowerShell usa `$env:OPENAI_BASE_URL` y `$env:OPENAI_API_KEY`).',
      'Paso 7 - Ejecutar Openclaw: `python -m openclaw.app` (o el comando de arranque definido por el repositorio).',
      'Modelos recomendados por equipo: 16 GB RAM sin GPU dedicada -> Qwen2.5 3B/7B Q4; 32 GB RAM + GPU 8-12 GB -> Llama 3.1 8B Instruct Q4/Q5; 64 GB RAM + GPU 16 GB+ -> Mixtral 8x7B quantizado o modelos 14B para mejor calidad.',
      'Consejos de rendimiento: usa quantizacion Q4_K_M para equilibrio calidad/latencia, limita contexto a 4k-8k si tu RAM es justa, y activa batch pequeno para reducir picos de memoria.',
      'Consejos de calidad: prepara prompts con formato fijo, valida respuestas con casos de prueba y registra latencia/tokens para decidir cuando subir de modelo o de hardware.'
    ],
    bodyEn: [
      'If you want to test agents locally without external APIs, Openclaw + LM Studio is a fast and practical combination for prototyping.',
      'Minimum requirements: 16 GB RAM, 20 GB free disk, and an updated OS. Recommended for smoother runs: 32 GB RAM and a GPU with 8 GB VRAM or more.',
      'Step 1 - Install LM Studio: download it from https://lmstudio.ai and install for your OS.',
      'Step 2 - Start the local inference server in LM Studio: run `lms server start --port 1234`.',
      'Step 3 - Verify the OpenAI-compatible endpoint: `curl http://127.0.0.1:1234/v1/models`.',
      'Step 4 - Install Openclaw (Python example): `git clone https://github.com/openclaw/openclaw.git` and then `cd openclaw`.',
      'Step 5 - Create environment and install dependencies: `python -m venv .venv`; on Windows `./.venv/Scripts/activate`; on macOS/Linux `source .venv/bin/activate`; then `pip install -r requirements.txt`.',
      'Step 6 - Set environment variables for LM Studio: `set OPENAI_BASE_URL=http://127.0.0.1:1234/v1` and `set OPENAI_API_KEY=lm-studio` (in PowerShell use `$env:OPENAI_BASE_URL` and `$env:OPENAI_API_KEY`).',
      'Step 7 - Run Openclaw: `python -m openclaw.app` (or the startup command defined by the repository).',
      'Model recommendations by hardware: 16 GB RAM and no dedicated GPU -> Qwen2.5 3B/7B Q4; 32 GB RAM + 8-12 GB GPU -> Llama 3.1 8B Instruct Q4/Q5; 64 GB RAM + 16 GB+ GPU -> quantized Mixtral 8x7B or 14B-class models for stronger quality.',
      'Performance tips: use Q4_K_M quantization for quality/latency balance, keep context at 4k-8k if RAM is limited, and use a small batch size to avoid memory spikes.',
      'Quality tips: keep prompts structured, validate outputs with test cases, and track latency/tokens to decide when to scale model size or hardware.'
    ],
    keywords: ['Openclaw', 'LM Studio', 'Local LLM', 'AI Agents', 'Model Quantization'],
    publishedAt: '2026-04-08'
  }
];
