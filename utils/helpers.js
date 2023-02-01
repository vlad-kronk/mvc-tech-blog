function isHome(page_title) {
   return page_title === 'Home';
}
function isDash(page_title) {
   return page_title === 'Dashboard';
}
function isLogin(page_title) {
   return page_title === 'Login';
}

function isMyComment(comment_id, user_id) {
   return comment_id === user_id;
}

module.exports = {
   isHome,
   isDash,
   isLogin,
   isMyComment
};