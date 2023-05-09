const app = require('../index')
import { test } from '@jest/globals'

test('GET / post query id = 29', async () => {
  const response = await app.inject({
    method: 'GET',
    url: '/post/get?id=29'
  })
  expect(response.statusCode).toBe(200)
  expect(JSON.parse(response.payload)).toEqual({
    message: 'ok', code: 200, data: [{
      body: "Things aren't going well at all with mom today. She is just a limp noodle and wants to sleep all the time. I sure hope that things get better soon.",
      id: 30,
      reactions: 0,
      tags: [
        "american",
        "love",
        "fiction",
      ],
      title: "Things aren't going well at all",
      userId: 2,
    }]
  })
})

test('GET / query post error', async () => {
  const response = await app.inject({
    method: 'GET',
    url: '/post/get?id=31'
  })
  expect(response.statusCode).toBe(404)
  expect(JSON.parse(response.payload)).toEqual({ message: 'error', code: 404, data: [] })
})