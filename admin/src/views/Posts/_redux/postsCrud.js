import axios from 'axios';
// items => filtered/sorted result
export function findPosts(params) {
  return axios.post('https://api.retnecms.com/news-article/find', params)
}

export function getPostsById(postId) {
  return axios.get(`https://api.retnecms.com/news-article/${postId}`)
}

export function updatePost(postId, post) {
  return axios.put(`https://api.retnecms.com/news-article/${postId}`, post);
}