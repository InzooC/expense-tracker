const bcrypt = require('bcryptjs')
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
      const { id, name, email } = user
      //拿出每個user的record編號
      const recordSerial = user.recordSerial
      const hashPassword = new Promise((resolve, _reject) => {
        //user密碼進行雜湊
        bcrypt.genSalt(10)
          .then(salt => bcrypt.hash(user.password, salt))
          .then((hash) => {
            return resolve(hash)
          })
      })
      hashPassword
        .then((hash) => {
          //創建user資料
          UserModel
            .create({ id, name, email, password: hash })
            .then((user) => {
              const userRecord = []
              //  把record forEach,找出包含在recordSerial的record.id
              records.forEach((record) => {
                let eachRecord = record
                //把user關聯資料放進record
                if (recordSerial.includes(record.id)) {
                  eachRecord.userId = user._id
                  //還不熟悉如何用promise包裝，所以還無法把CategoryModel的資料與record做關聯，現階段只能用手動的switch判斷式
                  switch (record.categoryNumber) {
                    case 1:
                      eachRecord.icon = categories[0].icon;
                      break;
                    case 2:
                      eachRecord.icon = categories[1].icon;
                      break;
                    case 3:
                      eachRecord.icon = categories[2].icon;
                      break;
                    case 4:
                      eachRecord.icon = categories[3].icon;
                      break;
                    case 5:
                      eachRecord.icon = categories[4].icon;;
                      break;
                  }
                  userRecord.push(eachRecord)
                }
              })
              return RecordModel.create(userRecord)
            })
            .then(() => {
              setTimeout(() => { //讓所有資料都建立好
                console.log('開始執行判斷式')
                if (user_index === (users.length - 1)) {
                  return resolve()
                }
              }, "500")

            })
        })
    }
  })
    .then(() => {
      console.log('所有使用者與餐廳資料創建完成')
      process.exit()
    })
})