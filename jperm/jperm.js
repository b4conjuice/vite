import times from '../data/times'

const latest = times[times.length - 1]

const round = num => Math.round(num * 100) / 100

const getSum = nums => nums.reduce((avg, num) => avg + num, 0)

const getMean = timeArray =>
  round(timeArray.reduce((avg, time) => avg + time, 0) / timeArray.length)

const getBestMean = (timeArray, length) => {
  const means = timeArray
    .map((time, index) => timeArray.slice(index, length))
    .filter(timeList => timeList.length === length)
    .map(timeList => getMean(timeList))
  return Math.min(...means)
}

const getAverage = timeArray => {
  const max = Math.max(...timeArray)
  const min = Math.min(...timeArray)
  return round((getSum(timeArray) - max - min) / (timeArray.length - 2))
}

const getBestAverage = (timeArray, length) => {
  const averages = timeArray
    .map((time, index) => timeArray.slice(index, length))
    .filter(timeList => timeList.length === length)
    .map(timeList => getAverage(timeList))
  return Math.min(...averages)
}
// const getBestAverage = (timeArray, length) => {
//   const averages = timeArray.map((time, index) => timeArray.slice(index, length)).filter(timeList=>timeList.length === length).map(timeList=> getAverage(timeList))
//   return Math.min(...averages)
// }

const stats = [
  {
    name: 'time',
    current: latest,
    best: Math.min(...times),
  },
  {
    name: 'mo3',
    current: getMean([...times].slice(-3)),
    best: getBestMean(times, 3),
  },
  {
    name: 'avg5',
    current: getAverage([...times].slice(-5)),
    best: getBestAverage(times, 5),
  },
  {
    name: 'avg12',
    current: getAverage([...times].slice(-12)),
    best: getBestAverage(times, 12),
  },
  {
    name: 'avg25',
    current: getAverage([...times].slice(-25)),
    best: getBestAverage(times, 25),
  },
  {
    name: 'avg50',
    current: getAverage([...times].slice(-50)),
    best: getBestAverage(times, 50),
  },
  {
    name: 'avg100',
    current: getAverage([...times].slice(-100)),
    best: getBestAverage(times, 100),
  },
]

document.querySelector('#latest').innerHTML = latest
document.querySelector('#times').innerHTML = times
  .map(
    time => `<li class="px-3 py-2 rounded bg-[rgba(0,0,0,0.1)]">${time}</li>`
  )
  .join('')
document.querySelector('#stats').innerHTML = stats
  .map(
    ({ name, current, best }) =>
      `<tr><th>${name}</th><th>${current}</th><th>${best}</th></tr>`
  )
  .join('')
document.querySelector('#solves').innerHTML = `solves: ${times.length}`
