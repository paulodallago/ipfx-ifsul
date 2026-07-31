import edition_1_01 from "../../assets/img/editions/edition_1/01.jpg";
import edition_1_02 from "../../assets/img/editions/edition_1/02.jpg";
import edition_1_03 from "../../assets/img/editions/edition_1/03.jpg";
import edition_1_04 from "../../assets/img/editions/edition_1/04.jpg";

import edition_2_01 from "../../assets/img/editions/edition_2/01.jpg";
import edition_2_02 from "../../assets/img/editions/edition_2/02.jpg";
import edition_2_03 from "../../assets/img/editions/edition_2/03.jpg";
import edition_2_04 from "../../assets/img/editions/edition_2/04.jpg";

import edition_3_01 from "../../assets/img/editions/edition_3/01.jpeg";
import edition_3_02 from "../../assets/img/editions/edition_3/02.jpeg";
import edition_3_03 from "../../assets/img/editions/edition_3/03.jpeg";
import edition_3_04 from "../../assets/img/editions/edition_3/04.jpeg";

import edition_4_01 from "../../assets/img/editions/edition_4/01.png";
import edition_4_02 from "../../assets/img/editions/edition_4/02.jpg";
import edition_4_03 from "../../assets/img/editions/edition_4/03.jpg";
import edition_4_04 from "../../assets/img/editions/edition_4/04.jpg";

import edition_5_01 from "../../assets/img/editions/edition_5/01.jpg";
import edition_5_02 from "../../assets/img/editions/edition_5/02.jpeg";
import edition_5_03 from "../../assets/img/editions/edition_5/03.jpeg";
import edition_5_04 from "../../assets/img/editions/edition_5/04.png";

const editionsContent = [
  {
    edition: "I",
    name: "Arena Games I",
    date: "Jun/2023",
    participants: 23,
    cover: edition_1_01,
    gallery: [edition_1_02, edition_1_03, edition_1_04],
    champions: [{ modality: "Counter Strike", team: "", players: [] }],
  },
  {
    edition: "II",
    name: "Arena Games II",
    date: "Out/2024",
    participants: 37,
    cover: edition_2_01,
    gallery: [edition_2_02, edition_2_03, edition_2_04],
    champions: [
      { modality: "Counter Strike", team: "", players: [] },
      { modality: "League of Legends", team: "", players: [] },
    ],
  },
  {
    edition: "III",
    name: "Arena Games III",
    date: "Mai/2025",
    participants: 53,
    cover: edition_3_01,
    gallery: [edition_3_02, edition_3_03, edition_3_04],
    champions: [
      { modality: "Counter Strike", team: "", players: [] },
      { modality: "League of Legends", team: "", players: [] },
    ],
  },
  {
    edition: "IV",
    name: "Arena Games IV",
    date: "Out/2025",
    participants: 116,
    cover: edition_4_01,
    gallery: [edition_4_02, edition_4_03, edition_4_04],
    champions: [
      {
        modality: "Counter Strike",
        team: "GMK LONÃO",
        players: [
          "Afonso Navarini",
          "Alan Marcelo Scheibler",
          "Bernardo Menegaz Corral",
          "Bernardo Zavistanovicz Deters",
          "Nicolas Pelizari Scopel",
          "Thomas Jeferson De Souza Da Silva",
        ],
      },
      { modality: "League of Legends", team: "", players: [] },
      { modality: "Valorant", team: "", players: [] },
    ],
  },
  {
    edition: "V",
    name: "Arena Games V",
    date: "Mai/2026",
    participants: 145,
    cover: edition_5_01,
    gallery: [edition_5_02, edition_5_03, edition_5_04],
    champions: [
      {
        modality: "Counter Strike",
        team: "BBG",
        players: [
          "Afonso Navarini",
          "Bernardo Corral",
          "Bernardo Deters",
          "Nicolas Scopel",
          "Thomas Jeferson",
        ],
      },
      {
        modality: "League of Legends",
        team: "Ticoticoz",
        players: [
          "Gabriel Oliveira de Marque",
          "Gabriel Rassele de Menezes",
          "Gabriel Tonial Carlotto",
          "Murilo Moreira Mognon",
          "Nataniel Colussi Da Luz",
          "Vitório Quadros Visitante",
        ],
      },
      {
        modality: "Valorant",
        team: "EVV",
        players: [
          "Arthur Botelho Fontinelli",
          "Arthur Silveira Castoldi",
          "Bruno Benetti Moraes",
          "Edison florindo jodelis",
          "Eduardo",
          "João Pedro Bedin Siqueira",
        ],
      },
      {
        modality: "Rocket League",
        team: "Meczada",
        players: [
          "Arthur Camargo Lasta",
          "Pedro Henrique Cecchin",
          "Vinicius Maciel Braccini",
        ],
      },
      { modality: "Xadrez", team: "Leandro da Rosa Zambiasi" },
    ],
  },
];

export default editionsContent;
