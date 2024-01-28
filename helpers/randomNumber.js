export function getRandomNumberFromSet(numberSet) {
    if (!Array.isArray(numberSet) || numberSet.length === 0) {
      throw new Error('El conjunto de números debe ser un array no vacío.');
    }
  
    const randomIndex = Math.floor(Math.random() * numberSet.length);
    return numberSet[randomIndex];
  }