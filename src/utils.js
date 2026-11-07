// @ts-nocheck
export const responsiveOptions = [
  {
    breakpoint: "1024px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "768px",
    numVisible: 1,
    numScroll: 1,
  },
];

export const responsiveOptionsMain = [
  {
    breakpoint: "768px",
    numVisible: 1,
    numScroll: 1,
  },
];

export const importImgs = (r) => r.keys().map(r);

export const galleryOscip1 = importImgs(
  require.context("./assets/img/editions/Oscip1", false, /\.(png|jpe?g|svg)$/),
);

export const galleryOscip2 = importImgs(
  require.context("./assets/img/editions/Oscip2", false, /\.(png|jpe?g|svg)$/),
);

export const galleryArena4 = importImgs(
  require.context("./assets/img/editions/Arena4", false, /\.(png|jpe?g|svg)$/),
);

export const galleryArena5 = importImgs(
  require.context("./assets/img/editions/Arena5", false, /\.(png|jpe?g|svg)$/),
);

export const galleryPanambi = importImgs(
  require.context("./assets/img/editions/Panambi", false, /\.(png|jpe?g|svg)$/),
);

export const galleryEncontros = importImgs(
  require.context(
    "./assets/img/editions/Encontros",
    false,
    /\.(png|jpe?g|svg)$/,
  ),
);

export function formatText(content) {
  const paragraphs = content ? content.split("\n") : [];

  return (
    <div className="text-container">
      {paragraphs.map((para, index) =>
        para.trim() !== "" ? <p key={index}>{para}</p> : <br key={index} />,
      )}
    </div>
  );
}

export const formatDate = (date) => {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  return new Date(date).toLocaleDateString("en-US", options);
};
