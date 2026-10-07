export interface Service {
  title: string;
  image: string;
  icon: string;
  description: string;
}

export interface Testimonial {
  name: string;
  text: string;
  initials: string;
}

export const SERVICES: readonly Service[] = [
  { title: 'Botox', image: 'assets/injectables.svg', icon: '✧', description: 'Suavização de linhas de expressão com resultado natural e personalizado.' },
  { title: 'Preenchimento facial', image: 'assets/facial.svg', icon: '◯', description: 'Realce de contornos e proporções para valorizar a harmonia do rosto.' },
  { title: 'Harmonização facial', image: 'assets/facial.svg', icon: '◇', description: 'Planejamento personalizado para equilíbrio, simetria e naturalidade.' },
  { title: 'Bioestimulador facial e corporal', image: 'assets/skin.svg', icon: '✦', description: 'Estímulo de colágeno para melhorar firmeza, textura e qualidade da pele.' },
  { title: 'Hipro', image: 'assets/body.svg', icon: '◎', description: 'Tecnologia para protocolos corporais focados em firmeza e contorno.' },
  { title: 'MPT', image: 'assets/body.svg', icon: '◇', description: 'Tecnologia aplicada em protocolos personalizados para estética corporal.' },
  { title: 'Lavieen', image: 'assets/skin.svg', icon: '✧', description: 'Tecnologia avançada para revitalização, textura e uniformização da pele.' },
  { title: 'CM Slim', image: 'assets/body.svg', icon: '◌', description: 'Protocolo corporal voltado para definição, contorno e bem-estar.' },
  { title: 'Powershape', image: 'assets/body.svg', icon: '✦', description: 'Tecnologia para cuidados corporais com foco em contorno e aparência da pele.' },
  { title: 'Ozônio', image: 'assets/skin.svg', icon: '❋', description: 'Protocolo com ozônio integrado a cuidados personalizados de estética e bem-estar.' },
  { title: 'Endolaser', image: 'assets/endolaser.svg', icon: '✧', description: 'Tecnologia avançada para firmeza, contorno e protocolos personalizados.' },
  { title: 'Luz pulsada', image: 'assets/skin.svg', icon: '☼', description: 'Tecnologia para cuidados da pele, uniformização e revitalização.' },
  { title: 'Depilação a laser', image: 'assets/body.svg', icon: '✧', description: 'Redução progressiva dos pelos com tecnologia e protocolos personalizados.' },
  { title: 'Preenchimento glúteos', image: 'assets/gluteos-feminino.svg', icon: '✦', description: 'Valorização do contorno e volume dos glúteos de forma personalizada.' },
  { title: 'Preenchimento panturrilha e quadríceps', image: 'assets/gluteos-masculino.svg', icon: '◇', description: 'Harmonia e definição da região das pernas conforme a avaliação individual.' },
  { title: 'Drenagem linfática', image: 'assets/drenagem.svg', icon: '❋', description: 'Auxilia na redução do inchaço e promove sensação de leveza e bem-estar.' },
  { title: 'Massagem redutora', image: 'assets/body.svg', icon: '◌', description: 'Massagem corporal integrada a protocolos para modelagem e bem-estar.' },
  { title: 'Tratamento capilar para reduzir a queda e fortalecer o cabelo', image: 'assets/skin.svg', icon: '❋', description: 'Cuidados personalizados para fortalecer os fios e auxiliar na redução da queda.' },
  { title: 'Secagem de vasinhos', image: 'assets/skin.svg', icon: '✧', description: 'Protocolo estético direcionado aos vasinhos, conforme avaliação profissional.' },
  { title: 'Enzimas para gordura e emagrecimento', image: 'assets/body.svg', icon: '◇', description: 'Protocolos personalizados com enzimas, sempre após avaliação individual.' },
  { title: 'Nutricionista', image: 'assets/skin.svg', icon: '♡', description: 'Acompanhamento nutricional personalizado para saúde, rotina e objetivos.' },
  { title: 'Psicanalista', image: 'assets/skin.svg', icon: '♡', description: 'Atendimento voltado ao autoconhecimento, escuta e cuidado emocional.' }
];

export const TESTIMONIALS: readonly Testimonial[] = [
  { name: 'Mariana S.', initials: 'M', text: 'Experiência incrível! Desde o primeiro contato até o resultado final, fui muito bem atendida. A equipe é maravilhosa e o ambiente é super agradável.' },
  { name: 'Camila R.', initials: 'C', text: 'Atendimento cuidadoso, ambiente acolhedor e uma equipe que transmite muita segurança durante todo o processo.' },
  { name: 'Juliana A.', initials: 'J', text: 'Adorei a experiência. Tudo foi explicado com clareza e o resultado ficou muito natural.' }
];
