export type BlogPost = {
  slugEs: string;
  slugEn: string;
  titleEs: string;
  titleEn: string;
  excerptEs: string;
  excerptEn: string;
  bodyEs: string[];
  bodyEn: string[];
  keywords: string[];
  publishedAt: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slugEs: 'roadmap-ingeniero-ia-2026',
    slugEn: 'ai-engineer-roadmap-2026',
    titleEs: 'Roadmap Ingeniero IA 2026: habilidades que si contratan',
    titleEn: 'AI Engineer Roadmap 2026: skills that get hired',
    excerptEs: 'Ruta practica para destacar como Ingeniero IA en producto: LLM, RAG, evaluacion, despliegue y MLOps.',
    excerptEn: 'A practical path to stand out as an AI Engineer in product: LLM, RAG, evaluation, deployment, and MLOps.',
    bodyEs: [
      'Un Ingeniero IA no solo entrena modelos: entrega valor en produccion. Las empresas buscan perfiles que conecten negocio, software e inteligencia artificial.',
      'Las competencias mas relevantes en 2026 son: diseno de sistemas con LLM, evaluacion automatizada, RAG con buenas practicas de retrieval, observabilidad y despliegue continuo.',
      'En entrevistas tecnicas, preparar casos reales acelera resultados: asistentes internos, clasificacion documental, automatizacion con agentes y control de calidad de prompts.'
    ],
    bodyEn: [
      'An AI Engineer does more than train models: they ship business value in production. Companies prioritize profiles that connect business, software, and AI.',
      'The most relevant skills in 2026 are: LLM system design, automated evaluation, RAG best practices, observability, and continuous delivery.',
      'In technical interviews, real case studies accelerate hiring outcomes: internal copilots, document classification, agentic automations, and prompt quality control.'
    ],
    keywords: ['AI Engineer', 'Ingeniero IA', 'LLM', 'RAG', 'MLOps'],
    publishedAt: '2026-04-08'
  },
  {
    slugEs: 'como-construyo-agentes-ia-en-producto',
    slugEn: 'how-i-build-ai-agents-for-product',
    titleEs: 'Como construyo agentes IA para producto sin perder control',
    titleEn: 'How I build AI agents for product without losing control',
    excerptEs: 'Arquitectura de agentes con guardrails, herramientas y evaluacion para equipos que necesitan fiabilidad.',
    excerptEn: 'Agent architecture with guardrails, tools, and evaluation for teams that need reliability.',
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
  }
];
