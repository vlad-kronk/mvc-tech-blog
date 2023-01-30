function isHome(page_title) {
   return page_title === 'Home';
}
function isDash(page_title) {
   return page_title === 'Dashboard';
}
function isLogin(page_title) {
   return page_title === 'Login';
}

module.exports = {
   isHome,
   isDash,
   isLogin
};