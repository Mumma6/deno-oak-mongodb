import { MongoClient } from 'https://deno.land/x/mongo@v0.8.0/mod.ts'

const client = new MongoClient()
client.connectWithUri(
  'mongodb+srv://martin:deno123@cluster0.p3gf0.mongodb.net/contacts?retryWrites=true&w=majority'
)

const db = client.database('contacts')

export default db
