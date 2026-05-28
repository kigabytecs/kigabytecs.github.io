import type { Pet } from '../data/pets'

export function getPetPrimaryName(pet: Pet) {
  return pet.thaiName ?? pet.englishName ?? pet.slug
}

export function getPetDisplayName(pet: Pet) {
  if (pet.thaiName && pet.englishName) {
    return `${pet.thaiName} (${pet.englishName})`
  }

  return getPetPrimaryName(pet)
}
