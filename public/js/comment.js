const commentFormHandler = async function (event) {
  event.preventDefault();

  const postId = document.querySelector('input[name="post-id"]').value;
  const comment_text = document.querySelector('textarea[name="comment-body"]').value; // Ensure correct key

  if (comment_text) {  
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        postId,
        comment_text, 
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload(); 
    } else {
      document.location.replace('/login');
    }
  }
};

document
  .querySelector('#new-comment-form')
  .addEventListener('submit', commentFormHandler);