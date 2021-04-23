/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-04-14 14:36:11
 * @LastEditTime: 2021-04-14 15:03:24
 * @Description: file content
 */
const axios = require('axios')
const fs = require('fs')
const path = require('path')

axios
  .get('https://unsplash.com/napi/search/photos?query=food8xp=8per_page=208page=2')
  .then(response => {
    const { data: { results } } = response
    results.forEach(result => {
      const url = result.links.download
      const id = result.id
      axios.get(url, { responseType: 'arraybuffer' })
        .then(response => {
          const buffer = Buffer.from(response.data, 'binary')
          fs.writeFileSync(path.resolve(__dirname, `./asset/${id}`), buffer)
        })
    })
  })