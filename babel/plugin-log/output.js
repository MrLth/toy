import { $log as _$log, $debug as _$debug } from './log';

/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-23 15:47:02
 * @LastEditTime: 2021-03-01 08:49:47
 * @Description: file content
 */
const para = {
  a: 1,
  b: 2
};
console.log(..._$log({
  BookMark: 'BookMark',
  Tab: 'Tab'
}, 'render', 1));
console.log(..._$log({
  BookMark: 'BookMark',
  Tab: 'Tab'
}, 'render'));
console.log(..._$log({
  BookMark: 'BookMark',
  Tab: 'Tab'
}));
console.log(..._$log('not object'));
console.log(..._$log({
  para
}));
console.log(..._$debug({
  title: `happy`,
  para: 'what',
  multi: {
    'para1': 'para1 value',
    'para2': 'para2 value'
  },
  color: 2
}));
console.log(..._$debug({
  title: `happy`,
  para: 'what',
  multi: {
    'para1': 'para1 value',
    'para2': 'para2 value'
  }
}));
console.log(..._$debug({
  title: `happy`,
  para: 'what'
}));
console.log(..._$debug({
  para: 'what'
}));
console.log(..._$debug({
  title: `happy`
}));
