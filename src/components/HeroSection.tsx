type HeroSectionProps = {
  memberCount: number
}

export function HeroSection({ memberCount }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden rounded-[40px] border border-white/75 bg-[linear-gradient(180deg,rgba(255,253,249,0.96),rgba(255,248,239,0.92))] px-5 py-5 shadow-card sm:px-7 sm:py-7">
      <div className="absolute -left-16 top-0 h-48 w-48 rounded-full bg-peach/40 blur-3xl" />
      <div className="absolute -right-10 bottom-6 h-40 w-40 rounded-full bg-sage/45 blur-3xl" />
      <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,rgba(246,221,208,0.82),transparent_72%)]" />

      <div className="relative grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <div className="space-y-6 pt-2">
          <span className="inline-flex rounded-full border border-line bg-white/80 px-3 py-1 text-xs font-medium tracking-wide text-muted">
            digital pet memory archive
          </span>

          <div className="space-y-3">
            <h1 className="max-w-xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              อัลบั้มความทรงจำของสมาชิกตัวน้อยในบ้านนี้
            </h1>
            <p className="max-w-lg text-sm leading-7 text-muted sm:text-base">
              พื้นที่เล็ก ๆ สำหรับเก็บภาพ ความทรงจำ และเรื่องราวของทุกตัวที่ทำให้บ้านนี้อบอุ่นขึ้น
              ทั้งคนที่ยังอยู่ตรงนี้ และคนที่ยังอยู่ในใจเสมอ
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-[auto_1fr] sm:items-start">
            <a
              href="#members"
              className="inline-flex items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              ดูสมาชิกในบ้าน
            </a>
            <div className="rounded-[24px] border border-white/70 bg-white/75 px-4 py-3 text-sm text-muted shadow-card">
              <span className="font-medium text-ink">{memberCount} ชีวิตเล็ก ๆ</span> ที่ทำให้บ้านนี้เต็มไปด้วยเสียง
              ความทรงจำ และความอบอุ่น
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-white/75 bg-white/55 p-3 shadow-card">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 overflow-hidden rounded-[28px] bg-gradient-to-br from-peach via-butter/65 to-sage/75 p-2">
              <div className="overflow-hidden rounded-[22px] bg-white/80">
                <img
                  src="/placeholders/mochi-1.svg"
                  alt="ภาพความทรงจำของสัตว์เลี้ยงในบ้าน"
                  className="aspect-[4/3] h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="overflow-hidden rounded-[24px] bg-white/80 p-2">
              <img
                src="/placeholders/lulu-1.svg"
                alt="ภาพความทรงจำของสัตว์เลี้ยงในบ้าน"
                className="aspect-[4/5] h-full w-full rounded-[18px] object-cover"
              />
            </div>
            <div className="space-y-3">
              <div className="overflow-hidden rounded-[24px] bg-white/80 p-2">
                <img
                  src="/placeholders/boba-1.svg"
                  alt="ภาพความทรงจำของสัตว์เลี้ยงในบ้าน"
                  className="aspect-[4/5] h-full w-full rounded-[18px] object-cover"
                />
              </div>
              <div className="rounded-[22px] border border-white/80 bg-[#fffaf4]/90 px-4 py-3 text-sm leading-6 text-muted">
                <span className="font-medium text-ink">บ้านนี้มีทั้งคนที่ยังอยู่</span> และคนที่เรายังคิดถึงเสมอ
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
