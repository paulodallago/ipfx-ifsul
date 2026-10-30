//name, description, date, galery

import {
  galleryArena4,
  galleryArena5,
  galleryEncontros,
  galleryOscip1,
  galleryOscip2,
  galleryPanambi,
} from "../../utils";

const galleryContent = [
  {
    name: "Encontros semanais",
    description:
      "Todos os sábados, realizamos encontros presenciais no IFSUL para praticar e jogar xadrez",
    date: null,
    gallery: galleryEncontros,
  },
  {
    name: "IV Arena Games",
    description:
      "A 4ª edição do evento de e-sports do instituto marcou a reabertura do clube, com a realização do nosso primeiro torneio oficial",
    date: "11 de outubro de 2025",
    gallery: galleryArena4,
  },
  {
    name: "I Campeonato estudantil e universitário & I Campeonato aberto de Passo Fundo",
    description:
      "Foi o primeiro campeonato organizado em parceria com o grupo OSCIP Inovadores do Xadrez. Além de promover a prática do esporte e a integração dos participantes, o torneio teve um importante caráter social, arrecadando alimentos para doação",
    date: "14 de março de 2026",
    gallery: galleryOscip1,
  },
  {
    name: "I Campeonato de Xadrez Rápido IPFX",
    description:
      "Realizado durante a 5ª edição da Arena Games IFSUL, o torneio foi disputado no sistema Suíço em 6 rodadas",
    date: "09 de maio de 2026",
    gallery: galleryArena5,
  },
  {
    name: "Aberto de Xadrez Unijuí Campus Panambi 2026",
    description:
      "O clube esteve presente no evento organizado pela Unijuí Campus Panambi, organizado pelo Clube de Xadrez da instituição",
    date: "16 de maio de 2026",
    gallery: galleryPanambi,
  },
  {
    name: "II Campeonato estudantil e universitário & II Campeonato aberto de Passo Fundo",
    description:
      "Novamente em parceria com a OSCIP Inovadores do Xadrez Passo Fundo, o evento representou um marco fundamental na evolução do clube.",
    date: "16 de agosto de 2026",
    gallery: galleryOscip2,
  },
];

export default galleryContent;
