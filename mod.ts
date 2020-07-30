import { Application, Router } from 'https://deno.land/x/oak/mod.ts'

import {
  addFriend,
  getFriends,
  updateFriend,
  deleteFriend,
} from './controllers/friends.ts'

const app = new Application()
const port = 8000
const friends = new Router()

friends
  .get('/friends', getFriends)
  .post('/friends', addFriend)
  .patch('/friends/:id', updateFriend)
  .delete('/friends/:id', deleteFriend)

app.use(friends.routes())
app.use(friends.allowedMethods())

await app.listen({ port })
