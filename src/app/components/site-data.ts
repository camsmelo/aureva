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
  { title: 'Harmonização Facial', image: 'assets/facial.svg', icon: '◯', description: 'Equilíbrio e naturalidade para o seu rosto.' },
  { title: 'Estética Corporal', image: 'assets/body.svg', icon: '◇', description: 'Definição, firmeza e bem-estar para o seu corpo.' },
  { title: 'Skincare Avançado', image: 'assets/skin.svg', icon: '♡', description: 'Tratamentos personalizados para uma pele saudável.' },
  { title: 'Preenchimento de Glúteos Feminino', image: 'assets/gluteos-feminino.svg', icon: '✦', description: 'Mais volume, contorno e harmonia, com protocolo personalizado.' },
  { title: 'Preenchimento de Glúteos Masculino', image: 'assets/gluteos-masculino.svg', icon: '✦', description: 'Definição e equilíbrio corporal respeitando a anatomia masculina.' },
  { title: 'Drenagem Linfática', image: 'assets/drenagem.svg', icon: '❋', description: 'Auxilia na redução do inchaço e promove sensação de leveza.' },
  { title: 'Endolaser', image: 'assets/endolaser.svg', icon: '✧', description: 'Tecnologia avançada para firmeza, contorno e resultados naturais.' },
  { title: 'Toxina Botulínica e Preenchimento', image: 'assets/injectables.svg', icon: '✧', description: 'Suavize linhas e realce sua beleza natural.' }
];

export const TESTIMONIALS: readonly Testimonial[] = [
  { name: 'Mariana S.', initials: 'M', text: 'Experiência incrível! Desde o primeiro contato até o resultado final, fui muito bem atendida. A equipe é maravilhosa e o ambiente é super agradável.' },
  { name: 'Camila R.', initials: 'C', text: 'Atendimento cuidadoso, ambiente acolhedor e uma equipe que transmite muita segurança durante todo o processo.' },
  { name: 'Juliana A.', initials: 'J', text: 'Adorei a experiência. Tudo foi explicado com clareza e o resultado ficou muito natural.' }
];
