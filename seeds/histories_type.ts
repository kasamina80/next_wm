import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

type WorkHistory = {
  id: number,
  start_on: Date,
  end_on: Date | null,
  content: string,
  work_type: "it_engineer" | "idol",
  point: boolean
};

// JS does not have an integer type, but I want to declare it anyway, so I make it an alias
type integer = number;

const oneIndexedDate = (year: integer, month: integer, day: integer): Date => new Date(year, month - 1, day);

const histories: WorkHistory[] = [
  { id: 1, start_on: oneIndexedDate(2023, 4, 1), end_on: oneIndexedDate(2024, 3, 31), content: "パーティー企画支援サイト開発", work_type: "it_engineer", point: false },
  { id: 2, start_on: oneIndexedDate(2024, 4, 1), end_on: oneIndexedDate(2024, 7, 31), content: "個展開催支援システム開発", work_type: "it_engineer", point: false },
  { id: 3, start_on: oneIndexedDate(2024, 8, 1), end_on: oneIndexedDate(2025, 1, 31), content: "芸能グループ管理システム開発", work_type: "it_engineer", point: false },
  { id: 4, start_on: oneIndexedDate(2025, 2, 1), end_on: null, content: "芸能グループ向け告知サイト開発", work_type: "it_engineer", point: false },
  { id: 5, start_on: oneIndexedDate(2024, 7, 1), end_on: null, content: "MORE MORE TYPE! 発足", work_type: "idol", point: true },
  { id: 6, start_on: oneIndexedDate(2024, 12, 1), end_on: null, content: "MORE MORE TYPE! 初のオリジナル曲「インターフェース」発表", work_type: "idol", point: true },
  { id: 7, start_on: oneIndexedDate(2025, 5, 1), end_on: null, content: "MORE MORE TYPE! がREACT TRACT様と初のコラボ配信を実施", work_type: "idol", point: true },
  { id: 8, start_on: oneIndexedDate(2025, 7, 1), end_on: null, content: "MORE MORE TYPE! ファーストアルバム「extends」発売予定", work_type: "idol", point: true },
];


async function main() {
  const newWorkHistories = await prisma.workHistory.createMany({
    data: histories,
    skipDuplicates: true,
  });
  console.log(newWorkHistories);
}

export type { WorkHistory };

export default main;
