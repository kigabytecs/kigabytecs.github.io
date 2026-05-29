import type { Pet } from '../data/pets'
import type { BirthdaySummary } from '../lib/birthdays'
import { formatDaysUntilBirthday } from '../lib/birthdays'
import { formatThaiDate } from '../lib/age'
import { getPetDisplayName } from '../lib/petName'

type UpcomingBirthdaysSectionProps = {
  birthdays: BirthdaySummary[]
  onOpen: (pet: Pet) => void
}

export function UpcomingBirthdaysSection({ birthdays, onOpen }: UpcomingBirthdaysSectionProps) {
  if (birthdays.length === 0) {
    return null
  }

  return (
    <section className="birthday-section relative mt-8 overflow-hidden rounded-[34px] border border-white/75 bg-[linear-gradient(180deg,rgba(255,253,249,0.96),rgba(255,248,239,0.92))] p-4 shadow-card sm:mt-10 sm:p-5">
      <div className="birthday-glow absolute inset-x-10 top-0 h-24 rounded-full bg-peach/35 blur-3xl" />
      <div className="birthday-glow absolute -right-6 bottom-4 h-24 w-24 rounded-full bg-butter/45 blur-2xl" />

      <div className="birthday-confetti absolute left-6 top-8 h-2.5 w-2.5 rounded-full bg-peach-strong/70" />
      <div className="birthday-confetti birthday-confetti-delay absolute left-20 top-16 h-1.5 w-1.5 rounded-full bg-sage-strong/75" />
      <div className="birthday-confetti absolute left-[34%] top-12 hidden h-2 w-2 rounded-full bg-peach/85 md:block" />
      <div className="birthday-confetti birthday-confetti-delay absolute left-[47%] top-24 hidden h-1.5 w-1.5 rounded-full bg-butter/90 md:block" />
      <div className="birthday-confetti absolute left-[58%] top-16 hidden h-2.5 w-2.5 rounded-full bg-sage/90 lg:block" />
      <div className="birthday-confetti absolute right-24 top-10 h-2 w-2 rounded-full bg-butter/90" />
      <div className="birthday-confetti birthday-confetti-delay absolute right-10 top-20 h-1.5 w-1.5 rounded-full bg-peach/90" />
      <div className="birthday-confetti absolute right-[28%] top-8 hidden h-2.5 w-2.5 rounded-full bg-peach-strong/75 md:block" />
      <div className="birthday-confetti birthday-confetti-delay absolute right-[18%] top-28 hidden h-2 w-2 rounded-full bg-sage-strong/75 lg:block" />

      <div className="birthday-orb absolute left-[28%] top-24 hidden h-12 w-12 rounded-full border border-white/60 bg-peach/35 shadow-[0_12px_28px_rgba(246,221,208,0.22)] md:block" />
      <div className="birthday-orb birthday-orb-delay absolute right-[36%] top-14 hidden h-9 w-9 rounded-full border border-white/60 bg-butter/40 shadow-[0_10px_24px_rgba(244,231,184,0.25)] lg:block" />
      <div className="birthday-orb birthday-orb-slow absolute right-[8%] top-28 hidden h-14 w-14 rounded-full border border-white/60 bg-sage/35 shadow-[0_12px_28px_rgba(216,228,210,0.22)] md:block" />

      <div className="birthday-streamer birthday-streamer-left absolute left-[42%] top-0 hidden h-16 w-8 md:block" />
      <div className="birthday-streamer birthday-streamer-right absolute right-[22%] top-0 hidden h-14 w-8 lg:block" />

      <div className="relative z-10 mb-5 flex flex-col gap-4 px-1 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted">Upcoming birthdays</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">ใกล้ถึงวันเกิดของใครบ้าง</h2>
          <p className="max-w-2xl text-sm leading-7 text-muted sm:text-base">
            คนไหนจะได้เป่าเค้กในเดือนหน้ากันนะ
          </p>
        </div>

        <div className="birthday-float self-start rounded-[24px] border border-white/80 bg-white/75 px-4 py-3 shadow-card">
          <div className="flex items-center gap-3">
            <span className="birthday-wiggle inline-flex h-11 w-11 items-center justify-center rounded-[16px] bg-peach/70 text-2xl">
              🎁
            </span>
            <div>
              <p className="text-sm font-medium text-ink">Birthday moment</p>
              <p className="text-xs leading-6 text-muted">ใครกำลังจะมีวันพิเศษ</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {birthdays.map((item) => (
          <button
            key={item.pet.slug}
            type="button"
            onClick={() => onOpen(item.pet)}
            className="birthday-card rounded-[28px] border border-white/80 bg-white/80 p-4 text-left shadow-card"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="mb-3 flex items-center gap-2 text-peach-strong/90">
                  <span className="birthday-sparkle text-sm">✦</span>
                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted">ใกล้ถึงวันเกิด</span>
                </div>
                <p className="font-display text-2xl font-semibold leading-tight">{getPetDisplayName(item.pet)}</p>
                <p className="text-sm text-muted">วันเกิดถัดไป {formatThaiDate(item.nextBirthdayDate)}</p>
              </div>
              <span className="birthday-pill rounded-full bg-peach px-3 py-1 text-xs font-medium text-ink">
                {formatDaysUntilBirthday(item.daysUntilBirthday)}
              </span>
            </div>

            <div className="mt-4 rounded-[22px] bg-sage/35 px-4 py-3 text-sm leading-6 text-muted">
              ปีนี้จะอายุ <span className="font-medium text-ink">{item.turningAge} ปี</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
