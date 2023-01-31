// event handler for when user clicks create post button
const createPostFormHandler = async (event) => {
   event.preventDefault();
   // get data from form fields
   const title = document.getElementById('postTitle').value.trim();
   const content = document.getElementById('postContent').value.trim();
   // make post request to create a blog post
   const response = await fetch('/api/post', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' }
   });
   if (response.ok) {
      // gottem
      document.location.replace('/dashboard');
   } else {
      // stop. get some help
      alert('Failed to post. Try again later');
   }
}

// event listeners
document.getElementById('create-post-form').addEventListener('submit', createPostFormHandler);