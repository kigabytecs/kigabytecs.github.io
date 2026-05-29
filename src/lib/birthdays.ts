import type { Pet } from '../data/pets'
import { getPetPrimaryName } from './petName'

const DAY_IN_MS = 24 * 60 * 60 * 1000

export type BirthdaySummary = {
  pet: Pet
  dateOfBirth: string
  nextBirthdayDate: Date
  daysUntilBirthday: number
  turningAge: number
  isBirthdayMonth: boolean
  isComingSoon: boolean
}

export type MemberSortKey = 'name' | 'age' | 'birthday'
export type SortDirection = 'asc' | 'desc'

export function getBirthdaySummary(pet: Pet, now = new Date()): BirthdaySummary | null {
  const dateOfBirth = pet.dateOfBirth ?? pet.dateJoinedFamily

  if (!dateOfBirth || pet.datePassedAway) {
    return null
  }

  const birth = new Date(dateOfBirth)
  const nextBirthday = new Date(
    now.getFullYear(),
    birth.getMonth(),
    birth.getDate(),
  )

  if (startOfDay(nextBirthday) < startOfDay(now)) {
    nextBirthday.setFullYear(now.getFullYear() + 1)
  }

  const daysUntilBirthday = diffInDays(startOfDay(now), startOfDay(nextBirthday))
  const turningAge = nextBirthday.getFullYear() - birth.getFullYear()

  return {
    pet,
    dateOfBirth,
    nextBirthdayDate: nextBirthday,
    daysUntilBirthday,
    turningAge,
    isBirthdayMonth: now.getMonth() === birth.getMonth(),
    isComingSoon: daysUntilBirthday <= 30,
  }
}

export function sortLivingPets(
  pets: Pet[],
  sortKey: MemberSortKey,
  direction: SortDirection = 'asc',
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
    case 'birthday': {
      const sorted = items.sort((a, b) => {
        const aSummary = getBirthdaySummary(a)
        const bSummary = getBirthdaySummary(b)

        if (!aSummary && !bSummary) return 0
        if (!aSummary) return 1
        if (!bSummary) return -1

        return direction === 'asc'
          ? aSummary.daysUntilBirthday - bSummary.daysUntilBirthday
          : bSummary.daysUntilBirthday - aSummary.daysUntilBirthday
      })
      return sorted
    }
  }
}

export function getUpcomingBirthdays(pets: Pet[], lookaheadDays = 31) {
  return pets
    .map((pet) => getBirthdaySummary(pet))
    .filter((summary): summary is BirthdaySummary => Boolean(summary))
    .filter((summary) => summary.daysUntilBirthday <= lookaheadDays)
    .sort((a, b) => a.daysUntilBirthday - b.daysUntilBirthday)
}

export function formatDaysUntilBirthday(daysUntilBirthday: number) {
  if (daysUntilBirthday === 0) {
    return 'วันนี้'
  }

  if (daysUntilBirthday === 1) {
    return 'พรุ่งนี้'
  }

  return `อีก ${daysUntilBirthday} วัน`
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function diffInDays(from: Date, to: Date) {
  return Math.round((to.getTime() - from.getTime()) / DAY_IN_MS)
}
