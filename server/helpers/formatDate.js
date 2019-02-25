function dateFormat(date) {
    let strDate = String(date)
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    let strTime = ''
    
    if(hours < 10 && minutes < 10 && seconds < 10) {
        strTime = `0${hours} : 0${minutes} : 0${seconds}`
    } 
    if (hours < 10) {
        strTime = `0${hours} : ${minutes} : ${seconds}`
    }
    if (minutes < 10) {
        strTime = `${hours} : 0${minutes} : ${seconds}`
    }
    if (seconds < 10) {
        strTime = `${hours} : ${minutes} : 0${seconds}`
    }

    return {
        stringTime: strTime,
        stringDate: strDate.substring(0, 15)
    }
}

module.exports = dateFormat