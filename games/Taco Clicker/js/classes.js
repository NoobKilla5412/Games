class Upgrade {
  constructor({ name, type, action = '+', max, cost, num, total, totalUp, costUp }) {
    this.name = name
    this.max = max
    this.cost = cost
    this.num = num
    this.total = total
    this.type = type
    this.action = action
    this.totalUp = totalUp
    this.costUp = costUp

    this.buttonElement = {
      onclick: this.name + 'upgrade()',
      id: name,
      class: 'upgrades',
    }
  }
  upgrade() {
    if (this.type == 'money') {
      switch (this.action) {
        case '+':
          if (money >= Math.floor(this.cost) && this.num != this.max) {
            money -= Math.floor(this.cost)
            this.cost *= this.costUp
            this.num++
            this.total += this.totalUp
            clickUpgrade.play()
          }
          break
        case '*':
          if (money >= Math.floor(this.cost) && this.num != this.max) {
            money -= Math.floor(this.cost)
            this.cost *= this.costUp
            this.num++
            this.total *= this.totalUp
            clickUpgrade.play()
          }
      }
    } else if (this.type == 'diamond') {
      switch (this.action) {
        case '+':
          if (diamonds >= Math.floor(this.cost) && this.num != this.max) {
            diamonds -= Math.floor(this.cost)
            this.cost *= this.costUp
            this.num++
            this.total += this.totalUp
            clickUpgrade.play()
          }
          break
        case '*':
          if (diamonds >= Math.floor(this.cost) && this.num != this.max) {
            diamonds -= Math.floor(this.cost)
            this.cost *= this.costUp
            this.num++
            this.total *= this.totalUp
            clickUpgrade.play()
          }
          break
      }
    }
  }
  color() {
    if (this.type == 'money') {
      if (money >= Math.floor(this.cost) && this.num != this.max) {
        document.getElementById(this.name).classList = 'green upgrades'
      } else {
        document.getElementById(this.name).classList = 'gray upgrades'
      }
    } else if (this.type == 'diamond') {
      if (diamonds >= Math.floor(this.cost) && this.num != this.max) {
        document.getElementById(this.name).classList = 'green upgrades'
      } else {
        document.getElementById(this.name).classList = 'gray upgrades'
      }
    }
  }
  message() {
    if (this.num != this.max) {
      document.getElementById(this.name).innerHTML = buttons[this.name]
    } else {
      document.getElementById(this.name).innerHTML = buttons[this.name + 'Max']
    }
  }
}