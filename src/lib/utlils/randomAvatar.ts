const FEMALE_AVATARS: string[] = [
  '/png/avatars/female/01.png',
  '/png/avatars/female/02.png',
  '/png/avatars/female/03.png',
];

const MALE_AVATARS: string[] = [
  '/png/avatars/male/01.png',
  '/png/avatars/male/02.png',
  '/png/avatars/male/03.png',
];

export type Sex = 'female' | 'male';

export function getRandomAvatar(sex: Sex): string {
  const list = sex === 'female' ? FEMALE_AVATARS : MALE_AVATARS;
  const idx = Math.floor(Math.random() * list.length);
  return list[idx];
}
