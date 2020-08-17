import Vue from 'vue'
import _ from 'lodash'

Vue.filter('numberComma',
  n => `${n || 0}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
)
_.forEach(
  [
    'ceil',
    'floor',
    'max',
    'maxBy',
    'mean',
    'meanBy',
    'min',
    'minBy',
    'round',
    'sum',
    'sumBy',
    'clamp',
    'camelCase',
    'capitalize',
    'endsWith',
    'escape',
    'escapeRegExp',
    'kebabCase',
    'lowerCase',
    'lowerFirst',
    'pad',
    'padEnd',
    'padStart',
    'parseInt',
    'repeat',
    'replace',
    'snakeCase',
    'split',
    'startCase',
    'startsWith',
    'template',
    'toLower',
    'toUpper',
    'trim',
    'trimEnd',
    'trimStart',
    'truncate',
    'unescape',
    'upperCase',
    'upperFirst',
    'words'
  ],
  fn => Vue.filter(fn, _[fn])
)
