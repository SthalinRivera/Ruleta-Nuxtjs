// ~/composables/useChatGPT.ts

export const useChatGPT = async (userInput: string) => {
  const config = useRuntimeConfig();
  const prompt = `Genera una lista de preguntas de 'verdad o reto' en formato JSON. Cada pregunta debe tener un tipo ('verdad' o 'reto') y un texto de pregunta relevante para el contexto: ${userInput}. Ejemplo: [{ "type": "verdad", "question": "¿Qué es lo más embarazoso que has hecho?" }, { "type": "reto", "question": "Baila durante 30 segundos." }]`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.public.openaiApiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Eres un asistente que genera preguntas de verdad o reto.' },
        { role: 'user', content: prompt }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`Error en la API de OpenAI: ${response.statusText}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content;

  // Intentar analizar el contenido JSON
  try {
    const questions = JSON.parse(content);
    // Verificar que el JSON es un array de objetos con las propiedades correctas
    if (Array.isArray(questions) && questions.every(q => q.type && q.question)) {
      return questions;
    } else {
      throw new Error('Formato JSON incorrecto');
    }
  } catch (error) {
    console.error('Error al analizar el JSON:', error);
    return [];
  }
};
