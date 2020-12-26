class ValidationUtils {
  static digits (e) {
    return e ? /^\d+$/.test(e) : true
  }

  static correspondentAccount (e, bik) {
    e = String(e)
    if (e.length === 0) {
      return true
    }
    if (!this.bik(bik) || !this.digits(e) || e.length !== 20) {
      return false
    }
    var bikKs = '0' + bik.toString().slice(4, 6) + e
    var checksum = 0
    var coefficients = [7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1]
    for (var i in coefficients) {
      checksum += coefficients[i] * (bikKs[i] % 10)
    }
    return checksum % 10 === 0
  }

  static alpha (e) {
    return e ? /^[a-zA-Zа-яА-ЯёЁ\- ]*$/.test(e) : true
  }

  static allCharacters (e) {
    return e ? /^[\u0020-\u007E\u0410-\u044FЁё№«»]*$/.test(e) : true
  }

  static cyrillic (e) {
    return e ? /^[а-яА-ЯёЁ]*$/.test(e) : true
  }

  static notCyrillic (e) {
    return e ? /^[^а-яА-ЯёЁ]+$/.test(e) : true
  }

  static login (e) {
    return e ? /^[a-zA-Z0-9.@\-_]+$/.test(e) : true
  }

  static latin (e) {
    return e ? /^[a-zA-Z0-9]+$/.test(e) : true
  }

  static latinEmail (e) {
    return e ? /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(e) : true
  }

  static fioWord (e) {
    if (!e) {
      return true
    }
    let arr = e.split(' ')
    if (arr.length < 2) {
      return false
    }
    for (let index = 0; index < arr.length; ++index) {
      if (arr[index].length < 1) {
        return false
      }
    }
    return /^[а-яА-ЯёЁ/-\s]*$/.test(e)
  }

  static fio (e) {
    return e ? /^[а-яА-ЯёЁ/-\s]*$/.test(e) : true
  }

  static firstLetterUp (e) {
    return !!/^[A-ZА-ЯЁ].*$/.test(e)
  }

  static phone (e) {
    if (!/^[0-9].*$/.test(e)) {
      return false
    }
    e = String(e)
    if (e.length !== 10) {
      return false
    }
    // Проверка на принадлежность пулу номеров РФ
    return !!/^(?:8(?:(?:21|22|23|24|51|52|53|54|55)|(?:15\d\d))?|\+?7)?(?:(?:3[04589]|4[012789]|8[^89\D]|9\d)\d)?\d{7}$/.test(e)
  }

  static validWordLength (e) {
    let arr = e.split(/[^а-яА-ЯёЁA-Za-z0-9]/g)
    for (let index = 0; index < arr.length; ++index) {
      if (arr[index].length > 30) {
        return false
      }
    }
    return true
  }
}

export let validationUtils = ValidationUtils
