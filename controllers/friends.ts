import db from '../db.ts'
import { Context } from 'https://deno.land/x/oak/mod.ts'

interface Friend {
  name: string
  address: string
  phone: number
}

const friends = db.collection('friends')

export const addFriend = async ({ request, response }: Context) => {
  const body = await request.body()
  if (!request.hasBody) {
    response.status = 404
    response.body = {
      success: false,
      message: 'No data provided',
    }
  }
  try {
    const { name, address, phone } = body.value
    await friends.insertOne({
      name,
      address,
      phone,
    })
    response.body = {
      success: true,
      body: `Contact information was created for: ${name}`,
    }
    response.status = 201
  } catch (error) {
    response.body = null
    response.status = 500
  }
}

export const getFriends = async ({ response }: Context) => {
  const data: Friend[] = await friends.find({})
  if (data) {
    ;(response.body = data), (response.status = 200)
  } else {
    ;(response.body = 'not found'), (response.status = 204)
  }
}

export const updateFriend = async ({
  request,
  response,
  params,
}: Context | any) => {
  try {
    const body = await request.body()
    const { id } = params
    const fetchedFriend = await friends.findOne({ _id: { $oid: id } })
    if (fetchedFriend) {
      const { matchedCount } = await friends.updateOne(
        { _id: { $oid: id } },
        { $set: { ...body.value } }
      )
      if (matchedCount) {
        response.body = {
          success: true,
          body: `Updated contact with id: ${id}`,
        }
        response.status = 204
      }
    } else {
      response.body = {
        success: false,
        body: `No contact with id: ${id} found`,
      }
      response.status = 404
    }
  } catch (error) {
    response.body = {
      success: false,
      body: error.message,
    }
    response.status = 500
  }
}

export const deleteFriend = async ({ response, params }: Context | any) => {
  try {
    const { id } = params
    const fetchedContact = await friends.findOne({
      $oid: id,
    })
    if (fetchedContact) {
      await friends.deleteOne({
        _id: { $oid: id },
      })
      response.body = {
        success: true,
        body: `Contact with id: ${id} was deleted`,
      }
      response.status = 204
    }
  } catch (error) {
    response.body = {
      success: false,
      body: error.message,
    }
    response.status = 500
  }
}
