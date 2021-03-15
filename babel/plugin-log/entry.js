/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-02-23 15:47:02
 * @LastEditTime: 2021-03-01 08:49:47
 * @Description: file content
 */
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