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

/**
 * Change large numbers to readable values
 * 
 * ex.
 * 
 * 100Td
 * 
 * 24T
 * @param {*} value The value to add the value to
 * @returns A string of the money value
 */
function toValues(value) {
  if (value >= oneALOT) {
    return Math.round(100 * (value / oneALOT)) / 100 + 'A LOT'
  } else if (value >= oneTrigintillion) {
    return Math.round(100 * (value / oneTrigintillion)) / 100 + 'TG'
  } else if (value >= oneNovemvigintillion) {
    return Math.round(100 * (value / oneNovemvigintillion)) / 100 + 'NV'
  } else if (value >= oneOctovigintillion) {
    return Math.round(100 * (value / oneOctovigintillion)) / 100 + 'OV'
  } else if (value >= oneSeptenvigintillion) {
    return Math.round(100 * (value / oneSeptenvigintillion)) / 100 + 'SV'
  } else if (value >= oneSesvigintillion) {
    return Math.round(100 * (value / oneSesvigintillion)) / 100 + 'sV'
  } else if (value >= oneQuinvigintillion) {
    return Math.round(100 * (value / oneQuinvigintillion)) / 100 + 'QV'
  } else if (value >= oneQuattuorvigintillion) {
    return Math.round(100 * (value / oneQuattuorvigintillion)) / 100 + 'qV'
  } else if (value >= oneTresvigintillion) {
    return Math.round(100 * (value / oneTresvigintillion)) / 100 + 'tV'
  } else if (value >= oneDuovigintillion) {
    return Math.round(100 * (value / oneDuovigintillion)) / 100 + 'dV'
  } else if (value >= oneUnvigintillion) {
    return Math.round(100 * (value / oneUnvigintillion)) / 100 + 'uV'
  } else if (value >= oneVigintillion) {
    return Math.round(100 * (value / oneVigintillion)) / 100 + 'V'
  } else if (value >= oneNovemdecillion) {
    return Math.round(100 * (value / oneNovemdecillion)) / 100 + 'Nd'
  } else if (value >= oneOctodecillion) {
    return Math.round(100 * (value / oneOctodecillion)) / 100 + 'Od'
  } else if (value >= oneSeptendecillion) {
    return Math.round(100 * (value / oneSeptendecillion)) / 100 + 'Sd'
  } else if (value >= oneSexdecillion) {
    return Math.round(100 * (value / oneSexdecillion)) / 100 + 'sd'
  } else if (value >= oneQuindecillion) {
    return Math.round(100 * (value / oneQuindecillion)) / 100 + 'Qd'
  } else if (value >= oneQuattuordecillion) {
    return Math.round(100 * (value / oneQuattuordecillion)) / 100 + 'qd'
  } else if (value >= oneTredecillion) {
    return Math.round(100 * (value / oneTredecillion)) / 100 + 'Td'
  } else if (value >= oneDuodecillion) {
    return Math.round(100 * (value / oneDuodecillion)) / 100 + 'D'
  } else if (value >= oneUndecillion) {
    return Math.round(100 * (value / oneUndecillion)) / 100 + 'U'
  } else if (value >= oneDecillion) {
    return Math.round(100 * (value / oneDecillion)) / 100 + 'd'
  } else if (value >= oneNonillion) {
    return Math.round(100 * (value / oneNonillion)) / 100 + 'N'
  } else if (value >= oneOctillion) {
    return Math.round(100 * (value / oneOctillion)) / 100 + 'o'
  } else if (value >= oneSeptillion) {
    return Math.round(100 * (value / oneSeptillion)) / 100 + 'S'
  } else if (value >= oneSextillion) {
    return Math.round(100 * (value / oneSextillion)) / 100 + 's'
  } else if (value >= oneQuintillion) {
    return Math.round(100 * (value / oneQuintillion)) / 100 + 'Q'
  } else if (value >= oneQuadrillion) {
    return Math.round(100 * (value / oneQuadrillion)) / 100 + 'q'
  } else if (value >= oneTrillion) {
    return Math.round(100 * (value / oneTrillion)) / 100 + 'T'
  } else if (value >= oneBillion) {
    return Math.round(100 * (value / oneBillion)) / 100 + 'B'
  } else if (value >= oneMillion) {
    return Math.round(100 * (value / oneMillion)) / 100 + 'M'
  } else if (value >= 1000) {
    return Math.round(100 * (value / 1000)) / 100 + 'K'
  } else {
    return Math.round(100 * (value)) / 100
  }
}
/**
 * Change large numbers to readable values and spell out the value
 * 
 * ex.
 * 
 * 100 Tredecillion
 * 
 * 24 Trillion
 * @param {*} value The value to add the value to
 * @returns A string of the money value
 */
