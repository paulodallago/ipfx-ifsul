// @ts-nocheck
const galleryInovadores = require.context(
  "../../assets/img/editions/inovadores",
  false,
  /\.(png|jpe?g|svg)$/,
);

const galleryInovadoresKeys = galleryInovadores
  .keys()
  .map((key) => galleryInovadores(key));

//name, description, date, galery

const galleryContent = [
  {
    name: "Encontros semanais",
    description: "pegar do drive",
    date: "xx de xxxx de xxxx",
    gallery: galleryInovadoresKeys,
  },
  {
    name: "I Campeonato estudantil e universitário & I Campeonato aberto de Passo Fundo",
    description: "Essa aqui tá com as imagens certas",
    date: "14 de março de 2026",
    gallery: galleryInovadoresKeys,
  },
  {
    name: "I Campeonato de Xadrez Rápido IPFX",
    description: "Essa aqui vai usar as images na pasta 5° arena games",
    date: "09 de maio de 2026",
    gallery: galleryInovadoresKeys,
  },
  {
    name: "II Campeonato estudantil e universitário & II Campeonato aberto de Passo Fundo",
    description: "Essa aqui tem q ver",
    date: "16 de agosto de 2026",
    gallery: galleryInovadoresKeys,
  },
];

export default galleryContent;
