const cardThemes = [
  {
    image: 'bg-peach/45',
  },
  {
    image: 'bg-sage/45',
  },
  {
    image: 'bg-butter/45',
  },
]

export function getPetCardTheme(index: number) {
  return cardThemes[index % cardThemes.length]
}
