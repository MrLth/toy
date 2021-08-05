module.exports = function loader(resource, map) {
  let style = `
    const style = document.createElement('style');
    style.innerHTML = ${JSON.stringify(resource)};
    document.head.appendChild(style);
  `;

  return style;
}

// 字符串 | buffer