import { useEffect, useRef } from 'react'
import type { PointerEvent, TouchEvent } from 'react'
import type { Pet } from '../data/pets'
import { formatDaysUntilBirthday, getBirthdaySummary } from '../lib/birthdays'
import { formatAge, formatThaiDate } from '../lib/age'
import { getPetDisplayName, getPetPrimaryName } from '../lib/petName'

type PetModalProps = {
  pet: Pet
  activeImage: number
  onChangeImage: (index: number) => void
  onClose: () => void
}

export function PetModal({ pet, activeImage, onChangeImage, onClose }: PetModalProps) {
  const touchStartX = useRef<number | null>(null)
  const pointerStartX = useRef<number | null>(null)
  const previousImage = activeImage === 0 ? pet.galleryImages.length - 1 : activeImage - 1
  const nextImage = activeImage === pet.galleryImages.length - 1 ? 0 : activeImage + 1
  const isMemorial = Boolean(pet.datePassedAway)
  const birthday = getBirthdaySummary(pet)
  const joinedFamilyReferenceDate = pet.dateJoinedFamily ?? pet.dateOfBirth
  const ageReferenceDate = pet.dateOfBirth ?? joinedFamilyReferenceDate
  const ageLabel = pet.dateOfBirth ? 'อายุ' : 'อายุโดยประมาณ'

  const goToPreviousImage = () => {
    onChangeImage(previousImage)
  }

  const goToNextImage = () => {
    onChangeImage(nextImage)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        onChangeImage(previousImage)
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        onChangeImage(nextImage)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextImage, onChangeImage, previousImage])

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null
  }

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const endX = event.changedTouches[0]?.clientX

    if (touchStartX.current == null || endX == null) {
      touchStartX.current = null
      return
    }

    const deltaX = endX - touchStartX.current
    touchStartX.current = null

    if (Math.abs(deltaX) < 40) {
      return
    }

    if (deltaX < 0) {
      goToNextImage()
      return
    }

    goToPreviousImage()
  }

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') {
      return
    }

    pointerStartX.current = event.clientX
  }

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStartX.current == null) {
      return
    }

    const deltaX = event.clientX - pointerStartX.current
    pointerStartX.current = null

    if (Math.abs(deltaX) < 40) {
      return
    }

    if (deltaX < 0) {
      goToNextImage()
      return
    }

    goToPreviousImage()
  }

  const handlePointerLeave = () => {
    pointerStartX.current = null
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#2d241f]/34 backdrop-blur-sm" onClick={onClose}>
      <div className="mx-auto flex min-h-full max-w-3xl items-end justify-center p-0 sm:p-6">
        <div
          className="max-h-[92vh] w-full overflow-auto rounded-t-[32px] border border-line/60 bg-cream shadow-2xl sm:rounded-[32px]"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="sticky top-0 z-10 border-b border-line bg-cream/95 px-5 py-4 backdrop-blur">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-display text-2xl font-semibold leading-tight">{getPetDisplayName(pet)}</p>
                <p className="text-sm text-muted">{pet.summary}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-line bg-white px-4 py-2 text-sm text-ink"
              >
                ปิด
              </button>
            </div>
          </div>

          <div className="space-y-5 p-5">
            <div
              className="pet-gallery relative overflow-hidden rounded-[28px] bg-white shadow-card"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerLeave}
            >
              <img
                src={pet.galleryImages[activeImage]}
                alt={`${getPetPrimaryName(pet)} photo ${activeImage + 1}`}
                className="aspect-[4/5] w-full object-cover"
                draggable={false}
              />
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  goToPreviousImage()
                }}
                className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-[rgba(59,47,42,0.72)] text-white shadow-lg backdrop-blur transition hover:bg-[rgba(59,47,42,0.82)]"
                aria-label="รูปก่อนหน้า"
              >
                <ChevronLeftIcon />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  goToNextImage()
                }}
                className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-[rgba(59,47,42,0.72)] text-white shadow-lg backdrop-blur transition hover:bg-[rgba(59,47,42,0.82)]"
                aria-label="รูปถัดไป"
              >
                <ChevronRightIcon />
              </button>
              <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4">
                <span
                  className={`rounded-full px-3 py-2 text-sm font-medium text-ink shadow-sm ${
                    isMemorial ? 'bg-butter/90' : 'bg-white/88'
                  }`}
                >
                  {isMemorial ? 'ยังอยู่ในใจเสมอ' : 'ยังทำให้บ้านนี้สดใสอยู่ทุกวัน'}
                </span>
                <span className="rounded-full bg-white/88 px-3 py-2 text-sm text-muted shadow-sm">
                  รูป {activeImage + 1} / {pet.galleryImages.length}
                </span>
              </div>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-1">
              {pet.galleryImages.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => onChangeImage(index)}
                  className={`shrink-0 overflow-hidden rounded-[18px] border bg-white ${
                    activeImage === index ? 'border-ink ring-2 ring-peach/45' : 'border-line'
                  }`}
                >
                  <img src={image} alt="" className="h-20 w-20 object-cover" />
                </button>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <InfoCard
                label={ageLabel}
                value={ageReferenceDate ? formatAge(ageReferenceDate, pet.datePassedAway) : 'ไม่ทราบแน่ชัด'}
              />
              <InfoCard
                label="วันเข้าบ้าน"
                value={pet.dateJoinedFamily ? formatThaiDate(pet.dateJoinedFamily) : 'ไม่ทราบแน่ชัด'}
              />
              <InfoCard
                label={pet.datePassedAway ? 'อยู่กับบ้านนี้' : 'สถานะ'}
                value={
                  pet.datePassedAway
                    ? joinedFamilyReferenceDate
                      ? formatAge(joinedFamilyReferenceDate, pet.datePassedAway)
                      : 'ไม่ทราบแน่ชัด'
                    : 'ยังอยู่กับบ้านนี้'
                }
              />
              <InfoCard
                label={pet.dateOfBirth ? 'วันเกิด' : 'วันเกิดโดยประมาณ'}
                value={ageReferenceDate ? formatThaiDate(ageReferenceDate) : 'ไม่ทราบแน่ชัด'}
              />
            </div>

            {birthday ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoCard label="วันเกิดถัดไป" value={formatThaiDate(birthday.nextBirthdayDate)} />
                <InfoCard label="วันเกิดรอบนี้" value={`${formatDaysUntilBirthday(birthday.daysUntilBirthday)} • จะอายุ ${birthday.turningAge} ปี`} />
              </div>
            ) : null}

            <TagSection title="นิสัย" tone="peach" items={pet.personalityTraits} />
            <TagSection title="ของโปรด" tone="sage" items={pet.favoriteThings} />

            <div className="rounded-[28px] border border-line bg-white/75 p-5">
              <p className="text-sm font-medium text-muted">ความทรงจำ</p>
              <p className="mt-3 text-base leading-8 text-ink">{pet.memoryNote}</p>

              {pet.remembranceNote ? (
                <p className="mt-4 rounded-[20px] bg-butter/60 px-4 py-3 text-sm leading-6 text-ink">
                  {pet.remembranceNote}
                </p>
              ) : null}
            </div>

            {pet.datePassedAway ? (
              <div className="rounded-[28px] border border-line bg-[#fff8f0] p-5">
                <p className="text-sm text-muted">อยู่กับเราไปจนถึง</p>
                <p className="mt-2 font-display text-xl font-semibold sm:text-2xl">{formatThaiDate(pet.datePassedAway)}</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        d="M14.5 5.5L8 12l6.5 6.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.25"
      />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        d="M9.5 5.5L16 12l-6.5 6.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.25"
      />
    </svg>
  )
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[24px] border border-line bg-white/75 p-4">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-2 text-base font-medium text-ink">{value}</p>
    </div>
  )
}

type TagSectionProps = {
  title: string
  tone: 'peach' | 'sage'
  items: string[]
}

function TagSection({ title, tone, items }: TagSectionProps) {
  const toneClass = tone === 'peach' ? 'bg-peach/75' : 'bg-sage/80'

  return (
    <div className="rounded-[28px] border border-line bg-white/75 p-5">
      <p className="text-sm font-medium text-muted">{title}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className={`rounded-full px-3 py-2 text-sm text-ink ${toneClass}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
