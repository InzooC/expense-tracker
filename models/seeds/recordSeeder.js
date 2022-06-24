if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const RecordModel = require('../record')
const UserModel = require('../user')
const Category = require('../category')


const { categories, records, users } = require('./data')

db.once('open', () => {
  new Promise((resolve, reject) => {
    //for of 迴圈叫出每一位user
    for (const [user_index, user] of users.entries()) {
      //拿出每個user的record編號
      const recordSerial = user.recordSerial
      //創建user資料
      UserModel.create(user)
        .then((user) => {
          console.log('user資料創建完成')
          const userRecord = []
          //  把record forEach,找出包含在recordSerial的record.id
          records.forEach((record) => {
            if (recordSerial.includes(record.id)) {
              record.userId = user._id

              // // 把categoryId與icon放進record ----未成功

              // Category.findOne({ name: record.category })
              //   .lean()
              // .then(category => {
              //   console.log('成功找到category:', category.name)
              //   record.categoryId = category._id
              //   record.icon = category.icon
              //   // 把結合好關聯變項的record push進userRecord陣列中
              //   userRecord.push(record)
              // })

              userRecord.push(record)

            }
          })
          return RecordModel.create(userRecord)
        })
        .then(() => {
          console.log('record建立完成')
          if (user_index === (users.length - 1)) {
            resolve()
          }
        })
        .catch('error', (error) => {
          console.warn(error)
          return reject(error)
        })
    }
  })
    .then(() => {
      console.log('所有使用者與餐廳資料創建完成')
      process.exit()
    })
})