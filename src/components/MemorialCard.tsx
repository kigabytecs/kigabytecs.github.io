import type { Pet } from '../data/pets'
import { formatAge } from '../lib/age'
import { getPetDisplayName, getPetPrimaryName } from '../lib/petName'

type MemorialCardProps = {
  pet: Pet
  onOpen: (pet: Pet) => void
}

export function MemorialCard({ pet, onOpen }: MemorialCardProps) {
  const joinedFamilyReferenceDate = pet.dateJoinedFamily ?? pet.dateOfBirth

  return (
    <button
      type="button"
      onClick={() => onOpen(pet)}
      className="self-start overflow-hidden rounded-[30px] border border-line/45 bg-[linear-gradient(135deg,rgba(246,221,208,0.55),rgba(244,231,184,0.55))] text-left shadow-card transition-transform duration-200 hover:-translate-y-1"
    >
      <div className="relative overflow-hidden bg-[linear-gradient(135deg,rgba(246,221,208,0.55),rgba(244,231,184,0.55))]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_30%)]" />
        <img
          src={pet.coverImagePath}
          alt={getPetPrimaryName(pet)}
          className="aspect-[4/3] h-full w-full object-cover"
        />
      </div>

      <div className="relative z-10 -mt-4 rounded-t-[24px] bg-[linear-gradient(180deg,rgba(255,253,249,0.98),rgba(255,248,239,0.94))] p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-display text-2xl font-semibold leading-tight">{getPetDisplayName(pet)}</p>
            <p className="text-sm text-muted">
              {joinedFamilyReferenceDate && pet.datePassedAway
                ? `อยู่กับเรา ${formatAge(joinedFamilyReferenceDate, pet.datePassedAway)}`
                : 'ระยะเวลาที่อยู่ด้วยกันไม่แน่ชัด'}
            </p>
          </div>
          <span className="rounded-full bg-butter px-3 py-1 text-xs font-medium text-ink">ยังคิดถึง</span>
        </div>

        <p className="text-sm leading-6 text-muted">{pet.remembranceNote}</p>
      </div>
    </button>
  )
}
