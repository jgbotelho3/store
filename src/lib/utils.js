const intl = require('intl')

module.exports = {
  date (timestamp) {
    const date = new Date(timestamp)

    const year = date.getFullYear()
    const month = `0${date.getMonth() + 1}`.slice(-2)
    const day = `0${date.getDate()}`.slice(-2)
    const hour = date.getHours()
    const minutes = date.getMinutes()

    return {
      year, 
      month,
      day,
      hour,
      minutes,
      iso: `${year}-${month}-${day}`,
      birthDay: `${day}/${month}`,
      format: `${day}/${month}/${year}`
    }
  },

  formatPrice (price) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price / 100)
  },

  formatCpfCnpj (value) {
    value = value.replace(/\D/g, '')

    const cpfCnpjFieldLength = 14
    if (value.length > cpfCnpjFieldLength) {
      value = value.slice(0, -1)
    }

    if (value.length > 11) {
      value = value.replace(/(\d{2})(\d)/, '$1.$2')
      value = value.replace(/(\d{3})(\d)/, '$1.$2')
      value = value.replace(/(\d{3})(\d)/, '$1/$2')
      value = value.replace(/(\d{4})(\d)/, '$1-$2')
    } else {
      value = value.replace(/(\d{3})(\d)/, '$1.$2')
      value = value.replace(/(\d{3})(\d)/, '$1.$2')
      value = value.replace(/(\d{3})(\d)/, '$1-$2')
    }

    return value
  },

  formatCep (value) {
    value = value.replace(/\D/g, '')

    const cepFieldLength = 8

    if (value.length > cepFieldLength) {
      value = value.slice(0, -1)
    }

    value = value.replace(/(\d{5})(\d)/, '$1-$2')
    return value
  }
}
