new Promise((resolve, _reject) => {
  for (const [user_index, user] of users.entries()) {
    // 創建使用者資料(user): model.create
    UserModel.create({
      ...user
    }).then((user) => {
      // 對每個user建立相對應餐廳資料
      return RestaurantModel.create(restaurants)
    }).then(() => {
      resolve()
    }).catch(error => {
      console.log(error)
    })
  }
}).then(() => {
  // 等待所有使用者的餐廳資料創建完成
  console.log('所有使用者與餐廳資料創建完成')
  process.exit()
})