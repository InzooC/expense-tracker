const categories = [
  {
    id: 1,
    name: "家居物業",
    icon: "fa-solid fa-house"
  },
  {
    id: 2,
    name: "交通出行",
    icon: "fa-solid fa-van-shuttle"
  },
  {
    id: 3,
    name: "休閒娛樂",
    icon: "fa-solid fa-face-grin-beam"
  },
  {
    id: 4,
    name: "餐飲食品",
    icon: "fa-solid fa-utensils"
  },
  {
    id: 5,
    name: "其他",
    icon: "fa-solid fa-pen"
  }
]



const records = [
  {
    id: 1,
    name: "午餐",
    date: "2019-4-23",
    amount: 60,
    categoryNumber: 4,
    category: "餐飲食品"
  },
  {
    id: 2,
    name: "晚餐",
    date: "2019-4-23",
    amount: 60,
    categoryNumber: 4,
    category: "餐飲食品"
  },
  {
    id: 3,
    name: "捷運",
    date: "2019-4-23",
    amount: 120,
    categoryNumber: 2,
    category: "旅遊出行"
  },
  {
    id: 4,
    name: "電影：驚奇隊長",
    date: "2019-4-23",
    amount: 220,
    categoryNumber: 3,
    category: "休閒娛樂"
  },
  {
    id: 5,
    name: "租金",
    date: "2015-4-01",
    amount: 25000,
    categoryNumber: 1,
    category: "家居物業"
  }
]

const users = [
  {
    id: 1,
    name: '廣志',
    password: '123',
    email: 'user1@test',
    recordSerial: [1, 2, 3, 5]
  },
  {
    id: 2,
    name: '小新',
    password: '123',
    email: 'user2@test',
    recordSerial: [4]
  }
]

module.exports = { categories, records, users }