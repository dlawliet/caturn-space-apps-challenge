export const DESCRIPCION_MATERIALES_ES = `Tenemos a disposición 546 materiales reciclados que han sido inventariados y clasificados según sus características:`
export const DESCRIPCION_MATERIALES_EN = `We have 546 recycled materials available that have been inventoried and classified according to their characteristics:`;

export const SIMULAR_MATERIALES_ES = `Simular crear nuevo recurso`;
export const SIMULAR_MATERIALES_EN = `Simulate creating a new resource`;

export const TITULO_MATERIALES_ES = `Materiales Reciclados`;
export const TITULO_MATERIALES_EN = `Recycled Materials`;

export const TEXTO_SIMULADO_ES = `Aquí se describirá el recurso que queremos fabricar. Este proceso estará asistido por un sistema con inteligencia artificial y aprendizaje automático, capaz de sugerir diseños, cantidades y combinaciones de materiales de forma eficiente, optimizando el tamaño, la forma y la ubicación de cada elemento producido.`;
export const TEXTO_SIMULADO_EN = `Here the resource you want to manufacture will be described. This process will be assisted by a system with artificial intelligence and machine learning, capable of efficiently suggesting designs, quantities, and combinations of materials, optimizing the size, shape, and location of each produced element.`;

export const VOLVER_ES = 'Volver';
export const VOLVER_EN = 'Go back';

export const CONTINUAR_ES = 'Construir recurso';
export const CONTINUAR_EN = 'Build resource';

export const COLOR_LABEL_WRITTEN = '#8b8b8bff';
export const COLOR_LABEL_EJEMPLO = '#ffca6dff';
export const COLOR_INPUT = '#3a3937ff';
export const COLOR_LABEL_ANSWER = '#fff2c5ff';

export const PASOS_SIMULACION = [
  {
    type: 'label',
    escrito: true,
    color: COLOR_LABEL_WRITTEN,
    es: 'Aquí se describirá el recurso que queremos fabricar.',
    en: 'Here the resource we want to manufacture will be described.'
  },
  {
    type: 'label',
    escrito: true,
    color: COLOR_LABEL_WRITTEN,
    es: 'Este proceso estará asistido por un sistema con inteligencia artificial y aprendizaje automático.',
    en: 'This process will be assisted by a system with artificial intelligence and machine learning.'
  },
  {
    type: 'label',
    escrito: true,
    color: COLOR_LABEL_WRITTEN,
    es: 'Optimizará el tamaño, la forma y la ubicación de cada elemento producido.',
    en: 'It will optimize the size, shape, and location of each produced element.'
  },
  {
    type: 'label',
    escrito: false,
    color: COLOR_LABEL_EJEMPLO,
    es: '\nDescribe el recurso que quieres fabricar:',
    en: '\nDescribe the resource you want to manufacture:'
  },
  {
    type: 'input',
    escrito: true,
    color: COLOR_INPUT,
    es: 'Generar materiales para una fiesta de cumpleaños con 8 participantes: Letras 3D, arco de entrada, mesa y base de torta, banderines, globos ecológicos y serpentinas.',
    en: 'Generate materials for a birthday party with 8 participants: 3D letters, entrance arch, table and cake base, banners, eco-friendly balloons, and streamers.'
  },
  {
    type: 'button',
    es: CONTINUAR_ES,
    en: CONTINUAR_EN
  },
  {
    type: 'label',
    escrito: false,
    color: COLOR_LABEL_ANSWER,
    es: '🎉 Escenario: Cumpleaños en Marte:',
    en: '🎉 Scenario: Birthday on Mars:'
  },
  {
    type: 'label',
    escrito: false,
    color: COLOR_LABEL_ANSWER,
    es: 'Asistentes: 8 tripulantes',
    en: 'Participants: 8 crew members'
  },
  {
    type: 'label',
    escrito: false,
    color: COLOR_LABEL_ANSWER,
    es: 'Arco de entrada',
    en: 'Entrance arch'
  },
  {
    type: 'label',
    escrito: false,
    color: COLOR_LABEL_ANSWER,
    es: 'Letras “FELIZ MARTE-DAY”',
    en: 'Letters "HAPPY MARS-DAY"'
  },
  {
    type: 'label',
    escrito: false,
    color: COLOR_LABEL_ANSWER,
    es: 'Mesa plegable y base de torta y banderines',
    en: 'Folding table, cake base, and banners'
  },
  {
    type: 'label',
    escrito: false,
    color: COLOR_LABEL_ANSWER,
    es: '20 globos ecológicos y serpentinas',
    en: '20 eco-friendly balloons and streamers'
  },
  {
    type: 'label',
    escrito: false,
    color: COLOR_LABEL_ANSWER,
    es: `🧱 MATERIALES Y CANTIDADES ESTIMADAS EN BASE A LOS RECURSOS RECICLADOS.
Componente    Material base    Mezcla / composición    Masa usada(kg)    Volumen(m³)    Observaciones técnicas`,
    en: `🧱 ESTIMATED MATERIALS AND QUANTITIES BASED ON RECYCLED RESOURCES.
Component    Base material    Mixture / composition    Mass used (kg)    Volume (m³)    Technical notes`
  },
  {
    type: 'label',
    escrito: false,
    color: COLOR_LABEL_ANSWER,
    es: `1. Arco de entrada:
    - Aluminio estructural (> 90 %) 100 % aluminio 15 kg 0.015 m³
    - Tubos soldados o atornillados; reutilizable Overwrap (PE + PET + Al) 50 % Al foil + 50 % polietileno 2 kg 0.02 m³
    - Envoltura reflectiva del arco`,
    en: `1. Entrance arch:
    - Structural aluminum (> 90%) 100% aluminum 15 kg 0.015 m³
    - Welded or bolted tubes; reusable Overwrap (PE + PET + Al) 50% Al foil + 50% polyethylene 2 kg 0.02 m³
    - Reflective arch wrap`
  },
  {
    type: 'label',
    escrito: false,
    color: COLOR_LABEL_ANSWER,
    es: `2. Letras 3D:
    - Zotek F30 (espuma)
    - 100 % espuma de polietileno reticulado 5 kg 0.05 m³ Corte CNC y pintura con pigmentos no tóxicos
    - Plastazote LD45 F 50 % mezclado con Zotek para rigidez 5 kg 0.05 m³
    - Espuma ignífuga segura interior`,
    en: `2. 3D Letters:
    - Zotek F30 (foam)
    - 100% cross-linked polyethylene foam 5 kg 0.05 m³ CNC cut and painted with non-toxic pigments
    - Plastazote LD45 F 50% mixed with Zotek for rigidity 5 kg 0.05 m³
    - Safe fire-retardant foam for indoor use`
  },
];
