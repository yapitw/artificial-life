import { GPU, IKernelRunShortcut } from 'gpu.js';

const gpu = new GPU();

const kernels: Record<string, IKernelRunShortcut> = {}

export const getKernel = (length1: number, length2: number, force: number) => {
    const cacheKey = [length1, length2, force].join("-")

    if (kernels[cacheKey]) {
        return kernels[cacheKey]
    }

    const kernel = gpu.createKernel(
        function (a: [number, number, number, number][], b: [number, number, number, number][]) {
            let fx = 0;
            let fy = 0;

            const F = this.constants.force as number
            const bLength = this.constants.bLength as number
            const [ax, ay, avx, avy] = a[this.thread.y]

            for (let i = 0; i < bLength; i++) {
                const [bx, by] = b[i]

                const dx = (ax - bx)
                const dy = (ay - by)
                const d = Math.sqrt(dx * dx + dy * dy)

                if (d > 0 && d < 80) {
                    const f = F / d
                    fx += (f * dx)
                    fy += (f * dy)
                }
            }

            return [ax, ay, fx, fy][this.thread.x]
        },
        {
            constants: {
                force: force,
                bLength: length2
            },
            output: [4, length1]
        }
    )

    return kernels[cacheKey] = kernel
}