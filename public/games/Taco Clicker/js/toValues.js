// Big Numbers:
const oneMillion = 10 ** 6
const oneBillion = 10 ** 9
const oneTrillion = 10 ** 12
const oneQuadrillion = 10 ** 15
const oneQuintillion = 10 ** 18
const oneSextillion = 10 ** 21
const oneSeptillion = 10 ** 24
const oneOctillion = 10 ** 27
const oneNonillion = 10 ** 30
const oneDecillion = 10 ** 33
const oneUndecillion = 10 ** 36
const oneDuodecillion = 10 ** 39
const oneTredecillion = 10 ** 42
const oneQuattuordecillion = 10 ** 45
const oneQuindecillion = 10 ** 48
const oneSexdecillion = 10 ** 51
const oneSeptendecillion = 10 ** 54
const oneOctodecillion = 10 ** 57
const oneNovemdecillion = 10 ** 60
const oneVigintillion = 10 ** 63
const oneUnvigintillion = 10 ** 66
const oneDuovigintillion = 10 ** 69
const oneTresvigintillion = 10 ** 72
const oneQuattuorvigintillion = 10 ** 75
const oneQuinvigintillion = 10 ** 78
const oneSesvigintillion = 10 ** 81
const oneSeptenvigintillion = 10 ** 84
const oneOctovigintillion = 10 ** 87
const oneNovemvigintillion = 10 ** 90
const oneTrigintillion = 10 ** 93
const oneALOT = 10 ** 96

