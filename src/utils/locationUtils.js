function customReplace(url) {
  location.replace(`${location.pathname}#${url}`);
}

export function goHomePage(replace = customReplace) {
  replace('/');
}

export function goLoginPage(replace = customReplace) {
  replace('/login')
}
