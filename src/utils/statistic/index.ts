import { TAttempts } from "../../common/types/field";

//Визначаємо ширину для кожного графік-бару
export const getWidthToGraphBar = (attempts: TAttempts) => {
  if (!attempts) return
  
  const attemptsCount: number[] = Object.values(attempts);
  const width = attemptsCount.reduce((acc, curr) => {
   const maxVal = Math.max(...attemptsCount);
    const width = (curr * 100) / maxVal;
    acc.push(parseFloat(width.toFixed(1)));
    return acc;
  }, [] as number[])

  return width
}
