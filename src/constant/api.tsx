export const Revenues = [
  {
    name: "IPA",
    stars: 5,
    price: (Math.random() * (10 - 5) + 5).toFixed(2), // Preço aleatório entre 5 e 10
    description:
      "India Pale Ale is a hoppy beer style within the broader category of pale ale. It has a higher alcohol content and a strong, bitter flavor.",
    ingredients: ["Hops", "Malt", "Yeast", "Water"],
  },
  {
    name: "Stout",
    stars: 4,
    price: (Math.random() * (10 - 5) + 5).toFixed(2),
    description:
      "Stout is a dark, rich beer brewed with roasted malt or roasted barley, hops, water, and yeast. It typically has a creamy texture and a slightly bitter taste.",
    ingredients: ["Roasted Barley", "Malt", "Yeast", "Water"],
  },
  {
    name: "Pale Ale",
    stars: 3,
    price: (Math.random() * (10 - 5) + 5).toFixed(2),
    description:
      "Pale Ale is a style of beer that is characterized by its fruity, floral, and citrusy hop flavors. It is typically brewed with pale malt and has a moderate to high hop bitterness.",
    ingredients: ["Hops", "Pale Malt", "Yeast", "Water"],
  },
  {
    name: "Lager",
    stars: 4,
    price: (Math.random() * (10 - 5) + 5).toFixed(2),
    description:
      "Lager is a type of beer that is fermented and conditioned at low temperatures. It is known for its clean, crisp taste and smooth finish.",
    ingredients: ["Hops", "Malt", "Yeast", "Water"],
  },
];

export const beers = [
  {
    id: 1,
    name: "Pilsen Premium",
    price: "5,99",
    alcoholic: 5,
    rating: 4.5,
    description:
      "Pilsen Premium é uma cerveja leve e refrescante, perfeita para ser apreciada em dias quentes. Com notas sutis de lúpulo e um teor alcoólico moderado, é uma escolha clássica para quem busca uma cerveja fácil de beber.",
  },
  {
    id: 2,
    name: "Amber Ale Artesanal",
    price: "5,99",
    alcoholic: 5,
    rating: 4.2,
    description:
      "Amber Ale Artesanal é uma cerveja encorpada e complexa, com aromas caramelizados e um sabor rico e maltado. Com um leve amargor no final, é uma excelente opção para quem aprecia cervejas com personalidade.",
  },
  {
    id: 3,
    name: "India Pale Ale Citrus",
    price: "5,99",
    alcoholic: 5,
    rating: 4.7,
    description:
      "India Pale Ale Citrus é uma cerveja intensamente aromática, com notas cítricas de lúpulo e um sabor equilibrado entre o amargor e a doçura do malte. Ideal para os amantes de cervejas com caráter.",
  },
  {
    id: 4,
    name: "Stout Especial",
    price: "5,99",
    alcoholic: 5,
    rating: 4.4,
    description:
      "Stout Especial é uma cerveja escura e robusta, com sabores intensos de malte torrado, café e chocolate. Com um corpo encorpado e uma cremosidade irresistível, é uma verdadeira indulgência para os apreciadores de cervejas escuras.",
  },
];
