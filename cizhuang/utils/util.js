export function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

export function strTime(stringTime) {
    if(!stringTime) return
    let strtime = stringTime
    let strtimes = strtime.split(/[.:\s]/)
    let year = strtimes[0]
    let month = strtimes[1] - 1
    let day = strtimes[2]
    let hour = strtimes[3] || 0
    let minute = strtimes[4] || 0
    let second = strtimes[5] || 0
    let time = new Date(year, month, day, hour, minute, second)
    let diff = Date.now() - time.getTime()
    if (diff < 24 * 3600 * 1000) {
        if (time.getDay() == new Date().getDay()) {
            strtime = '今天'
        } else {
            strtime = '1天前'
        }
    } else if (diff <= 30 * 24 * 3600 * 1000) {
        strtime = Math.floor(diff / (24 * 3600 * 1000)) + '天前'
    }
    return strtime
}