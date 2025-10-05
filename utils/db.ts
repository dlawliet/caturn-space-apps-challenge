// Eliminar todos los materiales
import { Language } from '@/context/LanguageContext';
import data_en from '../assets/resource/materiales_marte_realistas_en.json';
import data_es from '../assets/resource/materiales_marte_realistas_es.json';


// Listar todos los materiales
export async function getAllMateriales(lang: Language) {
  const data = lang === 'es' ? data_es : data_en;
  return data;
}
