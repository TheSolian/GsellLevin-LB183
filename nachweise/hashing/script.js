const bcrypt = require('bcrypt')

const input = '12345678' //* Beispiel PW
const output = bcrypt.hashSync(input, 10)

//* Ergebnis
//* $2b$10$1Amla80iC2DyPXD7mTmleeNPd3eRQ7qgAzv0dxClbYFsrZeTkDu9e
console.log(output)

const isRightPassword = bcrypt.compareSync(input, output)

//* Ergebnis hier 'true'
console.log(isRightPassword)