function toValues(upgradeCost) {
  if (upgradeCost >= oneALOT) {
    return Math.round(100 * (upgradeCost / oneALOT)) / 100 + 'A LOT'
  } else if (upgradeCost >= oneTrigintillion) {
    return Math.round(100 * (upgradeCost / oneTrigintillion)) / 100 + 'TG'
  } else if (upgradeCost >= oneNovemvigintillion) {
    return Math.round(100 * (upgradeCost / oneNovemvigintillion)) / 100 + 'NV'
  } else if (upgradeCost >= oneOctovigintillion) {
    return Math.round(100 * (upgradeCost / oneOctovigintillion)) / 100 + 'OV'
  } else if (upgradeCost >= oneSeptenvigintillion) {
    return Math.round(100 * (upgradeCost / oneSeptenvigintillion)) / 100 + 'SV'
  } else if (upgradeCost >= oneSesvigintillion) {
    return Math.round(100 * (upgradeCost / oneSesvigintillion)) / 100 + 'sV'
  } else if (upgradeCost >= oneQuinvigintillion) {
    return Math.round(100 * (upgradeCost / oneQuinvigintillion)) / 100 + 'QV'
  } else if (upgradeCost >= oneQuattuorvigintillion) {
    return Math.round(100 * (upgradeCost / oneQuattuorvigintillion)) / 100 + 'qV'
  } else if (upgradeCost >= oneTresvigintillion) {
    return Math.round(100 * (upgradeCost / oneTresvigintillion)) / 100 + 'tV'
  } else if (upgradeCost >= oneDuovigintillion) {
    return Math.round(100 * (upgradeCost / oneDuovigintillion)) / 100 + 'dV'
  } else if (upgradeCost >= oneUnvigintillion) {
    return Math.round(100 * (upgradeCost / oneUnvigintillion)) / 100 + 'uV'
  } else if (upgradeCost >= oneVigintillion) {
    return Math.round(100 * (upgradeCost / oneVigintillion)) / 100 + 'V'
  } else if (upgradeCost >= oneNovemdecillion) {
    return Math.round(100 * (upgradeCost / oneNovemdecillion)) / 100 + 'Nd'
  } else if (upgradeCost >= oneOctodecillion) {
    return Math.round(100 * (upgradeCost / oneOctodecillion)) / 100 + 'Od'
  } else if (upgradeCost >= oneSeptendecillion) {
    return Math.round(100 * (upgradeCost / oneSeptendecillion)) / 100 + 'Sd'
  } else if (upgradeCost >= oneSexdecillion) {
    return Math.round(100 * (upgradeCost / oneSexdecillion)) / 100 + 'sd'
  } else if (upgradeCost >= oneQuindecillion) {
    return Math.round(100 * (upgradeCost / oneQuindecillion)) / 100 + 'Qd'
  } else if (upgradeCost >= oneQuattuordecillion) {
    return Math.round(100 * (upgradeCost / oneQuattuordecillion)) / 100 + 'qd'
  } else if (upgradeCost >= oneTredecillion) {
    return Math.round(100 * (upgradeCost / oneTredecillion)) / 100 + 'Td'
  } else if (upgradeCost >= oneDuodecillion) {
    return Math.round(100 * (upgradeCost / oneDuodecillion)) / 100 + 'D'
  } else if (upgradeCost >= oneUndecillion) {
    return Math.round(100 * (upgradeCost / oneUndecillion)) / 100 + 'U'
  } else if (upgradeCost >= oneDecillion) {
    return Math.round(100 * (upgradeCost / oneDecillion)) / 100 + 'd'
  } else if (upgradeCost >= oneNonillion) {
    return Math.round(100 * (upgradeCost / oneNonillion)) / 100 + 'N'
  } else if (upgradeCost >= oneOctillion) {
    return Math.round(100 * (upgradeCost / oneOctillion)) / 100 + 'o'
  } else if (upgradeCost >= oneSeptillion) {
    return Math.round(100 * (upgradeCost / oneSeptillion)) / 100 + 'S'
  } else if (upgradeCost >= oneSextillion) {
    return Math.round(100 * (upgradeCost / oneSextillion)) / 100 + 's'
  } else if (upgradeCost >= oneQuintillion) {
    return Math.round(100 * (upgradeCost / oneQuintillion)) / 100 + 'Q'
  } else if (upgradeCost >= oneQuadrillion) {
    return Math.round(100 * (upgradeCost / oneQuadrillion)) / 100 + 'q'
  } else if (upgradeCost >= oneTrillion) {
    return Math.round(100 * (upgradeCost / oneTrillion)) / 100 + 'T'
  } else if (upgradeCost >= oneBillion) {
    return Math.round(100 * (upgradeCost / oneBillion)) / 100 + 'B'
  } else if (upgradeCost >= oneMillion) {
    return Math.round(100 * (upgradeCost / oneMillion)) / 100 + 'M'
  } else if (upgradeCost >= 1000) {
    return Math.round(100 * (upgradeCost / 1000)) / 100 + 'K'
  } else {
    return Math.round(100 * (upgradeCost)) / 100
  }
}
function toValuesExt(upgradeCost) {
  if (upgradeCost >= oneALOT) {
    return Math.round(100 * (upgradeCost / oneALOT)) / 100 + ' A LOT'
  } else if (upgradeCost >= oneTrigintillion) {
    return Math.round(100 * (upgradeCost / oneTrigintillion)) / 100 + ' Trigintillion'
  } else if (upgradeCost >= oneNovemvigintillion) {
    return Math.round(100 * (upgradeCost / oneNovemvigintillion)) / 100 + ' Novemvigintillion'
  } else if (upgradeCost >= oneOctovigintillion) {
    return Math.round(100 * (upgradeCost / oneOctovigintillion)) / 100 + ' Octovigintillion'
  } else if (upgradeCost >= oneSeptenvigintillion) {
    return Math.round(100 * (upgradeCost / oneSeptenvigintillion)) / 100 + ' Septenvigintillion'
  } else if (upgradeCost >= oneSesvigintillion) {
    return Math.round(100 * (upgradeCost / oneSesvigintillion)) / 100 + ' Sesvigintillion'
  } else if (upgradeCost >= oneQuinvigintillion) {
    return Math.round(100 * (upgradeCost / oneQuinvigintillion)) / 100 + ' Quinvigintillion'
  } else if (upgradeCost >= oneQuattuorvigintillion) {
    return Math.round(100 * (upgradeCost / oneQuattuorvigintillion)) / 100 + ' Quattuorvigintillion'
  } else if (upgradeCost >= oneTresvigintillion) {
    return Math.round(100 * (upgradeCost / oneTresvigintillion)) / 100 + ' Tresvigintillion'
  } else if (upgradeCost >= oneDuovigintillion) {
    return Math.round(100 * (upgradeCost / oneDuovigintillion)) / 100 + ' Duovigintillion'
  } else if (upgradeCost >= oneUnvigintillion) {
    return Math.round(100 * (upgradeCost / oneUnvigintillion)) / 100 + ' Unvigintillion'
  } else if (upgradeCost >= oneVigintillion) {
    return Math.round(100 * (upgradeCost / oneVigintillion)) / 100 + ' Vigintillion'
  } else if (upgradeCost >= oneNovemdecillion) {
    return Math.round(100 * (upgradeCost / oneNovemdecillion)) / 100 + ' Novemdecillion'
  } else if (upgradeCost >= oneOctodecillion) {
    return Math.round(100 * (upgradeCost / oneOctodecillion)) / 100 + ' Octodecillion'
  } else if (upgradeCost >= oneSeptendecillion) {
    return Math.round(100 * (upgradeCost / oneSeptendecillion)) / 100 + ' Septendecillion'
  } else if (upgradeCost >= oneSexdecillion) {
    return Math.round(100 * (upgradeCost / oneSexdecillion)) / 100 + ' Sexdecillion'
  } else if (upgradeCost >= oneQuindecillion) {
    return Math.round(100 * (upgradeCost / oneQuindecillion)) / 100 + ' Quindecillion'
  } else if (upgradeCost >= oneQuattuordecillion) {
    return Math.round(100 * (upgradeCost / oneQuattuordecillion)) / 100 + ' Quattuordecillion'
  } else if (upgradeCost >= oneTredecillion) {
    return Math.round(100 * (upgradeCost / oneTredecillion)) / 100 + ' Tredecillion'
  } else if (upgradeCost >= oneDuodecillion) {
    return Math.round(100 * (upgradeCost / oneDuodecillion)) / 100 + ' Duodecillion'
  } else if (upgradeCost >= oneUndecillion) {
    return Math.round(100 * (upgradeCost / oneUndecillion)) / 100 + ' Undecillion'
  } else if (upgradeCost >= oneDecillion) {
    return Math.round(100 * (upgradeCost / oneDecillion)) / 100 + ' Decillion'
  } else if (upgradeCost >= oneNonillion) {
    return Math.round(100 * (upgradeCost / oneNonillion)) / 100 + ' Nonillion'
  } else if (upgradeCost >= oneOctillion) {
    return Math.round(100 * (upgradeCost / oneOctillion)) / 100 + ' Octillion'
  } else if (upgradeCost >= oneSeptillion) {
    return Math.round(100 * (upgradeCost / oneSeptillion)) / 100 + ' Septillion'
  } else if (upgradeCost >= oneSextillion) {
    return Math.round(100 * (upgradeCost / oneSextillion)) / 100 + ' Sextillion'
  } else if (upgradeCost >= oneQuintillion) {
    return Math.round(100 * (upgradeCost / oneQuintillion)) / 100 + ' Quintillion'
  } else if (upgradeCost >= oneQuadrillion) {
    return Math.round(100 * (upgradeCost / oneQuadrillion)) / 100 + ' Quadrillion'
  } else if (upgradeCost >= oneTrillion) {
    return Math.round(100 * (upgradeCost / oneTrillion)) / 100 + ' Trillion'
  } else if (upgradeCost >= oneBillion) {
    return Math.round(100 * (upgradeCost / oneBillion)) / 100 + ' Billion'
  } else if (upgradeCost >= oneMillion) {
    return Math.round(100 * (upgradeCost / oneMillion)) / 100 + ' Million'
  } else if (upgradeCost >= 1000) {
    return Math.round(100 * (upgradeCost / 1000)) / 100 + ' Thousand'
  } else {
    return Math.round(100 * (upgradeCost)) / 100
  }
}