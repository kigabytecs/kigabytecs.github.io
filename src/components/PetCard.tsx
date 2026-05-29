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
  const ageReferenceDate = pet.dateOfBirth ?? pet.dateJoinedFamily

  return (
    <button
      type="button"
      onClick={() => onOpen(pet)}
      className="group flex h-full self-start flex-col overflow-hidden rounded-[30px] border border-line/45 bg-white text-left shadow-card transition duration-200 hover:-translate-y-1"
    >
      <div className={`relative overflow-hidden ${theme.image}`}>
        <img
          src={pet.coverImagePath}
          alt={getPetPrimaryName(pet)}
          className="aspect-[4/5] h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
        />
      </div>

      <div className="relative z-10 -mt-4 flex min-h-[144px] flex-1 flex-col rounded-t-[24px] bg-white px-4 pb-4 pt-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-display text-2xl font-semibold leading-tight">{getPetDisplayName(pet)}</p>
            <p className="mt-1 line-clamp-2 min-h-[3rem] text-sm leading-6 text-muted">{pet.summary}</p>
          </div>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-3">
          <span className="rounded-full bg-peach/80 px-2.5 py-1 text-xs font-medium text-ink">
            {ageReferenceDate ? formatAge(ageReferenceDate) : 'อายุไม่ทราบ'}
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
