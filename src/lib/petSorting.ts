import type { Pet } from '../data/pets'
import { getPetPrimaryName } from './petName'

export type SortDirection = 'asc' | 'desc'
export type LivingSortKey = 'name' | 'age' | 'birthday'
export type MemorialSortKey = 'name' | 'age' | 'passed'

export function sortMemorialPets(
  pets: Pet[],
  sortKey: MemorialSortKey,
  direction: SortDirection = 'desc',
) {
  const items = [...pets]

  switch (sortKey) {
    case 'name': {
      const sorted = items.sort((a, b) =>
        getPetPrimaryName(a).localeCompare(getPetPrimaryName(b)),
      )
      return direction === 'desc' ? sorted.reverse() : sorted
    }
    case 'age': {
      const sorted = items.sort((a, b) => {
        const aReferenceDate = a.dateOfBirth ?? a.dateJoinedFamily
        const bReferenceDate = b.dateOfBirth ?? b.dateJoinedFamily

        if (!aReferenceDate && !bReferenceDate) return 0
        if (!aReferenceDate) return 1
        if (!bReferenceDate) return -1

        const aDate = new Date(aReferenceDate).getTime()
        const bDate = new Date(bReferenceDate).getTime()
        return direction === 'asc' ? bDate - aDate : aDate - bDate
      })
      return sorted
    }
    case 'passed': {
      const sorted = items.sort((a, b) => {
        const aDate = a.datePassedAway ? new Date(a.datePassedAway).getTime() : Number.NEGATIVE_INFINITY
        const bDate = b.datePassedAway ? new Date(b.datePassedAway).getTime() : Number.NEGATIVE_INFINITY
        return direction === 'asc' ? aDate - bDate : bDate - aDate
      })
      return sorted
    }
  }
}
