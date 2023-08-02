export function registerCustomCard(type: string, name: string, description: string) {
  const windowWithCards = window as unknown as Window & {
    customCards: unknown[];
  };
  windowWithCards.customCards = windowWithCards.customCards || [];

  windowWithCards.customCards.push({
    type: type,
    name: name,
    preview: true,
    description: description,
  });
}
