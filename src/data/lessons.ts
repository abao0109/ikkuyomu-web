import { L01_LESSON } from "./l01";
import { L02_LESSON } from "./l02";
import type { LessonConfig } from "./types";

export const LIVE_LESSON_LIST: LessonConfig[] = [L01_LESSON, L02_LESSON];

export const LESSONS: Record<number, LessonConfig> = Object.fromEntries(
  LIVE_LESSON_LIST.map((lesson) => [lesson.n, lesson])
);
