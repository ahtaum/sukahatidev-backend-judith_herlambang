export const isStringRotation = (str1, str2) => {
    str1 = str1.toLowerCase()
    str2 = str2.toLowerCase()

    if (str1.length !== str2.length) {
        return false
    }

    const concatenatedStr = str1 + str1

    if (concatenatedStr.includes(str2)) {
        return true
    }
    
    return false
}

export const isPalindrome = (data) => {
    const rawStr = data.replace(/\s/g, '')
    const lowerCaseStr = rawStr.toLowerCase()
    const reversedStr = lowerCaseStr.split('').reverse().join('')

    return lowerCaseStr === reversedStr
}