import { DenonConfig } from 'https://deno.land/x/denon/mod.ts'

const config: DenonConfig = {
  scripts: {
    start: {
      cmd: 'deno run mod.ts',
      desc: 'run my mod.ts file',
      allow: ['plugin', 'net', 'read', 'write', 'env'],
      unstable: true,
    },
  },
}

export default config
