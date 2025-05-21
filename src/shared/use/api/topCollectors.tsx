import { collectors } from "./collectors";

export const topCollectors = collectors.sort((a, b) => b.rank.global - a.rank.global).slice(0, 6)

