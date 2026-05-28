const cardThemes = [
  {
    frame: 'bg-gradient-to-b from-peach/55 to-white',
    image: 'bg-peach/45',
    badge: 'bg-peach text-ink',
    accent: 'bg-peach-strong',
  },
  {
    frame: 'bg-gradient-to-b from-sage/55 to-white',
    image: 'bg-sage/45',
    badge: 'bg-sage text-ink',
    accent: 'bg-sage-strong',
  },
  {
    frame: 'bg-gradient-to-b from-butter/55 to-white',
    image: 'bg-butter/45',
    badge: 'bg-butter text-ink',
    accent: 'bg-peach-strong',
  },
]

export function getPetCardTheme(index: number) {
  return cardThemes[index % cardThemes.length]
}
