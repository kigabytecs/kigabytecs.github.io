import type { Pet } from '../data/pets'
import { formatDaysUntilBirthday, getBirthdaySummary } from '../lib/birthdays'
import { formatAge } from '../lib/age'
import { getPetDisplayName, getPetPrimaryName } from '../lib/petName'
import { getPetCardTheme } from '../lib/petTheme'

type PetCardProps = {
  pet: Pet
  index: number
  onOpen: (pet: Pet) => void
}

export function PetCard({ pet, index, onOpen }: PetCardProps) {
  const theme = getPetCardTheme(index)
  const birthday = getBirthdaySummary(pet)

  return (
    <button
      type="button"
      onClick={() => onOpen(pet)}
      className={`group overflow-hidden rounded-[30px] border border-line/45 text-left shadow-card transition duration-200 hover:-translate-y-1 ${theme.image}`}
    >
      <div className={`relative overflow-hidden ${theme.image}`}>
        <span className={`absolute left-4 top-4 z-10 h-2.5 w-2.5 rounded-full ${theme.accent}`} />
        <img
          src={pet.coverImagePath}
          alt={getPetPrimaryName(pet)}
          className="aspect-[4/5] h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
        />
      </div>

      <div className="relative z-10 -mt-4 rounded-t-[24px] bg-white px-4 pb-4 pt-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-display text-2xl font-semibold leading-tight">{getPetDisplayName(pet)}</p>
            <p className="mt-1 text-sm leading-6 text-muted">{pet.summary}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${theme.badge}`}>
            {formatAge(pet.dateOfBirth ?? pet.dateJoinedFamily)}
          </span>
          <span className="rounded-full border border-line/80 bg-white/70 px-2.5 py-1 text-xs uppercase tracking-[0.16em] text-muted">
            {pet.species === 'bird' ? 'bird' : 'dog'}
          </span>
          {birthday?.isComingSoon ? (
            <span className="rounded-full bg-butter px-2.5 py-1 text-xs font-medium text-ink">
              วันเกิด{formatDaysUntilBirthday(birthday.daysUntilBirthday)}
            </span>
          ) : null}
        </div>
      </div>
    </button>
  )
}
