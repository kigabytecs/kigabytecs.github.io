import { useEffect, useMemo, useState } from 'react'
import { HeroSection } from './components/HeroSection'
import { MemorialCard } from './components/MemorialCard'
import { PetCard } from './components/PetCard'
import { PetModal } from './components/PetModal'
import { Section } from './components/Section'
import { UpcomingBirthdaysSection } from './components/UpcomingBirthdaysSection'
import type { Pet } from './data/pets'
import { pets } from './data/pets'
import {
  getUpcomingBirthdays,
  sortLivingPets,
} from './lib/birthdays'
import {
  sortMemorialPets,
  type LivingSortKey,
  type MemorialSortKey,
  type SortDirection,
} from './lib/petSorting'

function App() {
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null)
  const [activeImage, setActiveImage] = useState(0)
  const [sortKey, setSortKey] = useState<LivingSortKey>('age')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [memorialSortKey, setMemorialSortKey] = useState<MemorialSortKey>('passed')
  const [memorialSortDirection, setMemorialSortDirection] = useState<SortDirection>('desc')

  const livingPets = useMemo(() => pets.filter((pet) => !pet.datePassedAway), [])
  const memorialPets = useMemo(() => pets.filter((pet) => pet.datePassedAway), [])
  const sortedLivingPets = useMemo(
    () => sortLivingPets(livingPets, sortKey, sortDirection),
    [livingPets, sortDirection, sortKey],
  )
  const sortedMemorialPets = useMemo(
    () => sortMemorialPets(memorialPets, memorialSortKey, memorialSortDirection),
    [memorialPets, memorialSortDirection, memorialSortKey],
  )
  const upcomingBirthdays = useMemo(() => getUpcomingBirthdays(livingPets), [livingPets])

  useEffect(() => {
    document.body.classList.toggle('modal-open', Boolean(selectedPet))
    return () => document.body.classList.remove('modal-open')
  }, [selectedPet])

  const openPet = (pet: Pet) => {
    setActiveImage(0)
    setSelectedPet(pet)
  }

  const toggleSort = (nextKey: LivingSortKey) => {
    if (sortKey === nextKey) {
      setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'))
      return
    }

    setSortKey(nextKey)
    setSortDirection(nextKey === 'age' ? 'desc' : 'asc')
  }

  const toggleMemorialSort = (nextKey: MemorialSortKey) => {
    if (memorialSortKey === nextKey) {
      setMemorialSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'))
      return
    }

    setMemorialSortKey(nextKey)
    setMemorialSortDirection(nextKey === 'age' || nextKey === 'passed' ? 'desc' : 'asc')
  }

  return (
    <main className="min-h-screen bg-cream text-ink">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pb-16 pt-5 sm:px-6">
        <HeroSection memberCount={pets.length} />

        <UpcomingBirthdaysSection birthdays={upcomingBirthdays} onOpen={openPet} />

        <Section
          id="members"
          eyebrow="Our little family"
          title="สมาชิกตัวน้อยที่ทำให้บ้านนี้มีชีวิต"
          description="รวมสมาชิกตัวน้อยที่ยังทำให้บ้านนี้เต็มไปด้วยเสียง ความน่ารัก และช่วงเวลาที่ชวนยิ้มอยู่ทุกวัน"
        >
          <div className="mb-4 flex flex-wrap gap-2 px-1">
            <SortButton
              label="ตามชื่อ"
              isActive={sortKey === 'name'}
              direction={sortKey === 'name' ? sortDirection : undefined}
              onClick={() => toggleSort('name')}
            />
            <SortButton
              label="ตามอายุ"
              isActive={sortKey === 'age'}
              direction={sortKey === 'age' ? sortDirection : undefined}
              onClick={() => toggleSort('age')}
            />
            <SortButton
              label="ตามวันเกิด"
              isActive={sortKey === 'birthday'}
              direction={sortKey === 'birthday' ? sortDirection : undefined}
              onClick={() => toggleSort('birthday')}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sortedLivingPets.map((pet, index) => (
              <PetCard key={pet.slug} pet={pet} index={index} onOpen={openPet} />
            ))}
          </div>
        </Section>

        <Section
          eyebrow="In loving memory"
          title="ยังอยู่ในใจเสมอ"
          description="สำหรับคนที่จากไปแล้ว แต่ยังคงอยู่ในความทรงจำเสมอ และยังทำให้บ้านหลังนี้อบอุ่นทุกครั้งที่นึกถึง"
        >
          <div className="rounded-[34px] border border-white/75 bg-[linear-gradient(180deg,rgba(255,252,246,0.9),rgba(255,248,239,0.95))] p-4 shadow-card sm:p-5">
            <div className="mb-4 rounded-[26px] bg-white/70 px-4 py-4 text-sm leading-7 text-muted">
              คิดถึงได้โดยไม่ต้องเศร้า เพราะทุกตัวเคยทำให้บ้านนี้มีช่วงเวลาดี ๆ อยู่จริง
            </div>
            <div className="mb-4 flex flex-wrap items-center gap-2 px-1">
              <SortButton
                label="ตามชื่อ"
                isActive={memorialSortKey === 'name'}
                direction={memorialSortKey === 'name' ? memorialSortDirection : undefined}
                onClick={() => toggleMemorialSort('name')}
              />
              <SortButton
                label="ตามอายุ"
                isActive={memorialSortKey === 'age'}
                direction={memorialSortKey === 'age' ? memorialSortDirection : undefined}
                onClick={() => toggleMemorialSort('age')}
              />
              <SortButton
                label="วันที่จากไป"
                isActive={memorialSortKey === 'passed'}
                direction={memorialSortKey === 'passed' ? memorialSortDirection : undefined}
                onClick={() => toggleMemorialSort('passed')}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sortedMemorialPets.map((pet) => (
                <MemorialCard key={pet.slug} pet={pet} onOpen={openPet} />
              ))}
            </div>
          </div>
        </Section>

        <footer className="mt-10 rounded-[36px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,253,249,0.96),rgba(255,248,239,0.92))] px-6 py-8 text-center shadow-card">
          <p className="font-display text-2xl font-semibold">บ้านนี้ยังมีความทรงจำของพวกเธออยู่เสมอ</p>
          <p className="mt-3 text-sm leading-6 text-muted">
            ขอบคุณที่เคยเข้ามาเป็นส่วนหนึ่งของบ้านหลังนี้ และทำให้ทุกวันมีเรื่องให้คิดถึงอย่างอบอุ่น
          </p>
        </footer>
      </div>

      {selectedPet ? (
        <PetModal
          pet={selectedPet}
          activeImage={activeImage}
          onChangeImage={setActiveImage}
          onClose={() => setSelectedPet(null)}
        />
      ) : null}
    </main>
  )
}

type SortButtonProps = {
  label: string
  isActive: boolean
  direction?: SortDirection
  onClick: () => void
}

function SortButton({ label, isActive, direction, onClick }: SortButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm transition-colors ${
        isActive
          ? 'bg-ink text-white'
          : 'border border-line bg-white/75 text-muted hover:bg-peach/25'
      }`}
    >
      <span className="inline-flex items-center gap-2">
        {label}
        {direction ? <span aria-hidden="true">{direction === 'asc' ? '↑' : '↓'}</span> : null}
      </span>
    </button>
  )
}

export default App