function toValuesExt(value) {
  if (value >= oneALOT) {
    return Math.round(100 * (value / oneALOT)) / 100 + ' A LOT'
  } else if (value >= oneTrigintillion) {
    return Math.round(100 * (value / oneTrigintillion)) / 100 + ' Trigintillion'
  } else if (value >= oneNovemvigintillion) {
    return Math.round(100 * (value / oneNovemvigintillion)) / 100 + ' Novemvigintillion'
  } else if (value >= oneOctovigintillion) {
    return Math.round(100 * (value / oneOctovigintillion)) / 100 + ' Octovigintillion'
  } else if (value >= oneSeptenvigintillion) {
    return Math.round(100 * (value / oneSeptenvigintillion)) / 100 + ' Septenvigintillion'
  } else if (value >= oneSesvigintillion) {
    return Math.round(100 * (value / oneSesvigintillion)) / 100 + ' Sesvigintillion'
  } else if (value >= oneQuinvigintillion) {
    return Math.round(100 * (value / oneQuinvigintillion)) / 100 + ' Quinvigintillion'
  } else if (value >= oneQuattuorvigintillion) {
    return Math.round(100 * (value / oneQuattuorvigintillion)) / 100 + ' Quattuorvigintillion'
  } else if (value >= oneTresvigintillion) {
    return Math.round(100 * (value / oneTresvigintillion)) / 100 + ' Tresvigintillion'
  } else if (value >= oneDuovigintillion) {
    return Math.round(100 * (value / oneDuovigintillion)) / 100 + ' Duovigintillion'
  } else if (value >= oneUnvigintillion) {
    return Math.round(100 * (value / oneUnvigintillion)) / 100 + ' Unvigintillion'
  } else if (value >= oneVigintillion) {
    return Math.round(100 * (value / oneVigintillion)) / 100 + ' Vigintillion'
  } else if (value >= oneNovemdecillion) {
    return Math.round(100 * (value / oneNovemdecillion)) / 100 + ' Novemdecillion'
  } else if (value >= oneOctodecillion) {
    return Math.round(100 * (value / oneOctodecillion)) / 100 + ' Octodecillion'
  } else if (value >= oneSeptendecillion) {
    return Math.round(100 * (value / oneSeptendecillion)) / 100 + ' Septendecillion'
  } else if (value >= oneSexdecillion) {
    return Math.round(100 * (value / oneSexdecillion)) / 100 + ' Sexdecillion'
  } else if (value >= oneQuindecillion) {
    return Math.round(100 * (value / oneQuindecillion)) / 100 + ' Quindecillion'
  } else if (value >= oneQuattuordecillion) {
    return Math.round(100 * (value / oneQuattuordecillion)) / 100 + ' Quattuordecillion'
  } else if (value >= oneTredecillion) {
    return Math.round(100 * (value / oneTredecillion)) / 100 + ' Tredecillion'
  } else if (value >= oneDuodecillion) {
    return Math.round(100 * (value / oneDuodecillion)) / 100 + ' Duodecillion'
  } else if (value >= oneUndecillion) {
    return Math.round(100 * (value / oneUndecillion)) / 100 + ' Undecillion'
  } else if (value >= oneDecillion) {
    return Math.round(100 * (value / oneDecillion)) / 100 + ' Decillion'
  } else if (value >= oneNonillion) {
    return Math.round(100 * (value / oneNonillion)) / 100 + ' Nonillion'
  } else if (value >= oneOctillion) {
    return Math.round(100 * (value / oneOctillion)) / 100 + ' Octillion'
  } else if (value >= oneSeptillion) {
    return Math.round(100 * (value / oneSeptillion)) / 100 + ' Septillion'
  } else if (value >= oneSextillion) {
    return Math.round(100 * (value / oneSextillion)) / 100 + ' Sextillion'
  } else if (value >= oneQuintillion) {
    return Math.round(100 * (value / oneQuintillion)) / 100 + ' Quintillion'
  } else if (value >= oneQuadrillion) {
    return Math.round(100 * (value / oneQuadrillion)) / 100 + ' Quadrillion'
  } else if (value >= oneTrillion) {
    return Math.round(100 * (value / oneTrillion)) / 100 + ' Trillion'
  } else if (value >= oneBillion) {
    return Math.round(100 * (value / oneBillion)) / 100 + ' Billion'
  } else if (value >= oneMillion) {
    return Math.round(100 * (value / oneMillion)) / 100 + ' Million'
  } else if (value >= 1000) {
    return Math.round(100 * (value / 1000)) / 100 + ' Thousand'
  } else {
    return Math.round(100 * (value)) / 100
  }
}