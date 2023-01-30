// event handler for when the user clicks the logout button
const logout = async (event) => {
   // try to log out the current user
   const response = await fetch('/api/user/logout', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      }
   });
   if (response.ok) {
      // gottem
      document.location.replace('/');
   } else {
      // stop. get some help
      alert('Failed to log out. Please try again later.');
   }
}
// event listeners
document.getElementById('logout-btn').addEventListener('click', logout);