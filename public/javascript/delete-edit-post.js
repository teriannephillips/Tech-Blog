function deleteFormHandler(event) {
    event.preventDefault();
  
    const postId = event.target.closest('.post-section').id;
    console.log(postId);
  
    fetch(`/api/posts/${postId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert(response.statusText);
        }
      })
      .catch(err => {
        console.log(err);
        alert('Failed to delete post');
      });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const deleteBtns = document.querySelectorAll('.delete-btn');
    if (deleteBtns) {
      deleteBtns.forEach(deleteBtn => {
        deleteBtn.addEventListener('click', deleteFormHandler);
      });
    }
  });
  
  