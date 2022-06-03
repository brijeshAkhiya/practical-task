const fs = require('fs')
const papa = require('papaparse')
const arr = []
/**
 * 
 * @param {Number} input 
 */

const fibSeries = (input) => {
  if (input > 0) {
    if (input === 1) return arr.push(1)
    else {
      arr.push(1)
      arr.push(1)
      if (input === 2) {
        return arr
      } else {
        for (let i = 2; i < input; i++) {
          arr.push(arr[i - 1] + arr[i - 2])
        }
        return arr
      }
    }
  }
}

const writeCSVFile = (input) => {
  let csv = { INPUT: input, OUTPUT: fibSeries(input) }
  const isExists = fs.existsSync('./fb.csv')
  if (isExists) {
    const fileData = papa.parse(fs.readFileSync('./fb.csv', 'utf8'), { header: true })
    if (fileData.data.findIndex((ele) => Number(ele.input) === Number(input)) === -1) {
      fileData.data.push(csv)
      fs.writeFileSync('./fb.csv', papa.unparse(fileData.data), 'utf8')
      console.log(fileData.data)
    }
  } else {
    fs.writeFileSync('./fb.csv', papa.unparse([csv]), 'utf8')
    console.log(csv)
  }
  return
}

const myArgs = process.argv.slice(2);

if (myArgs[0] === 'fib') console.log(fibSeries(myArgs[1]))
if (myArgs[0] === 'csv') writeCSVFile(myArgs[1])

