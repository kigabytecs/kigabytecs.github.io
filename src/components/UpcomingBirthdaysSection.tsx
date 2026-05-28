import type { BirthdaySummary } from '../lib/birthdays'
import { formatDaysUntilBirthday } from '../lib/birthdays'
import { formatThaiDate } from '../lib/age'
import { getPetDisplayName } from '../lib/petName'

type UpcomingBirthdaysSectionProps = {
  birthdays: BirthdaySummary[]
}

export function UpcomingBirthdaysSection({ birthdays }: UpcomingBirthdaysSectionProps) {
  if (birthdays.length === 0) {
    return null
  }

  return (
    <section className="mt-8 rounded-[34px] border border-white/75 bg-[linear-gradient(180deg,rgba(255,253,249,0.96),rgba(255,248,239,0.92))] p-4 shadow-card sm:mt-10 sm:p-5">
      <div className="mb-4 space-y-2 px-1">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted">Upcoming birthdays</p>
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">ใกล้ถึงวันเกิดของใครบ้าง</h2>
        <p className="max-w-2xl text-sm leading-7 text-muted sm:text-base">
          เอาไว้กลับมาเช็กได้ง่าย ๆ โดยไม่ต้องไล่เปิดทีละตัว
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {birthdays.map((item) => (
          <article
            key={item.pet.slug}
            className="rounded-[28px] border border-white/80 bg-white/80 p-4 shadow-card"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-display text-2xl font-semibold leading-tight">{getPetDisplayName(item.pet)}</p>
                <p className="text-sm text-muted">วันเกิดถัดไป {formatThaiDate(item.nextBirthdayDate)}</p>
              </div>
              <span className="rounded-full bg-peach px-3 py-1 text-xs font-medium text-ink">
                {formatDaysUntilBirthday(item.daysUntilBirthday)}
              </span>
            </div>

            <div className="mt-4 rounded-[22px] bg-sage/35 px-4 py-3 text-sm leading-6 text-muted">
              ปีนี้จะอายุ <span className="font-medium text-ink">{item.turningAge} ปี</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
