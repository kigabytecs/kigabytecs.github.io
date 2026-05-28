# Pet data guide

ใช้ไฟล์นี้เป็นเช็กลิสต์ตอนเปลี่ยนเว็บจาก placeholder เป็นข้อมูลจริง

## วางรูปไว้ที่ไหน

เก็บรูปจริงไว้ใน `public/pets/<slug>/`

ตัวอย่าง:

```text
public/pets/jocho/cover.jpg
public/pets/jocho/01.jpg
public/pets/jocho/02.jpg
public/pets/jocho/03.jpg
```

ใน `src/data/pets.ts` ให้ใช้ path แบบนี้:

```ts
coverImagePath: '/pets/jocho/cover.jpg',
galleryImages: [
  '/pets/jocho/cover.jpg',
  '/pets/jocho/01.jpg',
  '/pets/jocho/02.jpg',
]
```

## ข้อมูลต่อ 1 ตัว

```ts
{
  slug: 'jocho',
  thaiName: 'โจโฉ',
  englishName: 'Jocho',
  species: 'bird',
  dateJoinedFamily: '2021-06-01',
  dateOfBirth: '2021-04-10',
  datePassedAway: null,
  personalityTraits: ['ขี้อ้อน', 'ชอบเกาะไหล่'],
  favoriteThings: ['เมล็ดทานตะวัน'],
  memoryNote: 'ชอบบินมาเกาะไหล่ตอนทำงาน',
  summary: 'เพื่อนตัวเล็กที่ชอบอยู่ใกล้ ๆ เสมอ',
  coverImagePath: '/pets/jocho/cover.jpg',
  galleryImages: [
    '/pets/jocho/cover.jpg',
    '/pets/jocho/01.jpg',
    '/pets/jocho/02.jpg',
  ],
}
```

## ถ้าไม่รู้วันเกิด

ถ้าไม่รู้วันเกิดแน่ชัด ให้ไม่ต้องใส่ `dateOfBirth` แล้วเว็บจะใช้ `dateJoinedFamily` ในการคำนวณอายุโดยประมาณ

```ts
dateJoinedFamily: '2021-06-01',
dateOfBirth: undefined,
```

## ถ้าจากไปแล้ว

ใส่ `datePassedAway` และ `remembranceNote`

```ts
datePassedAway: '2026-05-03',
remembranceNote: 'ยังคิดถึงเสมอ ขอบคุณที่เคยอยู่ในบ้านนี้',
```

ถ้ายังอยู่กับบ้าน ให้ใช้:

```ts
datePassedAway: null,
```
