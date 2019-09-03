export function isSorted(arr: Array<number>): boolean {
  return arr.slice(1).every((item, i) => arr[i] <= item)
}
