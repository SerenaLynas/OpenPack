export function average(nums: number[]) {
    return nums.reduce((prev, curr) => prev + curr, 0) / nums.length
}

export function mod(num: number, mod: number) {
    return ((num % mod) + mod) % mod;
}