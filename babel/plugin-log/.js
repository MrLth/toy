/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-24 09:31:59
 * @LastEditTime: 2021-02-24 11:33:16
 * @Description: file content
 */
// import './entry'
const para = { a: 1, b: 2 }

$log({ BookMark: 'BookMark', Tab: 'Tab' }, 'render', 1);
$log({ BookMark: 'BookMark', Tab: 'Tab' }, 'render');
$log({ BookMark: 'BookMark', Tab: 'Tab' });
$log('not object');
$log({ para })


$debug({
  title: `happy`,
  para: 'what',
  multi: {
    'para1': 'para1 value',
    'para2': 'para2 value'
  },
  color: 2,
});

$debug({
  title: `happy`,
  para: 'what',
  multi: {
    'para1': 'para1 value',
    'para2': 'para2 value'
  },
});

$debug({
  title: `happy`,
  para: 'what',
});

$debug({
  para: 'what',
});

$debug({
  title: `happy`,
});