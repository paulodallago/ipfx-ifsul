// @ts-nocheck

import {
  galleryArena4,
  galleryArena5,
  galleryOscip1,
  galleryOscip2,
} from "../../utils";

const eventsContent = [
  {
    edition: "I",
    name: "IV Arena Games",
    date: "11 de outubro de 2025",
    participants: NaN,
    cover: galleryArena4[0],
    gallery: galleryArena4,
    modalities: null, //TODO
  },
  {
    edition: "II",
    name: "I Campeonato estudantil e universitário & I Campeonato aberto de Passo Fundo",
    date: "14 de março de 2026",
    participants: 48,
    cover: galleryOscip1[0],
    gallery: galleryOscip1,
    modalities: [
      {
        name: "Absoluto",
        podium: [
          { position: "1° Lugar", player: "Douglas Winck" },
          { position: "2° Lugar", player: "Rodolfo Noetzold de Oliveira" },
          { position: "3° Lugar", player: "Marcos Simões Petry" },
        ],
      },
      {
        name: "Universitário",
        podium: [
          {
            position: "1° Lugar",
            player: "Leandro da Rosa Zambiasi Rodrigues",
          },
          { position: "2° Lugar", player: "Davi Rocha de Andrade" },
          { position: "3° Lugar", player: "Vinícius Augusto Rossetto" },
        ],
      },
      {
        name: "Juvenil",
        podium: [
          { position: "1° Lugar", player: "Eduardo Poletto" },
          { position: "2° Lugar", player: "José Eduardo Nicolodi de Mesquita" },
          { position: "3° Lugar", player: "Elias Garcia Mendes" },
        ],
      },
      {
        name: "Infantil",
        podium: [
          { position: "1° Lugar", player: "Emanuel do Amarante Lunelli" },
          { position: "2° Lugar", player: "Henrique Taglietti de Lemos" },
          { position: "3° Lugar", player: "Sayler Vinicius da Silva Araújo" },
        ],
      },
    ],
  },
  {
    edition: "III",
    name: "I Campeonato de Xadrez Rápido IPFX",
    date: "09 de maio de 2026",
    participants: NaN,
    cover: galleryArena5[0],
    gallery: galleryArena5,
    modalities: [
      {
        name: "Geral",
        podium: [
          {
            position: "1° Lugar",
            player: "Leandro da Rosa Zambiasi Rodrigues",
          },
          { position: "2° Lugar", player: "Murilo Rosa D'Avila" },
          { position: "3° Lugar", player: "Lorenzo Emílio Guerra de Souza" },
        ],
      },
    ],
  },
  {
    edition: "IV",
    name: "II Campeonato estudantil e universitário & II Campeonato aberto de Passo Fundo",
    date: "16 de agosto de 2026",
    participants: 43,
    cover: galleryOscip2[0],
    gallery: galleryOscip2,
    modalities: [
      {
        name: "Absoluto",
        podium: [
          { position: "1° Lugar", player: "Elvis Thiago Visoto" },
          { position: "2° Lugar", player: "Marco Antônio Ferlin" },
          { position: "3° Lugar", player: "Bernardo Gularte Kirsch" },
        ],
      },
      {
        name: "Absoluto (+50)",
        podium: [
          { position: "1° Lugar", player: "Elvis Thiago Visoto" },
          { position: "2° Lugar", player: "Luciano Dias do Carmo" },
          { position: "3° Lugar", player: "João Pedro Fabris" },
        ],
      },
      {
        name: "Universitário",
        podium: [
          { position: "1° Lugar", player: "Davi Rocha de Andrade" },
          { position: "2° Lugar", player: "Mateus Filipin Hoeller" },
          { position: "3° Lugar", player: "João Pedro Fraga Júnior" },
        ],
      },
      {
        name: "Feminino Sub-08",
        podium: [{ position: "1° Lugar", player: "Karen Betanin Boy" }],
      },
      {
        name: "Feminino Sub-10",
        podium: [
          {
            position: "1° Lugar",
            player: "Isabelly Maria Kowolski dos Passos",
          },
        ],
      },
      {
        name: "Feminino Sub-12",
        podium: [{ position: "1° Lugar", player: "Agatha Werner Lindemann" }],
      },
      {
        name: "Feminino Sub-14",
        podium: [
          { position: "1° Lugar", player: "Laura Maria Richetti" },
          { position: "2° Lugar", player: "Bianca dos Santos Tris" },
          { position: "3° Lugar", player: "Ana Lúcia Ceolin da Silva" },
        ],
      },
      {
        name: "Feminino Sub-16",
        podium: [{ position: "1° Lugar", player: "Brenda dos Santos Tris" }],
      },
      {
        name: "Masculino Sub-08",
        podium: [
          { position: "1° Lugar", player: "Felipe Balbinot" },
          { position: "2° Lugar", player: "Bernardo Pinto Dutra" },
          { position: "3° Lugar", player: "Matias Talheimer" },
        ],
      },
      {
        name: "Masculino Sub-12",
        podium: [
          { position: "1° Lugar", player: "Lucas Balbinot" },
          { position: "2° Lugar", player: "João Gabriel Sampaio" },
          { position: "3° Lugar", player: "Davi Betto Vignaga" },
        ],
      },
      {
        name: "Masculino Sub-14",
        podium: [
          { position: "1° Lugar", player: "Emanuel Fortes Martins" },
          { position: "2° Lugar", player: "João Vitor Meira de Araújo" },
        ],
      },
      {
        name: "Masculino Sub-16",
        podium: [
          { position: "1° Lugar", player: "Leonardo Gabriel Leal Bonneau" },
          { position: "2° Lugar", player: "Lucca Mariani" },
          { position: "3° Lugar", player: "Augusto Stramari Antunes" },
        ],
      },
      {
        name: "Masculino Sub-18",
        podium: [
          { position: "1° Lugar", player: "Artur de Anhaya Borchardt" },
          { position: "2° Lugar", player: "Gabriel Dias Ketzaer" },
          { position: "3° Lugar", player: "Vinícius Rafael Nunes Folli" },
        ],
      },
    ],
  },
];

export default eventsContent;
